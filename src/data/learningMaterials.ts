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
];

export const writingPrompts = [
  'Skriv ett kort meddelande till en elev och förklara hur man lämnar in en uppgift.',
  'Beskriv ett enkelt experiment och skriv vilka resultat du förväntar dig.',
  'Skriv varför matematik är viktigt i vardagen.',
];

export const speakingPrompts = [
  'Förklara för en elev hur man löser en enkel ekvation.',
  'Berätta om en fysiklektion som du skulle vilja hålla.',
  'Beskriv hur du ger konstruktiv respons på en elevs svar.',
];
