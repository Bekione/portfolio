"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TECH_STACK } from "../data/portfolioData";
import { useAutoAdvance } from "../hooks/useAutoAdvance";
import { Noise } from "./Noise";

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("01");

  const currentCatIndex = TECH_STACK.findIndex(
    (cat) => cat.number === activeCategory,
  );

  const {
    containerRef: autoAdvanceRef,
    containerProps,
    pauseOnManualInteraction,
  } = useAutoAdvance({
    items: TECH_STACK,
    currentIndex: Math.max(0, currentCatIndex),
    onAdvance: (_, nextCat) => {
      setActiveCategory(nextCat.number);
    },
    interval: 6500,
  });

  const currentCat =
    TECH_STACK.find((cat) => cat.number === activeCategory) || TECH_STACK[0];

  return (
    <section
      id="stack"
      ref={autoAdvanceRef}
      {...containerProps}
      className="py-24 border-b border-(--border-subtle) bg-(--bg-primary)"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-12 border-b border-(--border-subtle)">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-vermilion">
              04 //
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
              TOOLS & TECHNOLOGIES
            </h2>
          </div>
          <span className="font-mono text-xs text-(--text-muted) tracking-wider">
            WHAT I USE TO BUILD PRODUCTS
          </span>
        </div>

        {/* Category Navigation Pills */}
        <div className="pt-8 pb-10 flex flex-wrap gap-2 border-b border-(--border-subtle)">
          {TECH_STACK.map((cat) => {
            const isSelected = activeCategory === cat.number;
            return (
              <button
                key={cat.number}
                onClick={() => {
                  pauseOnManualInteraction(10000);
                  setActiveCategory(cat.number);
                }}
                className={`px-4 py-2 text-xs font-mono rounded-xs transition-all border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "border-vermilion bg-(--bg-surface)/80 backdrop-blur-xs text-vermilion font-semibold shadow-xs"
                    : "border-(--border-subtle) bg-transparent text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-strong)"
                }`}
              >
                <Noise />
                <span className="opacity-60 relative z-10">{cat.number}.</span>{" "}
                <span className="relative z-10">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Breakdown */}
        <div className="pt-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-(--border-subtle)">
            <div>
              <span className="font-mono text-xs text-vermilion">
                DOMAIN // {currentCat.number}
              </span>
              <h3 className="font-display text-2xl font-bold text-(--text-primary)">
                {currentCat.title}
              </h3>
            </div>
            <p className="font-mono text-xs text-(--text-muted)">
              {currentCat.subtitle}
            </p>
          </div>

          {/* Skills Grid with Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <AnimatePresence mode="popLayout">
              {currentCat.skills.map((skill) => (
                <motion.div
                  key={`${currentCat.number}-${skill.name}`}
                  layout={true}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-4 border border-(--border-subtle) bg-(--bg-surface) rounded-xs hover:border-(--border-strong) transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs sm:text-sm text-(--text-primary)">
                      {skill.name}
                    </span>
                    {skill.level === "primary" && (
                      <span className="text-[10px] font-mono text-vermilion uppercase tracking-wider">
                        CORE
                      </span>
                    )}
                  </div>
                  {skill.context && (
                    <p className="text-xs text-(--text-secondary) leading-relaxed font-sans">
                      {skill.context}
                    </p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
