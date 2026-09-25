"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  calculateHomographyMatrix3D,
  cornersToPixels,
  HERO_AVATAR_CORNERS,
} from "./matrix";
import { playKeySound, preloadSounds, KeySoundType } from "./sound";
import { MONITOR_PROJECTS } from "./projectsData";
import { LiveMonitorScreen } from "./LiveMonitorScreen";
import { ScreenSettings, ProjectId, ViewMode, ScreenCorners } from "./types";
import {
  Code2,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Layers,
  Laptop,
} from "lucide-react";
import { Noise } from "../Noise";
import { motion } from "motion/react";

export function LiveCodingMonitor() {
  // Active settings
  const [settings, setSettings] = useState<ScreenSettings>({
    viewMode: "split",
    activeProject: "ai-visa-interview",
    typingSpeed: 1,
    isAutoTyping: true,
    soundEnabled: false,
    screenGlow: true,
    scanlines: true,
    crtCurvature: false,
  });

  const [isZoomed, setIsZoomed] = useState(false);

  // Calibration corners state with localStorage persistence
  const [corners, setCorners] = useState<ScreenCorners>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("hero_monitor_corners");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return HERO_AVATAR_CORNERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("hero_monitor_corners", JSON.stringify(corners));
    } catch {}
  }, [corners]);

  // Preload mechanical keyboard sound assets on mount
  useEffect(() => {
    preloadSounds();
  }, []);

  // Dynamic image container dimensions
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMeasured, setIsMeasured] = useState(false);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // Measure container dimensions with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: rect.width, height: rect.height });
        setIsMeasured(true);
      }
    };

    updateSize();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
          setIsMeasured(true);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute CSS matrix3d based on container dimensions and calibrated corners
  const VIRTUAL_WIDTH = 960;
  const VIRTUAL_HEIGHT = 600;

  const matrix3dTransform = useMemo(() => {
    if (dimensions.width <= 0 || dimensions.height <= 0) return "none";
    const { p0, p1, p2, p3 } = cornersToPixels(
      corners,
      dimensions.width,
      dimensions.height,
    );
    return calculateHomographyMatrix3D(
      VIRTUAL_WIDTH,
      VIRTUAL_HEIGHT,
      p0,
      p1,
      p2,
      p3,
    );
  }, [dimensions, corners]);

  const currentProject = useMemo(() => {
    return (
      MONITOR_PROJECTS.find((p) => p.id === settings.activeProject) ||
      MONITOR_PROJECTS[0]
    );
  }, [settings.activeProject]);

  // Target zoom calculation: centers the perspective monitor directly in view
  const zoomTransform = useMemo(() => {
    const cx = (corners.tl.x + corners.tr.x + corners.br.x + corners.bl.x) / 4;
    const cy = (corners.tl.y + corners.tr.y + corners.br.y + corners.bl.y) / 4;
    const scale = 2.85;

    // Pan so monitor center lands at 50% X and 46% Y (leaving breathing room for bottom bar)
    const tx = 50 - cx * scale;
    const ty = 46 - cy * scale;

    return {
      zoomed: `translate(${tx.toFixed(2)}%, ${ty.toFixed(2)}%) scale(${scale})`,
      unzoomed: "translate(0%, 0%) scale(1)",
    };
  }, [corners]);

  const currentProjIndex = MONITOR_PROJECTS.findIndex(
    (p) => p.id === settings.activeProject,
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const hasPendingAdvanceRef = useRef(false);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pauseOnManualInteraction = useCallback((cooldownMs = 12000) => {
    setIsCooldown(true);
    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    cooldownTimerRef.current = setTimeout(() => {
      setIsCooldown(false);
    }, cooldownMs);
  }, []);

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);

  const advanceToNextProject = useCallback(() => {
    const nextIndex = (currentProjIndex + 1) % MONITOR_PROJECTS.length;
    setSettings((s) => ({ ...s, activeProject: MONITOR_PROJECTS[nextIndex].id }));
  }, [currentProjIndex]);

  // Triggered when code completes typing (+1.8s hold time)
  const handleCodeComplete = useCallback(() => {
    if (isHovered || isCooldown) {
      hasPendingAdvanceRef.current = true;
      return;
    }
    hasPendingAdvanceRef.current = false;
    advanceToNextProject();
  }, [isHovered, isCooldown, advanceToNextProject]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hasPendingAdvanceRef.current && !isCooldown) {
      hasPendingAdvanceRef.current = false;
      advanceToNextProject();
    }
  };

  const handlePlaySound = (type?: KeySoundType) => {
    if (settings.soundEnabled) {
      playKeySound(type || "key", 0.18);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col w-full"
    >
      {/* Top Floating Mini Controls Bar */}
      <div className="flex items-center justify-between pb-2 mb-1 px-1 text-[10px] font-mono text-(--text-secondary) border-b border-(--border-subtle)/70">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {MONITOR_PROJECTS.map((proj) => {
            const isSelected = proj.id === settings.activeProject;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  pauseOnManualInteraction(12000);
                  setSettings((s) => ({ ...s, activeProject: proj.id }));
                }}
                className={`px-2.5 py-1 min-h-[28px] flex items-center rounded-xs transition-colors cursor-pointer text-[10px] whitespace-nowrap border relative ${
                  isSelected
                    ? "border-transparent text-vermilion font-semibold"
                    : "border-(--border-subtle) hover:text-(--text-primary) hover:border-(--border-strong)"
                }`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-xs pointer-events-none">
                  <Noise />
                </div>
                {isSelected && (
                  <motion.span
                    layoutId="activeMonitorProject"
                    className="absolute -inset-px rounded-xs border border-vermilion bg-vermilion/10 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {proj.id === "ai-visa-interview"
                    ? "VOICE AI"
                    : proj.id === "spare-parts-erp"
                      ? "10M ERP"
                      : "NEXT.JS"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* ViewMode toggle */}
          <button
            onClick={() =>
              setSettings((s) => ({
                ...s,
                viewMode:
                  s.viewMode === "split"
                    ? "code"
                    : s.viewMode === "code"
                      ? "preview"
                      : "split",
              }))
            }
            aria-label={`Switch monitor view mode, current: ${settings.viewMode}`}
            className="p-1.5 min-w-[28px] min-h-[28px] flex items-center justify-center rounded-xs border border-(--border-subtle) hover:border-(--border-strong) hover:text-vermilion transition-colors cursor-pointer relative overflow-hidden"
            title={`View: ${settings.viewMode.toUpperCase()}`}
          >
            <Noise />
            {settings.viewMode === "split" ? (
              <Layers className="w-3.5 h-3.5" />
            ) : settings.viewMode === "code" ? (
              <Code2 className="w-3.5 h-3.5" />
            ) : (
              <Laptop className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Sound toggle */}
          <button
            onClick={() =>
              setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))
            }
            aria-label={
              settings.soundEnabled
                ? "Mute typing sounds"
                : "Enable mechanical keyboard sounds"
            }
            className={`p-1.5 min-w-[28px] min-h-[28px] flex items-center justify-center rounded-xs border transition-colors cursor-pointer relative overflow-hidden ${
              settings.soundEnabled
                ? "border-vermilion text-vermilion bg-vermilion/10"
                : "border-(--border-subtle) hover:border-(--border-strong)"
            }`}
            title={
              settings.soundEnabled
                ? "Mute typing sounds"
                : "Enable mechanical keyboard sounds"
            }
          >
            <Noise />
            {settings.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-(--text-muted)" />
            )}
          </button>

          {/* Zoom toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            aria-label={isZoomed ? "Reset zoom" : "Zoom into live monitor screen"}
            className={`p-1.5 min-w-[28px] min-h-[28px] flex items-center justify-center rounded-xs border transition-colors cursor-pointer relative overflow-hidden ${
              isZoomed
                ? "border-vermilion text-vermilion bg-vermilion/10"
                : "border-(--border-subtle) hover:border-(--border-strong)"
            }`}
            title={isZoomed ? "Reset zoom" : "Zoom into live monitor screen"}
          >
            <Noise />
            {isZoomed ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Avatar & Perspective Monitor Display */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xs border border-(--border-subtle) bg-(--bg-surface)/30 backdrop-blur-[3px] shadow-sm">
        {/* Corner Registration Hairlines */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#BCB6A8] dark:border-[#3F3E3A] pointer-events-none z-20" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#BCB6A8] dark:border-[#3F3E3A] pointer-events-none z-20" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#BCB6A8] dark:border-[#3F3E3A] pointer-events-none z-20" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#BCB6A8] dark:border-[#3F3E3A] pointer-events-none z-20" />

        {/* Ambient Backlight Glow behind monitor */}
        <div
          className="absolute pointer-events-none rounded-full blur-2xl opacity-20 dark:opacity-30 transition-all duration-700 z-0"
          style={{
            left: `${corners.tl.x}%`,
            top: `${corners.tl.y}%`,
            width: `${(corners.tr.x - corners.tl.x) * 1.5}%`,
            height: `${(corners.bl.y - corners.tl.y) * 2}%`,
            background:
              "radial-gradient(circle, rgba(201, 75, 50, 0.9) 0%, rgba(56, 189, 248, 0.4) 60%, transparent 80%)",
          }}
        />

        {/* Zoomable Stage Container — centers the monitor screen and zooms into the code */}
        <div
          ref={containerRef}
          className="relative w-full h-full grayscale transition-transform duration-500 ease-out"
          style={{
            willChange: "transform",
            transformOrigin: "0 0",
            transform: isZoomed ? zoomTransform.zoomed : zoomTransform.unzoomed,
          }}
        >
          {/* Base Avatar Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
            <Image
              src="/assets/hero-image.png"
              alt="Bereket Kinfe engineering software at his workstation"
              fill
              sizes="(max-width: 768px) 100vw, 460px"
              className="object-contain object-bottom drop-shadow-md select-none pointer-events-none"
              priority
            />
          </div>

          {/* Perspective-Mapped 3D Live Coding Monitor */}
          <div
            className={`absolute top-0 left-0 pointer-events-auto transition-opacity duration-300 ${
              isMeasured ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              width: `${VIRTUAL_WIDTH}px`,
              height: `${VIRTUAL_HEIGHT}px`,
              transformOrigin: "0 0",
              transform: matrix3dTransform,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              zIndex: 10,
            }}
          >
            <LiveMonitorScreen
              project={currentProject}
              settings={settings}
              onPlaySound={handlePlaySound}
              onCodeComplete={handleCodeComplete}
              width={VIRTUAL_WIDTH}
              height={VIRTUAL_HEIGHT}
            />
          </div>
        </div>

        {/* Bottom Technical Status Bar */}
        <div className="absolute bottom-2 inset-x-3 z-20 flex items-center justify-between text-[9px] font-mono text-(--text-muted) bg-(--bg-surface)/80 backdrop-blur-xs px-2 py-1 border border-(--border-subtle) rounded-xs pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-(--text-primary) font-semibold">
              LIVE DESK MONITOR
            </span>
            <span>// {currentProject.name.toUpperCase()}</span>
          </div>
          <span className="hidden sm:inline">PERSPECTIVE HOMOGRAPHY [3D]</span>
        </div>
      </div>
    </div>
  );
}
