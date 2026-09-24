"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Check,
  ExternalLink,
  Zap,
  ArrowUpRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { FEATURED_PROJECTS } from "../data/portfolioData";
import { Project } from "../types";
import { useAutoAdvance } from "../hooks/useAutoAdvance";
import { useTheme, Theme } from "../hooks/useTheme";
import { Noise } from "./Noise";
import { ScrollFade } from "./ScrollFade";

export function SelectedWork({ theme: propTheme }: { theme?: Theme }) {
  const [activeProjectTab, setActiveProjectTab] = useState<string>(
    FEATURED_PROJECTS[0].id,
  );

  const currentProjIndex = FEATURED_PROJECTS.findIndex(
    (p) => p.id === activeProjectTab,
  );

  const {
    containerRef: autoAdvanceRef,
    containerProps,
    pauseOnManualInteraction,
  } = useAutoAdvance({
    items: FEATURED_PROJECTS,
    currentIndex: Math.max(0, currentProjIndex),
    onAdvance: (_, nextProject) => {
      setActiveProjectTab(nextProject.id);
    },
    interval: 8000,
  });

  // Pause tabs auto-advance when user interacts with theme toggle in navbar
  useEffect(() => {
    const handleNavHover = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      if (customEvent.detail) {
        pauseOnManualInteraction(15000);
      }
    };
    const handleNavTransition = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      if (customEvent.detail) {
        pauseOnManualInteraction(15000);
      }
    };
    window.addEventListener("bk_nav_theme_hover", handleNavHover);
    window.addEventListener("bk_nav_theme_transition", handleNavTransition);
    return () => {
      window.removeEventListener("bk_nav_theme_hover", handleNavHover);
      window.removeEventListener("bk_nav_theme_transition", handleNavTransition);
    };
  }, [pauseOnManualInteraction]);

  return (
    <section
      id="work"
      ref={autoAdvanceRef}
      {...containerProps}
      className="py-18 sm:py-24 border-b border-(--border-subtle) bg-(--bg-primary)"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12 border-b border-(--border-subtle)">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-vermilion mb-1">
              <span className="shrink-0 whitespace-nowrap">01 //</span>
              <span>SELECTED WORK</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-(--text-primary)">
              WORK I'VE BUILT
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-(--text-secondary) leading-relaxed">
            A few systems and platforms I've built or worked on recently — what
            they do, the problems they solved, and what made them interesting.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="pt-8 pb-10 flex flex-wrap gap-2 border-b border-(--border-subtle)">
          {FEATURED_PROJECTS.map((project) => {
            const isSelected = activeProjectTab === project.id;
            return (
              <button
                key={project.id}
                onClick={() => {
                  pauseOnManualInteraction(12000);
                  setActiveProjectTab(project.id);
                }}
                className={`px-4 py-2.5 min-h-[36px] text-xs font-mono rounded-xs transition-all flex items-center gap-2 border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "border-vermilion bg-(--bg-surface)/80 backdrop-blur-xs text-vermilion font-semibold shadow-xs"
                    : "border-(--border-subtle) bg-transparent text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-strong)"
                }`}
              >
                <Noise />
                <span className="text-(--text-muted) relative z-10">
                  {project.number}.
                </span>
                <span className="relative z-10">
                  {project.title.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Project Showcase */}
        <AnimatePresence mode="wait">
          {(() => {
            const activeProject =
              FEATURED_PROJECTS.find((p) => p.id === activeProjectTab) ||
              FEATURED_PROJECTS[0];
            return (
              <motion.div
                key={activeProject.id}
                layout={true}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <ProjectCaseStudy project={activeProject} theme={propTheme} />
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCaseStudy({
  project,
  theme,
}: {
  project: Project;
  theme?: Theme;
}) {
  return (
    <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left Column: Narrative, Problem, Solution, Highlights (7 cols) */}
      <div className="lg:col-span-7 space-y-8">
        {/* Project Header Info */}
        <div className="space-y-3 pb-6 border-b border-(--border-subtle)">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-(--text-muted)">
            <span className="text-vermilion font-semibold">
              {project.number}
            </span>
            <span>//</span>
            <span>{project.year}</span>
            <span>//</span>
            <span className="text-(--text-primary)">{project.type}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-(--text-primary) tracking-tight">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed">
            {project.shortDescription}
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-(--text-secondary) pt-1">
            <span className="text-(--text-muted)">MY ROLE:</span>
            <span className="font-medium text-(--text-primary)">
              {project.role}
            </span>
          </div>
        </div>

        {/* Problem & Solution Cards */}
        <div className="space-y-5">
          <div className="p-5 border border-(--border-subtle) bg-(--bg-surface) rounded-xs space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-(--text-primary)">
              <span className="w-2 h-2 bg-vermilion rounded-full" />
              <span>THE PROBLEM</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed font-sans">
              {project.problem}
            </p>
          </div>

          <div className="p-5 border border-(--border-subtle) bg-(--bg-surface) rounded-xs space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-(--text-primary)">
              <Check className="w-3.5 h-3.5 text-vermilion" />
              <span>WHAT I BUILT</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed font-sans">
              {project.solution}
            </p>
          </div>

          <div className="p-5 border border-(--border-subtle) bg-(--bg-surface) rounded-xs space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-(--text-primary)">
              <Zap className="w-3.5 h-3.5 text-vermilion" />
              <span>THE RESULT</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed font-sans">
              {project.result}
            </p>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-semibold text-(--text-primary) tracking-wider uppercase">
            Key Details & What Was Interesting
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((highlight, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs text-(--text-secondary)"
              >
                <span className="font-mono text-vermilion text-[11px] select-none">
                  [{i + 1}]
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div className="pt-2">
          <div className="text-[11px] font-mono text-(--text-muted) mb-2">
            TECHNOLOGIES USED:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-mono border border-(--border-subtle) bg-(--bg-surface) text-(--text-primary) rounded-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: High-Fidelity Project Screenshot & Quick Metrics (5 cols) */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
        <ProjectScreenshotCard project={project} theme={theme} />
      </div>
    </div>
  );
}

function ProjectScreenshotCard({
  project,
  theme: propTheme,
}: {
  project: Project;
  theme?: Theme;
}) {
  const { theme: hookTheme } = useTheme();
  const theme = propTheme || hookTheme;
  const images =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];

  // Default to dark screenshot (index 1) if website theme is dark, otherwise light (index 0)
  const defaultIndex = theme === "dark" && images.length > 1 ? 1 : 0;
  const [activeImageIndex, setActiveImageIndex] = useState(defaultIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonsHovered, setIsButtonsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync screenshot with website theme or when project changes in real time
  useEffect(() => {
    setActiveImageIndex(theme === "dark" && images.length > 1 ? 1 : 0);
  }, [project.id, theme, images.length]);

  // Auto-switch between screenshots every 4.5s (pauses while hovering buttons or card or during zoom)
  useEffect(() => {
    if (images.length <= 1 || isHovered || isButtonsHovered || isZoomed) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length, isHovered, isButtonsHovered, isZoomed]);

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isZoomed]);

  return (
    <div className="space-y-4">
      {/* Browser Window Frame */}
      <div
        className="border border-(--border-strong) bg-(--bg-surface) rounded-xs shadow-md overflow-hidden relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Noise />

        {/* Window Chrome Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-(--bg-primary) border-b border-(--border-subtle)">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-vermilion/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-(--border-strong)" />
            <span className="w-2.5 h-2.5 rounded-full bg-(--border-strong)" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-(--bg-surface) border border-(--border-subtle) font-mono text-[11px] text-(--text-muted) max-w-[140px] sm:max-w-[200px] truncate">
              {project.liveUrl ? (
                <span className="text-(--text-secondary) truncate">
                  {project.liveUrl.replace(/^https?:\/\//, "")}
                </span>
              ) : (
                <span className="truncate">{project.id}.preview // internal</span>
              )}
            </div>

            {/* Light / Dark Mode Toggle Buttons (Icon only, click & hover with paused auto-switch) */}
            {images.length > 1 && (
              <div
                className="flex items-center gap-0.5 p-0.5 rounded-xs bg-(--bg-surface) border border-(--border-subtle)"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setIsButtonsHovered(true)}
                onMouseLeave={() => setIsButtonsHovered(false)}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(0);
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setIsButtonsHovered(true);
                    setActiveImageIndex(0);
                  }}
                  className={`p-1 rounded-2xs cursor-pointer transition-all ${
                    activeImageIndex === 0
                      ? "bg-vermilion text-white shadow-2xs"
                      : "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-primary)"
                  }`}
                  title="Light Mode Screenshot"
                  aria-label="Light Mode Screenshot"
                >
                  <Sun className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(1);
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setIsButtonsHovered(true);
                    setActiveImageIndex(1);
                  }}
                  className={`p-1 rounded-2xs cursor-pointer transition-all ${
                    activeImageIndex === 1
                      ? "bg-vermilion text-white shadow-2xs"
                      : "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-primary)"
                  }`}
                  title="Dark Mode Screenshot"
                  aria-label="Dark Mode Screenshot"
                >
                  <Moon className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsZoomed(true)}
            className="p-1 hover:text-vermilion text-(--text-muted) transition-colors cursor-pointer"
            title="Expand screenshot modal"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Screenshot Viewport - Fixed aspect-[1695/928] + object-contain prevents left/right cropping */}
        <div
          className="relative aspect-[1695/928] bg-[#0c0c0c] overflow-hidden cursor-pointer w-full group select-none"
          onClick={() => setIsZoomed(true)}
          title="Click to expand high-resolution preview"
        >
          {images.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${
                idx === activeImageIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 pointer-events-none z-0"
              }`}
            >
              <Image
                src={img}
                alt={
                  project.imageAlt ||
                  `${project.title} screenshot ${idx === 0 ? "light" : "dark"} mode`
                }
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                priority={project.number === "01" && idx === 0}
              />
            </div>
          ))}

          {/* Screenshot Overlay: Click to expand hint on hover */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20 flex items-center justify-end font-mono text-xs">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[11px] text-white/90 flex items-center gap-1.5 px-2 py-1 rounded-xs bg-black/70 backdrop-blur-xs border border-white/15">
              <Maximize2 className="w-3 h-3 text-vermilion" />
              <span>Expand Preview</span>
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row (if available) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {project.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-3 border border-(--border-subtle) bg-(--bg-surface) rounded-xs space-y-1"
            >
              <span className="block font-mono text-[10px] text-(--text-muted) uppercase">
                {metric.label}
              </span>
              <div className="font-mono text-sm sm:text-base font-bold text-vermilion">
                {metric.value}
              </div>
              {metric.change && (
                <span className="block font-mono text-[10px] text-(--text-secondary) truncate">
                  {metric.change}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Live link or NDA note */}
      <div className="flex items-center justify-between text-xs font-mono pt-1">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit live platform for ${project.title}`}
            className="relative overflow-hidden inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] rounded-xs bg-[#151515] dark:bg-[#ece8e0] text-[#F3F0E8] dark:text-[#121211] hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white transition-colors font-medium cursor-pointer"
          >
            <Noise />
            <span>VISIT LIVE PLATFORM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-(--text-muted) text-[11px] italic">
            Private commercial platform — source code under NDA.
          </span>
        )}
      </div>

      {/* Lightbox Modal with Embla Carousel rendered directly into document.body */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isZoomed && (
              <ProjectCarouselModal
                project={project}
                images={images}
                initialIndex={activeImageIndex}
                theme={theme}
                onClose={(finalIndex) => {
                  if (typeof finalIndex === "number") {
                    setActiveImageIndex(finalIndex);
                  }
                  setIsZoomed(false);
                }}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function ProjectCarouselModal({
  project,
  images,
  initialIndex,
  theme,
  onClose,
}: {
  project: Project;
  images: string[];
  initialIndex: number;
  theme?: Theme;
  onClose: (finalIndex?: number) => void;
}) {
  // If there are 2 images, duplicate to 4 slides so Embla's loop engine can seamlessly loop bidirectionally without disabling loop
  const slides = images.length === 2 ? [...images, ...images] : images;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndex,
    duration: 25,
  });

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [themeMode, setThemeMode] = useState(initialIndex);
  const [themeFade, setThemeFade] = useState<{
    fromImg: string;
    isExiting: boolean;
  } | null>(null);
  const themeFadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active normalized image index (0 for Light mode, 1 for Dark mode)
  const activeMode = selectedIndex % images.length;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const snap = emblaApi.selectedScrollSnap();
    const normalized = snap % images.length;
    setSelectedIndex(normalized);
    setThemeMode(normalized);
  }, [emblaApi, images.length]);

  const onPointerDown = useCallback(() => {
    // If a theme crossfade is in progress when the user grabs the slide, instantly clear it
    if (themeFadeTimerRef.current) {
      clearTimeout(themeFadeTimerRef.current);
    }
    setThemeFade(null);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, onPointerDown]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (themeFadeTimerRef.current) {
        clearTimeout(themeFadeTimerRef.current);
      }
    };
  }, []);

  const scrollPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!emblaApi) return;
      setThemeFade(null);
      emblaApi.scrollPrev();
    },
    [emblaApi],
  );

  const scrollNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!emblaApi) return;
      setThemeFade(null);
      emblaApi.scrollNext();
    },
    [emblaApi],
  );

  const handleDotClick = useCallback(
    (targetIndex: number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!emblaApi) return;
      setThemeFade(null);
      const currentSnap = emblaApi.selectedScrollSnap();
      const totalSlides = slides.length;
      let bestSnap = targetIndex;
      let minDiff = Infinity;
      for (let s = 0; s < totalSlides; s++) {
        if (s % images.length === targetIndex) {
          const diff = Math.abs(s - currentSnap);
          if (diff < minDiff) {
            minDiff = diff;
            bestSnap = s;
          }
        }
      }
      emblaApi.scrollTo(bestSnap);
    },
    [emblaApi, slides.length, images.length],
  );

  // Smooth in-place theme switch: used by Sun/Moon header buttons and website theme sync
  const handleThemeSwitch = useCallback(
    (targetIndex: number) => {
      if (!emblaApi) return;
      const currentSnap = emblaApi.selectedScrollSnap();
      const currentNormalized = currentSnap % images.length;
      if (targetIndex === currentNormalized) return;

      const fromImg = images[currentNormalized];

      // Find closest snap for silent align without horizontal sliding
      const totalSlides = slides.length;
      let bestSnap = targetIndex;
      let minDiff = Infinity;
      for (let s = 0; s < totalSlides; s++) {
        if (s % images.length === targetIndex) {
          const diff = Math.abs(s - currentSnap);
          if (diff < minDiff) {
            minDiff = diff;
            bestSnap = s;
          }
        }
      }

      // Jump Embla silently to the target slide underneath
      emblaApi.scrollTo(bestSnap, true);
      setSelectedIndex(targetIndex);
      setThemeMode(targetIndex);

      if (themeFadeTimerRef.current) {
        clearTimeout(themeFadeTimerRef.current);
      }

      // Animate outgoing image fading out to smoothly reveal the new slide underneath
      setThemeFade({ fromImg, isExiting: false });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setThemeFade({ fromImg, isExiting: true });
        });
      });

      themeFadeTimerRef.current = setTimeout(() => {
        setThemeFade(null);
      }, 400);
    },
    [emblaApi, slides.length, images],
  );

  // Sync with website theme ONLY if the website theme actually changes while modal is open
  const prevThemeRef = useRef(theme);
  useEffect(() => {
    if (prevThemeRef.current !== theme) {
      prevThemeRef.current = theme;
      if (theme && images.length > 1) {
        const targetIndex = theme === "dark" ? 1 : 0;
        handleThemeSwitch(targetIndex);
      }
    }
  }, [theme, images.length, handleThemeSwitch]);

  // Keyboard navigation: Left/Right arrows to flip slides, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        scrollNext();
      } else if (e.key === "Escape") {
        onClose(themeMode);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext, onClose, themeMode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onClose(themeMode)}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs p-2 sm:p-4 md:p-8 flex items-center justify-center cursor-zoom-out w-full h-[100dvh]"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-6xl w-full bg-(--bg-surface) border border-(--border-strong) rounded-xs overflow-hidden shadow-2xl my-auto cursor-default flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-(--bg-primary) border-b border-(--border-subtle) shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-vermilion shrink-0" />
            <span className="font-mono text-xs sm:text-sm text-(--text-primary) font-semibold truncate">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick mode switch buttons in header (Icon-only, hover and click for smooth in-place toggle) */}
            {images.length > 1 && (
              <div
                className="flex items-center gap-0.5 p-0.5 rounded-xs bg-(--bg-surface) border border-(--border-subtle)"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThemeSwitch(0);
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    handleThemeSwitch(0);
                  }}
                  className={`p-1.5 rounded-2xs cursor-pointer transition-all ${
                    activeMode === 0
                      ? "bg-vermilion text-white shadow-2xs"
                      : "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-primary)"
                  }`}
                  title="Light Mode Screenshot"
                  aria-label="Light Mode Screenshot"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThemeSwitch(1);
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    handleThemeSwitch(1);
                  }}
                  className={`p-1.5 rounded-2xs cursor-pointer transition-all ${
                    activeMode === 1
                      ? "bg-vermilion text-white shadow-2xs"
                      : "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-primary)"
                  }`}
                  title="Dark Mode Screenshot"
                  aria-label="Dark Mode Screenshot"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => onClose(themeMode)}
              className="p-1.5 rounded-xs border border-(--border-subtle) hover:border-vermilion bg-(--bg-surface) text-(--text-secondary) hover:text-vermilion transition-all cursor-pointer relative overflow-hidden flex items-center justify-center group"
              aria-label="Close modal"
              title="Close modal (Esc)"
            >
              <Noise />
              <X className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport Area with nav button gutters */}
        <div className="relative w-full bg-(--bg-primary) overflow-hidden select-none">
          {/* ScrollFade container: smooths left and right edges when images are swiped or slided */}
          <ScrollFade
            direction="horizontal"
            fadeSize={40}
            alwaysShowFade={images.length > 1}
            className="w-full aspect-[1695/928] max-h-[calc(94vh-90px)] mx-auto"
          >
            {/* Embla Viewport for Swiping and Next/Prev sliding */}
            <div
              className="absolute inset-0 overflow-hidden w-full h-full select-none"
              ref={emblaRef}
              onDragStart={(e) => e.preventDefault()}
            >
              <div className="flex h-full select-none">
                {slides.map((img, idx) => (
                  <div
                    key={`${img}-${idx}`}
                    className="flex-[0_0_100%] min-w-0 relative h-full w-full select-none"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} preview slide ${(idx % images.length) + 1}`}
                      fill
                      sizes="(max-width: 1400px) 100vw, 1400px"
                      className="object-contain object-center select-none pointer-events-none"
                      priority={idx === 0}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* In-Place Theme Crossfade Overlay: Only active during header Sun/Moon button toggles */}
            {themeFade && (
              <div
                className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-350 ease-in-out ${
                  themeFade.isExiting ? "opacity-0" : "opacity-100"
                }`}
              >
                <Image
                  src={themeFade.fromImg}
                  alt={`${project.title} preview transition`}
                  fill
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-contain object-center select-none pointer-events-none"
                  priority
                  draggable={false}
                />
              </div>
            )}
          </ScrollFade>

          {/* Bidirectional Navigation Arrows — positioned relative to the outer container so they sit at the edges, outside the image */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                className="absolute left-1.5 sm:left-2.5 top-1/2 -translate-y-1/2 z-30 min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] p-1.5 sm:p-2 flex items-center justify-center rounded-xs bg-(--bg-surface)/95 hover:bg-(--bg-surface) text-(--text-secondary) hover:text-vermilion border border-(--border-strong) hover:border-vermilion transition-all cursor-pointer backdrop-blur-xs shadow-md overflow-hidden group"
                aria-label="Previous image"
                title="Previous image (←)"
              >
                <Noise />
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="absolute right-1.5 sm:right-2.5 top-1/2 -translate-y-1/2 z-30 min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] p-1.5 sm:p-2 flex items-center justify-center rounded-xs bg-(--bg-surface)/95 hover:bg-(--bg-surface) text-(--text-secondary) hover:text-vermilion border border-(--border-strong) hover:border-vermilion transition-all cursor-pointer backdrop-blur-xs shadow-md overflow-hidden group"
                aria-label="Next image"
                title="Next image (→)"
              >
                <Noise />
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform group-hover:translate-x-0.5" />
              </button>
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-(--bg-primary) border-t border-(--border-subtle) font-mono text-[11px] shrink-0">
          {/* Slide Indicator Bars with accessible touch targets */}
          <div className="flex items-center gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleDotClick(idx, e)}
                className="p-1 sm:p-1.5 flex items-center justify-center cursor-pointer group"
                aria-label={`Jump to slide ${idx + 1}`}
              >
                <span
                  className={`h-1.5 transition-all rounded-xs block ${
                    idx === activeMode
                      ? "w-6 bg-vermilion shadow-2xs"
                      : "w-2.5 bg-(--border-strong) group-hover:bg-(--text-muted)"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-(--text-muted) text-[10px] sm:text-[11px]">
            <span className="px-1.5 py-0.5 border border-(--border-subtle) rounded-2xs bg-(--bg-surface)">
              ← / →
            </span>
            <span className="hidden xs:inline">keys or swipe</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
