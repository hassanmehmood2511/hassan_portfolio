export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  isCurrent?: boolean;
  isProminent?: boolean;
  highlightColor?: string;
  bullets: string[];
  technologies: string[];
  isEditablePlaceholder?: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    id: "technest-nova",
    role: "Senior Software Developer",
    company: "TechNest Nova",
    period: "Present",
    location: "Bahawalpur, Pakistan",
    isCurrent: true,
    isProminent: true,
    isEditablePlaceholder: true,
    bullets: [
      "[EDITABLE PLACEHOLDER] Architect and develop AI-driven full-stack web and mobile applications using Spring Boot, Next.js, and Flutter.",
      "[EDITABLE PLACEHOLDER] Lead end-to-end project delivery cycles, establishing clean code guidelines, code reviews, and automated CI/CD pipelines.",
      "[EDITABLE PLACEHOLDER] Collaborate closely with cross-functional teams and stakeholders to translate complex business demands into performant microservices.",
    ],
    technologies: ["Java", "Spring Boot", "Next.js", "Flutter", "AI Tooling", "Postgres/MySQL"],
  },
  {
    id: "builtin-soft",
    role: "Team Lead Intern",
    company: "BUILTIN Soft",
    period: "Sep 2026 – Present",
    location: "Bahawalpur, Pakistan",
    isCurrent: true,
    isProminent: false,
    bullets: [
      "Lead and coordinate technical team members, delegate sprint tasks, evaluate progress.",
      "Use Jira and ClickUp for tracking and workflow optimization across development sprints.",
      "Facilitate team meetings, align objectives, oversee code quality in delivery pipelines.",
    ],
    technologies: ["Jira", "ClickUp", "Agile Leadership", "Sprint Planning", "Code Review"],
  },
  {
    id: "codigo-solutions",
    role: "Junior Software Developer",
    company: "Codigo Solutions",
    period: "Mar 2026 – Present", // End date placeholder
    location: "Bahawalpur, Pakistan",
    isCurrent: false,
    isProminent: false,
    bullets: [
      "Built scalable backend logic and REST APIs with Java Spring Boot and relational databases.",
      "Contributed to architecture, unit testing, debugging, and Git/GitHub team workflows.",
      "Delivered core backend features for the TimeAudit client project with emphasis on accuracy and throughput.",
    ],
    technologies: ["Java", "Spring Boot", "REST APIs", "MySQL", "Git", "Postman"],
  },
  {
    id: "click-chain-academy",
    role: "Software Development Intern",
    company: "Click Chain Academy",
    period: "Sep 2025 – Dec 2025",
    location: "Bahawalpur, Pakistan",
    bullets: [
      "Supported modern web interface development and front-end component integration.",
      "Executed testing, bug resolution, feasibility research, and technical documentation.",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Git", "Testing"],
  },
  {
    id: "devcastle-institute",
    role: "Android App Development Training",
    company: "DevCastle Training Institute",
    period: "Jun 2026 – Aug 2026",
    location: "Bahawalpur, Pakistan",
    bullets: [
      "Built native Android apps with Java, Kotlin, and Jetpack Compose.",
      "Mastered mobile UI/UX state management, local database storage, and app publishing workflows.",
    ],
    technologies: ["Android SDK", "Kotlin", "Java", "Jetpack Compose", "Mobile Architecture"],
  },
];
