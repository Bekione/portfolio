"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { Theme } from "../hooks/useTheme";

interface NavigationProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

const NAV_ITEMS = [
  { id: "work", label: "WORK", num: "01" },
  { id: "about", label: "ABOUT", num: "02" },
  { id: "experience", label: "EXPERIENCE", num: "03" },
  { id: "stack", label: "STACK", num: "04" },
  { id: "lab", label: "LAB", num: "05" },
  { id: "contact", label: "CONTACT", num: "06" },
];

export function Navigation({
  theme,
  onToggleTheme,
  onOpenResume,
}: NavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = [
        "hero",
        "work",
        "about",
        "experience",
        "stack",
        "lab",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-(--bg-primary)/90 backdrop-blur-md border-b border-(--border-subtle) shadow-xs py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Technical Identity */}
        <button
          onClick={() => scrollToSection("hero")}
          className="group text-left flex items-baseline gap-2.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-vermilion"
        >
          <span className="font-display font-bold tracking-tight text-base sm:text-lg text-(--text-primary) group-hover:text-vermilion transition-colors">
            BEREKET KINFE
          </span>
          <span className="hidden sm:inline-block font-mono text-[11px] text-(--text-muted) tracking-wider">
            / SOFTWARE ENGINEER
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative text-xs font-mono tracking-wider transition-colors py-1 flex items-center gap-1 ${
                  isActive
                    ? "text-vermilion font-medium"
                    : "text-(--text-secondary) hover:text-(--text-primary)"
                }`}
              >
                <span className="text-[10px] text-(--text-muted) group-hover:text-vermilion transition-colors">
                  {item.num}.
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-vermilion" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Resume & Theme */}
        <div className="flex items-center gap-3">
          {/* Resume Trigger */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium tracking-wide border border-(--border-strong) rounded-xs hover:border-vermilion hover:text-vermilion transition-colors bg-(--bg-surface) text-(--text-primary)"
            title="View & Download Resume"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            suppressHydrationWarning
            className="p-2 border border-(--border-subtle) hover:border-(--border-strong) rounded-xs text-(--text-secondary) hover:text-(--text-primary) transition-colors bg-(--bg-surface)"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-(--text-primary)" />
            ) : (
              <Sun className="w-4 h-4 text-[#E0583F]" />
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border border-(--border-subtle) rounded-xs text-(--text-primary) hover:border-vermilion transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-(--border-subtle) bg-(--bg-surface) px-6 py-6 transition-all">
          <div className="flex flex-col gap-4 font-mono text-sm">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center justify-between py-2 border-b border-(--border-subtle)/50 text-left text-(--text-primary) hover:text-vermilion transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs text-(--text-muted)">{item.num}</span>
              </button>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center gap-2 px-4 py-2 border border-vermilion text-vermilion text-xs font-mono font-medium rounded-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>VIEW RESUME</span>
              </button>
              <span className="text-xs text-(--text-muted) font-mono">
                ADDIS ABABA // ET
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
