import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Beaker,
  Code2,
  ExternalLink,
  GitBranch,
} from "lucide-react";
import { LAB_EXPERIMENTS } from "../data/portfolioData";
import { useAutoAdvance } from "../hooks/useAutoAdvance";
import { Noise } from "./Noise";

export function LabExperiments() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = [
    "All",
    "Developer Tool",
    "SaaS",
    "Landing Page",
    "AI / Bot",
  ];

  const currentFilterIndex = categories.indexOf(selectedFilter);

  const {
    containerRef: autoAdvanceRef,
    containerProps,
    pauseOnManualInteraction,
  } = useAutoAdvance({
    items: categories,
    currentIndex: Math.max(0, currentFilterIndex),
    onAdvance: (_, nextCategory) => {
      setSelectedFilter(nextCategory);
    },
    interval: 6500,
  });

  const filteredExperiments =
    selectedFilter === "All"
      ? LAB_EXPERIMENTS
      : LAB_EXPERIMENTS.filter((exp) => exp.category === selectedFilter);

  return (
    <section
      id="lab"
      ref={autoAdvanceRef}
      {...containerProps}
      className="py-18 sm:py-24 border-b border-(--border-subtle) bg-(--bg-primary)"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-12 border-b border-(--border-subtle)">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-vermilion shrink-0 whitespace-nowrap">
              05 //
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
              THE LAB & EXPERIMENTS
            </h2>
          </div>
          <span className="font-mono text-xs text-(--text-muted) tracking-wider">
            OPEN SOURCE TOOLS, PROTOYPES & PROOFS OF CONCEPT
          </span>
        </div>

        {/* Filter Pills */}
        <div className="pt-8 pb-10 flex flex-wrap gap-2 border-b border-(--border-subtle)">
          {categories.map((cat) => {
            const isSelected = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  pauseOnManualInteraction(10000);
                  setSelectedFilter(cat);
                }}
                className={`px-3.5 py-1.5 min-h-8 items-center text-xs font-mono rounded-xs transition-colors border cursor-pointer relative ${
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
                    layoutId="activeLabFilter"
                    className="absolute -inset-px rounded-xs border border-vermilion bg-(--bg-surface)/80 backdrop-blur-xs shadow-xs pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Experiments Grid */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {filteredExperiments.map((exp) => (
              <motion.div
                key={exp.id}
                layout={true}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="p-6 border border-(--border-subtle) bg-(--bg-surface) rounded-xs flex flex-col justify-between hover:border-(--border-strong) transition-colors group h-full min-h-92.5"
              >
                {/* Upper Content Area */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 border border-(--border-subtle) rounded-xs text-(--text-muted)">
                        {exp.category}
                      </span>
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                        ● {exp.status}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-(--text-primary) group-hover:text-vermilion transition-colors">
                      {exp.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed font-sans">
                      {exp.description}
                    </p>
                  </div>

                  {/* Aligned Note Section */}
                  {exp.notes && (
                    <div className="mt-auto pt-3">
                      <div className="p-2.5 bg-(--bg-primary) border border-(--border-subtle)/70 rounded-xs text-[11px] font-mono text-(--text-secondary) min-h-12.5 flex items-center">
                        <div>
                          <span className="text-vermilion font-semibold">
                            Note:
                          </span>{" "}
                          <span>{exp.notes}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Section */}
                <div className="mt-5 pt-4 border-t border-(--border-subtle) space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono border border-(--border-subtle) bg-(--bg-primary) text-(--text-secondary) rounded-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={exp.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${exp.title} repository on GitHub`}
                    className="inline-flex items-center gap-1.5 py-1 min-h-7 text-xs font-mono text-vermilion hover:underline font-medium"
                  >
                    <span>VIEW REPOSITORY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
