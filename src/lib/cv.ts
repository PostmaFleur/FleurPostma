export type CvRole = {
  title: string
  organisation: string
  period: string
  points: string[]
}

export const cv = {
  name: "Fleur Postma",
  role: "Grafisch vormgever en contentmaker",
  location: "Almere",
  phoneDisplay: "+31 6 19981338",
  phoneHref: "+31619981338",
  email: "fleur@ntfd.nl",
  social: "@postmafleur",
  profile:
    "Oprichter van OnceMore en grafisch vormgever. Ik ontwerp visuele identiteiten, campagnes en magazines, en maak foto, video en content voor muziek, lifestyle en maatschappelijke opdrachtgevers, van concept tot publicatie.",
  experience: [
    {
      title: "Content creator",
      organisation: "CBF",
      period: "2025 – heden",
      points: [
        "Ontwikkelt contentstrategieën en maakt foto’s, video’s, copy en visuals voor online en offline kanalen.",
        "Beheert en verbetert sociale media en de website, en produceert en monteert storytellingvideo’s.",
        "Schrijft voor blogs, campagnes en nieuwsbrieven, en werkt mee aan branding en online zichtbaarheid.",
      ],
    },
    {
      title: "Oprichter en grafisch vormgever",
      organisation: "OnceMore™",
      period: "2025 – heden",
      points: [
        "Leidt een onafhankelijke studio voor visuele identiteit, campagnes, magazines en visuals.",
        "Ontwerpt logo’s, typografie, kleursystemen en lay-out voor muziek- en lifestylemerken.",
        "Maakt merchandise, albumhoezen, posters en eventbranding.",
      ],
    },
    {
      title: "Allround creative",
      organisation: "Stichting CasaCasla",
      period: "2025 – heden",
      points: [
        "Verzorgt de visuele uitvoering van social media, nieuwsbrieven, website en campagnes.",
        "Verzorgt de interne en externe communicatie.",
        "Houdt de branding consistent voor alle merken, van content en design tot storytelling.",
      ],
    },
    {
      title: "Marketing- en communicatiespecialist",
      organisation: "QuaWonen",
      period: "2024 – 2025",
      points: [
        "Beheerde de sociale media en voerde de visuele identiteit uit.",
        "Maakte content voor interne en externe communicatie en versterkte de online aanwezigheid.",
      ],
    },
  ] satisfies CvRole[],
  projects: [
    {
      title: "Creative lead",
      organisation: "Anna Speller (K-Otic)",
      period: "2026 – heden",
      points: [
        "Vertaalt ideeën naar content en legt daarvoor de visuele identiteit en strategie vast.",
        "Ontwikkelt creatieve concepten en shoots voor social media.",
        "Is betrokken bij het hele traject, van concept tot uitvoering.",
      ],
    },
  ] satisfies CvRole[],
  education: [
    {
      title: "Associate degree Ondernemen",
      organisation: "Hogeschool Windesheim (Flevoland)",
      period: "2023 – 2025",
    },
    {
      title: "Propedeuse Creative Business",
      organisation: "Hogeschool van Amsterdam",
      period: "2022 – 2023",
    },
  ],
  skills: [
    "Grafisch ontwerp",
    "Art direction",
    "Webdesign (UI/UX)",
    "Concept en campagneontwikkeling",
    "Social media en contentcreatie",
    "Video- en fotografieproductie en montage",
  ],
  software: [
    "Illustrator",
    "Photoshop",
    "InDesign",
    "Premiere Pro",
    "Figma",
    "Framer",
    "WordPress",
    "Canva",
    "Notion",
    "Midjourney",
    "DALL·E",
    "ChatGPT",
  ],
  languages: ["Nederlands", "Engels", "Duits"],
}
