import { PHILOSOPHY_PRINCIPLES } from "../data/portfolioData";

export function Philosophy() {
  return (
    <section className="py-24 border-b border-(--border-subtle) bg-(--bg-surface)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-12 border-b border-(--border-subtle)">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-vermilion">
              NOTE //
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
              ENGINEERING NOTES: HOW I WORK
            </h2>
          </div>
          <span className="font-mono text-xs text-(--text-muted) tracking-wider">
            FIRST PRINCIPLES & WORKING PHILOSOPHY
          </span>
        </div>

        {/* Principles Grid */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHILOSOPHY_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-6 border border-(--border-subtle) bg-(--bg-primary) rounded-xs flex flex-col justify-between space-y-4 hover:border-(--border-strong) transition-colors"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-vermilion">
                  {principle.number}.
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-(--text-primary) tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-(--text-secondary) leading-relaxed">
                  {principle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-(--border-subtle)">
                <p className="text-xs text-(--text-muted) leading-relaxed font-sans">
                  {principle.rationale}
                </p>
              </div>
            </div>
          ))}

          {/* Workshop Manifesto Card */}
          <div className="p-6 border border-dashed border-vermilion/40 bg-vermilion/5 rounded-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-vermilion">
                SUMMATION //
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-(--text-primary) tracking-tight">
                QUIET CRAFT OVER NOISE.
              </h3>
              <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                The objective isn't to look like a generic developer template.
                It's to build systems that people can rely on day after day.
              </p>
            </div>
            <div className="pt-4 border-t border-vermilion/20 font-mono text-[10px] text-(--text-muted)">
              ADDIS ABABA // EST. 2023
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
