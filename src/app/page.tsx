"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { useLenis } from "../hooks/useLenis";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { SelectedWork } from "../components/SelectedWork";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { TechStack } from "../components/TechStack";
import { Philosophy } from "../components/Philosophy";
import { LabExperiments } from "../components/LabExperiments";
import { GitHubSection } from "../components/GitHubSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { ResumeModal } from "../components/ResumeModal";

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  useLenis();

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Check URL hash on load for #resume
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#resume") {
      setIsResumeOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-(--bg-primary) text-(--text-primary) relative selection:bg-vermilion selection:text-white transition-colors duration-200">
      {/* Editorial Top Navigation */}
      <Navigation
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Structural Flow */}
      <main id="main-content" className="relative w-full max-w-full">
        {/* 00: Hero & Workshop Assembly */}
        <Hero theme={theme} onOpenResume={() => setIsResumeOpen(true)} />

        {/* 01: Curated Case Studies (Selected Work) */}
        <SelectedWork theme={theme} />

        {/* 02: About / Personal Introduction */}
        <About />

        {/* 03: Experience & Career Log */}
        <ExperienceTimeline />

        {/* 04: Capability-Driven Tech Stack */}
        <TechStack />

        {/* 05: Engineering Notes / How I Work */}
        <Philosophy />

        {/* 06: The Lab & Open Source Experiments */}
        <LabExperiments />

        {/* 07: Verified GitHub Activity Snapshot */}
        <GitHubSection />

        {/* 08: Functional Contact & Direct Channels */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Browser-Friendly Printable Resume Preview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
