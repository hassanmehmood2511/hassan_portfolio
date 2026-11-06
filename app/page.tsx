"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ScrollProvider } from "@/hooks/useScrollProgress";
import { Preloader } from "@/components/layout/Preloader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AmbientBackground } from "@/components/layout/AmbientBackground";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

// Dynamic load R3F Canvas Scene with ssr: false
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <ScrollProvider>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      <SmoothScroll>
        {/* Ambient forest-to-sand background, behind everything */}
        <AmbientBackground />

        {/* Background Persistent 3D R3F Scene */}
        <Scene />

        {/* Foreground Page Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1">
            <Hero />
            <About />
            <Skills />
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
