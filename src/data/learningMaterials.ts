import { Difficulty, Topic } from '../types';

export type ListeningExercise = {
  id: number;
  text: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: Difficulty;
  topic: Topic;
};

export type ReadingExercise = {
  id: number;
  title: string;
  text: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: Difficulty;
  topic: Topic;
};

export const listeningExercises: ListeningExercise[] = [
  { id: 1, text: 'I dag undersöker vi hur en pendel rör sig.', question: 'Vad undersöker klassen?', options: ['En pendel', 'En ekvation', 'En karta'], answer: 'En pendel', difficulty: 'easy', topic: 'stem' },
  { id: 2, text: 'Skriv ner formeln och förklara hur du kom fram till svaret.', question: 'Vad ska eleven göra?', options: ['Rita en karta', 'Skriva ner formeln och förklara svaret', 'Läsa en bok'], answer: 'Skriva ner formeln och förklara svaret', difficulty: 'medium', topic: 'school' },
  { id: 3, text: 'Vårdcentralen öppnar klockan åtta. Du kan boka en tid via telefon eller på nätet.', question: 'Hur kan man boka en tid?', options: ['Bara på kvällen', 'Via telefon eller på nätet', 'Genom att skriva ett brev'], answer: 'Via telefon eller på nätet', difficulty: 'medium', topic: 'general' },
  { id: 4, text: 'På fredag har vi en arbetsintervju. Ta med ditt CV och kom tio minuter tidigare.', question: 'Vad ska personen ta med?', options: ['En lärobok', 'Ett CV', 'En biljett'], answer: 'Ett CV', difficulty: 'easy', topic: 'general' },
  { id: 5, text: 'Lektionen börjar om tio minuter. Öppna boken på sidan tjugo och arbeta tillsammans i par.', question: 'Vad ska eleverna göra?', options: ['Arbeta ensamma', 'Arbeta i par', 'Gå hem direkt'], answer: 'Arbeta i par', difficulty: 'easy', topic: 'school' },
  { id: 6, text: 'Resultatet blev annorlunda än vi trodde. Därför måste vi kontrollera mätningen och diskutera möjliga felkällor.', question: 'Vad måste klassen göra?', options: ['Kontrollera mätningen', 'Byta skola', 'Avsluta kursen'], answer: 'Kontrollera mätningen', difficulty: 'hard', topic: 'stem' },
];

const listeningTemplates = [
  ['Bussen till skolan går klockan sju.', 'När går bussen?', ['Klockan sex', 'Klockan sju', 'Klockan åtta'], 'Klockan sju', 'school'],
  ['Jag har glömt min bok hemma och behöver låna en.', 'Vad behöver personen?', ['En penna', 'En bok', 'En biljett'], 'En bok', 'school'],
  ['Mötet börjar på biblioteket efter lunch.', 'Var börjar mötet?', ['På biblioteket', 'På stationen', 'I matsalen'], 'På biblioteket', 'general'],
  ['Kom ihåg att ta med regnkläder till utflykten.', 'Vad ska man ta med?', ['Regnkläder', 'Badkläder', 'En cykel'], 'Regnkläder', 'general'],
  ['Eleverna använder en linjal för att mäta sträckan.', 'Vad använder eleverna?', ['En våg', 'En linjal', 'En karta'], 'En linjal', 'stem'],
  ['Vattnet värms upp och temperaturen skrivs ned varje minut.', 'Vad skrivs ned?', ['Tiden', 'Temperaturen', 'Namnen'], 'Temperaturen', 'stem'],
  ['Du kan betala räkningen med kort eller banköverföring.', 'Hur kan man betala?', ['Med kort eller banköverföring', 'Bara kontant', 'Med en biljett'], 'Med kort eller banköverföring', 'general'],
  ['Läraren ber eleverna att läsa instruktionen noggrant.', 'Vad ska eleverna läsa?', ['En roman', 'Instruktionen', 'En tidning'], 'Instruktionen', 'school'],
  ['I experimentet jämför vi två olika material.', 'Vad jämför man?', ['Två material', 'Två lärare', 'Två skolor'], 'Två material', 'stem'],
  ['Kursen hålls på tisdagar och torsdagar.', 'När hålls kursen?', ['På helgen', 'På tisdagar och torsdagar', 'Varje morgon'], 'På tisdagar och torsdagar', 'general'],
  ['Arbetsintervjun tar ungefär en halvtimme.', 'Hur länge tar intervjun?', ['En halvtimme', 'En hel dag', 'Fem minuter'], 'En halvtimme', 'general'],
] as const;

listeningExercises.push(...Array.from({ length: 44 }, (_, index) => {
  const template = listeningTemplates[index % listeningTemplates.length];
  return {
    id: 7 + index,
    text: `${template[0]} Uppgift ${index + 1}.`,
    question: template[1],
    options: [...template[2]],
    answer: template[3],
    difficulty: (['easy', 'medium', 'hard'] as const)[index % 3],
    topic: template[4],
  };
}));

listeningExercises.push(
  { id: 51, text: 'Bussen är försenad eftersom det har varit en olycka på vägen.', question: 'Varför är bussen försenad?', options: ['På grund av en olycka', 'På grund av snö', 'På grund av ett möte'], answer: 'På grund av en olycka', difficulty: 'easy', topic: 'general' },
  { id: 52, text: 'Ta med en penna och ditt häfte till lektionen.', question: 'Vad ska eleven ta med?', options: ['En penna och ett häfte', 'En dator och en karta', 'En biljett och ett pass'], answer: 'En penna och ett häfte', difficulty: 'easy', topic: 'school' },
  { id: 53, text: 'Vi träffas utanför biblioteket klockan tre.', question: 'Var träffas personerna?', options: ['Utanför biblioteket', 'I klassrummet', 'På stationen'], answer: 'Utanför biblioteket', difficulty: 'easy', topic: 'school' },
  { id: 54, text: 'Läkaren rekommenderar att patienten vilar och dricker mycket vatten.', question: 'Vad rekommenderar läkaren?', options: ['Att vila och dricka vatten', 'Att börja träna hårt', 'Att byta bostad'], answer: 'Att vila och dricka vatten', difficulty: 'medium', topic: 'general' },
  { id: 55, text: 'Eleverna ska först läsa uppgiften och sedan diskutera svaret i gruppen.', question: 'Vad ska eleverna göra först?', options: ['Läsa uppgiften', 'Skriva ett prov', 'Gå till biblioteket'], answer: 'Läsa uppgiften', difficulty: 'medium', topic: 'school' },
  { id: 56, text: 'För att beräkna hastigheten delar vi sträckan med tiden.', question: 'Hur beräknar man hastigheten?', options: ['Genom att dela sträckan med tiden', 'Genom att multiplicera tiden med massan', 'Genom att mäta temperaturen'], answer: 'Genom att dela sträckan med tiden', difficulty: 'medium', topic: 'stem' },
  { id: 57, text: 'Mötet flyttas till nästa vecka eftersom flera deltagare är sjuka.', question: 'Varför flyttas mötet?', options: ['Flera deltagare är sjuka', 'Rummet är för stort', 'Det är helg'], answer: 'Flera deltagare är sjuka', difficulty: 'medium', topic: 'general' },
  { id: 58, text: 'Resultaten visar en tydlig skillnad mellan materialen, men mätningen måste upprepas.', question: 'Vad måste göras trots skillnaden?', options: ['Mätningen måste upprepas', 'Materialen måste kastas bort', 'Lektionen måste avslutas'], answer: 'Mätningen måste upprepas', difficulty: 'hard', topic: 'stem' },
  { id: 59, text: 'Läraren vill att eleverna motiverar sitt svar med ett exempel från texten.', question: 'Hur ska eleverna motivera svaret?', options: ['Med ett exempel från texten', 'Med en bild från hemmet', 'Utan motivering'], answer: 'Med ett exempel från texten', difficulty: 'hard', topic: 'school' },
  { id: 60, text: 'Om temperaturen fortsätter att sjunka kan vattnet frysa under natten.', question: 'Vad kan hända om temperaturen sjunker?', options: ['Vattnet kan frysa', 'Vattnet börjar koka', 'Tiden försvinner'], answer: 'Vattnet kan frysa', difficulty: 'hard', topic: 'stem' },
);

export const readingExercises: ReadingExercise[] = [
  { id: 1, title: 'En laboration i fysik', text: 'Eleverna mäter temperaturen på vattnet. De skriver resultaten i en tabell och jämför dem med sin hypotes.', question: 'Vad gör eleverna med resultaten?', options: ['De skriver dem i en tabell', 'De kastar bort dem', 'De ritar en karta'], answer: 'De skriver dem i en tabell', difficulty: 'easy', topic: 'stem' },
  { id: 2, title: 'Samarbete i klassrummet', text: 'Eleverna arbetar i par. Den ena löser uppgiften och den andra ställer frågor. Sedan byter de roller.', question: 'Hur arbetar eleverna?', options: ['Ensamma', 'I par och med olika roller', 'Bara hemma'], answer: 'I par och med olika roller', difficulty: 'medium', topic: 'school' },
  { id: 3, title: 'Ett meddelande från vårdcentralen', text: 'Vårdcentralen påminner patienterna om att avboka tiden om de inte kan komma. På så sätt får någon annan möjlighet att träffa läkaren.', question: 'Varför ska man avboka en tid?', options: ['För att någon annan ska kunna få tiden', 'För att läkaren ska sluta arbeta', 'För att boka en semester'], answer: 'För att någon annan ska kunna få tiden', difficulty: 'hard', topic: 'general' },
  { id: 4, title: 'Ansökan till en kurs', text: 'Mikael vill gå en kvällskurs i svenska. Han fyller i ansökan på nätet och skickar den före den sista ansökningsdagen.', question: 'Hur skickar Mikael sin ansökan?', options: ['På nätet', 'Med fax', 'Muntligt i klassrummet'], answer: 'På nätet', difficulty: 'medium', topic: 'general' },
  { id: 5, title: 'En förändrad lektion', text: 'Läraren planerade en laboration, men flera elever glömde sina skyddsglasögon. Därför arbetar klassen med teori först och gör laborationen nästa vecka.', question: 'Varför ändras lektionens plan?', options: ['Eleverna glömde skyddsglasögonen', 'Läraren är sjuk', 'Laborationen är redan klar'], answer: 'Eleverna glömde skyddsglasögonen', difficulty: 'hard', topic: 'stem' },
  { id: 6, title: 'Information om en utbildning', text: 'Kursen börjar i september och passar personer som vill utveckla sin svenska i arbetslivet. Undervisningen hålls två kvällar i veckan.', question: 'När hålls undervisningen?', options: ['Varje morgon', 'Två kvällar i veckan', 'Bara på lördagar'], answer: 'Två kvällar i veckan', difficulty: 'medium', topic: 'general' },
];

const readingTemplates = [
  ['Skolans bibliotek är öppet varje vardag efter lektionerna.', 'När är biblioteket öppet?', ['På vardagar efter lektionerna', 'Bara på söndagar', 'På morgonen före skolan'], 'På vardagar efter lektionerna', 'school'],
  ['Sara tar tåget till jobbet eftersom bussen är försenad.', 'Varför tar Sara tåget?', ['Bussen är försenad', 'Hon vill promenera', 'Tåget är billigare'], 'Bussen är försenad', 'general'],
  ['I tabellen ser vi att temperaturen sjunker när tiden går.', 'Vad händer med temperaturen?', ['Den stiger', 'Den sjunker', 'Den är alltid samma'], 'Den sjunker', 'stem'],
  ['Läraren delar klassen i små grupper för diskussionen.', 'Hur delas klassen?', ['I små grupper', 'I två skolor', 'Inte alls'], 'I små grupper', 'school'],
  ['På blanketten ska man skriva sitt namn och telefonnummer.', 'Vad ska man skriva på blanketten?', ['Namn och telefonnummer', 'Bara adressen', 'Kursens pris'], 'Namn och telefonnummer', 'general'],
  ['Eleverna upprepar mätningen för att få ett säkrare resultat.', 'Varför upprepar eleverna mätningen?', ['För ett säkrare resultat', 'För att sluta tidigt', 'För att byta ämne'], 'För ett säkrare resultat', 'stem'],
  ['Den nya kursen fokuserar på svenska i arbetslivet.', 'Vad fokuserar kursen på?', ['Svenska i arbetslivet', 'Matlagning', 'Idrott'], 'Svenska i arbetslivet', 'general'],
  ['Gruppen gör en plan innan de börjar lösa uppgiften.', 'Vad gör gruppen först?', ['En plan', 'En intervju', 'En utflykt'], 'En plan', 'school'],
  ['Kraften påverkar föremålets rörelse och riktning.', 'Vad påverkar kraften?', ['Föremålets rörelse och riktning', 'Vädret', 'Lektionens längd'], 'Föremålets rörelse och riktning', 'stem'],
  ['Patienten får ett meddelande med den nya tiden på kvällen.', 'När får patienten meddelandet?', ['På morgonen', 'På kvällen', 'Nästa vecka'], 'På kvällen', 'general'],
  ['Eleven förklarar sitt svar med hjälp av en bild.', 'Hur förklarar eleven sitt svar?', ['Med en bild', 'Med en biljett', 'Med en sång'], 'Med en bild', 'school'],
] as const;

readingExercises.push(...Array.from({ length: 44 }, (_, index) => {
  const template = readingTemplates[index % readingTemplates.length];
  return {
    id: 7 + index,
    title: `Läsövning ${index + 7}`,
    text: `${template[0]} Exempel ${index + 1}.`,
    question: template[1],
    options: [...template[2]],
    answer: template[3],
    difficulty: (['easy', 'medium', 'hard'] as const)[index % 3],
    topic: template[4],
  };
}));

readingExercises.push(
  { id: 51, title: 'En ny busstid', text: 'Bussen går nu fem minuter tidigare än förut. Resenärerna behöver därför komma till hållplatsen ajoissa.', question: 'Hur har busstidtabellen förändrats?', options: ['Bussen går tidigare', 'Bussen går senare', 'Bussen har slutat gå'], answer: 'Bussen går tidigare', difficulty: 'easy', topic: 'general' },
  { id: 52, title: 'En läsläxa', text: 'Läraren ber eleverna läsa två sidor hemma och skriva ner ett nytt ord från texten.', question: 'Vad ska eleverna göra hemma?', options: ['Läsa två sidor och skriva ner ett ord', 'Rita en bild av skolan', 'Göra ett experiment'], answer: 'Läsa två sidor och skriva ner ett ord', difficulty: 'easy', topic: 'school' },
  { id: 53, title: 'På apoteket', text: 'Kunden frågar efter medicin mot huvudvärk. Apotekaren rekommenderar också att kunden dricker vatten.', question: 'Vad frågar kunden efter?', options: ['Medicin mot huvudvärk', 'En ny läkartid', 'En bussbiljett'], answer: 'Medicin mot huvudvärk', difficulty: 'easy', topic: 'general' },
  { id: 54, title: 'Grupparbete', text: 'Varje grupp får ett eget ämne. Eleverna delar upp arbetet och bestämmer vem som presenterar resultatet.', question: 'Vad gör eleverna först?', options: ['Delar upp arbetet', 'Går hem', 'Skriver ett prov'], answer: 'Delar upp arbetet', difficulty: 'medium', topic: 'school' },
  { id: 55, title: 'Energiförbrukning', text: 'Familjen jämför energiförbrukningen under två månader. Den andra månaden använde de mindre el eftersom de släckte lamporna oftare.', question: 'Varför använde familjen mindre el?', options: ['De släckte lamporna oftare', 'De köpte en större bostad', 'De reste bort'], answer: 'De släckte lamporna oftare', difficulty: 'medium', topic: 'stem' },
  { id: 56, title: 'Ett läkarbesök', text: 'Patienten har haft hosta i flera dagar. Läkaren undersöker patienten och föreslår att hen stannar hemma från arbetet en dag.', question: 'Vad föreslår läkaren?', options: ['Att patienten stannar hemma en dag', 'Att patienten byter arbete', 'Att patienten börjar studera'], answer: 'Att patienten stannar hemma en dag', difficulty: 'medium', topic: 'general' },
  { id: 57, title: 'En geometrisk figur', text: 'En rektangel har längden sex centimeter och bredden fyra centimeter. För att bestämma arean multiplicerar man längden med bredden.', question: 'Hur bestämmer man rektangelns area?', options: ['Genom att multiplicera längden med bredden', 'Genom att addera bara längden', 'Genom att dela bredden med tiden'], answer: 'Genom att multiplicera längden med bredden', difficulty: 'medium', topic: 'stem' },
  { id: 58, title: 'En förändrad plan', text: 'Skolan planerade en utflykt på tisdag, men väderprognosen lovar kraftigt regn. Utflykten flyttas därför till torsdag, om vädret förbättras.', question: 'Varför flyttas utflykten?', options: ['På grund av väderprognosen', 'På grund av ett prov', 'På grund av biblioteket'], answer: 'På grund av väderprognosen', difficulty: 'hard', topic: 'school' },
  { id: 59, title: 'Experimentets resultat', text: 'Hypotesen stämde inte med resultatet. Eleverna analyserar möjliga felkällor innan de drar en slutsats.', question: 'Vad gör eleverna innan de drar en slutsats?', options: ['Analyserar möjliga felkällor', 'Avslutar hela kursen', 'Byter till en annan skola'], answer: 'Analyserar möjliga felkällor', difficulty: 'hard', topic: 'stem' },
  { id: 60, title: 'Ett viktigt beslut', text: 'Kommunen vill förbättra kollektivtrafiken. Invånarna får lämna kommentarer innan beslutet fattas, och förslaget behandlas på nästa möte.', question: 'Vad får invånarna göra?', options: ['Lämna kommentarer', 'Bestämma mötesdagen ensamma', 'Avboka alla bussar'], answer: 'Lämna kommentarer', difficulty: 'hard', topic: 'general' },
);

export type WritingPrompt = { id: number; prompt: string; difficulty: Difficulty; topic: Topic };

export const writingPrompts: WritingPrompt[] = [
  { id: 1, prompt: 'Skriv ett kort meddelande till en elev och förklara hur man lämnar in en uppgift.', difficulty: 'easy', topic: 'school' },
  { id: 2, prompt: 'Beskriv ett enkelt experiment och skriv vilka resultat du förväntar dig.', difficulty: 'medium', topic: 'stem' },
  { id: 3, prompt: 'Skriv varför matematik är viktigt i vardagen.', difficulty: 'medium', topic: 'stem' },
  { id: 4, prompt: 'Skriv ett meddelande till vårdcentralen och be om en ny tid.', difficulty: 'medium', topic: 'general' },
  { id: 5, prompt: 'Skriv en kort ansökan till en kurs eller ett arbete.', difficulty: 'hard', topic: 'general' },
  { id: 6, prompt: 'Skriv ett kort meddelande till läraren och förklara varför du behöver mer tid för uppgiften.', difficulty: 'medium', topic: 'school' },
  { id: 7, prompt: 'Skriv vad du tycker att arbetsplatsen kan göra för att förbättra välmåendet.', difficulty: 'hard', topic: 'general' },
];

const writingTemplates = [
  ['Skriv ett kort meddelande om dagens tidtabell.', 'easy', 'general'],
  ['Skriv ett meddelande till en elev om en läxa.', 'easy', 'school'],
  ['Beskriv hur man löser en enkel uppgift steg för steg.', 'medium', 'school'],
  ['Förklara hur man genomför en säker mätning.', 'medium', 'stem'],
  ['Skriv en åsikt om en viktig fråga i vardagen.', 'hard', 'general'],
  ['Jämför två sätt att lära sig nya saker.', 'hard', 'school'],
  ['Beskriv ett experiment och diskutera möjliga felkällor.', 'hard', 'stem'],
] as const;

writingPrompts.push(...Array.from({ length: 43 }, (_, index) => {
  const template = writingTemplates[index % writingTemplates.length];
  return { id: 8 + index, prompt: `${template[0]} Tehtävä ${index + 8}.`, difficulty: template[1], topic: template[2] };
}));

writingPrompts.push(
  { id: 51, prompt: 'Skriv ett kort meddelande till en vän och berätta när ni kan träffas.', difficulty: 'easy', topic: 'general' },
  { id: 52, prompt: 'Beskriv din vanliga skoldag med några enkla meningar.', difficulty: 'easy', topic: 'school' },
  { id: 53, prompt: 'Skriv ett meddelande till en lärare och fråga när uppgiften ska lämnas in.', difficulty: 'easy', topic: 'school' },
  { id: 54, prompt: 'Skriv en kort instruktion för hur man mäter temperaturen på vatten.', difficulty: 'medium', topic: 'stem' },
  { id: 55, prompt: 'Berätta varför det är viktigt att sova tillräckligt under skolveckan.', difficulty: 'medium', topic: 'general' },
  { id: 56, prompt: 'Jämför att åka buss och att cykla till skolan.', difficulty: 'medium', topic: 'general' },
  { id: 57, prompt: 'Förklara med egna ord hur man räknar ut arean av en rektangel.', difficulty: 'medium', topic: 'stem' },
  { id: 58, prompt: 'Kirjoita ruotsiksi mielipide siitä, miten koulun ryhmätyöskentelyä voisi kehittää.', difficulty: 'hard', topic: 'school' },
  { id: 59, prompt: 'Skriv ett argumenterande meddelande om varför elever ska få återkoppling på sina uppgifter.', difficulty: 'hard', topic: 'school' },
  { id: 60, prompt: 'Beskriv ett experiment där resultatet inte motsvarar hypotesen och diskutera möjliga orsaker.', difficulty: 'hard', topic: 'stem' },
);

export type SpeakingPrompt = { id: number; prompt: string; keywords: string[]; difficulty: Difficulty; topic: Topic };

export const speakingPrompts: SpeakingPrompt[] = [
  { id: 1, prompt: 'Selitä ruotsiksi oppilaalle, miten yksinkertainen yhtälö ratkaistaan.', keywords: ['ekvation', 'lösa'], difficulty: 'hard', topic: 'school' },
  { id: 2, prompt: 'Kerro ruotsiksi fysiikan oppitunnista, jonka haluaisit pitää.', keywords: ['fysiklektion', 'elever'], difficulty: 'hard', topic: 'stem' },
  { id: 3, prompt: 'Kuvaile ruotsiksi, miten annat rakentavaa palautetta oppilaan vastauksesta.', keywords: ['respons', 'svar'], difficulty: 'hard', topic: 'school' },
  { id: 4, prompt: 'Kerro ruotsiksi, miten varaat ajan tai hoidat muun arkisen asian.', keywords: ['boka', 'tid'], difficulty: 'medium', topic: 'general' },
  { id: 5, prompt: 'Ilmaise ruotsiksi mielipiteesi siitä, miten koulu voi tukea oppilaiden hyvinvointia.', keywords: ['åsikt', 'skolan', 'välmående'], difficulty: 'hard', topic: 'school' },
  { id: 6, prompt: 'Kerro ruotsiksi, mitä teet, jos et ymmärrä opettajan ohjetta.', keywords: ['förstår', 'fråga'], difficulty: 'medium', topic: 'school' },
  { id: 7, prompt: 'Selitä ruotsiksi, miten oppilaat työskentelevät yhdessä laboratoriossa.', keywords: ['elever', 'tillsammans', 'laboratorium'], difficulty: 'hard', topic: 'stem' },
  { id: 8, prompt: 'Käännä tämä lause ruotsiksi: Minä opetan matematiikkaa.', keywords: ['undervisar', 'matematik'], difficulty: 'easy', topic: 'school' },
  { id: 9, prompt: 'Käännä tämä lause ruotsiksi: Oppilaat työskentelevät pareittain.', keywords: ['eleverna', 'par'], difficulty: 'easy', topic: 'school' },
  { id: 10, prompt: 'Käännä tämä lause ruotsiksi: Voitko selittää tämän tehtävän?', keywords: ['förklara', 'uppgiften'], difficulty: 'easy', topic: 'school' },
  { id: 11, prompt: 'Käännä tämä lause ruotsiksi: Meidän täytyy tarkistaa mittaus.', keywords: ['måste', 'kontrollera', 'mätningen'], difficulty: 'medium', topic: 'stem' },
  { id: 12, prompt: 'Käännä tämä lause ruotsiksi: Varaa aika lääkärille, jos tarvitset apua.', keywords: ['boka', 'tid', 'läkaren'], difficulty: 'medium', topic: 'general' },
  { id: 13, prompt: 'Käännä tämä lause ruotsiksi: Lähetin hakemuksen ennen määräaikaa.', keywords: ['skickade', 'ansökan', 'sista'], difficulty: 'medium', topic: 'general' },
  { id: 14, prompt: 'Käännä tämä lause ruotsiksi: Selitä, miten päädyit tähän tulokseen.', keywords: ['förklara', 'kom', 'resultatet'], difficulty: 'hard', topic: 'school' },
  { id: 15, prompt: 'Käännä tämä lause ruotsiksi: Vaikka tulos oli odottamaton, hypoteesi oli perusteltu.', keywords: ['även', 'resultatet', 'oväntat', 'hypotes'], difficulty: 'hard', topic: 'stem' },
  { id: 16, prompt: 'Käännä tämä lause ruotsiksi: Jos en ymmärrä ohjetta, pyydän opettajaa selittämään sen uudelleen.', keywords: ['förstår', 'instruktionen', 'ber', 'förklara'], difficulty: 'hard', topic: 'school' },
  { id: 17, prompt: 'Käännä tämä lause ruotsiksi: Oppilaiden pitäisi verrata tuloksia ja keskustella mahdollisista virhelähteistä.', keywords: ['eleverna', 'jämföra', 'resultaten', 'felkällor'], difficulty: 'hard', topic: 'stem' },
];

const speakingTemplates = [
  ['Käännä tämä lause ruotsiksi: Tänään on hyvä päivä.', ['idag', 'bra', 'dag'], 'easy', 'general'],
  ['Käännä tämä lause ruotsiksi: Menen huomenna kouluun.', ['imorgon', 'skolan'], 'easy', 'school'],
  ['Käännä tämä lause ruotsiksi: Voitko auttaa minua?', ['hjälpa', 'mig'], 'easy', 'general'],
  ['Käännä tämä lause ruotsiksi: Oppilas lukee ohjeen huolellisesti.', ['eleven', 'läser', 'instruktionen'], 'medium', 'school'],
  ['Käännä tämä lause ruotsiksi: Mittaamme veden lämpötilan.', ['mäter', 'vattnets', 'temperatur'], 'medium', 'stem'],
  ['Käännä tämä lause ruotsiksi: Haluan varata ajan ensi viikolle.', ['boka', 'tid', 'nästa', 'vecka'], 'medium', 'general'],
  ['Käännä tämä lause ruotsiksi: Tulosta pitää verrata aikaisempaan tulokseen.', ['resultatet', 'jämföras', 'tidigare'], 'hard', 'stem'],
  ['Käännä tämä lause ruotsiksi: Opettaja pyytää oppilaita perustelemaan vastauksensa.', ['läraren', 'eleverna', 'motivera', 'svar'], 'hard', 'school'],
  ['Käännä tämä lause ruotsiksi: Vaikka tehtävä oli vaikea, ryhmä löysi ratkaisun.', ['även', 'uppgiften', 'svår', 'lösning'], 'hard', 'school'],
  ['Käännä tämä lause ruotsiksi: Jos mittaus epäonnistuu, tarkistamme laitteen.', ['mätningen', 'misslyckas', 'kontrollerar', 'apparaten'], 'hard', 'stem'],
] as const;

speakingPrompts.push(...Array.from({ length: 33 }, (_, index) => {
  const template = speakingTemplates[index % speakingTemplates.length];
  return { id: 18 + index, prompt: `${template[0]} Tehtävä ${index + 18}.`, keywords: [...template[1]], difficulty: template[2], topic: template[3] };
}));

speakingPrompts.push(
  { id: 51, prompt: 'Käännä tämä lause ruotsiksi: Minulla on kiire tänään.', keywords: ['har', 'bråttom', 'idag'], difficulty: 'easy', topic: 'general' },
  { id: 52, prompt: 'Käännä tämä lause ruotsiksi: Koulu alkaa kahdeksalta.', keywords: ['skolan', 'börjar', 'åtta'], difficulty: 'easy', topic: 'school' },
  { id: 53, prompt: 'Käännä tämä lause ruotsiksi: Tarvitsen apua tämän tehtävän kanssa.', keywords: ['behöver', 'hjälp', 'uppgiften'], difficulty: 'easy', topic: 'school' },
  { id: 54, prompt: 'Käännä tämä lause ruotsiksi: Bussi on myöhässä kymmenen minuuttia.', keywords: ['bussen', 'försenad', 'tio', 'minuter'], difficulty: 'medium', topic: 'general' },
  { id: 55, prompt: 'Käännä tämä lause ruotsiksi: Mittaamme lämpötilan joka minuutti.', keywords: ['mäter', 'temperaturen', 'varje', 'minut'], difficulty: 'medium', topic: 'stem' },
  { id: 56, prompt: 'Käännä tämä lause ruotsiksi: Opettaja jakaa luokan pieniin ryhmiin.', keywords: ['läraren', 'delar', 'klassen', 'grupper'], difficulty: 'medium', topic: 'school' },
  { id: 57, prompt: 'Käännä tämä lause ruotsiksi: Jos sataa, siirrämme retken torstaille.', keywords: ['regnar', 'flyttar', 'utflykten', 'torsdag'], difficulty: 'medium', topic: 'general' },
  { id: 58, prompt: 'Käännä tämä lause ruotsiksi: Tulokset osoittavat selkeän eron materiaalien välillä.', keywords: ['resultaten', 'visar', 'skillnad', 'materialen'], difficulty: 'hard', topic: 'stem' },
  { id: 59, prompt: 'Käännä tämä lause ruotsiksi: Oppilaiden täytyy perustella vastauksensa tekstin avulla.', keywords: ['eleverna', 'måste', 'motivera', 'svar', 'texten'], difficulty: 'hard', topic: 'school' },
  { id: 60, prompt: 'Käännä tämä lause ruotsiksi: Vaikka hypoteesi oli väärä, kokeesta opittiin paljon.', keywords: ['även', 'hypotesen', 'fel', 'experimentet', 'lärde'], difficulty: 'hard', topic: 'stem' },
);
