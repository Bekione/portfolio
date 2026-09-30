"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TECH_STACK } from "../data/portfolioData";
import { useAutoAdvance } from "../hooks/useAutoAdvance";
import { Noise } from "./Noise";
import { ScrollFade } from "./ScrollFade";

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

  const tabListRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const activeBtn = buttonRefs.current[activeCategory];
    const container = tabListRef.current;
    if (activeBtn && container) {
      const targetScroll =
        activeBtn.offsetLeft -
        container.clientWidth / 2 +
        activeBtn.offsetWidth / 2;
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

  const currentCat =
    TECH_STACK.find((cat) => cat.number === activeCategory) || TECH_STACK[0];

  return (
    <section
      id="stack"
      ref={autoAdvanceRef}
      {...containerProps}
      className="py-18 sm:py-24 border-b border-(--border-subtle) bg-(--bg-primary)"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-12 border-b border-(--border-subtle)">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-vermilion shrink-0 whitespace-nowrap">
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
        <div className="pt-6 pb-8 border-b border-(--border-subtle)">
          <ScrollFade direction="horizontal" fadeSize={36} className="w-full p-1 -m-1">
            <div
              ref={tabListRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-2"
            >
              {TECH_STACK.map((cat) => {
                const isSelected = activeCategory === cat.number;
                return (
                  <button
                    key={cat.number}
                    ref={(el) => {
                      buttonRefs.current[cat.number] = el;
                    }}
                    onClick={() => {
                      pauseOnManualInteraction(10000);
                      setActiveCategory(cat.number);
                    }}
                    className={`shrink-0 whitespace-nowrap px-4 py-2 min-h-9 text-xs font-mono rounded-xs transition-colors border cursor-pointer relative flex items-center gap-1.5 ${
                      isSelected
                        ? "border-transparent text-vermilion font-semibold"
                        : "border-(--border-subtle) bg-transparent text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-strong)"
                    }`}
                  >
                    <div className="absolute inset-0 overflow-hidden rounded-xs pointer-events-none">
                      <Noise />
                    </div>
                    {isSelected && (
                      <motion.span
                        layoutId="activeTechStackCategory"
                        className="absolute -inset-px rounded-xs border border-vermilion bg-(--bg-surface)/80 backdrop-blur-xs shadow-xs pointer-events-none"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="text-(--text-muted) relative z-10">
                      {cat.number}.
                    </span>
                    <span className="relative z-10">{cat.title}</span>
                  </button>
                );
              })}
            </div>
          </ScrollFade>
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
