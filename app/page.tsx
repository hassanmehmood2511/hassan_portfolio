"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ScrollProvider } from "@/hooks/useScrollProgress";
import { Preloader } from "@/components/layout/Preloader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { SkillCategory } from "@/data/skills";

// Dynamic load R3F Canvas Scene with ssr: false
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "All">("All");

  return (
    <ScrollProvider>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      <SmoothScroll>
        {/* Background Persistent 3D R3F Scene */}
        <Scene selectedCategory={selectedCategory} />

        {/* Foreground Page Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1">
            <Hero />
            <About />
            <Skills
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
            />
            <Experience />
            <Projects />
            <Education />
            <Contact />
          </main>

          <Footer />
        </div>
      </SmoothScroll>
    </ScrollProvider>
  );
}
