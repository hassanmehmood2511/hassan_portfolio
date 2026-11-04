export type SkillCategory =
  | "Languages"
  | "Backend & Database"
  | "Mobile"
  | "Frontend"
  | "Tools & Practices";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: string; // e.g., "Advanced", "Proficient"
  description: string;
  position: [number, number, number]; // 3D coordinates in constellation
  connections: string[]; // IDs of connected skills
}

export const skillCategories: SkillCategory[] = [
  "Languages",
  "Backend & Database",
  "Mobile",
  "Frontend",
  "Tools & Practices",
];

export const skills: Skill[] = [
  // Languages Cluster (Center Left, x: -3.5, y: 1.5, z: 0)
  {
    id: "java",
    name: "Java",
    category: "Languages",
    level: "Expert",
    description: "Core language for enterprise backends & Android application development.",
    position: [-3.8, 1.8, 0.2],
    connections: ["spring-boot", "kotlin", "sql", "oop"],
  },
  {
    id: "kotlin",
    name: "Kotlin",
    category: "Languages",
    level: "Advanced",
    description: "Modern concise language for native Android & Jetpack Compose apps.",
    position: [-4.2, 0.8, -0.3],
    connections: ["java", "android-sdk", "jetpack-compose"],
  },
  {
    id: "dart",
    name: "Dart",
    category: "Languages",
    level: "Advanced",
    description: "Strongly typed language powering cross-platform Flutter mobile apps.",
    position: [-2.8, 2.2, 0.5],
    connections: ["flutter"],
  },
  {
    id: "python",
    name: "Python",
    category: "Languages",
    level: "Proficient",
    description: "Scripting, AI tool integration, and data processing tasks.",
    position: [-4.8, 2.5, -0.5],
    connections: ["prompt-engineering"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Languages",
    level: "Advanced",
    description: "ES6+ web programming for interactive user interfaces.",
    position: [-2.5, 0.5, 0.8],
    connections: ["react", "nextjs", "html-css"],
  },
  {
    id: "sql",
    name: "SQL",
    category: "Languages",
    level: "Advanced",
    description: "Relational database queries, joins, indexing and optimization.",
    position: [-3.2, -0.4, -0.2],
    connections: ["mysql", "spring-boot"],
  },

  // Backend & Database Cluster (Top Center, x: 0, y: 3, z: -1)
  {
    id: "spring-boot",
    name: "Spring Boot",
    category: "Backend & Database",
    level: "Expert",
    description: "Building production-ready, secure RESTful microservices and enterprise backends.",
    position: [-0.8, 3.2, -0.8],
    connections: ["java", "rest-apis", "mysql", "mongodb", "swagger"],
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "Backend & Database",
    level: "Expert",
    description: "Designing scalable, idempotent API endpoints with clean HTTP conventions.",
    position: [0.5, 3.5, -0.5],
    connections: ["spring-boot", "postman", "swagger"],
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Backend & Database",
    level: "Advanced",
    description: "Relational database schema design, transactions, and performance tuning.",
    position: [-1.5, 2.4, -1.2],
    connections: ["sql", "spring-boot"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Backend & Database",
    level: "Proficient",
    description: "NoSQL document store for flexible, JSON-like dynamic data modeling.",
    position: [1.2, 2.6, -1.0],
    connections: ["spring-boot"],
  },

  // Mobile Cluster (Center Right, x: 3.5, y: 1.5, z: 0)
  {
    id: "flutter",
    name: "Flutter",
    category: "Mobile",
    level: "Expert",
    description: "Cross-platform mobile apps for iOS & Android with custom widget architectures.",
    position: [3.5, 2.0, 0.4],
    connections: ["dart", "android-sdk"],
  },
  {
    id: "android-sdk",
    name: "Android SDK",
    category: "Mobile",
    level: "Advanced",
    description: "Native Android platform APIs, lifecycles, background services, and permissions.",
    position: [4.0, 0.9, -0.2],
    connections: ["kotlin", "java", "jetpack-compose", "flutter"],
  },
  {
    id: "jetpack-compose",
    name: "Jetpack Compose",
    category: "Mobile",
    level: "Advanced",
    description: "Declarative UI toolkit for building modern native Android user experiences.",
    position: [2.8, 0.2, 0.5],
    connections: ["kotlin", "android-sdk"],
  },

  // Frontend Cluster (Bottom Right, x: 2.5, y: -2, z: 0)
  {
    id: "react",
    name: "React.js",
    category: "Frontend",
    level: "Advanced",
    description: "Component-driven Web UI development with reactive state management.",
    position: [2.2, -1.8, 0.6],
    connections: ["nextjs", "javascript", "html-css"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    level: "Advanced",
    description: "React framework with App Router, SSR, Server Components, and optimized rendering.",
    position: [3.4, -2.5, -0.3],
    connections: ["react", "shadcn-ui"],
  },
  {
    id: "html-css",
    name: "HTML5 & CSS3",
    category: "Frontend",
    level: "Expert",
    description: "Semantic markup, modern layout techniques (Flexbox, Grid), and CSS animations.",
    position: [1.2, -2.2, 0.8],
    connections: ["javascript", "react"],
  },
  {
    id: "shadcn-ui",
    name: "shadcn/ui & Tailwind",
    category: "Frontend",
    level: "Advanced",
    description: "Accessible, styled UI component library integrated with utility-first CSS.",
    position: [3.8, -1.2, 0.2],
    connections: ["nextjs", "react"],
  },

  // Tools & Practices Cluster (Bottom Left, x: -2.5, y: -2, z: 0)
  {
    id: "git-github",
    name: "Git / GitHub",
    category: "Tools & Practices",
    level: "Expert",
    description: "Version control, branching strategies, PR reviews, and GitHub Actions.",
    position: [-2.2, -2.0, 0.4],
    connections: ["jira-clickup", "agile"],
  },
  {
    id: "postman",
    name: "Postman",
    category: "Tools & Practices",
    level: "Advanced",
    description: "API testing, environment variables, automated mock collections.",
    position: [-0.8, -1.8, -0.5],
    connections: ["rest-apis", "swagger"],
  },
  {
    id: "swagger",
    name: "Swagger / OpenAPI",
    category: "Tools & Practices",
    level: "Advanced",
    description: "Interactive REST API documentation and contract specifications.",
    position: [0.2, -2.5, -0.8],
    connections: ["spring-boot", "rest-apis"],
  },
  {
    id: "jira-clickup",
    name: "Jira & ClickUp",
    category: "Tools & Practices",
    level: "Advanced",
    description: "Agile sprint management, issue tracking, workload delegation, and roadmap planning.",
    position: [-3.4, -1.5, -0.4],
    connections: ["agile", "git-github"],
  },
  {
    id: "agile",
    name: "Agile Leadership",
    category: "Tools & Practices",
    level: "Advanced",
    description: "Sprint planning, daily standups, cross-functional team coordination, and reviews.",
    position: [-3.8, -2.8, 0.2],
    connections: ["jira-clickup"],
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering & AI",
    category: "Tools & Practices",
    level: "Advanced",
    description: "Leveraging LLMs and AI coding tools to accelerate development and problem-solving.",
    position: [-1.2, -3.2, 0.5],
    connections: ["python", "software-arch"],
  },
  {
    id: "oop",
    name: "OOP Principles",
    category: "Tools & Practices",
    level: "Expert",
    description: "Encapsulation, inheritance, polymorphism, abstraction, and SOLID design patterns.",
    position: [-2.8, 0.0, -0.8],
    connections: ["java", "software-arch"],
  },
  {
    id: "software-arch",
    name: "Software Architecture",
    category: "Tools & Practices",
    level: "Advanced",
    description: "Clean architecture, layered design, dependency inversion, and maintainable systems.",
    position: [-1.5, -0.8, -1.2],
    connections: ["oop", "spring-boot", "prompt-engineering"],
  },
];
