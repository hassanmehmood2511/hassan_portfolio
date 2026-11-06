export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  tags: string[];
  status?: "In Development" | "Completed";
  githubUrl?: string;
  isClientProject?: boolean;
}

// Order matters: this is the display order on the site.
export const projects: Project[] = [
  {
    id: "maharat",
    title: "Maharat",
    category: "Mobile App · Local Services Marketplace",
    summary:
      "A hyperlocal services app for Bahawalpur that connects people with local skilled workers such as masons, electricians, and daily-wage labourers.",
    highlights: [
      "Discover local skilled workers by trade",
      "Built around the Bahawalpur community",
      "Mobile-first experience for workers and customers",
    ],
    tags: ["Mobile App", "Marketplace", "Local Services"],
    status: "In Development",
    githubUrl: "https://github.com/hassanmehmood2511/Maharat_app",
  },
  {
    id: "behtar",
    title: "Behtar",
    category: "Mobile App · Digital Wellbeing",
    summary:
      "A minimal Flutter digital wellbeing app that helps people track screen time, limit distractions, and build healthier daily habits through small, manageable steps.",
    highlights: [
      "Habits, challenges, and progress rewards",
      "Screen-time overview with app usage limits",
      "Groups, onboarding, profile, and settings flows",
      "Material 3 design system with shared theme tokens",
    ],
    tags: ["Flutter", "Dart", "Material 3", "Android"],
    status: "In Development",
    githubUrl: "https://github.com/hassanmehmood2511/digital-wellbeing-app",
  },
  {
    id: "zain-store",
    title: "Zain Store",
    category: "Web App · Business Management",
    summary:
      "A business management web app for running a shop: client records, a product rate list, invoicing, and daily and monthly cash summaries.",
    highlights: [
      "Invoice creation and printing",
      "Income, expenses, recoveries, and outstanding credit",
      "Secure owner login with MongoDB-backed sessions",
    ],
    tags: ["Node.js", "Express", "MongoDB", "JavaScript"],
    githubUrl: "https://github.com/hassanmehmood2511/zain_store",
  },
  {
    id: "time-audit",
    title: "TimeAudit",
    category: "Client Project · Backend",
    summary:
      "Client project at Codigo Solutions delivering secure backend business logic, time tracking, user activity processing, and REST API integrations.",
    highlights: [
      "Time tracking and activity data processing",
      "Enterprise REST API integrations",
    ],
    tags: ["Java", "Spring Boot", "REST APIs", "MySQL"],
    status: "Completed",
    isClientProject: true,
    // No repository link to respect client confidentiality
  },
  {
    id: "floral-apparel",
    title: "Floral Apparel",
    category: "Web App · E-Commerce",
    summary:
      "A full-stack e-commerce store for a clothing brand, with a customer storefront and a dedicated admin dashboard.",
    highlights: [
      "Shop, product pages, checkout, and order confirmation",
      "Admin dashboard for products and orders",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    status: "Completed",
    githubUrl: "https://github.com/hassanmehmood2511/floral-apparel",
  },
  {
    id: "school-management",
    title: "School Management System",
    category: "Web App · Administration",
    summary:
      "A web-based administration system for managing student records, attendance, gradebooks, automated reports, and role-based access.",
    highlights: [
      "Student records and attendance tracking",
      "Gradebooks with automated reporting",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    status: "In Development",
  },
];
