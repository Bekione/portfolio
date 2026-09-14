"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { WORK_EXPERIENCE } from "../data/portfolioData";

const CARD_COUNT = WORK_EXPERIENCE.length;
const TRANSITIONS = CARD_COUNT - 1;
const END_BUFFER = 80;

export function ExperienceTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [discreteStep, setDiscreteStep] = useState(0);
  const [roleDisplay, setRoleDisplay] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const lastDiscreteRef = useRef(-1);
  const lastRoleRef = useRef(-1);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    let lastW = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== lastW) { lastW = window.innerWidth; update(); }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollPerStep = isMobile ? 260 : 340;
  const totalScroll = TRANSITIONS * scrollPerStep + END_BUFFER;

  const applyCardTransforms = useCallback((currentStep: number) => {
    for (let idx = 0; idx < CARD_COUNT; idx++) {
      const card = cardRefs.current[idx];
      if (!card) continue;
      let translateY = 0;
      if (idx > 0) {
        const prog = Math.min(1, Math.max(0, currentStep - (idx - 1)));
        translateY = (1 - prog) * 100;
      }
      card.style.transform = `translate3d(0, ${translateY}%, 0)`;
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const mobile = window.innerWidth < 768;
      const stepDist = mobile ? 260 : 340;
      const stickyTop = mobile ? 56 : 64;

      // getBoundingClientRect().top is viewport-relative.
      // scrolled = how many px the wrapper's top has passed the sticky threshold.
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrolled = stickyTop - rect.top;

      const activeScrolled = Math.min(TRANSITIONS * stepDist, Math.max(0, scrolled));
      const currentStep = activeScrolled / stepDist;

      applyCardTransforms(currentStep);

      const newDiscrete = Math.round(currentStep);
      const newRole = Math.min(CARD_COUNT, Math.floor(currentStep) + 1);
      if (newDiscrete !== lastDiscreteRef.current) {
        lastDiscreteRef.current = newDiscrete;
        setDiscreteStep(newDiscrete);
      }
      if (newRole !== lastRoleRef.current) {
        lastRoleRef.current = newRole;
        setRoleDisplay(newRole);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [applyCardTransforms]);

  return (
    <section
      id="experience"
      className="relative pt-18 sm:pt-24 bg-(--bg-surface) border-b border-(--border-subtle)"
    >
      <div
        ref={wrapperRef}
        className="relative"
        style={{
          height: `calc(${isMobile ? "100svh - 3.5rem" : "100vh - 4rem"} + ${totalScroll}px)`,
        }}
      >
        {/*
          NO transform on this sticky element.
          Applying any CSS transform to position:sticky breaks Chrome/Safari's compositor:
          the element gets painted on the CPU thread instead of the GPU layer, causing
          visible position jitter against its sticky threshold on every scroll frame.
        */}
        <div
          className="sticky top-16 md:top-16 bg-(--bg-surface) w-full overflow-hidden border-b border-(--border-subtle) h-[calc(100svh-3.5rem)] md:h-[calc(100vh-4rem)] flex flex-col justify-between"
        >
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-8 md:py-10 flex flex-col flex-1 justify-between min-h-0">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pb-2.5 sm:pb-5 md:pb-6 border-b border-(--border-subtle) shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-vermilion shrink-0 whitespace-nowrap">
                  03 //
                </span>
                <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-(--text-primary)">
                  WHERE I'VE WORKED
                </h2>
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-(--text-muted) tracking-wider">
                ROLES &amp; TEAMS // 2023–PRESENT
              </span>
            </div>

            {/* Experience Stage with Pure Hardware-Accelerated Layout */}
            <div className="flex-1 flex flex-col justify-center py-2 sm:py-4 min-h-0">
              <div className="relative w-full h-[370px] sm:h-[400px] md:h-[360px] lg:h-[340px] overflow-hidden">
                <div className="relative w-full h-full overflow-hidden">
                  {WORK_EXPERIENCE.map((exp, idx) => (
                    <div
                      key={idx}
                      ref={(el) => { cardRefs.current[idx] = el; }}
                      className="absolute inset-0 bg-(--bg-surface) overflow-y-auto scrollbar-none border-t border-(--border-subtle)"
                      style={{
                        transform: `translate3d(0, ${idx === 0 ? 0 : 100}%, 0)`,
                        zIndex: idx + 1,
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <div className="py-3 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-6 lg:gap-8 items-start group">
                        <div className="lg:col-span-4 space-y-1 sm:space-y-2">
                          <div className="flex flex-wrap items-center justify-between lg:justify-start gap-2">
                            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-vermilion font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-vermilion" />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-(--text-muted) lg:hidden">
                              <MapPin className="w-3 h-3 text-(--text-muted)" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                          <h3 className="font-display text-base sm:text-xl font-bold text-(--text-primary) group-hover:text-vermilion transition-colors">
                            {exp.company}
                          </h3>
                          <div className="text-xs font-mono text-(--text-secondary) font-medium">
                            {exp.role}
                          </div>
                          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-(--text-muted) pt-1">
                            <MapPin className="w-3 h-3 text-(--text-muted)" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <div className="lg:col-span-8 space-y-2 sm:space-y-4">
                          <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                            {exp.description}
                          </p>
                          <div className="space-y-1.5 sm:space-y-2">
                            {exp.keyResponsibilities.map((resp, rIdx) => (
                              <div key={rIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-(--text-secondary)">
                                <ChevronRight className="w-3.5 h-3.5 text-vermilion shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-1 sm:pt-2 flex flex-wrap gap-1 sm:gap-1.5">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-1.5 sm:px-2 py-0.5 font-mono text-[9px] sm:text-[10px] border border-(--border-subtle) bg-(--bg-primary) text-(--text-primary) rounded-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Elegant bottom fade */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-7 bg-gradient-to-t from-(--bg-surface) to-transparent z-20"
                  />
                </div>
              </div>
            </div>

            {/* Step Pills & Role Counter */}
            <div className="pb-2.5 pt-4 sm:py-4 border-t border-(--border-subtle)/60 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                {WORK_EXPERIENCE.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      discreteStep === i ? "w-6 bg-vermilion" : "w-1.5 bg-(--border-strong)"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-(--text-muted)">
                {roleDisplay} / {CARD_COUNT} ROLES
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
