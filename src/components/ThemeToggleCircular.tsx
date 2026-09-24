"use client";

import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";

interface ThemeToggleCircularProps {
  children: React.ReactNode;
  onToggle: () => void;
  speed?: number; // duration in seconds (default: 0.5)
  className?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export function ThemeToggleCircular({
  children,
  onToggle,
  speed = 0.5,
  className,
  onHoverStart,
  onHoverEnd,
}: ThemeToggleCircularProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMouseEnter = () => {
    window.dispatchEvent(
      new CustomEvent("bk_nav_theme_hover", { detail: true }),
    );
    onHoverStart?.();
  };

  const handleMouseLeave = () => {
    window.dispatchEvent(
      new CustomEvent("bk_nav_theme_hover", { detail: false }),
    );
    onHoverEnd?.();
  };

  const handleClick = async (e: React.MouseEvent) => {
    // Notify that theme interaction started so auto-advances pause
    window.dispatchEvent(
      new CustomEvent("bk_nav_theme_transition", { detail: true }),
    );

    const doc = document as any;

    // Graceful fallback for unsupported browsers or users with reduced motion preferences
    if (
      !doc.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      onToggle();
      window.dispatchEvent(
        new CustomEvent("bk_nav_theme_transition", { detail: false }),
      );
      return;
    }

    if (isTransitioning) return;

    // Detect whether we are switching to dark or to light
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";

    // Calculate coordinates: click position or center of the container
    const rect = containerRef.current?.getBoundingClientRect();
    const x =
      e.clientX > 0
        ? e.clientX
        : rect
          ? rect.left + rect.width / 2
          : window.innerWidth / 2;
    const y =
      e.clientY > 0
        ? e.clientY
        : rect
          ? rect.top + rect.height / 2
          : 40;

    // Mark transition direction and pass coordinates via CSS variables
    document.documentElement.setAttribute(
      "data-theme-transition",
      nextTheme === "dark" ? "to-dark" : "to-light",
    );
    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);
    document.documentElement.style.setProperty(
      "--transition-speed",
      `${speed}s`,
    );

    setIsTransitioning(true);

    try {
      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          onToggle();
        });
      });
      await transition.finished;
    } finally {
      document.documentElement.removeAttribute("data-theme-transition");
      document.documentElement.style.removeProperty("--x");
      document.documentElement.style.removeProperty("--y");
      document.documentElement.style.removeProperty("--transition-speed");
      setIsTransitioning(false);
      window.dispatchEvent(
        new CustomEvent("bk_nav_theme_transition", { detail: false }),
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ pointerEvents: isTransitioning ? "none" : "auto" }}
    >
      {children}
    </div>
  );
}
