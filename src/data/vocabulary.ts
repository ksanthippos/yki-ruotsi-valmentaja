import { Difficulty, Topic } from '../types';

export type VocabularyItem = {
    swedish: string;
    finnish: string;
    example: string;
    category: string;
    difficulty: Difficulty;
    topic: Topic;
};

export const vocabulary: VocabularyItem[] = [
    { swedish: 'en ekvation', finnish: 'yhtälö', example: 'Lös ekvationen.', category: 'Matematiikka', difficulty: 'easy', topic: 'stem' },
    { swedish: 'en hastighet', finnish: 'nopeus', example: 'Vad är föremålets hastighet?', category: 'Fysiikka', difficulty: 'easy', topic: 'stem' },
    { swedish: 'att förklara', finnish: 'selittää', example: 'Kan du förklara uppgiften?', category: 'Opetuskieli', difficulty: 'easy', topic: 'school' },
    { swedish: 'en mätning', finnish: 'mittaus', example: 'Vi gör en mätning i fysiken.', category: 'Fysiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'en formel', finnish: 'kaava', example: 'Vilken formel använder vi?', category: 'Matematiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'en kraft', finnish: 'voima', example: 'En kraft kan förändra ett föremåls rörelse.', category: 'Fysiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'en massa', finnish: 'massa', example: 'Vi mäter föremålets massa.', category: 'Fysiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'en vinkel', finnish: 'kulma', example: 'Mät vinkeln med en gradskiva.', category: 'Matematiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'ett resultat', finnish: 'tulos', example: 'Skriv resultatet i tabellen.', category: 'Opetuskieli', difficulty: 'easy', topic: 'school' },
    { swedish: 'en uppgift', finnish: 'tehtävä', example: 'Börja med den första uppgiften.', category: 'Opetuskieli', difficulty: 'easy', topic: 'school' },
    { swedish: 'att jämföra', finnish: 'vertailla', example: 'Jämför era resultat med varandra.', category: 'Opetuskieli', difficulty: 'medium', topic: 'school' },
    { swedish: 'en ansökan', finnish: 'hakemus', example: 'Jag skickade in en ansökan till utbildningen.', category: 'Koulutus ja työ', difficulty: 'medium', topic: 'general' },
    { swedish: 'en tid hos läkaren', finnish: 'lääkäriaika', example: 'Jag behöver boka en tid hos läkaren.', category: 'Terveys ja asiointi', difficulty: 'medium', topic: 'general' },
    { swedish: 'en räkning', finnish: 'lasku', example: 'Jag betalar räkningen på nätet.', category: 'Asiointi', difficulty: 'easy', topic: 'general' },
    { swedish: 'en arbetsintervju', finnish: 'työhaastattelu', example: 'Hon har en arbetsintervju på fredag.', category: 'Koulutus ja työ', difficulty: 'hard', topic: 'general' },
    { swedish: 'att boka', finnish: 'varata', example: 'Kan du boka ett mötesrum?', category: 'Asiointi', difficulty: 'easy', topic: 'general' },
    { swedish: 'en åsikt', finnish: 'mielipide', example: 'Alla får uttrycka sin åsikt.', category: 'Yhteiskunta', difficulty: 'hard', topic: 'general' },
    { swedish: 'en instruktion', finnish: 'ohje', example: 'Läs instruktionen innan du börjar.', category: 'Opetuskieli', difficulty: 'easy', topic: 'school' },
    { swedish: 'en försening', finnish: 'viivästys', example: 'Tåget har en försening på tio minuter.', category: 'Asiointi', difficulty: 'medium', topic: 'general' },
    { swedish: 'en hälsa', finnish: 'terveys', example: 'Motion är bra för hälsan.', category: 'Terveys ja asiointi', difficulty: 'easy', topic: 'general' },
    { swedish: 'en möjlighet', finnish: 'mahdollisuus', example: 'Kursen ger en möjlighet att lära sig nya saker.', category: 'Yhteiskunta', difficulty: 'medium', topic: 'general' },
    { swedish: 'att lämna in', finnish: 'palauttaa', example: 'Du ska lämna in uppgiften på fredag.', category: 'Opetuskieli', difficulty: 'medium', topic: 'school' },
    { swedish: 'att behöva', finnish: 'tarvita', example: 'Jag behöver mer tid för uppgiften.', category: 'Koulutus ja työ', difficulty: 'easy', topic: 'school' },
];

const additionalVocabulary: VocabularyItem[] = [
    { swedish: 'en skola', finnish: 'koulu', example: 'Min syster arbetar på en skola.', category: 'Koulumaailma', difficulty: 'easy', topic: 'school' },
    { swedish: 'en lärare', finnish: 'opettaja', example: 'Läraren förklarar uppgiften.', category: 'Koulumaailma', difficulty: 'easy', topic: 'school' },
    { swedish: 'en elev', finnish: 'oppilas', example: 'Eleven läser instruktionen.', category: 'Koulumaailma', difficulty: 'easy', topic: 'school' },
    { swedish: 'ett klassrum', finnish: 'luokkahuone', example: 'Vi träffas i klassrummet.', category: 'Koulumaailma', difficulty: 'easy', topic: 'school' },
    { swedish: 'en läxa', finnish: 'kotitehtävä', example: 'Jag gör min läxa på kvällen.', category: 'Koulumaailma', difficulty: 'easy', topic: 'school' },
    { swedish: 'en lektion', finnish: 'oppitunti', example: 'Lektionen börjar klockan nio.', category: 'Koulumaailma', difficulty: 'easy', topic: 'school' },
    { swedish: 'ett prov', finnish: 'koe', example: 'Vi har ett prov på fredag.', category: 'Koulumaailma', difficulty: 'medium', topic: 'school' },
    { swedish: 'en lösning', finnish: 'ratkaisu', example: 'Hitta en lösning på problemet.', category: 'Matematiikka ja fysiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'en sträcka', finnish: 'matka', example: 'Mät sträckan mellan punkterna.', category: 'Matematiikka ja fysiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'en temperatur', finnish: 'lämpötila', example: 'Temperaturen sjunker under natten.', category: 'Matematiikka ja fysiikka', difficulty: 'easy', topic: 'stem' },
    { swedish: 'en energi', finnish: 'energia', example: 'Energi kan ändra form.', category: 'Matematiikka ja fysiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'en rörelse', finnish: 'liike', example: 'Vi studerar föremålets rörelse.', category: 'Matematiikka ja fysiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'en hastighet', finnish: 'nopeus', example: 'Beräkna bilens hastighet.', category: 'Matematiikka ja fysiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'en volym', finnish: 'tilavuus', example: 'Räkna ut lådans volym.', category: 'Matematiikka ja fysiikka', difficulty: 'hard', topic: 'stem' },
    { swedish: 'en yta', finnish: 'pinta-ala', example: 'Bestäm figurens yta.', category: 'Matematiikka ja fysiikka', difficulty: 'hard', topic: 'stem' },
    { swedish: 'en bråkdel', finnish: 'murtoluku', example: 'Förenkla bråkdelen.', category: 'Matematiikka ja fysiikka', difficulty: 'hard', topic: 'stem' },
    { swedish: 'en variabel', finnish: 'muuttuja', example: 'X är en variabel i ekvationen.', category: 'Matematiikka ja fysiikka', difficulty: 'hard', topic: 'stem' },
    { swedish: 'en hypotes', finnish: 'hypoteesi', example: 'Vi formulerar en hypotes före experimentet.', category: 'Matematiikka ja fysiikka', difficulty: 'hard', topic: 'stem' },
    { swedish: 'en felkälla', finnish: 'virhelähde', example: 'Diskutera möjliga felkällor.', category: 'Matematiikka ja fysiikka', difficulty: 'hard', topic: 'stem' },
    { swedish: 'en undersökning', finnish: 'tutkimus', example: 'Undersökningen visar ett tydligt resultat.', category: 'Matematiikka ja fysiikka', difficulty: 'hard', topic: 'stem' },
    { swedish: 'en vardag', finnish: 'arki', example: 'Svenska behövs i vardagen.', category: 'Yleinen ruotsi ja arki', difficulty: 'easy', topic: 'general' },
    { swedish: 'en adress', finnish: 'osoite', example: 'Vilken är din adress?', category: 'Yleinen ruotsi ja arki', difficulty: 'easy', topic: 'general' },
    { swedish: 'en tid', finnish: 'aika', example: 'Jag har inte tid idag.', category: 'Yleinen ruotsi ja arki', difficulty: 'easy', topic: 'general' },
    { swedish: 'en hjälp', finnish: 'apu', example: 'Tack för din hjälp.', category: 'Yleinen ruotsi ja arki', difficulty: 'easy', topic: 'general' },
    { swedish: 'ett problem', finnish: 'ongelma', example: 'Vi försöker lösa problemet.', category: 'Yleinen ruotsi ja arki', difficulty: 'medium', topic: 'general' },
    { swedish: 'en förändring', finnish: 'muutos', example: 'Förändringen påverkar alla.', category: 'Yleinen ruotsi ja arki', difficulty: 'medium', topic: 'general' },
    { swedish: 'att påverka', finnish: 'vaikuttaa', example: 'Beslutet påverkar eleverna.', category: 'Yleinen ruotsi ja arki', difficulty: 'hard', topic: 'general' },
];

vocabulary.push(...additionalVocabulary);

vocabulary.push(
    { swedish: 'att förstå', finnish: 'ymmärtää', example: 'Jag försöker förstå instruktionen.', category: 'Yleinen ruotsi ja arki', difficulty: 'easy', topic: 'general' },
    { swedish: 'en fråga', finnish: 'kysymys', example: 'Jag har en fråga.', category: 'Yleinen ruotsi ja arki', difficulty: 'easy', topic: 'general' },
    { swedish: 'att läsa', finnish: 'lukea', example: 'Eleverna läser texten tillsammans.', category: 'Koulumaailma', difficulty: 'easy', topic: 'school' },
    { swedish: 'ett svar', finnish: 'vastaus', example: 'Skriv ditt svar i häftet.', category: 'Koulumaailma', difficulty: 'easy', topic: 'school' },
    { swedish: 'en omkrets', finnish: 'piiri', example: 'Räkna ut figurens omkrets.', category: 'Matematiikka ja fysiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'en sannolikhet', finnish: 'todennäköisyys', example: 'Vi beräknar sannolikheten.', category: 'Matematiikka ja fysiikka', difficulty: 'medium', topic: 'stem' },
    { swedish: 'att beskriva', finnish: 'kuvailla', example: 'Beskriv vad du ser i bilden.', category: 'Koulumaailma', difficulty: 'medium', topic: 'school' },
    { swedish: 'en förklaring', finnish: 'selitys', example: 'Din förklaring är tydlig.', category: 'Koulumaailma', difficulty: 'medium', topic: 'school' },
    { swedish: 'en slutsats', finnish: 'johtopäätös', example: 'Dra en slutsats av resultaten.', category: 'Matematiikka ja fysiikka', difficulty: 'hard', topic: 'stem' },
    { swedish: 'ett samband', finnish: 'yhteys', example: 'Undersök sambandet mellan tid och hastighet.', category: 'Matematiikka ja fysiikka', difficulty: 'hard', topic: 'stem' },
);

export const vocabularySource = {
    title: 'Ylen materiaali',
    url: 'https://yle.fi/a/20-146198',
};
