"use client";

import { useEffect, useRef } from "react";
import { Download, FileText, Printer, X, Mail, MapPin } from "lucide-react";
import {
  PERSONAL_INFO,
  WORK_EXPERIENCE,
  TECH_STACK,
  FEATURED_PROJECTS,
} from "../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and pause Lenis smooth scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Prevent background page from scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Stop Lenis so it does not intercept wheel events
    const win =
      typeof window !== "undefined"
        ? (window as unknown as {
            lenis?: { stop: () => void; start: () => void };
          })
        : {};
    if (win.lenis) {
      win.lenis.stop();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Native wheel stopPropagation to prevent any wheel events from escaping to window/Lenis
    const handleNativeWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    const el = backdropRef.current;
    if (el) {
      el.addEventListener("wheel", handleNativeWheel, { passive: true });
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (win.lenis) {
        win.lenis.start();
      }
      if (el) {
        el.removeEventListener("wheel", handleNativeWheel);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/Bereket.Kinfe.Shiferaw-Resume.pdf";
    link.download = "Bereket.Kinfe.Shiferaw-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      ref={backdropRef}
      onClick={onClose}
      data-lenis-prevent="true"
      className="resume-modal-backdrop fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-8"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Dialog Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        className="resume-modal-container relative w-full max-w-4xl bg-(--bg-primary) border border-(--border-strong) rounded-xs shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="resume-modal-header p-3.5 sm:px-6 border-b border-(--border-subtle) bg-(--bg-surface) flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 truncate">
            <FileText className="w-4 h-4 text-vermilion shrink-0" />
            <span className="font-mono text-xs font-bold text-(--text-primary) truncate">
              BEREKET_KINFE_RESUME.PDF // BROWSER PREVIEW
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-(--border-subtle) hover:border-(--border-strong) text-(--text-primary) rounded-xs transition-colors cursor-pointer"
              title="Print resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PRINT</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#151515] dark:bg-[#ECE8E0] text-[#F3F0E8] dark:text-[#121211] hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white rounded-xs transition-colors cursor-pointer font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 border border-(--border-subtle) hover:border-red-500 text-(--text-muted) hover:text-red-500 rounded-xs transition-colors ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document View with overscroll-contain and min-h-0 for proper flex scroll */}
        <div
          data-lenis-prevent="true"
          className="resume-document flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-10 space-y-8 font-sans bg-(--bg-surface) text-(--text-primary) select-text"
        >
          {/* Resume Header */}
          <div className="border-b-2 border-(--text-primary) pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-(--text-primary)">
                Bereket Kinfe
              </h1>
              <span className="font-mono text-xs text-vermilion font-semibold">
                SOFTWARE ENGINEER / FULL-STACK
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-(--text-secondary)">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-vermilion" />
                Addis Ababa, Ethiopia
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-vermilion" />
                {PERSONAL_INFO.email}
              </span>
              <span>github.com/Bekione</span>
              <span>linkedin.com/in/bereket-k</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2 resume-item">
            <h2 className="font-mono text-xs font-bold text-(--text-primary) uppercase tracking-wider border-b border-(--border-subtle) pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
              Software engineer with ~4 years of hands-on industry experience
              building high-concurrency web and mobile systems. Specializes in
              frontend architecture, real-time voice streaming architectures,
              database performance optimization, and enterprise ERP systems.
              Proven track record reducing 10+ second legacy query bottlenecks
              to sub-50ms responses and engineering perfect 100/100 Lighthouse
              web applications.
            </p>
          </div>

          {/* Work History */}
          <div className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-(--text-primary) uppercase tracking-wider border-b border-(--border-subtle) pb-1">
              Work Experience
            </h2>

            <div className="space-y-6">
              {WORK_EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="resume-item space-y-1.5 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className="font-bold text-sm text-(--text-primary)">
                      {exp.role} —{" "}
                      <span className="text-vermilion">{exp.company}</span>
                    </span>
                    <span className="font-mono text-[11px] text-(--text-muted)">
                      {exp.period} | {exp.location}
                    </span>
                  </div>

                  <p className="text-(--text-secondary)">{exp.description}</p>

                  <ul className="list-disc pl-4 space-y-1 text-(--text-secondary)">
                    {exp.keyResponsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Technical Projects */}
          <div className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-(--text-primary) uppercase tracking-wider border-b border-(--border-subtle) pb-1">
              Key Engineering Projects
            </h2>

            <div className="space-y-4 text-xs">
              {FEATURED_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="resume-project-card p-3 border border-(--border-subtle) rounded-xs space-y-1 bg-(--bg-primary)"
                >
                  <div className="flex justify-between font-mono">
                    <span className="font-bold text-(--text-primary)">
                      {proj.title}
                    </span>
                    <span className="text-(--text-muted) text-[11px]">
                      {proj.year}
                    </span>
                  </div>
                  <p className="text-(--text-secondary)">
                    {proj.shortDescription}
                  </p>
                  <p className="text-[11px] font-mono text-(--text-muted) pt-1">
                    Tech: {proj.technologies.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3 resume-item">
            <h2 className="font-mono text-xs font-bold text-(--text-primary) uppercase tracking-wider border-b border-(--border-subtle) pb-1">
              Technical Capabilities
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {TECH_STACK.map((group) => (
                <div
                  key={group.number}
                  className="resume-project-card p-3 border border-(--border-subtle) rounded-xs bg-(--bg-primary)"
                >
                  <span className="font-mono font-bold text-[11px] text-vermilion block mb-1">
                    {group.title}
                  </span>
                  <p className="text-(--text-secondary) text-[11px] leading-relaxed">
                    {group.skills.map((s) => s.name).join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
