import { useEffect, useRef, useState } from 'react';
import { vocabulary, vocabularySource } from './data/vocabulary';
import {
  listeningExercises,
  readingExercises,
  speakingPrompts,
  speakingDifficulties,
  writingPrompts,
  writingDifficulties,
} from './data/learningMaterials';
import { createEmptyProgress, getUserProgress, saveUserProgress } from './services/storage';
import { assessReadiness } from './services/assessment';
import { ProgressArea, UserProgress } from './types';

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

const areaLabels: Record<ProgressArea, string> = {
  vocabulary: 'Sanasto',
  listening: 'Kuuntelu',
  reading: 'Lukeminen',
  writing: 'Kirjoittaminen',
  speaking: 'Puhuminen',
};

const areaTotals: Record<ProgressArea, number> = {
  vocabulary: vocabulary.length,
  listening: listeningExercises.length,
  reading: readingExercises.length,
  writing: writingPrompts.length,
  speaking: speakingPrompts.length,
};

export default function App() {
  const [wordIndex, setWordIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [section, setSection] = useState<Section>('home');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [showListeningText, setShowListeningText] = useState(false);
  const [showAttemptHistory, setShowAttemptHistory] = useState(false);
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const stored = getUserProgress();
    if (stored) return stored;

    const initial = createEmptyProgress();
    const legacyScore = Number(localStorage.getItem('yki-score') ?? 0);
    return { ...initial, score: Number.isFinite(legacyScore) ? legacyScore : 0 };
  });

  const word = vocabulary[wordIndex];
  const score = progress.score;
  const readiness = assessReadiness(progress, areaTotals);

  useEffect(() => {
    saveUserProgress(progress);
    localStorage.setItem('yki-score', String(progress.score));
  }, [progress]);

  function completeExercise(area: ProgressArea, id: string, points = 0) {
    setProgress((current) => {
      const completed = current.completed[area];
      const alreadyCompleted = completed.includes(id);
      return {
        score: current.score + (alreadyCompleted ? 0 : points),
        completed: alreadyCompleted
          ? current.completed
          : { ...current.completed, [area]: [...completed, id] },
        attempts: [
          ...current.attempts,
          {
            area,
            id,
            correct: points > 0,
            completedAt: new Date().toISOString(),
          },
        ],
      };
    });
  }

  function checkAnswer() {
    if (!answer.trim() || feedback) return;

    if (normalize(answer) === normalize(word.finnish)) {
      setFeedback('Oikein! +10 pistettä');
      completeExercise('vocabulary', String(wordIndex), 10);
    } else {
      completeExercise('vocabulary', String(wordIndex));
      setFeedback(`Oikea vastaus on: ${word.finnish}`);
    }
  }

  function nextWord() {
    setWordIndex((current) => (current + 1) % vocabulary.length);
    setAnswer('');
    setFeedback('');
  }

  function selectSection(nextSection: Section) {
    recognitionRef.current?.abort();
    setIsListening(false);
    setSection(nextSection);
    setExerciseIndex(0);
    setAnswer('');
    setFeedback('');
    setShowListeningText(false);
    setResponse('');
    setSpeechError('');
  }

  function toggleSpeechRecognition() {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      setSpeechError('Tämä selain ei tue puheentunnistusta. Kirjoita vastauksesi tekstikenttään.');
      return;
    }

    const recognition = new Recognition();
    recognition.lang = 'sv-SE';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript.trim();
      if (transcript) {
        setResponse((current) => current ? `${current} ${transcript}` : transcript);
      }
    };
    recognition.onerror = () => {
      setSpeechError('Puheentunnistus ei onnistunut. Tarkista mikrofonilupa ja yritä uudelleen.');
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    setSpeechError('');
    setIsListening(true);
    recognition.start();
  }

  function checkChoice(choice: string, correctAnswer: string) {
    if (feedback) return;
    if (choice === correctAnswer) {
      setFeedback('Oikein! +10 pistettä');
      const area = section === 'listening' ? 'listening' : 'reading';
      const exercise = area === 'listening' ? listening : reading;
      completeExercise(area, String(exercise.id), 10);
    } else {
      const area = section === 'listening' ? 'listening' : 'reading';
      const exercise = area === 'listening' ? listening : reading;
      completeExercise(area, String(exercise.id));
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
          <section className="card practice-summary">
            <div className="area-header">
              <span>Harjoittelun yhteenveto</span>
              <strong>{score} pistettä</strong>
            </div>
            <p>Harjoituskertoja: {progress.attempts.length}</p>
            {progress.attempts.length > 0 ? (
              <>
                <button
                  className="secondary history-toggle"
                  onClick={() => setShowAttemptHistory((current) => !current)}
                  aria-expanded={showAttemptHistory}
                  aria-controls="attempt-history"
                >
                  {showAttemptHistory ? 'Piilota harjoitushistoria' : 'Näytä harjoitushistoria'}
                </button>
                {showAttemptHistory && (
                  <ul id="attempt-history">
                    {progress.attempts.slice(-5).reverse().map((attempt, index) => (
                      <li key={`${attempt.completedAt}-${index}`}>
                        {areaLabels[attempt.area]}: {attempt.correct ? 'oikein' : 'harjoiteltu'}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p>Vastaushistoriasi näkyy tässä, kun aloitat harjoittelun.</p>
            )}
          </section>
          <section className="card readiness-card">
            <div className="area-header">
              <span>YKI-valmius</span>
              <strong>{readiness.overall} %</strong>
            </div>
            <progress value={readiness.overall} max="100" />
            <h2>{readiness.level}</h2>
            <p>Seuraava painopiste: {areaLabels[readiness.recommendation]}</p>
            <div className="readiness-grid">
              {Object.entries(readiness.areas).map(([area, value]) => (
                <div key={area}>
                  <span>{areaLabels[area as ProgressArea]}</span>
                  <strong>{value} %</strong>
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
          <p className="difficulty">Vaikeustaso: {listening.difficulty === 'easy' ? 'Perustaso' : listening.difficulty === 'medium' ? 'Keskitaso' : 'Haastava'}</p>
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
          <p className="difficulty">Vaikeustaso: {reading.difficulty === 'easy' ? 'Perustaso' : reading.difficulty === 'medium' ? 'Keskitaso' : 'Haastava'}</p>
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
        <p className="difficulty">Vaikeustaso: {(section === 'writing' ? writingDifficulties : speakingDifficulties)[exerciseIndex % prompts.length] === 'easy' ? 'Perustaso' : (section === 'writing' ? writingDifficulties : speakingDifficulties)[exerciseIndex % prompts.length] === 'medium' ? 'Keskitaso' : 'Haastava'}</p>
        <textarea
          value={response}
          onChange={(event) => setResponse(event.target.value)}
          placeholder={section === 'writing' ? 'Kirjoita vastauksesi ruotsiksi...' : 'Kirjoita ensin muistiinpanosi...'}
        />
        {section === 'speaking' && (
          <>
            <button className={isListening ? 'recording' : 'secondary'} onClick={toggleSpeechRecognition}>
              {isListening ? 'Lopeta kuuntelu' : '🎙️ Puhu ruotsiksi'}
            </button>
            <p className="hint">Selain muuttaa puheesi tekstiksi, jonka voit tarkistaa ja täydentää.</p>
            {speechError && <p className="error" role="alert">{speechError}</p>}
          </>
        )}
        <p className="hint">Tavoittele selkeää rakennetta ja käytä mahdollisimman monipuolista sanastoa.</p>
        <button onClick={() => {
          completeExercise(section, String(exerciseIndex), 5);
          setFeedback('Tehtävä merkitty harjoitelluksi!');
        }}>Merkitse tehdyksi</button>
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