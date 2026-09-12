import { Calendar, CheckCircle2, ChevronRight, MapPin } from "lucide-react";
import { WORK_EXPERIENCE } from "../data/portfolioData";

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="py-24 border-b border-(--border-subtle) bg-(--bg-surface)"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-12 border-b border-(--border-subtle)">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-vermilion">
              03 //
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
              WHERE I'VE WORKED
            </h2>
          </div>
          <span className="font-mono text-xs text-(--text-muted) tracking-wider">
            ROLES & TEAMS // 2023–PRESENT
          </span>
        </div>

        {/* Timeline Log View */}
        <div className="pt-10 divide-y divide-(--border-subtle)">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <div
              key={idx}
              className="py-10 first:pt-4 last:pb-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start group"
            >
              {/* Period & Company Meta (4 cols) */}
              <div className="lg:col-span-4 space-y-2">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-vermilion font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-vermilion" />
                  <span>{exp.period}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-(--text-primary) group-hover:text-vermilion transition-colors">
                  {exp.company}
                </h3>

                <div className="text-xs font-mono text-(--text-secondary) font-medium">
                  {exp.role}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-(--text-muted) pt-1">
                  <MapPin className="w-3 h-3 text-(--text-muted)" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Responsibilities & Achievements (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Points */}
                <div className="space-y-2">
                  {exp.keyResponsibilities.map((resp, rIdx) => (
                    <div
                      key={rIdx}
                      className="flex items-start gap-2.5 text-xs text-(--text-secondary)"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="pt-3 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 font-mono text-[10px] border border-(--border-subtle) bg-(--bg-primary) text-(--text-primary) rounded-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
