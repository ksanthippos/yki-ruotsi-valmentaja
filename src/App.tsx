import { useEffect, useState } from 'react';
import { vocabulary, vocabularySource } from './data/vocabulary';
import {
  listeningExercises,
  readingExercises,
  speakingPrompts,
  writingPrompts,
} from './data/learningMaterials';

const areas = [
  { name: 'Sanasto', progress: 35 },
  { name: 'Lukeminen', progress: 20 },
  { name: 'Kuuntelu', progress: 15 },
  { name: 'Kirjoittaminen', progress: 10 },
  { name: 'Puhuminen', progress: 5 },
];

function normalize(text: string) {
  return text.trim().toLocaleLowerCase('fi-FI');
}

type Section = 'home' | 'vocabulary' | 'listening' | 'reading' | 'writing' | 'speaking';

const menuItems: { id: Section; label: string }[] = [
  { id: 'home', label: 'Etusivu' },
  { id: 'vocabulary', label: 'Sanasto' },
  { id: 'listening', label: 'Kuuntelu' },
  { id: 'reading', label: 'Lukeminen' },
  { id: 'writing', label: 'Kirjoittaminen' },
  { id: 'speaking', label: 'Puhuminen' },
];

export default function App() {
  const [wordIndex, setWordIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [section, setSection] = useState<Section>('home');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [showListeningText, setShowListeningText] = useState(false);
  const [score, setScore] = useState(() =>
    Number(localStorage.getItem('yki-score') ?? 0),
  );

  const word = vocabulary[wordIndex];

  useEffect(() => {
    localStorage.setItem('yki-score', String(score));
  }, [score]);

  function checkAnswer() {
    if (!answer.trim() || feedback) return;

    if (normalize(answer) === normalize(word.finnish)) {
      setFeedback('Oikein! +10 pistettä');
      setScore((current) => current + 10);
    } else {
      setFeedback(`Oikea vastaus on: ${word.finnish}`);
    }
  }

  function nextWord() {
    setWordIndex((current) => (current + 1) % vocabulary.length);
    setAnswer('');
    setFeedback('');
  }

  function selectSection(nextSection: Section) {
    setSection(nextSection);
    setExerciseIndex(0);
    setAnswer('');
    setFeedback('');
    setShowListeningText(false);
  }

  function checkChoice(choice: string, correctAnswer: string) {
    if (feedback) return;
    if (choice === correctAnswer) {
      setFeedback('Oikein! +10 pistettä');
      setScore((current) => current + 10);
    } else {
      setFeedback(`Oikea vastaus on: ${correctAnswer}`);
    }
  }

  function speak(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'sv-SE';
      window.speechSynthesis.speak(utterance);
    }
  }

  function nextExercise(length: number) {
    setExerciseIndex((current) => (current + 1) % length);
    setFeedback('');
    setShowListeningText(false);
  }

  const listening = listeningExercises[exerciseIndex % listeningExercises.length];
  const reading = readingExercises[exerciseIndex % readingExercises.length];

  function renderExerciseOptions(
    options: string[],
    correctAnswer: string,
  ) {
    return (
      <div className="option-list">
        {options.map((option) => (
          <button
            className="option"
            key={option}
            onClick={() => checkChoice(option, correctAnswer)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  function renderSection() {
    if (section === 'home') {
      return (
        <>
          <section className="card">
            <h2>Tämän päivän harjoittelu</h2>
            <p>Valitse valikosta osa-alue ja harjoittele 15 minuuttia.</p>
            <button onClick={() => selectSection('vocabulary')}>Aloita sanastosta</button>
          </section>
          <section>
            <h2>Edistyminen</h2>
            <div className="areas">
              {areas.map((area) => (
                <div className="area" key={area.name}>
                  <div className="area-header">
                    <span>{area.name}</span>
                    <strong>{area.progress} %</strong>
                  </div>
                  <progress value={area.progress} max="100" />
                </div>
              ))}
            </div>
          </section>
        </>
      );
    }

    if (section === 'vocabulary') {
      return (
        <section className="card">
          <div className="area-header"><span>{word.category}</span><strong>Pisteet: {score}</strong></div>
          <p>Sana {wordIndex + 1} / {vocabulary.length}</p>
          <h2>{word.swedish}</h2>
          <p><em>{word.example}</em></p>
          <label htmlFor="answer">Mitä sana tarkoittaa suomeksi?</label>
          <input id="answer" value={answer} onChange={(event) => setAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') checkAnswer(); }} placeholder="Kirjoita vastaus" autoFocus />
          <div className="actions"><button onClick={checkAnswer}>Tarkista</button><button className="secondary" onClick={nextWord}>Seuraava</button></div>
          {feedback && <p><strong>{feedback}</strong></p>}
          <p><a href={vocabularySource.url} target="_blank" rel="noreferrer">Avaa Ylen alkuperäinen materiaali</a></p>
        </section>
      );
    }

    if (section === 'listening') {
      return (
        <section className="card">
          <div className="area-header"><span>Kuuntelu {listening.id}</span><strong>Pisteet: {score}</strong></div>
          <h2>Kuuntele ja ymmärrä</h2>
          <button onClick={() => speak(listening.text)}>🔊 Kuuntele ruotsiksi</button>
          <button
            className="secondary text-toggle"
            onClick={() => setShowListeningText((current) => !current)}
            aria-expanded={showListeningText}
            aria-controls="listening-transcript"
          >
            {showListeningText ? 'Piilota kuuntelun teksti' : 'Näytä kuuntelun teksti'}
          </button>
          {showListeningText && (
            <p id="listening-transcript" className="listening-text">
              {listening.text}
            </p>
          )}
          <p>{listening.question}</p>
          {renderExerciseOptions(listening.options, listening.answer)}
          {feedback && <p><strong>{feedback}</strong></p>}
          <button className="secondary" onClick={() => nextExercise(listeningExercises.length)}>Seuraava harjoitus</button>
        </section>
      );
    }

    if (section === 'reading') {
      return (
        <section className="card">
          <div className="area-header"><span>Lukeminen {reading.id}</span><strong>Pisteet: {score}</strong></div>
          <h2>{reading.title}</h2>
          <p className="reading-text">{reading.text}</p>
          <p>{reading.question}</p>
          {renderExerciseOptions(reading.options, reading.answer)}
          {feedback && <p><strong>{feedback}</strong></p>}
          <button className="secondary" onClick={() => nextExercise(readingExercises.length)}>Seuraava harjoitus</button>
        </section>
      );
    }

    const prompts = section === 'writing' ? writingPrompts : speakingPrompts;
    return (
      <section className="card">
        <div className="area-header"><span>{section === 'writing' ? 'Kirjoittaminen' : 'Puhuminen'}</span><strong>Pisteet: {score}</strong></div>
        <h2>{section === 'writing' ? 'Kirjoitustehtävä' : 'Puhumistehtävä'}</h2>
        <p>{prompts[exerciseIndex % prompts.length]}</p>
        <textarea placeholder={section === 'writing' ? 'Kirjoita vastauksesi ruotsiksi...' : 'Kirjoita ensin muistiinpanosi...'} />
        <p className="hint">Tavoittele selkeää rakennetta ja käytä mahdollisimman monipuolista sanastoa.</p>
        <button onClick={() => setFeedback('Tehtävä merkitty harjoitelluksi!')}>Merkitse tehdyksi</button>
        <button className="secondary next-button" onClick={() => nextExercise(prompts.length)}>Seuraava tehtävä</button>
        {feedback && <p><strong>{feedback}</strong></p>}
      </section>
    );
  }

  return (
    <main className="app">
      <header>
        <p className="eyebrow">YKI Ruotsi</p>
        <h1>YKI-valmentaja</h1>
        <p>
          Tavoitteesi: hyvä ruotsin kielen taito opetustyötä varten.
        </p>
      </header>
      <nav className="menu" aria-label="Harjoitusosiot">
        {menuItems.map((item) => (
          <button className={section === item.id ? 'menu-item active' : 'menu-item'} key={item.id} onClick={() => selectSection(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>
      {renderSection()}
    </main>
  );
}