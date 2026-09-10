"use client";

import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  CSSProperties,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./StrokeText.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_TEXT = "Draw Attention";

export interface StrokeTextProps {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  delay?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: "mount" | "hover" | "scroll" | "loop";
  fillMode?: "wipe" | "fade" | "none";
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number | string;
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const StrokeText: React.FC<StrokeTextProps> = ({
  text = DEFAULT_TEXT,
  strokeColor = "var(--accent)",
  fillColor = "var(--text-primary)",
  strokeWidth = 1.5,
  drawDuration = 1.4,
  delay = 0,
  fillDelay = 0.15,
  stagger = 0.04,
  ease = "power2.out",
  trigger = "mount",
  fillMode = "wipe",
  fontSize: propFontSize,
  fontWeight: propFontWeight,
  letterSpacing: propLetterSpacing,
  reverse = false,
  className = "",
  style = {},
}) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const strokeTextRef = useRef<SVGTextElement>(null);
  const wipeRectRef = useRef<SVGRectElement>(null);
  const hasCompletedRef = useRef(false);

  const [metrics, setMetrics] = useState<{
    box: { x: number; y: number; width: number; height: number };
    baselineY: number;
    fontSize: number;
    fontWeight: string | number;
    letterSpacing: string;
  } | null>(null);

  const rawId = useId();
  const wipeId = `stroke-text-wipe-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const characters = useMemo(() => Array.from(String(text ?? "")), [text]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    const measure = () => {
      const root = rootRef.current;
      const ghost = ghostRef.current;
      const marker = markerRef.current;
      const strokeText = strokeTextRef.current;
      if (!root || !ghost || !marker || !strokeText) return;

      const computed = window.getComputedStyle(root);
      const computedFontSize =
        propFontSize || parseFloat(computed.fontSize) || 68;
      const computedFontWeight =
        propFontWeight ?? computed.fontWeight ?? "700";
      const computedLetterSpacing =
        propLetterSpacing !== undefined
          ? typeof propLetterSpacing === "number"
            ? `${propLetterSpacing}px`
            : String(propLetterSpacing)
          : computed.letterSpacing;

      // Compute exact baseline relative to rootRef
      const rootRect = root.getBoundingClientRect();
      const markerRect = marker.getBoundingClientRect();
      const baselineY = markerRect.top - rootRect.top;

      let bbox: DOMRect;
      try {
        bbox = strokeText.getBBox();
      } catch {
        return;
      }
      if (!bbox || !bbox.width) return;

      const pad = Math.max(Number(strokeWidth) || 1.5, 2);
      const box = {
        x: bbox.x - pad,
        y: bbox.y - pad,
        width: bbox.width + pad * 2,
        height: bbox.height + pad * 2,
      };

      setMetrics((prev) => {
        if (
          prev &&
          Math.abs(prev.baselineY - baselineY) < 0.5 &&
          Math.abs(prev.box.x - box.x) < 0.5 &&
          Math.abs(prev.box.y - box.y) < 0.5 &&
          Math.abs(prev.box.width - box.width) < 0.5 &&
          Math.abs(prev.box.height - box.height) < 0.5 &&
          prev.fontSize === computedFontSize
        ) {
          return prev;
        }
        return {
          box,
          baselineY,
          fontSize: computedFontSize,
          fontWeight: computedFontWeight,
          letterSpacing: computedLetterSpacing,
        };
      });
    };

    measure();

    if (typeof document !== "undefined" && (document as any).fonts?.ready) {
      (document as any).fonts.ready.then(measure).catch(() => {});
    }

    window.addEventListener("resize", measure);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && rootRef.current) {
      ro = new ResizeObserver(measure);
      ro.observe(rootRef.current);
    }

    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [
    text,
    strokeWidth,
    propFontSize,
    propFontWeight,
    propLetterSpacing,
  ]);

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === "undefined" || !root || !metrics) return undefined;

    const strokes = gsap.utils.toArray(
      root.querySelectorAll("[data-stroke-char]"),
    );
    const fills = gsap.utils.toArray(root.querySelectorAll("[data-fill-char]"));
    const wipe = wipeRectRef.current;
    if (!strokes.length) return undefined;

    const box = metrics.box;
    const dash = Math.max(metrics.fontSize * 8, 300);
    const fillEnabled = fillMode !== "none";
    const useWipe = fillEnabled && fillMode === "wipe";
    const fillDuration = Math.max(0.4, drawDuration * 0.5);
    const staggerConfig = reverse
      ? { each: stagger, from: "end" as const }
      : stagger;
    const targets = [...strokes, ...fills, wipe].filter(Boolean);

    const setStart = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash, opacity: 1 });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 0 } });
    };

    const setEnd = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0, opacity: 0 });
      gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
      if (wipe)
        gsap.set(wipe, { attr: { width: fillEnabled ? box.width : 0 } });
    };

    if (hasCompletedRef.current) {
      setEnd();
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      hasCompletedRef.current = true;
      setEnd();
      return () => gsap.killTweensOf(targets);
    }

    const build = () => {
      setStart();
      const tl = gsap.timeline({
        paused: true,
        repeat: trigger === "loop" ? -1 : 0,
        repeatDelay: trigger === "loop" ? 0.9 : 0,
        defaults: { overwrite: "auto" },
        onComplete: () => {
          if (trigger !== "loop") {
            hasCompletedRef.current = true;
          }
        },
      });

      tl.to(
        strokes,
        {
          strokeDashoffset: 0,
          duration: drawDuration,
          ease,
          stagger: staggerConfig,
        },
        delay,
      );

      if (useWipe && wipe) {
        tl.to(
          wipe,
          {
            attr: { width: box.width },
            duration: fillDuration,
            ease: "power2.inOut",
          },
          delay + drawDuration + fillDelay,
        );
        // Cleanly hide outline strokes as the fill reaches completion
        tl.to(
          strokes,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          delay + drawDuration + fillDelay + fillDuration * 0.6,
        );
      } else if (fillEnabled) {
        tl.to(
          fills,
          {
            opacity: 1,
            duration: fillDuration,
            ease: "power2.out",
            stagger: staggerConfig,
          },
          delay + drawDuration + fillDelay,
        );
        tl.to(
          strokes,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          delay + drawDuration + fillDelay + fillDuration * 0.6,
        );
      }

      return tl;
    };

    let timeline: gsap.core.Timeline | null = null;
    let scrollTrigger: ScrollTrigger | null = null;
    let removeHover: (() => void) | null = null;

    if (trigger === "hover") {
      setEnd();
      const play = () => {
        timeline?.kill();
        timeline = build();
        timeline.play(0);
      };
      root.addEventListener("pointerenter", play);
      removeHover = () => root.removeEventListener("pointerenter", play);
    } else {
      timeline = build();
      if (trigger === "scroll") {
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: "top 85%",
          once: true,
          onEnter: () => timeline?.play(0),
        });
      } else {
        timeline.play(0);
      }
    }

    return () => {
      removeHover?.();
      scrollTrigger?.kill();
      timeline?.kill();
      gsap.killTweensOf(targets);
    };
  }, [
    metrics,
    drawDuration,
    delay,
    fillDelay,
    stagger,
    ease,
    trigger,
    fillMode,
    reverse,
  ]);

  const isReady = Boolean(metrics);
  const box = metrics?.box;
  const baselineY = metrics?.baselineY ?? 0;

  const fontStyle = useMemo(
    () => ({
      fontSize: metrics?.fontSize
        ? `${metrics.fontSize}px`
        : propFontSize
          ? `${propFontSize}px`
          : "inherit",
      fontWeight: metrics?.fontWeight ?? propFontWeight ?? "inherit",
      letterSpacing:
        metrics?.letterSpacing ??
        (propLetterSpacing !== undefined
          ? `${propLetterSpacing}px`
          : "inherit"),
      fontFamily:
        "var(--font-display), 'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }),
    [metrics, propFontSize, propFontWeight, propLetterSpacing],
  );

  return (
    <span
      ref={rootRef}
      className={`stroke-text ${trigger === "hover" ? "stroke-text--hover" : ""} ${className}`.trim()}
      style={style}
      role="img"
      aria-label={String(text ?? "")}
    >
      {/* Ghost text reserves the exact space, width, height, and baseline in the layout */}
      <span ref={ghostRef} className="stroke-text__ghost" aria-hidden="true">
        {text}
      </span>

      {/* Baseline marker to lock subpixel vertical alignment */}
      <span
        ref={markerRef}
        className="stroke-text__baseline-marker"
        aria-hidden="true"
      />

      {/* Animated SVG overlay */}
      <svg
        className="stroke-text__svg"
        viewBox={
          box ? `${box.x} ${box.y} ${box.width} ${box.height}` : undefined
        }
        style={{
          position: "absolute",
          left: box ? `${box.x}px` : 0,
          top: box ? `${baselineY + box.y}px` : 0,
          width: box ? `${box.width}px` : "100%",
          height: box ? `${box.height}px` : "100%",
          opacity: isReady ? 1 : 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {fillMode === "wipe" && box && (
          <defs>
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <rect
                ref={wipeRectRef}
                x={box.x}
                y={box.y}
                width="0"
                height={box.height}
              />
            </clipPath>
          </defs>
        )}

        <text
          ref={strokeTextRef}
          className="stroke-text__stroke"
          x="0"
          y="0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={fontStyle}
        >
          {characters.map((char, index) => (
            <tspan data-stroke-char key={`s-${index}`}>
              {char}
            </tspan>
          ))}
        </text>

        <text
          className="stroke-text__fill"
          x="0"
          y="0"
          fill={fillColor}
          stroke="none"
          style={fontStyle}
          clipPath={
            fillMode === "wipe" && box ? `url(#${wipeId})` : undefined
          }
        >
          {characters.map((char, index) => (
            <tspan data-fill-char key={`f-${index}`}>
              {char}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
};

export default StrokeText;
