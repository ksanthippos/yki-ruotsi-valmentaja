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
import { Difficulty, ProgressArea, UserProgress } from './types';

function normalize(text: string) {
  return text.trim().toLocaleLowerCase('fi-FI');
}

function isToday(date: string) {
  const value = new Date(date);
  const now = new Date();
  return value.getFullYear() === now.getFullYear()
    && value.getMonth() === now.getMonth()
    && value.getDate() === now.getDate();
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

function shuffled<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Perustaso',
  medium: 'Keskitaso',
  hard: 'Haastava',
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
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [vocabularyOrder, setVocabularyOrder] = useState(() => shuffled(vocabulary.map((_, index) => index)));
  const [listeningOrder, setListeningOrder] = useState(() => shuffled(listeningExercises.map((_, index) => index)));
  const [readingOrder, setReadingOrder] = useState(() => shuffled(readingExercises.map((_, index) => index)));
  const [writingOrder, setWritingOrder] = useState(() => shuffled(writingPrompts.map((_, index) => index)));
  const [speakingOrder, setSpeakingOrder] = useState(() => shuffled(speakingPrompts.map((_, index) => index)));
  const [progress, setProgress] = useState<UserProgress>(() => {
    const stored = getUserProgress();
    if (stored) return stored;

    const initial = createEmptyProgress();
    const legacyScore = Number(localStorage.getItem('yki-score') ?? 0);
    return { ...initial, score: Number.isFinite(legacyScore) ? legacyScore : 0 };
  });

  const activeVocabularyOrder = vocabularyOrder.filter(
    (index) => vocabulary[index].difficulty === difficulty,
  );
  const activeListeningOrder = listeningOrder.filter(
    (index) => listeningExercises[index].difficulty === difficulty,
  );
  const activeReadingOrder = readingOrder.filter(
    (index) => readingExercises[index].difficulty === difficulty,
  );
  const activeWritingOrder = writingOrder.filter(
    (index) => writingDifficulties[index] === difficulty,
  );
  const activeSpeakingOrder = speakingOrder.filter(
    (index) => speakingDifficulties[index] === difficulty,
  );
  const word = vocabulary[activeVocabularyOrder[wordIndex % activeVocabularyOrder.length]];
  const score = progress.score;
  const todayPoints = progress.attempts
    .filter((attempt) => attempt.correct && isToday(attempt.completedAt))
    .reduce((total, attempt) => total + (attempt.area === 'speaking' || attempt.area === 'writing' ? 5 : 10), 0);
  const dailyGoal = 50;
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
      completeExercise('vocabulary', word.swedish, 10);
    } else {
      completeExercise('vocabulary', word.swedish);
      setFeedback(`Oikea vastaus on: ${word.finnish}`);
    }
  }

  function nextWord() {
    setWordIndex((current) => (current + 1) % activeVocabularyOrder.length);
    setAnswer('');
    setFeedback('');
  }

  function changeDifficulty(direction: -1 | 1) {
    setDifficulty((current) => {
      const currentIndex = difficulties.indexOf(current);
      return difficulties[Math.max(0, Math.min(difficulties.length - 1, currentIndex + direction))];
    });
    setExerciseIndex(0);
    setWordIndex(0);
    setFeedback('');
    setResponse('');
  }

  function renderDifficultyControl() {
    const difficultyIndex = difficulties.indexOf(difficulty);
    return (
      <div className="difficulty-control" aria-label="Valitse vaikeustaso">
        <button
          className="difficulty-button"
          onClick={() => changeDifficulty(-1)}
          disabled={difficultyIndex === 0}
          aria-label="Helpompi vaikeustaso"
        >
          -
        </button>
        <span className={`difficulty-label difficulty-${difficulty}`}>
          {difficultyLabels[difficulty]}
        </span>
        <button
          className="difficulty-button"
          onClick={() => changeDifficulty(1)}
          disabled={difficultyIndex === difficulties.length - 1}
          aria-label="Vaikeampi vaikeustaso"
        >
          +
        </button>
      </div>
    );
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
    if (nextSection === 'vocabulary') setVocabularyOrder(shuffled(vocabulary.map((_, index) => index)));
    if (nextSection === 'listening') setListeningOrder(shuffled(listeningExercises.map((_, index) => index)));
    if (nextSection === 'reading') setReadingOrder(shuffled(readingExercises.map((_, index) => index)));
    if (nextSection === 'writing') setWritingOrder(shuffled(writingPrompts.map((_, index) => index)));
    if (nextSection === 'speaking') setSpeakingOrder(shuffled(speakingPrompts.map((_, index) => index)));
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
    recognition.interimResults = true;
    recognition.continuous = false;
    setResponse('');
    const startingResponse = '';
    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let index = 0; index < event.results.length; index += 1) {
        const transcript = event.results[index]?.[0]?.transcript ?? '';
        if (event.results[index]?.isFinal) {
          finalTranscript += `${transcript} `;
        } else {
          interimTranscript += transcript;
        }
      }

      const combinedTranscript = [startingResponse, finalTranscript.trim(), interimTranscript.trim()]
        .filter(Boolean)
        .join(' ');
      setResponse(combinedTranscript);
    };
    recognition.onerror = (event) => {
      const messages: Record<string, string> = {
        'not-allowed': 'Mikrofonin käyttö on estetty. Salli mikrofonin käyttö selaimen asetuksista.',
        'service-not-allowed': 'Tämä selain ei salli puheentunnistusta tässä PWA:ssa. Kokeile sivua Safarissa.',
        network: 'Selaimen puheentunnistuspalvelu ei ole käytettävissä tässä ympäristössä. Voit kirjoittaa vastauksen tekstikenttään.',
        'audio-capture': 'Mikrofonia ei löytynyt. Tarkista, että laitteessa on toimiva mikrofoni.',
        'no-speech': 'Puhetta ei kuultu. Puhu hieman lähempänä mikrofonia ja yritä uudelleen.',
      };
      setSpeechError(messages[event.error ?? ''] ?? 'Puheentunnistus ei onnistunut. Kokeile uudelleen Safarissa.');
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    setSpeechError('');
    setIsListening(true);
    try {
      recognition.start();
    } catch {
      setIsListening(false);
      setSpeechError('Puheentunnistusta ei voitu käynnistää. Sulje toinen mahdollinen mikrofonia käyttävä toiminto ja yritä uudelleen.');
    }
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
    setResponse('');
  }

  function checkSpeakingResponse() {
    if (feedback) return;
    if (!response.trim()) {
      setFeedback('Puhu ensin vastaus tai kirjoita se tekstikenttään.');
      return;
    }

    const task = speakingPrompts[activeSpeakingOrder[exerciseIndex % activeSpeakingOrder.length]];
    const normalizedResponse = normalize(response);
    const missingKeywords = task.keywords.filter(
      (keyword) => !normalizedResponse.includes(normalize(keyword)),
    );

    if (missingKeywords.length === 0) {
      completeExercise('speaking', String(task.id), 5);
      setFeedback('Hyvä! Vastauksessa ovat mukana tehtävän tärkeät käsitteet. +5 pistettä');
    } else {
      completeExercise('speaking', String(task.id));
      setFeedback(`Hyvä alku. Yritä mainita vielä: ${missingKeywords.join(', ')}`);
    }
  }

  const listening = listeningExercises[activeListeningOrder[exerciseIndex % activeListeningOrder.length]];
  const reading = readingExercises[activeReadingOrder[exerciseIndex % activeReadingOrder.length]];
  const currentWritingIndex = activeWritingOrder[exerciseIndex % activeWritingOrder.length];
  const currentSpeakingIndex = activeSpeakingOrder[exerciseIndex % activeSpeakingOrder.length];

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
            <p>Valitse valikosta osa-alue ja harjoittele 15 minuuttia. Lisäharjoitteluun <a href={vocabularySource.url} target="_blank" rel="noreferrer">Ylen YKI-materiaalia</a></p>

            <div className="daily-score" aria-label={`Tänään saadut pisteet: ${todayPoints}`}>
              <div className="area-header">
                <span>Tämän päivän pisteet</span>
                <strong>{todayPoints} / {dailyGoal}</strong>
              </div>
              <progress value={Math.min(todayPoints, dailyGoal)} max={dailyGoal} />
              <p className="hint">Tavoite: {dailyGoal} pistettä</p>
            </div>
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
          <p>Sana {wordIndex + 1} / {activeVocabularyOrder.length}</p>
          <h2>{word.swedish}</h2>
          <p><em>{word.example}</em></p>
          <label htmlFor="answer">Mitä sana tarkoittaa suomeksi?</label>
          <input id="answer" value={answer} onChange={(event) => setAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') checkAnswer(); }} placeholder="Kirjoita vastaus" autoFocus />
          <div className="actions"><button onClick={checkAnswer}>Tarkista</button><button className="secondary" onClick={nextWord}>Seuraava</button></div>
          {feedback && <p><strong>{feedback}</strong></p>}
          {renderDifficultyControl()}
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
          <button className="secondary" onClick={() => nextExercise(activeListeningOrder.length)}>Seuraava harjoitus</button>
          {renderDifficultyControl()}
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
          <button className="secondary" onClick={() => nextExercise(activeReadingOrder.length)}>Seuraava harjoitus</button>
          {renderDifficultyControl()}
        </section>
      );
    }

    const prompts = section === 'writing' ? writingPrompts : speakingPrompts;
    const prompt = section === 'writing'
      ? writingPrompts[currentWritingIndex]
      : speakingPrompts[currentSpeakingIndex].prompt;
    const currentDifficulty = section === 'writing'
      ? writingDifficulties[currentWritingIndex]
      : speakingDifficulties[currentSpeakingIndex];
    const activePromptOrder = section === 'writing' ? activeWritingOrder : activeSpeakingOrder;
    return (
      <section className="card">
        <div className="area-header"><span>{section === 'writing' ? 'Kirjoittaminen' : 'Puhuminen'}</span><strong>Pisteet: {score}</strong></div>
        <h2>{section === 'writing' ? 'Kirjoitustehtävä' : 'Puhumistehtävä'}</h2>
        <p>{prompt}</p>
        <p className="difficulty">Vaikeustaso: {currentDifficulty === 'easy' ? 'Perustaso' : currentDifficulty === 'medium' ? 'Keskitaso' : 'Haastava'}</p>
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
          if (section === 'speaking') {
            checkSpeakingResponse();
          } else {
            completeExercise('writing', String(currentWritingIndex), 5);
            setFeedback('Tehtävä merkitty harjoitelluksi!');
          }
        }}>{section === 'speaking' ? 'Tarkista puheenvuoro' : 'Merkitse tehdyksi'}</button>
        <button className="secondary next-button" onClick={() => nextExercise(activePromptOrder.length)}>Seuraava tehtävä</button>
        {feedback && <p><strong>{feedback}</strong></p>}
        {renderDifficultyControl()}
      </section>
    );
  }

  return (
    <main className="app">
      <header>
        <p className="eyebrow"></p>
        <h1>YKI-valmentaja</h1>
        
      
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