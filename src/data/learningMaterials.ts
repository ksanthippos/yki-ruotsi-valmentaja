import { Difficulty } from '../types';

export type ListeningExercise = {
  id: number;
  text: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: Difficulty;
};

export type ReadingExercise = {
  id: number;
  title: string;
  text: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: Difficulty;
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
  {
    id: 5,
    text: 'Lektionen börjar om tio minuter. Öppna boken på sidan tjugo och arbeta tillsammans i par.',
    question: 'Vad ska eleverna göra?',
    options: ['Arbeta ensamma', 'Arbeta i par', 'Gå hem direkt'],
    answer: 'Arbeta i par',
    difficulty: 'easy',
  },
  {
    id: 6,
    text: 'Resultatet blev annorlunda än vi trodde. Därför måste vi kontrollera mätningen och diskutera möjliga felkällor.',
    question: 'Vad måste klassen göra?',
    options: ['Kontrollera mätningen', 'Byta skola', 'Avsluta kursen'],
    answer: 'Kontrollera mätningen',
    difficulty: 'hard',
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
  {
    id: 5,
    title: 'En förändrad lektion',
    text: 'Läraren planerade en laboration, men flera elever glömde sina skyddsglasögon. Därför arbetar klassen med teori först och gör laborationen nästa vecka.',
    question: 'Varför ändras lektionens plan?',
    options: ['Eleverna glömde skyddsglasögonen', 'Läraren är sjuk', 'Laborationen är redan klar'],
    answer: 'Eleverna glömde skyddsglasögonen',
    difficulty: 'hard',
  },
  {
    id: 6,
    title: 'Information om en utbildning',
    text: 'Kursen börjar i september och passar personer som vill utveckla sin svenska i arbetslivet. Undervisningen hålls två kvällar i veckan.',
    question: 'När hålls undervisningen?',
    options: ['Varje morgon', 'Två kvällar i veckan', 'Bara på lördagar'],
    answer: 'Två kvällar i veckan',
    difficulty: 'medium',
  },
];

export const writingPrompts = [
  'Skriv ett kort meddelande till en elev och förklara hur man lämnar in en uppgift.',
  'Beskriv ett enkelt experiment och skriv vilka resultat du förväntar dig.',
  'Skriv varför matematik är viktigt i vardagen.',
  'Skriv ett meddelande till vårdcentralen och be om en ny tid.',
  'Skriv en kort ansökan till en kurs eller ett arbete.',
  'Skriv ett kort meddelande till läraren och förklara varför du behöver mer tid för uppgiften.',
  'Skriv vad du tycker att arbetsplatsen kan göra för att förbättra välmåendet.',
];

export const writingDifficulties = ['easy', 'medium', 'medium', 'medium', 'hard', 'medium', 'hard'] as const;

export type SpeakingPrompt = {
  id: number;
  prompt: string;
  keywords: string[];
};

export const speakingPrompts: SpeakingPrompt[] = [
  {
    id: 1,
    prompt: 'Selitä ruotsiksi oppilaalle, miten yksinkertainen yhtälö ratkaistaan.',
    keywords: ['ekvation', 'lösa'],
  },
  {
    id: 2,
    prompt: 'Kerro ruotsiksi fysiikan oppitunnista, jonka haluaisit pitää.',
    keywords: ['fysiklektion', 'elever'],
  },
  {
    id: 3,
    prompt: 'Kuvaile ruotsiksi, miten annat rakentavaa palautetta oppilaan vastauksesta.',
    keywords: ['respons', 'svar'],
  },
  {
    id: 4,
    prompt: 'Kerro ruotsiksi, miten varaat ajan tai hoidat muun arkisen asian.',
    keywords: ['boka', 'tid'],
  },
  {
    id: 5,
    prompt: 'Ilmaise ruotsiksi mielipiteesi siitä, miten koulu voi tukea oppilaiden hyvinvointia.',
    keywords: ['åsikt', 'skolan', 'välmående'],
  },
  {
    id: 6,
    prompt: 'Kerro ruotsiksi, mitä teet, jos et ymmärrä opettajan ohjetta.',
    keywords: ['förstår', 'fråga'],
  },
  {
    id: 7,
    prompt: 'Selitä ruotsiksi, miten oppilaat työskentelevät yhdessä laboratoriossa.',
    keywords: ['elever', 'tillsammans', 'laboratorium'],
  },
  {
    id: 8,
    prompt: 'Käännä tämä lause ruotsiksi: Minä opetan matematiikkaa.',
    keywords: ['undervisar', 'matematik'],
  },
  {
    id: 9,
    prompt: 'Käännä tämä lause ruotsiksi: Oppilaat työskentelevät pareittain.',
    keywords: ['eleverna', 'par'],
  },
  {
    id: 10,
    prompt: 'Käännä tämä lause ruotsiksi: Voitko selittää tämän tehtävän?',
    keywords: ['förklara', 'uppgiften'],
  },
  {
    id: 11,
    prompt: 'Käännä tämä lause ruotsiksi: Meidän täytyy tarkistaa mittaus.',
    keywords: ['måste', 'kontrollera', 'mätningen'],
  },
  {
    id: 12,
    prompt: 'Käännä tämä lause ruotsiksi: Varaa aika lääkärille, jos tarvitset apua.',
    keywords: ['boka', 'tid', 'läkaren'],
  },
  {
    id: 13,
    prompt: 'Käännä tämä lause ruotsiksi: Lähetin hakemuksen ennen määräaikaa.',
    keywords: ['skickade', 'ansökan', 'sista'],
  },
  {
    id: 14,
    prompt: 'Käännä tämä lause ruotsiksi: Selitä, miten päädyit tähän tulokseen.',
    keywords: ['förklara', 'kom', 'resultatet'],
  },
  {
    id: 15,
    prompt: 'Käännä tämä lause ruotsiksi: Vaikka tulos oli odottamaton, hypoteesi oli perusteltu.',
    keywords: ['även', 'resultatet', 'oväntat', 'hypotes'],
  },
  {
    id: 16,
    prompt: 'Käännä tämä lause ruotsiksi: Jos en ymmärrä ohjetta, pyydän opettajaa selittämään sen uudelleen.',
    keywords: ['förstår', 'instruktionen', 'ber', 'förklara'],
  },
  {
    id: 17,
    prompt: 'Käännä tämä lause ruotsiksi: Oppilaiden pitäisi verrata tuloksia ja keskustella mahdollisista virhelähteistä.',
    keywords: ['eleverna', 'jämföra', 'resultaten', 'felkällor'],
  },
];

export const speakingDifficulties = [
  'hard', 'hard', 'hard', 'medium', 'hard', 'medium', 'hard',
  'easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard', 'hard',
] as const;
