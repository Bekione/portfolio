"use client";

import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Briefcase,
} from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { StrokeText } from "./StrokeText";
import { Noise } from "./Noise";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 sm:py-20 bg-(--bg-surface) border-t border-(--border-subtle) text-(--text-secondary)">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Creative Vertical Split: Left (Closing & Identity) | Right (Channels & Colophon) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Slogan & Professional Identity */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-vermilion" />
              <span className="font-mono text-xs text-vermilion font-semibold tracking-wider">
                CLOSING REMARK // {currentYear}
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--text-primary) leading-[1.08]">
              BUILT WITH{" "}
              <StrokeText
                text="CURIOSITY."
                strokeColor="var(--accent)"
                fillColor="var(--text-primary)"
                strokeWidth={1.5}
                drawDuration={1.2}
                fillDelay={0.15}
                stagger={0.035}
                ease="power2.out"
                trigger="scroll"
                fillMode="wipe"
              />
              <br />
              <span className="text-vermilion">
                SHIPPED WITH{" "}
                <StrokeText
                  text="INTENT."
                  strokeColor="var(--accent)"
                  fillColor="currentColor"
                  strokeWidth={1.5}
                  delay={0.4}
                  drawDuration={1.1}
                  fillDelay={0.3}
                  stagger={0.035}
                  ease="power2.out"
                  trigger="scroll"
                  fillMode="wipe"
                />
              </span>
            </h2>

            <div className="space-y-2 pt-2 max-w-xl">
              <span className="font-bold text-(--text-primary) text-sm tracking-wide block">
                BEREKET KINFE
              </span>
              <p className="text-xs sm:text-sm text-(--text-secondary) font-sans leading-relaxed">
                Software Engineer working across frontend architecture,
                real-time voice streaming, and enterprise data systems.
              </p>
              <div className="text-[11px] font-mono text-(--text-muted) pt-1">
                Addis Ababa, Ethiopia (UTC+3) • Open to Remote Worldwide
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Actions, Channels & Technical Specification */}
          <div className="lg:col-span-5 space-y-8 lg:border-l lg:border-(--border-subtle) lg:pl-10">
            {/* Back To Top Action */}
            <div className="flex items-center justify-between pb-6 border-b border-(--border-subtle)">
              <span className="font-mono text-[11px] text-(--text-muted) uppercase tracking-wider">
                RETURN TO TOP
              </span>
              <button
                onClick={scrollToTop}
                aria-label="Return to top of page"
                className="relative overflow-hidden inline-flex items-center gap-2 px-3.5 py-2 min-h-[36px] border border-(--border-strong) hover:border-vermilion text-xs font-mono text-(--text-primary) hover:text-vermilion rounded-xs transition-colors cursor-pointer group"
              >
                <Noise />
                <span>BACK TO TOP</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Channels List */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-[10px] text-(--text-muted) uppercase tracking-wider block">
                VERIFIED CHANNELS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (Bekione)"
                  className="p-2.5 min-h-[44px] border border-(--border-subtle) hover:border-(--border-strong) bg-(--bg-primary) rounded-xs hover:text-vermilion transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-vermilion" />
                    <span>github.com/Bekione</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-(--text-muted) group-hover:text-vermilion transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (Bereket Kinfe)"
                  className="p-2.5 min-h-[44px] border border-(--border-subtle) hover:border-(--border-strong) bg-(--bg-primary) rounded-xs hover:text-vermilion transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-vermilion" />
                    <span>linkedin.com/in/bereket-k</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-(--text-muted) group-hover:text-vermilion transition-colors" />
                </a>

                {PERSONAL_INFO.upwork && (
                  <a
                    href={PERSONAL_INFO.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Upwork profile (Bereket Kinfe)"
                    className="p-2.5 min-h-[44px] border border-(--border-subtle) hover:border-[#14a800]/50 bg-(--bg-primary) rounded-xs hover:text-[#14a800] transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#14a800]" />
                      <span>Upwork / Verified Freelancer</span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-(--text-muted) group-hover:text-[#14a800] transition-colors" />
                  </a>
                )}

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  aria-label={`Send email to ${PERSONAL_INFO.email}`}
                  className="p-2.5 min-h-[44px] border border-(--border-subtle) hover:border-(--border-strong) bg-(--bg-primary) rounded-xs hover:text-vermilion transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-vermilion" />
                    <span>{PERSONAL_INFO.email}</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-(--text-muted) group-hover:text-vermilion transition-colors" />
                </a>
              </div>
            </div>

            {/* Technical Specification & Copyright */}
            <div className="pt-4 border-t border-(--border-subtle) text-[11px] font-mono text-(--text-muted) space-y-1">
              <span className="text-[10px] uppercase tracking-wider block text-(--text-secondary)">
                SPECIFICATION
              </span>
              <p>NEXT.JS APP ROUTER // REACT 19</p>
              <p>TAILWIND CSS // TYPESCRIPT</p>
              <p className="pt-2 text-[10px] text-(--text-muted)">
                © {currentYear} BEREKET KINFE. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
