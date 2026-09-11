'use client';

import React, { useState } from 'react';
import { CodeEditorPane } from './CodeEditorPane';
import { LiveWebPreviewPane } from './LiveWebPreviewPane';
import { TerminalPane } from './TerminalPane';
import { ProjectConfig, ScreenSettings } from './types';

interface LiveMonitorScreenProps {
  project: ProjectConfig;
  settings: ScreenSettings;
  onPlaySound?: (type?: 'key' | 'space' | 'enter') => void;
  onCodeComplete?: () => void;
  width?: number;
  height?: number;
}

export function LiveMonitorScreen({
  project,
  settings,
  onPlaySound,
  onCodeComplete,
  width = 960,
  height = 600,
}: LiveMonitorScreenProps) {
  const [lastCodeChangeTime, setLastCodeChangeTime] = useState<number>(Date.now());

  const handleCodeChange = () => {
    setLastCodeChangeTime(Date.now());
  };

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="relative flex flex-col bg-[#07080d] text-slate-100 overflow-hidden shadow-2xl select-none"
    >
      {/* Top Monitor Bezel / OS Header Bar */}
      <div className="flex items-center justify-between px-3 h-6 bg-[#0a0b12] border-b border-slate-800 text-[10px] text-slate-400 shrink-0 z-10 font-mono">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-200 tracking-wider">WORKSPACE</span>
          <span className="text-slate-600">|</span>
          <span className="text-sky-400 text-[9px]">{project.name}</span>
        </div>

        {/* Center status dot */}
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] text-slate-400">DEV SESSION ACTIVE</span>
        </div>

        <div className="flex items-center space-x-2 text-[9px] text-slate-400">
          <span>60 FPS</span>
          <span>4K UHD</span>
        </div>
      </div>

      {/* Screen Content Body based on ViewMode */}
      <div className="flex-1 flex overflow-hidden relative">
        {settings.viewMode === 'split' && (
          <>
            {/* Left Half: VS Code Editor */}
            <div className="w-1/2 h-full flex flex-col">
               <div className="flex-1 overflow-hidden">
                 <CodeEditorPane
                   project={project}
                   isAutoTyping={settings.isAutoTyping}
                   typingSpeed={settings.typingSpeed}
                   onCodeChange={handleCodeChange}
                   onPlaySound={onPlaySound}
                   onComplete={onCodeComplete}
                 />
               </div>
               {/* Mini Terminal Strip at bottom of code editor */}
               <div className="h-28 border-t border-slate-800">
                 <TerminalPane
                   project={project}
                   lastCodeChangeTime={lastCodeChangeTime}
                 />
               </div>
             </div>

             {/* Right Half: Live Web Browser Preview */}
             <div className="w-1/2 h-full border-l border-slate-800">
               <LiveWebPreviewPane
                 project={project}
                 lastCodeChangeTime={lastCodeChangeTime}
               />
             </div>
           </>
         )}

         {settings.viewMode === 'code' && (
           <div className="w-full h-full">
             <CodeEditorPane
               project={project}
               isAutoTyping={settings.isAutoTyping}
               typingSpeed={settings.typingSpeed}
               onCodeChange={handleCodeChange}
               onPlaySound={onPlaySound}
               onComplete={onCodeComplete}
             />
           </div>
         )}

        {settings.viewMode === 'preview' && (
          <div className="w-full h-full">
            <LiveWebPreviewPane
              project={project}
              lastCodeChangeTime={lastCodeChangeTime}
            />
          </div>
        )}

        {settings.viewMode === 'terminal' && (
          <div className="w-full h-full">
            <TerminalPane
              project={project}
              lastCodeChangeTime={lastCodeChangeTime}
            />
          </div>
        )}
      </div>

      {/* Subtle Scanlines effect */}
      {settings.scanlines && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] bg-repeat z-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
            backgroundSize: '100% 4px',
          }}
        />
      )}

      {/* Glass Reflection Gradient */}
      {settings.screenGlow && (
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-30"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0) 60%)',
          }}
        />
      )}
    </div>
  );
}
