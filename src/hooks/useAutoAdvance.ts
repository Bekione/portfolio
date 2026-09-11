"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface UseAutoAdvanceOptions<T> {
  items: readonly T[] | T[];
  currentIndex: number;
  onAdvance: (nextIndex: number, nextItem: T) => void;
  interval?: number;
  enabled?: boolean;
}

export function useAutoAdvance<T>({
  items,
  currentIndex,
  onAdvance,
  interval = 6000,
  enabled = true,
}: UseAutoAdvanceOptions<T>) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef<any>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Viewport visibility via IntersectionObserver: only advance when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // When user manually clicks a tab or pill, pause rotation for a cooldown period
  const pauseOnManualInteraction = useCallback(
    (cooldownMs: number = interval * 1.5) => {
      setIsCooldown(true);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        setIsCooldown(false);
      }, cooldownMs);
    },
    [interval]
  );

  // Clean up cooldown timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, []);

  // Main auto-advance loop
  useEffect(() => {
    if (!enabled || items.length <= 1) return;

    // Respect user's prefers-reduced-motion OS setting
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Do not auto-advance if off-screen, hovered, focused, or in manual cooldown
    if (!isInView || isHovered || isFocused || isCooldown) {
      return;
    }

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % items.length;
      onAdvance(nextIndex, items[nextIndex]);
    }, interval);

    return () => clearInterval(timer);
  }, [
    enabled,
    items,
    currentIndex,
    onAdvance,
    interval,
    isInView,
    isHovered,
    isFocused,
    isCooldown,
  ]);

  const containerProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus: () => setIsFocused(true),
    onBlur: (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setIsFocused(false);
      }
    },
  };

  return {
    containerRef,
    containerProps,
    isPaused: !isInView || isHovered || isFocused || isCooldown,
    pauseOnManualInteraction,
  };
}
