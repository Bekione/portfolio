"use client";

import { motion } from "motion/react";
import { CheckCircle2, Cpu, Layers, Zap } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

export function About() {
  return (
    <section
      id="about"
      className="py-18 sm:py-24 border-b border-(--border-subtle) bg-(--bg-surface)"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-12 border-b border-(--border-subtle)">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-vermilion shrink-0 whitespace-nowrap">
              02 //
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
              ABOUT ME
            </h2>
          </div>
          <span className="font-mono text-xs text-(--text-muted) tracking-wider">
            BACKGROUND &amp; APPROACH
          </span>
        </div>

        {/* Asymmetric Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 items-start">
          {/* Main Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base sm:text-md text-(--text-secondary) leading-relaxed">
              <p className="text-xl sm:text-2xl font-display font-medium text-(--text-primary) leading-snug">
                <motion.span
                  className="inline-block text-vermilion font-display text-2xl sm:text-3xl select-none mr-1 cursor-default"
                  initial={{ opacity: 0, scale: 0.4, rotate: -25, y: -4 }}
                  whileInView={{
                    opacity: 1,
                    scale: [0.4, 1.35, 0.9, 1.12, 1],
                    rotate: [-25, 12, -9, 5, 0],
                    x: [0, -4, 3, -1, 0],
                    y: [-4, 2, -1, 0],
                  }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: [-10, 10, -6, 0],
                    transition: { duration: 0.4 },
                  }}
                >
                  &ldquo;
                </motion.span>
                I like working where product decisions, interfaces, and
                engineering meet.
                <motion.span
                  className="inline-block text-vermilion font-display text-2xl sm:text-3xl select-none ml-1 cursor-default"
                  initial={{ opacity: 0, scale: 0.4, rotate: 25, y: 4 }}
                  whileInView={{
                    opacity: 1,
                    scale: [0.4, 1.35, 0.9, 1.12, 1],
                    rotate: [25, -12, 9, -5, 0],
                    x: [0, 4, -3, 1, 0],
                    y: [4, -2, 1, 0],
                  }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.16,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: [10, -10, 6, 0],
                    transition: { duration: 0.4 },
                  }}
                >
                  &rdquo;
                </motion.span>
              </p>

              <p>
                Over the last few years I've worked on everything from
                multi-tenant marketplaces and large ERP systems to AI-powered
                voice applications and mobile products.
              </p>

              <p>
                I enjoy taking complicated requirements, understanding the
                system underneath them, and turning them into software that
                feels simple to use.
              </p>
            </div>

            {/* Core Working Tenets */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-(--border-subtle) bg-(--bg-primary) rounded-xs">
                <div className="flex items-center gap-2 pb-2 text-xs font-mono font-semibold text-(--text-primary)">
                  <Layers className="w-4 h-4 text-vermilion" />
                  <span>INTERFACES & DETAIL</span>
                </div>
                <p className="text-xs text-(--text-secondary) leading-normal">
                  I care about how software feels to use — clean typography,
                  clear hierarchy, keyboard shortcuts, and interactions that
                  feel snappy.
                </p>
              </div>

              <div className="p-4 border border-(--border-subtle) bg-(--bg-primary) rounded-xs">
                <div className="flex items-center gap-2 pb-2 text-xs font-mono font-semibold text-(--text-primary)">
                  <Zap className="w-4 h-4 text-vermilion" />
                  <span>PERFORMANCE & SPEED</span>
                </div>
                <p className="text-xs text-(--text-secondary) leading-normal">
                  Slow software is frustrating. I treat latency as a bug,
                  whether that means virtualizing 100k-row tables or cutting
                  voice delays.
                </p>
              </div>
            </div>
          </div>

          {/* Dossier & Verified Metadata (5 cols) */}
          <div className="lg:col-span-5 p-6 border border-(--border-subtle) bg-(--bg-primary) rounded-xs space-y-6">
            <div className="flex items-center justify-between border-b border-(--border-subtle) pb-3">
              <span className="font-mono text-xs font-semibold text-(--text-primary) tracking-wider">
                AT A GLANCE
              </span>
              <span className="font-mono text-[11px] text-vermilion">
                STATUS: AVAILABLE
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between items-baseline py-1 border-b border-(--border-subtle)/60">
                <span className="text-(--text-muted)">NAME</span>
                <span className="font-medium text-(--text-primary)">
                  Bereket Kinfe
                </span>
              </div>

              <div className="flex justify-between items-baseline py-1 border-b border-(--border-subtle)/60">
                <span className="text-(--text-muted)">CURRENT LOCATION</span>
                <span className="font-medium text-(--text-primary)">
                  Addis Ababa, Ethiopia
                </span>
              </div>

              <div className="flex justify-between items-baseline py-1 border-b border-(--border-subtle)/60">
                <span className="text-(--text-muted)">EXPERIENCE</span>
                <span className="font-medium text-(--text-primary)">
                  ~4 Years Building Software
                </span>
              </div>

              <div className="flex justify-between items-baseline py-1 border-b border-(--border-subtle)/60">
                <span className="text-(--text-muted)">CORE FOCUS</span>
                <span className="font-medium text-(--text-primary)">
                  Product & Systems Engineering
                </span>
              </div>

              <div className="py-1">
                <span className="block text-(--text-muted) pb-2">
                  WHAT MATTERS TO ME
                </span>
                <div className="space-y-2 text-(--text-secondary) font-sans text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                    <span>
                      Clarity of data contracts beats clever hacks every time.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                    <span>
                      The best developer experience translates into bulletproof
                      user experience.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                    <span>
                      Respect production edge cases: latency, flaky connections,
                      large data payloads.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-(--border-subtle) flex items-center justify-between text-[11px] font-mono text-(--text-muted)">
              <span>TIMEZONE: UTC+3 (EAT)</span>
              <span className="text-vermilion">OPEN FOR HIRE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
