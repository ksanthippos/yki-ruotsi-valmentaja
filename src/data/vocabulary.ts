import { Difficulty } from "../types";

export type VocabularyItem = {
    swedish: string;
    finnish: string;
    example: string;
    category: string;
    difficulty: Difficulty;
};

export const vocabulary: VocabularyItem[] = [
    {
        swedish: "en ekvation",
        finnish: "yhtälö",
        example: "Lös ekvationen.",
        category: "Matematiikka",
        difficulty: "easy",
    },
    {
        swedish: "en hastighet",
        finnish: "nopeus",
        example: "Vad är föremålets hastighet?",
        category: "Fysiikka",
        difficulty: "easy",
    },
    {
        swedish: "att förklara",
        finnish: "selittää",
        example: "Kan du förklara uppgiften?",
        category: "Opetuskieli",
        difficulty: "easy",
    },
    {
        swedish: "en mätning",
        finnish: "mittaus",
        example: "Vi gör en mätning i fysiken.",
        category: "Fysiikka",
        difficulty: "medium",
    },
    {
        swedish: "en formel",
        finnish: "kaava",
        example: "Vilken formel använder vi?",
        category: "Matematiikka",
        difficulty: "medium",
    },
    {
        swedish: "en kraft",
        finnish: "voima",
        example: "En kraft kan förändra ett föremåls rörelse.",
        category: "Fysiikka",
        difficulty: "medium",
    },
    {
        swedish: "en massa",
        finnish: "massa",
        example: "Vi mäter föremålets massa.",
        category: "Fysiikka",
        difficulty: "medium",
    },
    {
        swedish: "en vinkel",
        finnish: "kulma",
        example: "Mät vinkeln med en gradskiva.",
        category: "Matematiikka",
        difficulty: "medium",
    },
    {
        swedish: "ett resultat",
        finnish: "tulos",
        example: "Skriv resultatet i tabellen.",
        category: "Opetuskieli",
        difficulty: "easy",
    },
    {
        swedish: "en uppgift",
        finnish: "tehtävä",
        example: "Börja med den första uppgiften.",
        category: "Opetuskieli",
        difficulty: "easy",
    },
    {
        swedish: "att jämföra",
        finnish: "vertailla",
        example: "Jämför era resultat med varandra.",
        category: "Opetuskieli",
        difficulty: "medium",
    },
    {
        swedish: "en ansökan",
        finnish: "hakemus",
        example: "Jag skickade in en ansökan till utbildningen.",
        category: "Koulutus ja työ",
        difficulty: "medium",
    },
    {
        swedish: "en tid hos läkaren",
        finnish: "lääkäriaika",
        example: "Jag behöver boka en tid hos läkaren.",
        category: "Terveys ja asiointi",
        difficulty: "medium",
    },
    {
        swedish: "en räkning",
        finnish: "lasku",
        example: "Jag betalar räkningen på nätet.",
        category: "Asiointi",
        difficulty: "easy",
    },
    {
        swedish: "en arbetsintervju",
        finnish: "työhaastattelu",
        example: "Hon har en arbetsintervju på fredag.",
        category: "Koulutus ja työ",
        difficulty: "hard",
    },
    {
        swedish: "att boka",
        finnish: "varata",
        example: "Kan du boka ett mötesrum?",
        category: "Asiointi",
        difficulty: "easy",
    },
    {
        swedish: "en åsikt",
        finnish: "mielipide",
        example: "Alla får uttrycka sin åsikt.",
        category: "Yhteiskunta",
        difficulty: "hard",
    },
    {
        swedish: "en instruktion",
        finnish: "ohje",
        example: "Läs instruktionen innan du börjar.",
        category: "Opetuskieli",
        difficulty: "easy",
    },
    {
        swedish: "en försening",
        finnish: "viivästys",
        example: "Tåget har en försening på tio minuter.",
        category: "Asiointi",
        difficulty: "medium",
    },
    {
        swedish: "en hälsa",
        finnish: "terveys",
        example: "Motion är bra för hälsan.",
        category: "Terveys ja asiointi",
        difficulty: "easy",
    },
    {
        swedish: "en möjlighet",
        finnish: "mahdollisuus",
        example: "Kursen ger en möjlighet att lära sig nya saker.",
        category: "Yhteiskunta",
        difficulty: "medium",
    },
    {
        swedish: "att lämna in",
        finnish: "palauttaa",
        example: "Du ska lämna in uppgiften på fredag.",
        category: "Opetuskieli",
        difficulty: "medium",
    },
    {
        swedish: "att behöva",
        finnish: "tarvita",
        example: "Jag behöver mer tid för uppgiften.",
        category: "Koulutus ja työ",
        difficulty: "easy",
    },
];

export const vocabularySource = {
    title: "Ylen materiaali",
    url: "https://yle.fi/a/20-146198",
};