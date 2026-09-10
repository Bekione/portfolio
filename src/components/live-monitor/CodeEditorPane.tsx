'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FileCode, Play, CheckCircle2, GitBranch } from 'lucide-react';
import { ProjectConfig } from './types';

interface CodeEditorPaneProps {
  project: ProjectConfig;
  isAutoTyping: boolean;
  typingSpeed: number;
  onCodeChange?: () => void;
  onPlaySound?: (type?: 'key' | 'space' | 'enter') => void;
}

export function CodeEditorPane({
  project,
  isAutoTyping,
  typingSpeed,
  onCodeChange,
  onPlaySound,
}: CodeEditorPaneProps) {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(true);
  const codeContainerRef = useRef<HTMLDivElement>(null);

  const currentFile = project.files[activeFileIndex] || project.files[0];
  const fullCode = currentFile.code;

  // Reset typewriter when project or active file changes
  useEffect(() => {
    setDisplayedCode('');
    setCharIndex(0);
    setIsSaved(true);
  }, [project.id, activeFileIndex]);

  // Live typewriter simulation
  useEffect(() => {
    if (!isAutoTyping) return;

    if (charIndex >= fullCode.length) {
      const restartTimeout = setTimeout(() => {
        setIsSaved(true);
        onCodeChange?.();
      }, 3000);
      return () => clearTimeout(restartTimeout);
    }

    const nextChar = fullCode[charIndex];
    let delay = Math.max(12, 38 / typingSpeed);
    if (nextChar === '\n') delay = Math.max(40, 140 / typingSpeed);
    if (nextChar === '{' || nextChar === '}') delay = Math.max(30, 90 / typingSpeed);

    const timer = setTimeout(() => {
      setDisplayedCode(fullCode.slice(0, charIndex + 1));
      setCharIndex(prev => prev + 1);
      setIsSaved(false);

      // Natural keyboard sound trigger with authentic switch profiling
      const isEnter = nextChar === '\n';
      const isSpace = nextChar === ' ' || nextChar === '\t';
      const soundChance = isEnter ? 0.95 : isSpace ? 0.65 : 0.78;
      if (Math.random() < soundChance) {
        onPlaySound?.(isEnter ? 'enter' : isSpace ? 'space' : 'key');
      }

      // Auto-scroll to bottom of editor
      if (codeContainerRef.current) {
        codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, fullCode, isAutoTyping, typingSpeed, onCodeChange, onPlaySound]);

  const lines = displayedCode.split('\n');

  return (
    <div className="flex flex-col h-full bg-[#0d0e15] text-slate-200 font-mono text-[11px] select-none overflow-hidden">
      {/* Tab Bar */}
      <div className="flex items-center justify-between bg-[#08090e] border-b border-slate-800/80 px-2 h-7 shrink-0 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-1">
          {project.files.map((file, idx) => {
            const isActive = idx === activeFileIndex;
            return (
              <button
                key={file.name}
                onClick={() => setActiveFileIndex(idx)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 text-[10px] rounded-t transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#0d0e15] text-sky-300 font-semibold border-t border-sky-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <FileCode className={`w-3 h-3 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{file.name}</span>
                {!isSaved && isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-1 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-2 text-[9px] text-slate-400">
          <div className="flex items-center space-x-1">
            <GitBranch className="w-2.5 h-2.5 text-emerald-400" />
            <span>main</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>TS Strict</span>
          </span>
        </div>
      </div>

      {/* Code Area */}
      <div
        ref={codeContainerRef}
        className="flex-1 overflow-y-auto p-2 font-mono leading-relaxed select-text"
      >
        <div className="table w-full">
          {lines.map((lineText, lineIdx) => (
            <div key={lineIdx} className="table-row hover:bg-slate-900/40">
              <span className="table-cell text-right pr-3 select-none text-slate-600 text-[9.5px] w-8">
                {lineIdx + 1}
              </span>
              <span className="table-cell whitespace-pre text-slate-300 font-mono text-[10.5px]">
                {colorizeCode(lineText)}
                {lineIdx === lines.length - 1 && isAutoTyping && (
                  <span className="inline-block w-1.5 h-3.5 bg-sky-400 animate-pulse ml-0.5 align-middle" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-3 h-5 bg-[#08090e] border-t border-slate-800/80 text-[9px] text-slate-400 shrink-0">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1 text-sky-400">
            <Play className="w-2.5 h-2.5 fill-sky-400" />
            <span>Auto-Typing</span>
          </span>
          <span>UTF-8</span>
          <span>TypeScript JSX</span>
        </div>
        <div>
          <span>Ln {lines.length}, Col {lines[lines.length - 1]?.length || 1}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Lightweight syntax colorizer for keywords, strings, types, and tags
 */
function colorizeCode(line: string): React.ReactNode {
  if (line.trim().startsWith('//') || line.trim().startsWith('--')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  const tokens = line.split(/(\s+|[(){}[\]:;,.<>=!&|?+\-*/"'])/);

  return tokens.map((token, i) => {
    if (
      ['import', 'export', 'from', 'default', 'function', 'class', 'async', 'await', 'return', 'const', 'let', 'var', 'new', 'if', 'else', 'private', 'for', 'switch', 'case', 'CREATE', 'INDEX', 'SELECT', 'WHERE', 'ORDER', 'BY', 'LIMIT', 'EXPLAIN', 'ANALYZE'].includes(token)
    ) {
      return <span key={i} className="text-purple-400 font-semibold">{token}</span>;
    }
    if (['useState', 'useEffect', 'useMemo', 'useRef', 'useVirtualizer', 'init', 'handleAudioFrame', 'isEndOfThought'].includes(token)) {
      return <span key={i} className="text-blue-400">{token}</span>;
    }
    if (['string', 'number', 'boolean', 'void', 'Promise', 'WebSocket', 'Buffer', 'Float32Array', 'PartRecord', 'ProjectConfig'].includes(token)) {
      return <span key={i} className="text-emerald-400">{token}</span>;
    }
    if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
      return <span key={i} className="text-amber-300">{token}</span>;
    }
    if (['true', 'false', 'null', 'undefined'].includes(token)) {
      return <span key={i} className="text-amber-400 font-bold">{token}</span>;
    }
    if (/^\d+$/.test(token)) {
      return <span key={i} className="text-amber-400">{token}</span>;
    }
    if (token.startsWith('<') && token.endsWith('>')) {
      return <span key={i} className="text-pink-400">{token}</span>;
    }
    return <span key={i}>{token}</span>;
  });
}
