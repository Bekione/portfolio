'use client';

import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, CheckCircle2 } from 'lucide-react';
import { ProjectConfig } from './types';

interface TerminalPaneProps {
  project: ProjectConfig;
  lastCodeChangeTime?: number;
}

export function TerminalPane({ project, lastCodeChangeTime }: TerminalPaneProps) {
  const [logs, setLogs] = useState<string[]>([
    '▲ Next.js 16.3.4 (Turbopack)',
    '✓ Ready in 142ms',
    '✓ [TypeScript] 0 diagnostic errors found.',
    '➜ Local:   http://localhost:3000/',
    '➜ Network: http://192.168.1.4:3000/',
  ]);

  useEffect(() => {
    if (!lastCodeChangeTime) return;
    const now = new Date().toLocaleTimeString();
    const newLog = `[turbopack] ${now} compiled /src/${project.files[0].name} in 42ms`;
    setLogs(prev => [...prev.slice(-18), newLog]);
  }, [lastCodeChangeTime, project.files]);

  return (
    <div className="flex flex-col h-full bg-[#090a10] text-slate-300 font-mono text-[10px] leading-relaxed p-2.5 overflow-y-auto select-none border-t border-slate-800/80">
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800/60 text-slate-400 text-[9px]">
        <div className="flex items-center gap-1.5">
          <TerminalIcon className="w-3 h-3 text-sky-400" />
          <span className="font-semibold text-slate-200">Terminal — bash</span>
          <span className="text-[8px] px-1.5 bg-slate-800 text-slate-400 rounded">dev server</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-2.5 h-2.5" />
          <span>turbopack active</span>
        </div>
      </div>

      <div className="space-y-1">
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="text-slate-600 select-none">›</span>
            <span
              className={
                log.includes('compiled')
                  ? 'text-emerald-300 font-semibold'
                  : log.includes('Local') || log.includes('Ready')
                  ? 'text-sky-300'
                  : 'text-slate-300'
              }
            >
              {log}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1 text-slate-500 pt-1">
          <span className="text-emerald-400 font-bold">bereket@workstation</span>
          <span>:</span>
          <span className="text-sky-400">~/projects/{project.id}</span>
          <span>$</span>
          <span className="w-1.5 h-3.5 bg-slate-400 animate-pulse ml-1" />
        </div>
      </div>
    </div>
  );
}
