export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  description?: string;
  highlights?: string[];
}

export interface LanguageItem {
  name: string;
  proficiency: string;
  levelPercent: number;
}

export const educationList: EducationItem[] = [
  {
    id: "iub-bsit",
    degree: "BS Information Technology",
    institution: "The Islamia University of Bahawalpur",
    period: "Sep 2023 – Present",
    location: "Bahawalpur, Pakistan",
    description: "Focusing on Software Engineering, Database Systems, Web Architectures, and OOP principles.",
    highlights: ["Active in Technical Clubs", "Maintained strong academic standing", "Leading development projects"],
  },
  {
    id: "riphah-inter",
    degree: "Intermediate (Pre-Medical)",
    institution: "Riphah International College",
    period: "Completed",
    location: "Hafizabad, Pakistan",
    description: "Strong foundation in analytical reasoning, scientific methodologies, and quantitative logic.",
  },
  {
    id: "matriculation",
    degree: "Matriculation (Science)",
    institution: "Government High School Sagar Kalan",
    period: "Completed",
    location: "Hafizabad, Pakistan",
    description: "Completed secondary education with top distinction in Science discipline.",
  },
];

export const languagesList: LanguageItem[] = [
  {
    name: "Urdu",
    proficiency: "Native / Bilingual",
    levelPercent: 100,
  },
  {
    name: "English",
    proficiency: "Professional Working Proficiency",
    levelPercent: 90,
  },
  {
    name: "Punjabi",
    proficiency: "Conversational / Native Dialect",
    levelPercent: 85,
  },
];
