export interface Point {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
}

export interface ScreenCorners {
  tl: Point;
  tr: Point;
  br: Point;
  bl: Point;
}

export type ViewMode = 'split' | 'code' | 'preview' | 'terminal';

export type ProjectId = 'ai-visa-interview' | 'spare-parts-erp' | 'afrilearn-platform';

export interface ProjectFile {
  name: string;
  icon: string;
  code: string;
}

export interface ProjectConfig {
  id: ProjectId;
  name: string;
  tagline: string;
  files: ProjectFile[];
  previewUrl: string;
}

export interface ScreenSettings {
  viewMode: ViewMode;
  activeProject: ProjectId;
  typingSpeed: number; // multiplier e.g. 1
  isAutoTyping: boolean;
  soundEnabled: boolean;
  screenGlow: boolean;
  scanlines: boolean;
  crtCurvature: boolean;
}
