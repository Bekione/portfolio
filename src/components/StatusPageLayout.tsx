"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Github,
  Linkedin,
  Sun,
  Moon,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { PERSONAL_INFO } from "../data/portfolioData";
import { ThemeToggleCircular } from "./ThemeToggleCircular";

export interface StatusAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  icon?: React.ComponentType<{ className?: string }>;
}

export interface StatusPageLayoutProps {
  headerStatus: string;
  badge: string;
  title: ReactNode;
  description: ReactNode;
  secondaryText?: ReactNode;
  actions: StatusAction[];
  children?: ReactNode;
}

export function StatusPageLayout({
  headerStatus,
  badge,
  title,
  description,
  secondaryText,
  actions,
  children,
}: StatusPageLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Africa/Addis_Ababa",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTime(formatted);
      } catch {
        setTime("15:00:00");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-(--bg-primary) text-(--text-primary) bg-drafting-grid flex flex-col justify-between selection:bg-vermilion selection:text-white transition-colors duration-200 overflow-hidden font-body">
      {/* Subtle ambient radial warmth */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-50 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, var(--accent-dim) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="relative z-10 border-b border-(--border-subtle) bg-(--bg-surface)/80 backdrop-blur-xs px-4 sm:px-8 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 text-xs font-mono">
          {/* Personal Identity */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-vermilion transition-colors"
          >
            <Terminal className="w-4 h-4 text-vermilion shrink-0" />
            <span className="font-semibold tracking-wider uppercase text-(--text-primary)">
              {PERSONAL_INFO.name}
            </span>
          </Link>

          {/* Status */}
          <div className="hidden sm:flex items-center gap-2 text-(--text-secondary) text-xs">
            <span className="w-2 h-2 rounded-full bg-vermilion animate-pulse" />
            <span className="tracking-wide">{headerStatus}</span>
          </div>

          {/* Controls: Addis Ababa Time & Theme Toggle */}
          <div className="flex items-center gap-3">
            {time && (
              <span
                suppressHydrationWarning
                className="text-[11px] text-(--text-muted) tracking-wider font-mono hidden sm:inline"
              >
                {time} Addis Ababa
              </span>
            )}
            <ThemeToggleCircular onToggle={toggleTheme} className="inline-flex">
              <button
                type="button"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                suppressHydrationWarning
                className="p-1.5 border border-(--border-subtle) hover:border-(--border-strong) rounded-xs text-(--text-secondary) hover:text-(--text-primary) transition-colors bg-(--bg-surface) cursor-pointer"
              >
                {theme === "light" ? (
                  <Moon className="w-3.5 h-3.5 text-(--text-primary)" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-[#E0583F]" />
                )}
              </button>
            </ThemeToggleCircular>
          </div>
        </div>
      </header>

      {/* Center Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8 my-8">
        <div className="w-11/12 max-w-lg border border-(--border-strong) bg-(--bg-surface)/40 backdrop-blur-[3px] rounded-xs shadow-md p-7 sm:p-10 relative">
          {/* Corner Markers */}
          <div
            className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-vermilion pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-vermilion pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-vermilion pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-vermilion pointer-events-none"
            aria-hidden="true"
          />

          {/* Tag */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-vermilion uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-vermilion" />
            <span>{badge}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight text-(--text-primary) mb-4">
            {title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed mb-4 font-normal">
            {description}
          </p>

          {/* Secondary helper text */}
          {secondaryText && (
            <p className="text-xs sm:text-sm text-(--text-muted) leading-relaxed mb-8">
              {secondaryText}
            </p>
          )}

          {children}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            {actions.map((action, index) => {
              const Icon = action.icon;
              const isMailto = action.href.startsWith("mailto:");
              const isExternal =
                action.href.startsWith("http://") ||
                action.href.startsWith("https://");
              const isPrimary = action.variant === "primary";

              const className = isPrimary
                ? "inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-vermilion text-white text-xs font-mono font-medium tracking-wider uppercase rounded-xs hover:bg-(--color-vermilion-hover) transition-colors shadow-xs"
                : "inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-(--border-subtle) hover:border-(--border-strong) text-(--text-primary) text-xs font-mono font-medium tracking-wider uppercase rounded-xs transition-colors bg-(--bg-surface)";

              if (isMailto || isExternal) {
                return (
                  <a
                    key={index}
                    href={action.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={className}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{action.label}</span>
                  </a>
                );
              }

              return (
                <Link key={index} href={action.href} className={className}>
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{action.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Direct Social Links */}
          <div className="pt-6 border-t border-(--border-subtle) flex items-center gap-4 text-xs font-mono text-(--text-secondary)">
            <span className="text-(--text-muted) text-[11px]">Find me on:</span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-vermilion transition-colors inline-flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-vermilion transition-colors inline-flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PERSONAL_INFO.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-vermilion transition-colors inline-flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Upwork</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-(--border-subtle) bg-(--bg-surface)/80 backdrop-blur-xs px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-(--text-muted)">
          <div className="flex items-center gap-1.5 text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-vermilion" />
            <span>{PERSONAL_INFO.location}</span>
          </div>
          <div className="text-[11px]">
            Bereket Kinfe &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}
