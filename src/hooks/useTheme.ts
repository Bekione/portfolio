'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

let currentTheme: Theme = 'dark';
const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return 'dark';
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notify() {
  listeners.forEach((listener) => listener());
}

let isInitialized = false;

function initTheme() {
  if (typeof window === 'undefined' || isInitialized) return;
  isInitialized = true;

  const saved = localStorage.getItem('bk_theme') as Theme | null;
  if (saved === 'light' || saved === 'dark') {
    if (currentTheme !== saved) {
      currentTheme = saved;
      notify();
    }
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } else {
    const isDark = document.documentElement.classList.contains('dark');
    const detected: Theme = isDark ? 'dark' : 'light';
    if (currentTheme !== detected) {
      currentTheme = detected;
      notify();
    }
  }

  // Listen to custom event if other components or windows dispatch it
  window.addEventListener('bk_theme_change', (e: Event) => {
    const customEvent = e as CustomEvent<Theme>;
    const detail = customEvent.detail;
    if (detail === 'light' || detail === 'dark') {
      if (currentTheme !== detail) {
        currentTheme = detail;
        notify();
      }
    }
  });

  // Observe class mutations on document.documentElement (e.g. from inline scripts or devtools)
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains('dark');
    const detected: Theme = isDark ? 'dark' : 'light';
    if (currentTheme !== detected) {
      currentTheme = detected;
      notify();
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

export function setThemeGlobal(newTheme: Theme) {
  if (currentTheme !== newTheme) {
    currentTheme = newTheme;
    notify();
  }
  if (typeof window !== 'undefined') {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('bk_theme', newTheme);
    window.dispatchEvent(new CustomEvent('bk_theme_change', { detail: newTheme }));
  }
}

export function toggleThemeGlobal(): Theme {
  const nextTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
  setThemeGlobal(nextTheme);
  return nextTheme;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initTheme();
  }, []);

  return {
    theme,
    setTheme: setThemeGlobal,
    toggleTheme: toggleThemeGlobal,
    mounted,
  };
}
