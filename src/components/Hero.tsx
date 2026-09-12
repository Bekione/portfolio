"use client";

import { ArrowDown, Coffee, Mail, MapPin, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { Theme } from "../hooks/useTheme";
import { LiveCodingMonitor } from "./live-monitor/LiveCodingMonitor";
import { StrokeText } from "./StrokeText";
import { Noise } from "./Noise";

interface HeroProps {
  theme?: Theme;
  onOpenResume: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 bg-drafting-grid overflow-hidden"
    >
      {/* Soft gradient wash at bottom edge to smoothly fade out the grid into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-(--bg-primary) via-(--bg-primary)/70 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
        {/* Top Operational Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 border-b border-(--border-subtle)/80 text-[11px] font-mono tracking-wider text-(--text-secondary)">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion"></span>
            </span>
            <span className="text-(--text-primary) font-medium">STATUS:</span>
            <span>OPEN TO REMOTE & FULL-TIME ROLES</span>
          </div>

          <div className="flex items-center gap-4 text-(--text-muted)">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-vermilion" />
              <span>ADDIS ABABA, ETHIOPIA</span>
            </span>
          </div>
        </div>

        {/* Asymmetric Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-10 pb-8">
          {/* Main Typography Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-(--text-muted) uppercase">
              <Terminal className="w-3.5 h-3.5 text-vermilion" />
              <span>SOFTWARE ENGINEER</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.04] text-(--text-primary) tracking-tight">
              I BUILD{" "}
              <StrokeText
                text="SYSTEMS,"
                strokeColor="var(--accent)"
                fillColor="var(--text-primary)"
                strokeWidth={1.5}
                drawDuration={1.4}
                fillDelay={0.15}
                stagger={0.04}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
              />
              <br />
              <span className="text-vermilion">NOT JUST</span> INTERFACES.
            </h1>

            <p className="text-base sm:text-lg text-(--text-secondary) leading-relaxed max-w-2xl font-normal">
              {PERSONAL_INFO.bioShort}
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => scrollToSection("work")}
                className="overflow-hidden relative group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#151515b9] dark:bg-[#ece8e0b9] text-[#F3F0E8] dark:text-[#121211] hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white font-mono text-xs font-medium tracking-wider transition-all duration-150 rounded-xs shadow-xs cursor-pointer"
              >
                <Noise />
                <span className="relative z-10">VIEW SELECTED WORK</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform relative z-10" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 border border-(--border-strong) hover:border-vermilion hover:text-vermilion bg-(--bg-surface) text-(--text-primary) font-mono text-xs font-medium tracking-wider transition-all duration-150 rounded-xs cursor-pointer"
              >
                <Noise />
                <Mail className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">GET IN TOUCH</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-(--text-muted) hover:text-vermilion font-mono text-xs tracking-wider transition-colors cursor-pointer"
              >
                <span>DOWNLOAD RESUME (PDF)</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Coding Workstation (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-[480px]">
              <LiveCodingMonitor />
            </div>
          </div>
        </div>

        {/* Bottom Technical Overview Strip */}
        <div className="mt-[3.75px]! pt-6 border-t border-(--border-subtle)/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {PERSONAL_INFO.verifiedFacts.map((fact, idx) => (
            <div key={idx} className="space-y-1">
              <span className="block font-mono text-[10px] tracking-widest text-(--text-muted) uppercase">
                {fact.label}
              </span>
              <p className="font-mono text-xs sm:text-sm font-medium text-(--text-primary)">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
