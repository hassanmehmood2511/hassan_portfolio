# Hafiz Hassan Mehmood — 3D Personal Portfolio

A complete, studio-quality, 3D personal portfolio website for **Hafiz Hassan Mehmood**, Senior Software Developer at **TechNest Nova**.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js** (`@react-three/fiber` & `@react-three/drei`), **Framer Motion**, **Lenis**, **next-themes**, **Zod**, **React Hook Form**, and **Resend**.

---

## 🌟 Key Features

- **"Forest to Sand" Design System**: Deep forest green (`#0A2218`) fading into warm sand (`#F3EBDD`) with copper-gold (`#C98A4B`) highlights matching the TechNest Nova brand DNA.
- **Persistent R3F 3D Canvas**:
  - **Hero 3D Portrait**: Floating 3D-tilt portrait card loaded from `/profile/hassan.jpg` with a graceful fallback avatar ("HM") and copper-gold rim glow.
  - **Skill Constellation**: Interactive 3D constellation grouping skills into 5 distinct spatial clusters connected by dynamic glowing lines and billboarded labels. Hovering highlights nodes and connections; category pills filter and focus camera/clusters.
  - **Adaptive Camera Rig**: Smoothly damped camera movement driven by scroll progress.
  - **Theme Adaptation**: Lights, particles, fog, and materials automatically shift between dark and light themes.
- **Micro-Interactions & Cursor**: Magnetic buttons with spring physics, 3D perspective tilt cards with inner depth parallax, and custom cursor with dynamic hover labels ("View", "Open", "Drag").
- **Interactive Experience & Project Showcases**:
  - Vertical timeline with a self-drawing glowing copper-gold scroll line.
  - Abstract generated project covers with unique color meshes and 3D/CSS motifs.
- **Real Email Sending API**: Built-in `/api/contact` route with Zod validation, honeypot spam protection, IP rate limiting, input sanitization, and Resend email integration.
- **Performance & Accessibility**: Auto-downgrades on low FPS (`AdaptiveDpr`, `PerformanceMonitor`), respects `prefers-reduced-motion`, full mobile optimization, semantic HTML, and full SEO metadata + Open Graph + Sitemap + Robots.

---

## 🛠️ Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your **Resend API Key**:

```env
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_TO_EMAIL=hafizhassanmehmood444@gmail.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

*(Note: If `RESEND_API_KEY` is left blank during local development, form submissions will log to the server console and simulate a successful response without failing).*

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 📂 Editing Personal Content

All portfolio content is decoupled from components and stored in clean TypeScript data files inside `/data`:

- **`/data/site.ts`**: Personal details (Name, Headline, Email, LinkedIn, GitHub, TechNest Nova company links, CV URL, About section text).
- **`/data/skills.ts`**: Skill items grouped into categories (`Languages`, `Backend & Database`, `Mobile`, `Frontend`, `Tools & Practices`) with 3D positions and connection arrays.
- **`/data/experience.ts`**: Work history timeline items, prominent highlights, and bullet points.
- **`/data/projects.ts`**: Featured projects, statuses, tags, GitHub/Live links, and abstract cover gradients.
- **`/data/education.ts`**: Education degrees, institution info, and spoken languages proficiency.

---

## 🖼️ Personal Assets

- **Profile Picture**: Place your photo at `public/profile/hassan.jpg`.
- **Downloadable CV**: Place your PDF resume at `public/Hafiz_Hassan_Mehmood_CV.pdf`.
