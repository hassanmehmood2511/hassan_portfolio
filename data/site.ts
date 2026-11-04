export interface SiteConfig {
  name: string;
  headline: string;
  subline: string;
  location: string;
  email: string;
  linkedIn: string;
  gitHub: string;
  companyName: string;
  companyUrl: string;
  cvUrl: string;
  aboutText: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Hafiz Hassan Mehmood",
  headline: "Senior Software Developer at TechNest Nova",
  subline: "Backend • Mobile • Web | Team Lead | Java, Spring Boot, Flutter, Next.js",
  location: "Bahawalpur, Pakistan",
  email: "hafizhassanmehmood444@gmail.com",
  linkedIn: "https://linkedin.com/in/hafiz-hassan-mehmood-055398312",
  gitHub: "https://github.com/hassanmehmood2511",
  companyName: "TechNest Nova",
  companyUrl: "https://technestnova.com", // Placeholder company URL
  cvUrl: "/Hafiz_Hassan_Mehmood_CV.pdf",
  aboutText:
    "I'm a software developer who builds scalable backends with Java and Spring Boot and polished mobile and web experiences with Flutter, Kotlin and Next.js. I currently serve as Senior Software Developer at TechNest Nova and lead teams as a Team Lead Intern at BUILTIN Soft, coordinating sprints with Jira and ClickUp. I'm completing my BS in Information Technology at The Islamia University of Bahawalpur, and I use AI tooling and prompt engineering to ship faster without cutting corners on clean architecture and OOP. Turning messy problems into clean, reliable systems is what drives me every day.",
  stats: [
    { label: "Core Stacks", value: "Java & Flutter" },
    { label: "Leadership", value: "Team Lead" },
    { label: "Degree Progress", value: "BS IT Senior" },
    { label: "Delivery Focus", value: "AI + Clean Arch" },
  ],
};
