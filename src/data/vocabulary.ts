export type VocabularyItem = {
    swedish: string;
    finnish: string;
    example: string;
    category: string;
};

export const vocabulary: VocabularyItem[] = [
    {
        swedish: "en ekvation",
        finnish: "yhtälö",
        example: "Lös ekvationen.",
        category: "Matematiikka",
    },
    {
        swedish: "en hastighet",
        finnish: "nopeus",
        example: "Vad är föremålets hastighet?",
        category: "Fysiikka",
    },
    {
        swedish: "att förklara",
        finnish: "selittää",
        example: "Kan du förklara uppgiften?",
        category: "Opetuskieli",
    },
    {
        swedish: "en mätning",
        finnish: "mittaus",
        example: "Vi gör en mätning i fysiken.",
        category: "Fysiikka",
    },
    {
        swedish: "en formel",
        finnish: "kaava",
        example: "Vilken formel använder vi?",
        category: "Matematiikka",
    },
    {
        swedish: "en kraft",
        finnish: "voima",
        example: "En kraft kan förändra ett föremåls rörelse.",
        category: "Fysiikka",
    },
    {
        swedish: "en massa",
        finnish: "massa",
        example: "Vi mäter föremålets massa.",
        category: "Fysiikka",
    },
    {
        swedish: "en vinkel",
        finnish: "kulma",
        example: "Mät vinkeln med en gradskiva.",
        category: "Matematiikka",
    },
    {
        swedish: "ett resultat",
        finnish: "tulos",
        example: "Skriv resultatet i tabellen.",
        category: "Opetuskieli",
    },
    {
        swedish: "en uppgift",
        finnish: "tehtävä",
        example: "Börja med den första uppgiften.",
        category: "Opetuskieli",
    },
    {
        swedish: "att jämföra",
        finnish: "vertailla",
        example: "Jämför era resultat med varandra.",
        category: "Opetuskieli",
    },
    {
        swedish: "en ansökan",
        finnish: "hakemus",
        example: "Jag skickade in en ansökan till utbildningen.",
        category: "Koulutus ja työ",
    },
    {
        swedish: "en tid hos läkaren",
        finnish: "lääkäriaika",
        example: "Jag behöver boka en tid hos läkaren.",
        category: "Terveys ja asiointi",
    },
    {
        swedish: "en räkning",
        finnish: "lasku",
        example: "Jag betalar räkningen på nätet.",
        category: "Asiointi",
    },
    {
        swedish: "en arbetsintervju",
        finnish: "työhaastattelu",
        example: "Hon har en arbetsintervju på fredag.",
        category: "Koulutus ja työ",
    },
    {
        swedish: "att boka",
        finnish: "varata",
        example: "Kan du boka ett mötesrum?",
        category: "Asiointi",
    },
    {
        swedish: "en åsikt",
        finnish: "mielipide",
        example: "Alla får uttrycka sin åsikt.",
        category: "Yhteiskunta",
    },
];

export const vocabularySource = {
    title: "Ylen ruotsin kielen materiaali",
    url: "https://yle.fi/a/20-146803",
};