"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Cpu,
  ExternalLink,
  Gauge,
  Layers,
  Mic,
  Play,
  RefreshCw,
  Server,
  ShieldCheck,
  Sliders,
  Workflow,
  Zap,
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
      className="py-24 border-b border-(--border-subtle) bg-(--bg-primary)"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12 border-b border-(--border-subtle)">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-vermilion mb-1">
              <span>01 //</span>
              <span>CURATED CASE STUDIES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-(--text-primary)">
              SELECTED WORK
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-(--text-secondary) leading-relaxed">
            Detailed engineering breakdowns of production platforms, distributed
            systems, real-time voice pipelines, and performance overhauls.
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
                <span className="opacity-70 relative z-10">{project.number}.</span>
                <span className="relative z-10">{project.title.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project In-Depth Showcase */}
        <AnimatePresence mode="wait">
          {(() => {
            const activeProject =
              FEATURED_PROJECTS.find((p) => p.id === activeProjectTab) ||
              FEATURED_PROJECTS[0];
            return (
              <motion.div
                key={activeProject.id}
                layout={true}
                initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
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
      {/* Left Dossier Column: Problem, Solution, Architecture (7 cols) */}
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
            <span className="text-(--text-muted)">ROLE:</span>
            <span className="font-medium text-(--text-primary)">
              {project.role}
            </span>
          </div>
        </div>

        {/* The Engineering Problem & Solution */}
        <div className="space-y-6">
          <div className="p-5 border border-(--border-subtle) bg-(--bg-surface) rounded-xs space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-(--text-primary)">
              <span className="w-2 h-2 bg-vermilion rounded-full" />
              <span>THE CORE PROBLEM</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed font-sans">
              {project.problem}
            </p>
          </div>

          <div className="p-5 border border-(--border-subtle) bg-(--bg-surface) rounded-xs space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-(--text-primary)">
              <Check className="w-3.5 h-3.5 text-vermilion" />
              <span>THE ARCHITECTURAL SOLUTION</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed font-sans">
              {project.solution}
            </p>
          </div>

          <div className="p-5 border border-(--border-subtle) bg-(--bg-surface) rounded-xs space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-(--text-primary)">
              <Zap className="w-3.5 h-3.5 text-vermilion" />
              <span>MEASURABLE OUTCOME</span>
            </div>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed font-sans">
              {project.result}
            </p>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-semibold text-(--text-primary) tracking-wider">
            KEY ARCHITECTURAL HIGHLIGHTS
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
            TECHNOLOGIES:
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

        {/* Links or Private status note */}
        <div className="pt-4 flex items-center gap-4 text-xs font-mono">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-vermilion hover:underline font-medium"
            >
              <span>VISIT LIVE PLATFORM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-(--text-muted) italic">
              Private commercial client architecture — source code protected
              under NDA.
            </span>
          )}
        </div>
      </div>

      {/* Right Column: Custom Engineering Interactive Widget (5 cols) - Sticky during left dossier scroll */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
        <div className="p-6 border border-(--border-strong) bg-(--bg-surface) rounded-xs shadow-xs relative">
          <div className="flex items-center justify-between pb-4 border-b border-(--border-subtle) mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vermilion" />
              <span className="font-mono text-xs font-semibold text-(--text-primary)">
                SYSTEM SPECIFICATION // {project.number}
              </span>
            </div>
            <span className="font-mono text-[10px] text-(--text-muted)">
              {project.featuredAspect.toUpperCase()}
            </span>
          </div>

          {/* Render specific bespoke visualizer depending on project */}
          {project.id === "isp-marketplace" && <ISPMarketplaceVisualizer />}
          {project.id === "spare-parts-erp" && <SparePartsERPVisualizer />}
          {project.id === "ai-visa-interview" && <AIVisaVoiceVisualizer />}
          {project.id === "afrilearn-platform" && (
            <AfrilearnLighthouseVisualizer />
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   01 — ISP MARKETPLACE: Multi-Tenant Tier Visualizer
------------------------------------------------------------- */
function ISPMarketplaceVisualizer() {
  const [activeTier, setActiveTier] = useState<
    "customer" | "isp-admin" | "super-admin"
  >("isp-admin");

  const tiers = {
    customer: {
      title: "Customer Marketplace Tier",
      surface: "React Web + React Native Mobile",
      dataAccess: "Catalog, Service Feeds, Plans, Invoices",
      permissions: [
        "Browse Plans",
        "Bandwidth Self-Service",
        "Instant Bill Pay",
      ],
      isolation: "Tenant-filtered public query token",
    },
    "isp-admin": {
      title: "ISP Provider Admin Tier",
      surface: "React Web Dashboard",
      dataAccess: "Subscriber Telemetry, Territory Quotas, Revenue Split",
      permissions: [
        "Manage Fiber Lines",
        "Bandwidth Provisioning",
        "Billing Exports",
      ],
      isolation: "Row-level schema isolation via tenant_id",
    },
    "super-admin": {
      title: "Platform Super-Admin Tier",
      surface: "React Web Infrastructure Portal",
      dataAccess: "Cross-Tenant Audits, Settlement Rails, Global Health",
      permissions: [
        "Onboard Providers",
        "Payment Gateway Config",
        "System Logs",
      ],
      isolation: "Full-cluster master tenant context",
    },
  };

  const current = tiers[activeTier];

  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="text-[11px] text-(--text-muted)">
        INTERACTIVE MULTI-TENANT BOUNDARY:
      </div>

      <div className="grid grid-cols-3 gap-1">
        {(["customer", "isp-admin", "super-admin"] as const).map((tier) => (
          <button
            key={tier}
            onClick={() => setActiveTier(tier)}
            className={`py-1.5 px-2 text-[10px] text-center border rounded-xs transition-colors ${
              activeTier === tier
                ? "border-vermilion bg-(--bg-primary) text-vermilion font-semibold"
                : "border-(--border-subtle) text-(--text-muted) hover:text-(--text-primary)"
            }`}
          >
            {tier === "customer"
              ? "USER"
              : tier === "isp-admin"
                ? "ISP ADMIN"
                : "SUPER ADMIN"}
          </button>
        ))}
      </div>

      <div className="p-4 bg-(--bg-primary) border border-(--border-subtle) rounded-xs space-y-3">
        <div className="flex justify-between items-center text-[11px] border-b border-(--border-subtle) pb-2">
          <span className="font-semibold text-(--text-primary)">
            {current.title}
          </span>
          <span className="text-vermilion text-[10px]">
            AUTH BOUNDARY ENFORCED
          </span>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between">
            <span className="text-(--text-muted)">Surface:</span>
            <span className="text-(--text-primary) font-medium">
              {current.surface}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-(--text-muted)">Isolation:</span>
            <span className="text-(--text-primary) font-medium">
              {current.isolation}
            </span>
          </div>
        </div>

        <div>
          <span className="block text-[10px] text-(--text-muted) mb-1">
            PERMITTED OPERATIONS:
          </span>
          <div className="flex flex-wrap gap-1">
            {current.permissions.map((perm) => (
              <span
                key={perm}
                className="px-2 py-0.5 bg-(--bg-surface) border border-(--border-subtle) text-[10px] text-(--text-primary) rounded-xs"
              >
                {perm}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 bg-(--bg-primary)/50 border border-dashed border-(--border-subtle) rounded-xs text-[10px] text-(--text-muted) leading-relaxed">
        <strong>Architectural Note:</strong> Shared core component primitives
        across React Web and React Native while preserving strict tenant
        separation at the Nest.js API gateway.
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   02 — SPARE-PARTS ERP: Latency & Virtualization Benchmark
------------------------------------------------------------- */
function SparePartsERPVisualizer() {
  const [activeMode, setActiveMode] = useState<"legacy" | "optimized">(
    "optimized",
  );

  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-(--text-muted)">
          LATENCY COMPARISON (10M+ RECORDS):
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setActiveMode("legacy")}
            className={`px-2 py-1 text-[10px] border rounded-xs ${
              activeMode === "legacy"
                ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 font-semibold"
                : "border-(--border-subtle) text-(--text-muted)"
            }`}
          >
            LEGACY
          </button>
          <button
            onClick={() => setActiveMode("optimized")}
            className={`px-2 py-1 text-[10px] border rounded-xs ${
              activeMode === "optimized"
                ? "border-vermilion bg-vermilion/10 text-vermilion font-semibold"
                : "border-(--border-subtle) text-(--text-muted)"
            }`}
          >
            OPTIMIZED
          </button>
        </div>
      </div>

      <div className="p-4 bg-(--bg-primary) border border-(--border-subtle) rounded-xs space-y-4">
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-(--text-muted)">API Query Response Time</span>
            <span
              className={`font-bold ${activeMode === "legacy" ? "text-red-500" : "text-vermilion"}`}
            >
              {activeMode === "legacy" ? ">10,200 ms (Timeout)" : "42 ms"}
            </span>
          </div>
          <div className="w-full bg-(--bg-surface) h-2 rounded-full overflow-hidden border border-(--border-subtle)">
            <div
              className={`h-full transition-all duration-500 ${
                activeMode === "legacy"
                  ? "w-full bg-red-500"
                  : "w-[4%] bg-vermilion"
              }`}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-(--text-muted)">
              Browser DOM Elements Rendered
            </span>
            <span className="font-bold text-(--text-primary)">
              {activeMode === "legacy"
                ? "50,000+ nodes (Crash)"
                : "32 nodes (Windowed)"}
            </span>
          </div>
          <div className="w-full bg-(--bg-surface) h-2 rounded-full overflow-hidden border border-(--border-subtle)">
            <div
              className={`h-full transition-all duration-500 ${
                activeMode === "legacy"
                  ? "w-full bg-red-500"
                  : "w-[8%] bg-vermilion"
              }`}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-(--text-muted)">Client Memory Overhead</span>
            <span className="font-bold text-(--text-primary)">
              {activeMode === "legacy" ? "1.4 GB (Leak)" : "48 MB"}
            </span>
          </div>
          <div className="w-full bg-(--bg-surface) h-2 rounded-full overflow-hidden border border-(--border-subtle)">
            <div
              className={`h-full transition-all duration-500 ${
                activeMode === "legacy"
                  ? "w-[90%] bg-red-500"
                  : "w-[12%] bg-vermilion"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="p-3 bg-(--bg-primary)/50 border border-dashed border-(--border-subtle) rounded-xs text-[10px] text-(--text-muted) leading-relaxed">
        <strong>Root Cause Fixed:</strong> Replaced unindexed Laravel Eloquent
        scans with compound indexed SQL joins and virtualized the React table
        viewport to keep DOM count constant regardless of dataset size.
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   03 — AI VISA INTERVIEW PLATFORM: Audio Pipeline Stream
------------------------------------------------------------- */
function AIVisaVoiceVisualizer() {
  const [pipelineActive, setPipelineActive] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    { name: "MIC INPUT", time: "0ms", note: "Full-duplex WebSocket stream" },
    {
      name: "VAD (BERT ONNX)",
      time: "40ms",
      note: "Semantic speech endpoint detection",
    },
    {
      name: "STREAMING STT",
      time: "120ms",
      note: "Pipelined token transcription",
    },
    { name: "LLM INFERENCE", time: "380ms", note: "Consular reasoning on EC2" },
    { name: "CHUNKED TTS", time: "520ms", note: "Sub-second audio synthesis" },
  ];

  const runSimulation = () => {
    if (pipelineActive) return;
    setPipelineActive(true);
    setActiveStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= steps.length) {
        clearInterval(interval);
        setTimeout(() => setPipelineActive(false), 800);
      } else {
        setActiveStep(current);
      }
    }, 400);
  };

  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-(--text-muted)">
          VOICE PIPELINE LATENCY ENGINE:
        </span>
        <button
          onClick={runSimulation}
          disabled={pipelineActive}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] bg-vermilion text-white rounded-xs hover:bg-[#b33f27] disabled:opacity-50 transition-colors"
        >
          <Play className="w-3 h-3" />
          <span>{pipelineActive ? "STREAMING..." : "RUN PIPELINE"}</span>
        </button>
      </div>

      <div className="space-y-2">
        {steps.map((step, idx) => {
          const isCurrent = pipelineActive && activeStep === idx;
          const isCompleted = pipelineActive && activeStep > idx;
          return (
            <div
              key={step.name}
              className={`p-2.5 border rounded-xs transition-all flex items-center justify-between ${
                isCurrent
                  ? "border-vermilion bg-vermilion/10 text-vermilion"
                  : isCompleted
                    ? "border-(--border-subtle) bg-(--bg-primary) text-(--text-primary)"
                    : "border-(--border-subtle) bg-(--bg-primary)/40 text-(--text-muted)"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] opacity-60">0{idx + 1}</span>
                <span className="font-semibold text-[11px]">{step.name}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-medium">{step.time}</span>
                <span className="block text-[9px] opacity-70">{step.note}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-(--bg-primary) border border-(--border-subtle) rounded-xs flex justify-between items-center text-[11px]">
        <span className="text-(--text-muted)">Total Round-Trip Latency:</span>
        <span className="font-bold text-vermilion">
          ~650ms (Natural Conversational Pace)
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   04 — AFRILEARN: Lighthouse Performance Overhaul
------------------------------------------------------------- */
function AfrilearnLighthouseVisualizer() {
  const [viewState, setViewState] = useState<"redesign" | "legacy">("redesign");

  const data = {
    legacy: {
      score: 61,
      fcp: "2.4s",
      lcp: "3.8s",
      cls: "0.24",
      seo: "72/100",
      status: "High bounce rate due to asset blocking",
    },
    redesign: {
      score: 100,
      fcp: "0.4s",
      lcp: "0.7s",
      cls: "0.00",
      seo: "100/100",
      status: "+600 active students acquired in month 1",
    },
  };

  const curr = data[viewState];

  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-(--text-muted)">
          LIGHTHOUSE AUDIT BENCHMARK:
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setViewState("legacy")}
            className={`px-2 py-1 text-[10px] border rounded-xs ${
              viewState === "legacy"
                ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 font-semibold"
                : "border-(--border-subtle) text-(--text-muted)"
            }`}
          >
            BEFORE (~60)
          </button>
          <button
            onClick={() => setViewState("redesign")}
            className={`px-2 py-1 text-[10px] border rounded-xs ${
              viewState === "redesign"
                ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold"
                : "border-(--border-subtle) text-(--text-muted)"
            }`}
          >
            AFTER (100)
          </button>
        </div>
      </div>

      <div className="p-4 bg-(--bg-primary) border border-(--border-subtle) rounded-xs flex items-center justify-around text-center">
        <div className="space-y-1">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-4 font-display font-bold text-xl ${
              viewState === "redesign"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-amber-500 text-amber-600 dark:text-amber-400"
            }`}
          >
            {curr.score}
          </div>
          <span className="block text-[10px] text-(--text-muted)">
            PERFORMANCE
          </span>
        </div>

        <div className="space-y-2 text-left text-[11px]">
          <div>
            <span className="text-(--text-muted)">
              LCP (Largest Contentful Paint):{" "}
            </span>
            <strong className="text-(--text-primary)">{curr.lcp}</strong>
          </div>
          <div>
            <span className="text-(--text-muted)">
              FCP (First Contentful Paint):{" "}
            </span>
            <strong className="text-(--text-primary)">{curr.fcp}</strong>
          </div>
          <div>
            <span className="text-(--text-muted)">
              CLS (Cumulative Layout Shift):{" "}
            </span>
            <strong className="text-(--text-primary)">{curr.cls}</strong>
          </div>
          <div>
            <span className="text-(--text-muted)">SEO & Best Practices: </span>
            <strong className="text-(--text-primary)">{curr.seo}</strong>
          </div>
        </div>
      </div>

      <div className="p-3 bg-(--bg-primary)/50 border border-dashed border-(--border-subtle) rounded-xs text-[10px] text-(--text-muted) leading-relaxed">
        <strong>Business Impact:</strong> {curr.status}
      </div>
    </div>
  );
}
