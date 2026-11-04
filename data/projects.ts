export interface Project {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  status: "Ongoing" | "Completed";
  githubUrl?: string;
  liveUrl?: string;
  image?: string; // Optional real screenshot path
  isClientProject?: boolean;
  coverGradient: {
    from: string;
    to: string;
    accent: string;
    motif: "mobile" | "system" | "ecommerce" | "analytics";
  };
}

export const projects: Project[] = [
  {
    id: "digital-wellbeing",
    title: "Digital Wellbeing App",
    summary:
      "A cross-platform mobile application engineered to promote healthier screen habits, track app usage analytics, and schedule focus notifications with customizable screen timers.",
    tags: ["Flutter", "Dart", "Android SDK", "State Management", "Local Storage"],
    status: "Ongoing",
    githubUrl: "https://github.com/hassanmehmood2511/digital-wellbeing-app",
    coverGradient: {
      from: "#0A2218",
      to: "#123D2B",
      accent: "#C98A4B",
      motif: "mobile",
    },
  },
  {
    id: "school-management",
    title: "School Management System",
    summary:
      "Comprehensive web-based administrative system managing student records, attendance tracking, gradebook generation, automated reporting, and role-based access control.",
    tags: ["Java", "Spring Boot", "MySQL", "Thymeleaf/React", "REST APIs"],
    status: "Ongoing",
    githubUrl: "https://github.com/hassanmehmood2511/school-management-system",
    coverGradient: {
      from: "#123D2B",
      to: "#2F6B4F",
      accent: "#E8DCC4",
      motif: "system",
    },
  },
  {
    id: "floral-apparel",
    title: "Floral Apparel",
    summary:
      "A responsive clothing-brand e-commerce platform featuring dynamic product catalogs, interactive filtering, persistent cart state, and a streamlined checkout flow.",
    tags: ["Next.js", "React", "Tailwind CSS", "E-Commerce", "JavaScript"],
    status: "Completed",
    githubUrl: "https://github.com/hassanmehmood2511/floral-apparel",
    liveUrl: "https://floral-apparel-demo.vercel.app", // optional demo link
    coverGradient: {
      from: "#2F6B4F",
      to: "#0A2218",
      accent: "#C98A4B",
      motif: "ecommerce",
    },
  },
  {
    id: "time-audit",
    title: "TimeAudit (Client Project)",
    summary:
      "Client service project at Codigo Solutions delivering secure backend business logic, time tracking, user activity data processing, and enterprise REST API integrations.",
    tags: ["Java", "Spring Boot", "REST APIs", "MySQL", "Backend Architecture"],
    status: "Completed",
    isClientProject: true,
    // NO githubUrl or liveUrl to respect client confidentiality
    coverGradient: {
      from: "#0A2218",
      to: "#2F6B4F",
      accent: "#C98A4B",
      motif: "analytics",
    },
  },
];
