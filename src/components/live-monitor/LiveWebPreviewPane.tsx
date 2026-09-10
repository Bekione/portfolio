'use client';

import React, { useState, useEffect } from 'react';
import {
  RotateCw,
  Sparkles,
  Zap,
  Activity,
  Mic,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { ProjectConfig } from './types';

interface LiveWebPreviewPaneProps {
  project: ProjectConfig;
  lastCodeChangeTime?: number;
}

export function LiveWebPreviewPane({
  project,
  lastCodeChangeTime,
}: LiveWebPreviewPaneProps) {
  const [latency, setLatency] = useState(42);
  const [tokensProcessed, setTokensProcessed] = useState(14820);
  const [showHmrToast, setShowHmrToast] = useState(false);
  const [audioStreamStatus, setAudioStreamStatus] = useState('STREAMING (24kHz)');

  useEffect(() => {
    if (!lastCodeChangeTime) return;
    setShowHmrToast(true);
    const t = setTimeout(() => setShowHmrToast(false), 2200);
    return () => clearTimeout(t);
  }, [lastCodeChangeTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(38 + Math.floor(Math.random() * 12));
      setTokensProcessed(prev => prev + Math.floor(Math.random() * 15) + 5);
    }, 1600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#08090f] text-slate-200 select-none overflow-hidden relative font-sans">
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-2.5 h-7 bg-[#0d0e17] border-b border-slate-800/80 text-[10px] shrink-0">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-[280px] mx-2 h-5 bg-[#06070b] border border-slate-800 rounded px-2 flex items-center justify-between text-[9px] text-slate-400 font-mono">
          <span className="truncate">{project.previewUrl}</span>
          <RotateCw className="w-2.5 h-2.5 hover:text-white cursor-pointer" />
        </div>

        <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>200 OK</span>
        </div>
      </div>

      {/* HMR Toast Notification */}
      {showHmrToast && (
        <div className="absolute top-8 right-2 z-30 bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-[9px] font-mono px-2 py-1 rounded shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>HMR Hot Reloaded (42ms)</span>
        </div>
      )}

      {/* Mock Web Application Body */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#0a0b12]">
        {/* Project Specific View */}
        {project.id === 'ai-visa-interview' && (
          <div className="space-y-2.5">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-indigo-500/20 text-indigo-400">
                    <Mic className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Consular Mock Interview</h3>
                    <p className="text-[9px] text-slate-400">Low-Latency Duplex Audio Stream</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[8.5px] font-mono">
                  {audioStreamStatus}
                </span>
              </div>

              {/* Audio Waveform visualization */}
              <div className="h-10 bg-slate-950/80 rounded border border-slate-800/80 flex items-center justify-center gap-1 px-3">
                {[40, 70, 30, 85, 95, 60, 45, 80, 100, 75, 50, 65, 85, 40, 90, 60].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-gradient-to-t from-sky-500 to-indigo-400 rounded-full animate-pulse"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-[9px] text-slate-400 block">Round-Trip Latency</span>
                <span className="text-sm font-bold font-mono text-emerald-400">{latency}ms</span>
                <span className="text-[8px] text-slate-500 block">Target: &lt;500ms</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-[9px] text-slate-400 block">VAD Confidence</span>
                <span className="text-sm font-bold font-mono text-sky-400">98.4%</span>
                <span className="text-[8px] text-slate-500 block">BERT-ONNX</span>
              </div>
            </div>
          </div>
        )}

        {project.id === 'spare-parts-erp' && (
          <div className="space-y-2.5">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-xs font-bold text-white">Enterprise Parts Inventory</h3>
                  <p className="text-[9px] text-slate-400">10,000,000+ SKU Windowed Virtualization</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[8.5px] font-mono">
                  INDEX OPTIMIZED
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center text-[9px] font-mono">
                <div className="p-1.5 bg-slate-950/80 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[8px]">LATENCY</span>
                  <span className="text-emerald-400 font-bold">42ms</span>
                </div>
                <div className="p-1.5 bg-slate-950/80 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[8px]">TOTAL SKUS</span>
                  <span className="text-sky-400 font-bold">10.2M</span>
                </div>
                <div className="p-1.5 bg-slate-950/80 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[8px]">DOM NODES</span>
                  <span className="text-purple-400 font-bold">24 (Windowed)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {project.id === 'afrilearn-platform' && (
          <div className="space-y-2.5">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-white">Afrilearn Flagship Web</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[8.5px] font-mono">
                  LIGHTHOUSE 100/100
                </span>
              </div>
              <div className="p-2 bg-slate-950/80 rounded border border-slate-800 text-[9px] text-slate-300 font-mono">
                <div className="flex justify-between py-0.5">
                  <span>Performance</span>
                  <span className="text-emerald-400 font-bold">100</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Accessibility</span>
                  <span className="text-emerald-400 font-bold">100</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>Best Practices</span>
                  <span className="text-emerald-400 font-bold">100</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>SEO</span>
                  <span className="text-emerald-400 font-bold">100</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
