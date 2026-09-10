import { useState } from "react";
import { TECH_STACK } from "../data/portfolioData";

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("01");

  return (
    <section
      id="stack"
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
              ENGINEERING STACK
            </h2>
          </div>
          <span className="font-mono text-xs text-(--text-muted) tracking-wider">
            PRIMARY TECHNOLOGIES & CORE TOOLS
          </span>
        </div>

        {/* Category Navigation Pills */}
        <div className="pt-8 pb-10 flex flex-wrap gap-2 border-b border-(--border-subtle)">
          {TECH_STACK.map((cat) => {
            const isSelected = activeCategory === cat.number;
            return (
              <button
                key={cat.number}
                onClick={() => setActiveCategory(cat.number)}
                className={`px-4 py-2 text-xs font-mono rounded-xs transition-colors border ${
                  isSelected
                    ? "border-vermilion bg-(--bg-surface) text-vermilion font-semibold"
                    : "border-(--border-subtle) bg-transparent text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-strong)"
                }`}
              >
                <span className="opacity-60">{cat.number}.</span> {cat.title}
              </button>
            );
          })}
        </div>

        {/* Active Category Breakdown */}
        {TECH_STACK.map((cat) => {
          if (cat.number !== activeCategory) return null;
          return (
            <div key={cat.number} className="pt-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-(--border-subtle)">
                <div>
                  <span className="font-mono text-xs text-vermilion">
                    DOMAIN // {cat.number}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-(--text-primary)">
                    {cat.title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-(--text-muted)">
                  {cat.subtitle}
                </p>
              </div>

              {/* Skills Grid with Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
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
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
