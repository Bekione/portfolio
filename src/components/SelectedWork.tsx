"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ExternalLink,
  Zap,
  ArrowUpRight,
  Maximize2,
  X,
} from "lucide-react";
import { FEATURED_PROJECTS } from "../data/portfolioData";
import { Project } from "../types";
import { useAutoAdvance } from "../hooks/useAutoAdvance";
import { Noise } from "./Noise";

export function SelectedWork() {
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
                className={`px-4 py-2.5 text-xs font-mono rounded-xs transition-all flex items-center gap-2 border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "border-vermilion bg-(--bg-surface)/80 backdrop-blur-xs text-vermilion font-semibold shadow-xs"
                    : "border-(--border-subtle) bg-transparent text-(--text-secondary) hover:text-(--text-primary) hover:border-(--border-strong)"
                }`}
              >
                <Noise />
                <span className="opacity-70 relative z-10">
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
                <ProjectCaseStudy project={activeProject} />
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCaseStudy({ project }: { project: Project }) {
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
        <ProjectScreenshotCard project={project} />
      </div>
    </div>
  );
}

function ProjectScreenshotCard({ project }: { project: Project }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const modalContent = (
    <AnimatePresence>
      {isZoomed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs p-4 sm:p-8 flex items-center justify-center cursor-zoom-out w-screen h-[100dvh]"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl w-full bg-(--bg-surface) border border-(--border-strong) rounded-xs overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-(--bg-primary) border-b border-(--border-subtle)">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-vermilion" />
                <span className="font-mono text-xs text-(--text-primary) font-semibold">
                  {project.title} — Interface Screenshot
                </span>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1 hover:text-vermilion text-(--text-muted) transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-16/10 w-full max-h-[75vh] bg-black/50">
              <Image
                src={project.image}
                alt={project.imageAlt || `${project.title} preview`}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-4">
      {/* Browser Window Frame */}
      <div className="border border-(--border-strong) bg-(--bg-surface) rounded-xs shadow-md overflow-hidden relative group">
        <Noise />

        {/* Window Chrome Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-(--bg-primary) border-b border-(--border-subtle)">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-vermilion/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-(--border-strong)" />
            <span className="w-2.5 h-2.5 rounded-full bg-(--border-strong)" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-xs bg-(--bg-surface) border border-(--border-subtle) font-mono text-[11px] text-(--text-muted) max-w-[210px] sm:max-w-xs truncate">
            {project.liveUrl ? (
              <span className="text-(--text-secondary) truncate">
                {project.liveUrl.replace(/^https?:\/\//, "")}
              </span>
            ) : (
              <span className="truncate">{project.id}.preview // internal</span>
            )}
          </div>

          <button
            onClick={() => setIsZoomed(true)}
            className="p-1 hover:text-vermilion text-(--text-muted) transition-colors cursor-pointer"
            title="Expand screenshot"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Screenshot Viewport */}
        <div
          className="relative aspect-16/10 bg-(--bg-primary) overflow-hidden cursor-pointer"
          onClick={() => setIsZoomed(true)}
          title="Click to expand preview"
        >
          <Image
            src={project.image}
            alt={project.imageAlt || `${project.title} preview`}
            width={1280}
            height={800}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            priority={project.number === "01"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-between p-3 text-white text-xs font-mono">
            <span className="font-semibold">{project.title}</span>
            <span className="text-[11px] opacity-80 flex items-center gap-1">
              <Maximize2 className="w-3 h-3" />
              Expand
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
            className="relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#151515] dark:bg-[#ece8e0] text-[#F3F0E8] dark:text-[#121211] hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white transition-colors font-medium cursor-pointer"
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

      {/* Lightbox Modal when Zoomed rendered directly into document.body to avoid containing-block overflow */}
      {mounted && typeof document !== "undefined" && createPortal(modalContent, document.body)}
    </div>
  );
}
