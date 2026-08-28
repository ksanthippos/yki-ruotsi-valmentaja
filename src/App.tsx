import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { vocabulary, vocabularySource, VocabularyItem } from './data/vocabulary';
import {
  listeningExercises,
  readingExercises,
  speakingPrompts,
  writingPrompts,
} from './data/learningMaterials';
import { createEmptyProgress, getUserProgress, saveUserProgress } from './services/storage';
import { assessReadiness } from './services/assessment';
import { Difficulty, ProgressArea, Topic, UserProgress } from './types';
import { APP_VERSION } from './version';

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
type PrimaryView = 'home' | 'practice' | 'history' | 'dictionary';
type DictionaryDirection = 'fi-sv' | 'sv-fi';

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

const topicLabels: Record<Topic, string> = {
  general: 'Yleinen ruotsi ja arki',
  school: 'Koulumaailma',
  stem: 'Matematiikka ja fysiikka',
};

export default function App() {
  const [wordIndex, setWordIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [section, setSection] = useState<Section>('home');
  const [primaryView, setPrimaryView] = useState<PrimaryView>('home');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [showListeningText, setShowListeningText] = useState(false);
  const [showAttemptHistory, setShowAttemptHistory] = useState(false);
  const [response, setResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [topic, setTopic] = useState<Topic>('general');
  const [dictionaryQuery, setDictionaryQuery] = useState('');
  const [dictionaryDirection, setDictionaryDirection] = useState<DictionaryDirection>('fi-sv');
  const [dictionaryResult, setDictionaryResult] = useState<VocabularyItem | null>(null);
  const [dictionaryMessage, setDictionaryMessage] = useState('');
  const [backupMessage, setBackupMessage] = useState('');
  const importInputRef = useRef<HTMLInputElement | null>(null);
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
    (index) => vocabulary[index].difficulty === difficulty && vocabulary[index].topic === topic,
  );
  const activeListeningOrder = listeningOrder.filter(
    (index) => listeningExercises[index].difficulty === difficulty && listeningExercises[index].topic === topic,
  );
  const activeReadingOrder = readingOrder.filter(
    (index) => readingExercises[index].difficulty === difficulty && readingExercises[index].topic === topic,
  );
  const activeWritingOrder = writingOrder.filter(
    (index) => writingPrompts[index].difficulty === difficulty && writingPrompts[index].topic === topic,
  );
  const activeSpeakingOrder = speakingOrder.filter(
    (index) => speakingPrompts[index].difficulty === difficulty && speakingPrompts[index].topic === topic,
  );
  const word = vocabulary[activeVocabularyOrder[wordIndex % Math.max(activeVocabularyOrder.length, 1)]] ?? vocabulary[0];
  const score = progress.score;
  const todayPoints = progress.attempts
    .filter((attempt) => attempt.correct && isToday(attempt.completedAt))
    .reduce((total, attempt) => total + attempt.points, 0);
  const dailyGoal = 50;
  const readiness = assessReadiness(progress, areaTotals);

  useEffect(() => {
    saveUserProgress(progress);
    localStorage.setItem('yki-score', String(progress.score));
  }, [progress]);

  function exportProgress() {
    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      progress,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `yki-ruotsi-progressio-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setBackupMessage('Progressio ladattu JSON-tiedostona. Tallenna se iCloud Driveen.');
  }

  function importProgress(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const backup = JSON.parse(String(reader.result)) as {
          version?: number;
          progress?: Partial<UserProgress>;
        };
        const imported = backup.progress;
        const validAreas = ['vocabulary', 'listening', 'reading', 'writing', 'speaking'] as const;
        const valid = backup.version === 1
          && imported
          && typeof imported.score === 'number'
          && imported.completed
          && validAreas.every((area) => Array.isArray(imported.completed?.[area]))
          && Array.isArray(imported.attempts);

        if (!valid) throw new Error('Invalid progress backup');
        if (!window.confirm('Korvataanko nykyinen progressio tuodulla tiedostolla?')) return;

        setProgress({
          score: imported.score as number,
          completed: validAreas.reduce((completed, area) => ({
            ...completed,
            [area]: imported.completed?.[area]?.filter((id): id is string => typeof id === 'string') ?? [],
          }), {} as UserProgress['completed']),
          attempts: (imported.attempts ?? []).filter((attempt) => (
            attempt && typeof attempt === 'object'
          )) as UserProgress['attempts'],
        });
        setBackupMessage('Progressio tuotu onnistuneesti.');
      } catch {
        setBackupMessage('Tiedostoa ei voitu tuoda. Valitse YKI-sovelluksen JSON-varmuuskopio.');
      }
    };
    reader.onerror = () => setBackupMessage('Tiedoston lukeminen epäonnistui. Yritä uudelleen.');
    reader.readAsText(file);
  }

  function completeExercise(area: ProgressArea, id: string, points = 0) {
    setProgress((current) => {
      const completed = current.completed[area];
      const alreadyCompleted = completed.includes(id);
      const awardedPoints = alreadyCompleted ? 0 : points;
      return {
        score: current.score + awardedPoints,
        completed: alreadyCompleted
          ? current.completed
          : { ...current.completed, [area]: [...completed, id] },
        attempts: [
          ...current.attempts,
          {
            area,
            id,
            correct: points > 0,
            points: awardedPoints,
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

  function changeTopic(nextTopic: Topic) {
    setTopic(nextTopic);
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
    setPrimaryView(nextSection === 'home' ? 'home' : 'practice');
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

  function selectPrimaryView(view: PrimaryView) {
    setPrimaryView(view);
    if (view === 'home') setSection('home');
    if (view === 'practice' && section === 'home') setSection('vocabulary');
  }

  function searchDictionary(queryOverride?: string) {
    const query = normalize(queryOverride ?? dictionaryQuery);
    if (!query) {
      setDictionaryResult(null);
      setDictionaryMessage('Kirjoita ensin sana, jonka haluat kääntää.');
      return;
    }

    const result = vocabulary.find((item) => normalize(
      dictionaryDirection === 'fi-sv' ? item.finnish : item.swedish,
    ) === query);
    setDictionaryResult(result ?? null);
    setDictionaryMessage(result ? '' : 'Sanaa ei löytynyt tämänhetkisestä sanastosta.');
  }

  function translateDictionaryQuery() {
    searchDictionary();
    setDictionaryQuery('');
  }

  function toggleDictionaryDirection() {
    setDictionaryDirection((current) => current === 'fi-sv' ? 'sv-fi' : 'fi-sv');
    setDictionaryResult(null);
    setDictionaryMessage('');
  }

  function startDictionarySpeech() {
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      setDictionaryMessage('Tämä selain ei tue puheentunnistusta. Kirjoita sana kenttään.');
      return;
    }

    const recognition = new Recognition();
    recognition.lang = dictionaryDirection === 'fi-sv' ? 'fi-FI' : 'sv-SE';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) => (
        event.results[index]?.[0]?.transcript ?? ''
      )).join(' ').trim();
      setDictionaryQuery(transcript);
      if (event.results[event.results.length - 1]?.isFinal) {
        searchDictionary(transcript);
      }
    };
    recognition.onerror = () => setDictionaryMessage('Puheentunnistus ei onnistunut. Kirjoita sana kenttään.');
    try {
      recognition.start();
    } catch {
      setDictionaryMessage('Puheentunnistusta ei voitu käynnistää. Yritä uudelleen.');
    }
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

  const listening = listeningExercises[activeListeningOrder[exerciseIndex % Math.max(activeListeningOrder.length, 1)]] ?? listeningExercises[0];
  const reading = readingExercises[activeReadingOrder[exerciseIndex % Math.max(activeReadingOrder.length, 1)]] ?? readingExercises[0];
  const currentWritingIndex = activeWritingOrder[exerciseIndex % Math.max(activeWritingOrder.length, 1)] ?? 0;
  const currentSpeakingIndex = activeSpeakingOrder[exerciseIndex % Math.max(activeSpeakingOrder.length, 1)] ?? 0;

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

  function attemptTitle(attempt: UserProgress['attempts'][number]) {
    if (attempt.area === 'vocabulary') return vocabulary.find((item) => item.swedish === attempt.id)?.swedish ?? attempt.id;
    if (attempt.area === 'listening') return listeningExercises.find((item) => String(item.id) === attempt.id)?.question ?? `Tehtävä ${attempt.id}`;
    if (attempt.area === 'reading') return readingExercises.find((item) => String(item.id) === attempt.id)?.title ?? `Tehtävä ${attempt.id}`;
    if (attempt.area === 'writing') return writingPrompts[Number(attempt.id)]?.prompt ?? `Tehtävä ${attempt.id}`;
    return speakingPrompts.find((item) => String(item.id) === attempt.id)?.prompt ?? `Tehtävä ${attempt.id}`;
  }

  function renderHistory() {
    return (
      <section className="card history-view">
        <div className="area-header">
          <span>Harjoitushistoria</span>
          <strong>{progress.attempts.length} suoritusta</strong>
        </div>
        {progress.attempts.length === 0 ? (
          <p>Tehdyt tehtävät näkyvät tässä.</p>
        ) : (
          <div className="history-list">
            {[...progress.attempts].reverse().map((attempt, index) => (
              <article className="history-item" key={`${attempt.completedAt}-${index}`}>
                <div>
                  <strong>{areaLabels[attempt.area]}</strong>
                  <p>{attemptTitle(attempt)}</p>
                </div>
                <div className="history-result">
                  <strong>{attempt.points} p</strong>
                  <span>{new Date(attempt.completedAt).toLocaleString('fi-FI')}</span>
                  <span className={attempt.correct ? 'correct' : 'incorrect'}>
                    {attempt.correct ? 'Oikein' : 'Harjoiteltu'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  function renderSection() {
    if (primaryView === 'history') return renderHistory();
    if (primaryView === 'dictionary') {
      return (
        <section className="card dictionary-view">
          <div className="area-header">
            <span>Sanakirja</span>
            <strong>{dictionaryDirection === 'fi-sv' ? 'Suomi → ruotsi' : 'Ruotsi → suomi'}</strong>
          </div>
          <div className="dictionary-direction">
            <span>{dictionaryDirection === 'fi-sv' ? 'Suomi' : 'Ruotsi'}</span>
            <button className="secondary" onClick={toggleDictionaryDirection} aria-label="Vaihda käännössuunta">⇄</button>
            <span>{dictionaryDirection === 'fi-sv' ? 'Ruotsi' : 'Suomi'}</span>
          </div>
          <div className="dictionary-input-row">
            <input
              value={dictionaryQuery}
              onChange={(event) => setDictionaryQuery(event.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter') translateDictionaryQuery(); }}
              placeholder={dictionaryDirection === 'fi-sv' ? 'Kirjoita sana suomeksi' : 'Kirjoita sana ruotsiksi'}
              aria-label="Haettava sana"
              autoFocus
            />
            <button onClick={startDictionarySpeech} aria-label="Sanele haettava sana">🎙️</button>
            <button onClick={translateDictionaryQuery}>Käännä</button>
          </div>
          {dictionaryResult && (
            <div className="dictionary-result">
              <p className="hint">{dictionaryDirection === 'fi-sv' ? dictionaryResult.finnish : dictionaryResult.swedish}</p>
              <h2>{dictionaryDirection === 'fi-sv' ? dictionaryResult.swedish : dictionaryResult.finnish}</h2>
              {dictionaryDirection === 'fi-sv' && (
                <button className="secondary" onClick={() => speak(dictionaryResult.swedish)}>🔊 Kuuntele ruotsiksi</button>
              )}
              <p><em>{dictionaryResult.example}</em></p>
            </div>
          )}
          {dictionaryMessage && <p className="hint" role="status">{dictionaryMessage}</p>}
          <p className="hint">Sanakirja hakee tällä hetkellä sovelluksen omasta harjoitussanastosta.</p>
        </section>
      );
    }

    if (section === 'home') {
      return (
        <>
          <section className="card">
            <h2>Tämän päivän harjoittelu</h2>
            <p>Valitse valikosta osa-alue ja harjoittele 15 minuuttia. Lisäharjoitteluun <a href={vocabularySource.url} target="_blank" rel="noreferrer">Ylen YKI-materiaalia</a></p>
            <div className="topic-picker">
              <strong>Harjoittelun aihe</strong>
              <div className="topic-options" role="group" aria-label="Valitse harjoittelun aihe">
                {(Object.keys(topicLabels) as Topic[]).map((option) => (
                  <button
                    key={option}
                    className={topic === option ? 'topic-option active' : 'topic-option'}
                    onClick={() => changeTopic(option)}
                    aria-pressed={topic === option}
                  >
                    {topicLabels[option]}
                  </button>
                ))}
              </div>
            </div>

            <div className="daily-score" aria-label={`Tänään saadut pisteet: ${todayPoints}`}>
              <div className="area-header">
                <span>Tämän päivän pisteet</span>
                <strong>{todayPoints} / {dailyGoal}</strong>
              </div>
              <progress value={Math.min(todayPoints, dailyGoal)} max={dailyGoal} />
              <p className="hint">Tavoite: {dailyGoal} pistettä</p>
            </div>
            <div className="backup-actions">
              <button className="secondary" onClick={exportProgress}>Vie progressio</button>
              <button className="secondary" onClick={() => importInputRef.current?.click()}>Tuo progressio</button>
              <input
                ref={importInputRef}
                className="visually-hidden"
                type="file"
                accept="application/json,.json"
                onChange={importProgress}
                aria-label="Valitse progressiotiedosto"
              />
            </div>
            {backupMessage && <p className="hint" role="status">{backupMessage}</p>}
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

    const activeCount = section === 'vocabulary'
      ? activeVocabularyOrder.length
      : section === 'listening'
        ? activeListeningOrder.length
        : section === 'reading'
          ? activeReadingOrder.length
          : section === 'writing'
            ? activeWritingOrder.length
            : activeSpeakingOrder.length;

    if (activeCount === 0) {
      return (
        <section className="card empty-state">
          <h2>Ei tehtäviä tällä valinnalla</h2>
          <p>Vaihda aihetta tai vaikeustasoa nähdäksesi sopivia tehtäviä.</p>
          {renderDifficultyControl()}
        </section>
      );
    }

    if (section === 'vocabulary') {
      return (
        <section className="card">
          <div className="area-header"><span>{word.category}</span><strong>Pisteet: {score}</strong></div>
          <p>Sana {wordIndex + 1} / {activeVocabularyOrder.length}</p>
          <p className="topic-tag">{topicLabels[word.topic]}</p>
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
          <p className="topic-tag">{topicLabels[listening.topic]}</p>
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
          <p className="topic-tag">{topicLabels[reading.topic]}</p>
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
    const activePromptOrder = section === 'writing' ? activeWritingOrder : activeSpeakingOrder;
    return (
      <section className="card">
        <div className="area-header"><span>{section === 'writing' ? 'Kirjoittaminen' : 'Puhuminen'}</span><strong>Pisteet: {score}</strong></div>
        <h2>{section === 'writing' ? 'Kirjoitustehtävä' : 'Puhumistehtävä'}</h2>
        <p>{typeof prompt === 'string' ? prompt : prompt.prompt}</p>
        <p className="topic-tag">{topicLabels[section === 'writing' ? writingPrompts[currentWritingIndex].topic : speakingPrompts[currentSpeakingIndex].topic]}</p>
        <p className="difficulty">Vaikeustaso: {difficultyLabels[section === 'writing' ? writingPrompts[currentWritingIndex].difficulty : speakingPrompts[currentSpeakingIndex].difficulty]}</p>
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
        <p className="app-version">Versio {APP_VERSION}</p>
        <p className="eyebrow"></p>
        <h1>YKI-valmentaja</h1>
        
      
      </header>
      {primaryView === 'practice' && (
        <nav className="menu" aria-label="Harjoitusosiot">
          {menuItems.slice(1).map((item) => (
            <button className={section === item.id ? 'menu-item active' : 'menu-item'} key={item.id} onClick={() => selectSection(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
      )}
      {renderSection()}
      <nav className="bottom-nav" aria-label="Päänäkymät">
        <button className={primaryView === 'home' ? 'bottom-nav-item active' : 'bottom-nav-item'} onClick={() => selectPrimaryView('home')}>
          <span aria-hidden="true">⌂</span>
          <span>Koti</span>
        </button>
        <button className={primaryView === 'practice' ? 'bottom-nav-item active' : 'bottom-nav-item'} onClick={() => selectPrimaryView('practice')}>
          <span aria-hidden="true">✓</span>
          <span>Harjoitukset</span>
        </button>
        <button className={primaryView === 'history' ? 'bottom-nav-item active' : 'bottom-nav-item'} onClick={() => selectPrimaryView('history')}>
          <span aria-hidden="true">▤</span>
          <span>Historia</span>
        </button>
        <button className={primaryView === 'dictionary' ? 'bottom-nav-item active' : 'bottom-nav-item'} onClick={() => selectPrimaryView('dictionary')}>
          <span aria-hidden="true">Aa</span>
          <span>Sanakirja</span>
        </button>
      </nav>
    </main>
  );
}