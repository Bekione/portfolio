export interface Project {
  id: string;
  number: string;
  title: string;
  year: string;
  type: string;
  role: string;
  technologies: string[];
  shortDescription: string;
  problem: string;
  solution: string;
  result: string;
  highlights: string[];
  metrics?: {
    label: string;
    value: string;
    change?: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
  isPrivate?: boolean;
  image: string;
  images?: string[];
  imageAlt?: string;
  featuredAspect: 'architecture' | 'performance' | 'ai-voice' | 'design-system' | 'optimization';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  keyResponsibilities: string[];
  technologies: string[];
  isCurrent?: boolean;
}

export interface TechStackCategory {
  number: string;
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level?: 'primary' | 'proficient';
    context?: string;
  }[];
}

export interface LabExperiment {
  id: string;
  title: string;
  category: 'Developer Tool' | 'SaaS' | 'Landing Page' | 'AI / Bot' | 'State & UI' | 'Algorithms' | 'Automation';
  description: string;
  technologies: string[];
  githubUrl: string;
  notes?: string;
  status: 'Completed' | 'Open Source' | 'Active' | 'Production' | 'In Development';
}

export interface EngineeringPrinciple {
  number: string;
  title: string;
  summary: string;
  rationale: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
