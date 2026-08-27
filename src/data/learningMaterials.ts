export type ListeningExercise = {
  id: number;
  text: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type ReadingExercise = {
  id: number;
  title: string;
  text: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export const listeningExercises: ListeningExercise[] = [
  {
    id: 1,
    text: 'I dag undersöker vi hur en pendel rör sig.',
    question: 'Vad undersöker klassen?',
    options: ['En pendel', 'En ekvation', 'En karta'],
    answer: 'En pendel',
    difficulty: 'easy',
  },
  {
    id: 2,
    text: 'Skriv ner formeln och förklara hur du kom fram till svaret.',
    question: 'Vad ska eleven göra?',
    options: ['Rita en karta', 'Skriva ner formeln och förklara svaret', 'Läsa en bok'],
    answer: 'Skriva ner formeln och förklara svaret',
    difficulty: 'medium',
  },
  {
    id: 3,
    text: 'Vårdcentralen öppnar klockan åtta. Du kan boka en tid via telefon eller på nätet.',
    question: 'Hur kan man boka en tid?',
    options: ['Bara på kvällen', 'Via telefon eller på nätet', 'Genom att skriva ett brev'],
    answer: 'Via telefon eller på nätet',
    difficulty: 'medium',
  },
  {
    id: 4,
    text: 'På fredag har vi en arbetsintervju. Ta med ditt CV och kom tio minuter tidigare.',
    question: 'Vad ska personen ta med?',
    options: ['En lärobok', 'Ett CV', 'En biljett'],
    answer: 'Ett CV',
    difficulty: 'easy',
  },
];

export const readingExercises: ReadingExercise[] = [
  {
    id: 1,
    title: 'En laboration i fysik',
    text: 'Eleverna mäter temperaturen på vattnet. De skriver resultaten i en tabell och jämför dem med sin hypotes.',
    question: 'Vad gör eleverna med resultaten?',
    options: ['De skriver dem i en tabell', 'De kastar bort dem', 'De ritar en karta'],
    answer: 'De skriver dem i en tabell',
    difficulty: 'easy',
  },
  {
    id: 2,
    title: 'Samarbete i klassrummet',
    text: 'Eleverna arbetar i par. Den ena löser uppgiften och den andra ställer frågor. Sedan byter de roller.',
    question: 'Hur arbetar eleverna?',
    options: ['Ensamma', 'I par och med olika roller', 'Bara hemma'],
    answer: 'I par och med olika roller',
    difficulty: 'medium',
  },
  {
    id: 3,
    title: 'Ett meddelande från vårdcentralen',
    text: 'Vårdcentralen påminner patienterna om att avboka tiden om de inte kan komma. På så sätt får någon annan möjlighet att träffa läkaren.',
    question: 'Varför ska man avboka en tid?',
    options: ['För att någon annan ska kunna få tiden', 'För att läkaren ska sluta arbeta', 'För att boka en semester'],
    answer: 'För att någon annan ska kunna få tiden',
    difficulty: 'hard',
  },
  {
    id: 4,
    title: 'Ansökan till en kurs',
    text: 'Mikael vill gå en kvällskurs i svenska. Han fyller i ansökan på nätet och skickar den före den sista ansökningsdagen.',
    question: 'Hur skickar Mikael sin ansökan?',
    options: ['På nätet', 'Med fax', 'Muntligt i klassrummet'],
    answer: 'På nätet',
    difficulty: 'medium',
  },
];

export const writingPrompts = [
  'Skriv ett kort meddelande till en elev och förklara hur man lämnar in en uppgift.',
  'Beskriv ett enkelt experiment och skriv vilka resultat du förväntar dig.',
  'Skriv varför matematik är viktigt i vardagen.',
  'Skriv ett meddelande till vårdcentralen och be om en ny tid.',
  'Skriv en kort ansökan till en kurs eller ett arbete.',
];

export const writingDifficulties = ['easy', 'medium', 'medium', 'medium', 'hard'] as const;

export const speakingPrompts = [
  'Förklara för en elev hur man löser en enkel ekvation.',
  'Berätta om en fysiklektion som du skulle vilja hålla.',
  'Beskriv hur du ger konstruktiv respons på en elevs svar.',
  'Berätta hur du bokar en tid eller sköter ett annat vardagsärende.',
  'Uttryck din åsikt om hur skolan kan stödja elevernas välmående.',
];

export const speakingDifficulties = ['medium', 'medium', 'hard', 'easy', 'hard'] as const;
