import { Project, Experience, TechStackCategory, LabExperiment, EngineeringPrinciple } from '../types';

export const PERSONAL_INFO = {
  name: 'Bereket Kinfe',
  title: 'Software Engineer / Full-Stack Developer',
  focus: 'Product Engineering / Full-Stack Systems',
  location: 'Addis Ababa, Ethiopia',
  status: 'Open to remote & product engineering',
  email: 'bereket.kinfe23@gmail.com',
  github: 'https://github.com/Bekione',
  linkedin: 'https://www.linkedin.com/in/bereket-k/',
  upwork: 'https://www.upwork.com/freelancers/~012d26bbc748699f75',
  bioShort: 'Software engineer working across frontend, backend, mobile, and product systems — with a particular obsession for thoughtful interfaces and reliable software.',
  bioExtended: [
    "I like working where product decisions, interfaces, and engineering meet.",
    "Over the last few years I've worked on everything from multi-tenant marketplaces and large ERP systems to AI-powered voice applications and mobile products.",
    "I enjoy taking complicated requirements, understanding the system underneath them, and turning them into software that feels simple to use."
  ],
  verifiedFacts: [
    { label: 'BASED IN', value: 'Addis Ababa, Ethiopia' },
    { label: 'EXPERIENCE', value: '~4 Years Hands-on Industry' },
    { label: 'PRIMARY STACK', value: 'TypeScript, React, Next.js, Node.js' },
    { label: 'INTERESTS', value: 'Architecture / DX / AI / Performance / OSS' }
  ],
  githubSnapshot: {
    contributionsLastYear: '2,561',
    repositories: 34,
    achievements: ['Pull Shark x2', 'YOLO Achievement'],
    followers: 15,
    following: 26,
    profileUrl: 'https://github.com/Bekione'
  }
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'isp-marketplace',
    number: '01',
    title: 'ISP Marketplace',
    year: '2025–2026',
    type: 'Multi-Tenant Commercial Platform',
    role: 'Lead Frontend & Product Engineer',
    technologies: ['React', 'React Native', 'TypeScript', 'Tailwind CSS', 'Nest.js', 'PostgreSQL'],
    shortDescription: 'A multi-tenant ISP marketplace engineered for the Indian telecommunications market, orchestrating customer, provider, and administrative operations.',
    problem: 'Multiple telecom tiers and service providers needed separate, isolated operational spaces while sharing unified catalog, subscription, and billing workflows across web and mobile surfaces.',
    solution: 'Engineered a unified multi-tenant frontend architecture supporting three distinct user profiles: end-user marketplace, ISP tenant admin, and platform super-admin. Implemented cross-platform code sharing between React (web) and React Native (mobile).',
    result: 'Delivered a resilient, responsive multi-tenant system with strict permission boundaries, decoupled API integration layers, and seamless checkout and subscription management.',
    highlights: [
      'Multi-tenant state isolation and dynamic role-based view routing',
      'Dual-surface parity: React Web alongside React Native mobile clients',
      'High-throughput Nest.js REST and PostgreSQL backend integration',
      'Unified design token system implemented with Tailwind CSS'
    ],
    featuredAspect: 'architecture',
    isPrivate: true
  },
  {
    id: 'spare-parts-erp',
    number: '02',
    title: 'Spare-Parts Enterprise ERP',
    year: '2024',
    type: 'High-Volume Enterprise System',
    role: 'Full-Stack Performance & Systems Engineer',
    technologies: ['React', 'Laravel', 'MySQL / SQL Optimization', 'Virtualization', 'Redis Caching'],
    shortDescription: 'Mission-critical enterprise resource planning system managing 10,000,000+ spare parts records, inventory mutations, and wholesale orders.',
    problem: 'The legacy system suffered from 10+ second page freezes, gateway timeouts, unbounded N+1 database queries, and unvirtualized tables crashing browser memory under heavy search queries.',
    solution: 'Took direct ownership of the React + Laravel foundation. Re-architected data loading with windowed virtualization, indexed heavy SQL joins, introduced strategic caching layers, and redesigned batching mechanisms.',
    result: 'Cut response latencies from 10+ second timeouts down to 40–120ms responses. Restored complete operational reliability for warehouse teams handling millions of SKU items.',
    highlights: [
      'Engineered windowed virtualized tables rendering 100k+ DOM items smoothly',
      'Refactored unindexed Eloquent queries into optimized raw SQL joins with compound indexes',
      'Client-side request deduplication and aggressive multi-level caching',
      'Eliminated browser memory leaks during high-frequency SKU barcode scans'
    ],
    metrics: [
      { label: 'Query Latency', value: '42ms', change: 'from 10s+ timeouts' },
      { label: 'Data Volume', value: '10M+', change: 'catalog records managed' },
      { label: 'Memory Footprint', value: '-78%', change: 'client DOM memory reduction' }
    ],
    featuredAspect: 'performance',
    isPrivate: true
  },
  {
    id: 'ai-visa-interview',
    number: '03',
    title: 'AI Visa Interview Platform',
    year: '2025',
    type: 'Real-Time Voice AI System',
    role: 'Systems & Audio Pipeline Engineer',
    technologies: ['WebSockets', 'ONNX Runtime', 'BERT-based VAD', 'STT / LLM / TTS', 'AWS EC2', 'TypeScript'],
    shortDescription: 'Low-latency real-time voice interview simulator delivering human-parity conversational pace for mock consular visa examinations.',
    problem: 'Traditional voice AI pipelines suffer from turn-taking latency (>2.5s) and awkward speech overlaps when applicants pause to think or hesitate.',
    solution: 'Designed an orchestrated streaming pipeline: client audio captured via WebSockets, processed through a custom BERT-based Voice Activity Detection (VAD) model with ONNX to detect semantic completion, then piped through low-latency STT, LLM reasoning, and chunked TTS audio streaming.',
    result: 'Achieved sub-second speech-to-speech turnaround times on AWS EC2, creating a realistic, high-pressure interview environment that natural conversation requires.',
    highlights: [
      'Low-latency full-duplex WebSocket audio buffering and streaming architecture',
      'Local ONNX inference with custom BERT model for semantic end-of-thought detection',
      'Pipelined token-to-audio synthesis with chunked playback to minimize time-to-first-byte',
      'Fault-tolerant connection handling and network jitter mitigation'
    ],
    featuredAspect: 'ai-voice',
    isPrivate: true
  },
  {
    id: 'afrilearn-platform',
    number: '04',
    title: 'Afrilearn Platform',
    year: '2025',
    type: 'EdTech Web Platform & Public Experience',
    role: 'Frontend Architect & Performance Lead',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Core Web Vitals', 'SEO Engineering'],
    shortDescription: 'End-to-end architectural redesign of the flagship public web application for an AI-powered education and learning platform.',
    problem: 'The legacy web presence had a Lighthouse score hovering around 60, slow Time to Interactive (TTI), poor mobile Core Web Vitals, and suboptimal search engine indexing.',
    solution: 'Re-architected the application from the ground up: audited bundle composition, implemented strict code-splitting and asset preloading, optimized responsive layouts, and structured semantic schema markup.',
    result: 'Elevated Google Lighthouse score from ~60 to a perfect 100. Helped drive +600 new active students within the first month of release.',
    highlights: [
      'Achieved 100/100 Lighthouse Performance, Accessibility, Best Practices, and SEO',
      'Reduced Largest Contentful Paint (LCP) from 3.8s down to 0.7s',
      'Structured educational schemas (JSON-LD) for high-visibility Google rich snippets',
      'Streamlined onboarding funnel with accessible, keyboard-first interactive modules'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100', change: 'improved from ~60' },
      { label: 'Monthly Growth', value: '+600', change: 'new users in 30 days' },
      { label: 'LCP Metric', value: '0.7s', change: 'from 3.8s initial load' }
    ],
    liveUrl: 'https://afrilearn.com',
    featuredAspect: 'optimization'
  }
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
   {
    id: 'commit-tastic',
    title: 'Commit-Tastic',
    category: 'Developer Tool',
    description: 'VS Code extension that automates Git commit workflows by analyzing diffs and generating conventional, context-aware commit messages using AI.',
    technologies: ['TypeScript', 'VS Code API', 'Git CLI', 'LLM Integration'],
    githubUrl: 'https://github.com/Bekione/commit-tastic',
    notes: 'Streamlines semantic commits while keeping developers in flow.',
    status: 'Open Source'
  },
  {
    id: 'threadmind',
    title: 'ThreadMind',
    category: 'AI / Bot',
    description: 'AI-powered Telegram bot built to digest, condense, and extract key action items from lengthy multi-participant group chat threads and technical discussions.',
    technologies: ['TypeScript', 'Node.js', 'Telegram Bot API', 'Gemini API'],
    githubUrl: 'https://github.com/Bekione/threadmind',
    notes: 'Handles asynchronous queue processing and structured prompt chaining.',
    status: 'Open Source'
  },
  {
    id: 'freelance-hub',
    title: 'FreelanceHub',
    category: 'SaaS',
    description: 'Comprehensive freelance business management platform featuring automated invoice generation, client onboarding portals, contract delivery, and Stripe payments.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Better Auth', 'React Query'],
    githubUrl: 'https://github.com/Bekione/FreelanceHub',
    notes: 'End-to-end multi-tenant client billing and secure payment automation.',
    status: 'Open Source'
  },
  {
    id: 'quota-keeper',
    title: 'Quota Keeper',
    category: 'Developer Tool',
    description: 'Local-first developer dashboard for monitoring multi-provider API quotas, token consumption rate-limits, and budget alerts with offline-first client storage.',
    technologies: ['Next.js 16', 'TypeScript', 'Supabase', 'Dexie IndexedDB', 'Framer Motion'],
    githubUrl: 'https://github.com/Bekione/quota-keeper',
    notes: 'Privacy-first token tracking without sending sensitive credentials to third parties.',
    status: 'Open Source'
  },
  {
    id: 'converter-studio',
    title: 'Converter Studio',
    category: 'Developer Tool',
    description: 'Instant, zero-friction in-browser file and media conversion PWA running entirely client-side with native Web APIs and drag-and-drop workflow.',
    technologies: ['JavaScript', 'HTML5 Web APIs', 'Canvas', 'PWA', 'CSS3'],
    githubUrl: 'https://github.com/Bekione/converter-studio',
    notes: '100% in-browser processing with zero server uploads and offline support.',
    status: 'Open Source'
  },
  {
    id: 'birthday-drop',
    title: 'BirthdayDrop',
    category: 'SaaS',
    description: 'Collaborative celebratory web application enabling groups to collect multimedia memories, custom video drops, and time-locked reveal surprises.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Vercel Blob', 'Framer Motion'],
    githubUrl: 'https://github.com/Bekione/birthday-drop',
    notes: 'Real-time interactive reveal sequences with rich media handling.',
    status: 'Production'
  },
  {
    id: 'everleaf-medical',
    title: 'EverLeaf Medical Center',
    category: 'Landing Page',
    description: 'Clean, accessible healthcare facility web experience featuring specialized clinical department directories, appointment scheduling flows, and semantic SEO.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Schema.org'],
    githubUrl: 'https://github.com/Bekione/EverLeaf-Medical-Center-Website',
    notes: 'Mobile-first design with 100/100 accessibility and structured medical metadata.',
    status: 'Open Source'
  },
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    company: 'Fanaye Technologies',
    role: 'Full-Stack Engineer, QA & Junior Project Manager',
    period: 'Sept 2025 – Jan 2026',
    location: 'Addis Ababa, Ethiopia',
    description: 'Spearheaded full-stack frontend architecture and release coordination for multi-tenant telecom systems.',
    keyResponsibilities: [
      'Architected web and mobile frontend surfaces for a multi-tenant ISP marketplace serving diverse user tiers',
      'Coordinated sprint planning, technical requirements breakdown, QA cycles, and production release pipelines',
      'Developed core Nest.js APIs and managed PostgreSQL data queries with tight schema validations',
      'Conducted root-cause production bug triage, stress testing, and regression verification'
    ],
    technologies: ['React', 'React Native', 'Tailwind CSS', 'Nest.js', 'PostgreSQL', 'TypeScript', 'QA Automation']
  },
  {
    company: 'Afrilearn International',
    role: 'Software Engineer',
    period: 'July 2025 – Sept 2025',
    location: 'Remote',
    description: 'Built real-time conversational voice AI infrastructure and led front-facing performance optimization.',
    keyResponsibilities: [
      'Rebuilt public web architecture, driving Google Lighthouse performance scores from ~60 to 100',
      'Architected low-latency full-duplex audio pipeline (STT → LLM → TTS) over WebSockets on AWS EC2',
      'Integrated ONNX runtime with custom BERT-based Voice Activity Detection for conversational turn-taking',
      'Authored SEO architecture that helped drive +600 new active students within 30 days of launch'
    ],
    technologies: ['Next.js', 'WebSockets', 'ONNX', 'BERT VAD', 'AWS EC2', 'Tailwind CSS', 'Core Web Vitals']
  },
  {
    company: 'Self-Employed',
    role: 'Fullstack Developer — Freelance',
    period: 'Apr 2025 – June 2025',
    location: 'Addis Ababa, Ethiopia',
    description: 'Designed and deployed custom full-stack solutions for commercial clients with strict production requirements.',
    keyResponsibilities: [
      'Delivered production-grade Next.js and TypeScript web platforms with hardened RBAC authentication',
      'Built bespoke admin dashboards, automated transactional notification systems, and client portal tools',
      'Managed cloud infrastructure provisioning, domain routing, SSL certificates, and CI/CD releases'
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs']
  },
  {
    company: 'Adot Technologies',
    role: 'Co-Founder / Frontend Developer',
    period: 'Aug 2024 – Mar 2025',
    location: 'Addis Ababa, Ethiopia',
    description: 'Co-founded software initiative focused on modern enterprise tools and engineering ergonomics.',
    keyResponsibilities: [
      'Architected and implemented Adot ERP suite alongside the company flagship web platform',
      'Created a modular, tokenized UI system with Next.js, TypeScript, and shadcn/ui patterns',
      'Accelerated internal dashboard delivery by 3x through reusable data table and form components'
    ],
    technologies: ['Next.js', 'TypeScript', 'shadcn/ui', 'Tailwind CSS', 'Design Systems']
  },
  {
    company: 'WTB Import and IT Solution',
    role: 'Frontend Developer',
    period: 'Dec 2023 – July 2024',
    location: 'Addis Ababa, Ethiopia',
    description: 'Engineered responsive management dashboards and real-time inventory tracking applications.',
    keyResponsibilities: [
      'Built data-intensive frontend applications using React and Redux with REST and GraphQL backends',
      'Significantly improved UI responsiveness and reduced bundle size through strategic lazy-loading',
      'Collaborated closely with backend engineers to define clear API schemas and error contract states'
    ],
    technologies: ['React', 'Redux', 'GraphQL', 'REST APIs', 'JavaScript', 'CSS3']
  },
  {
    company: 'Faith Import & Trade',
    role: 'Fullstack Developer',
    period: 'Aug 2023 – Nov 2023',
    location: 'Addis Ababa, Ethiopia',
    description: 'Developed internal task management platform and field inventory tracking utilities.',
    keyResponsibilities: [
      'Constructed internal task management tool using Next.js with secure PostgreSQL database persistence',
      'Implemented progressive web app (PWA) offline caching capabilities for field operations',
      'Designed role-based permissions ensuring operational data privacy across staff tiers'
    ],
    technologies: ['Next.js', 'PostgreSQL', 'PWA', 'TypeScript', 'Authentication']
  },
  {
    company: 'Techtonic Tribe',
    role: 'Education Lead (Volunteer)',
    period: '2023 – 2024',
    location: 'Addis Ababa, Ethiopia',
    description: 'Community tech education initiative teaching modern web engineering fundamentals.',
    keyResponsibilities: [
      'Curated practical curriculum for prospective frontend and full-stack software engineers',
      'Conducted live coding workshops on modern JavaScript, React state patterns, and Git workflows',
      'Mentored emerging developers on portfolio building, code reviews, and problem-solving practices'
    ],
    technologies: ['Web Engineering', 'Curriculum Design', 'React Mentorship', 'Git Workflows']
  }
];

export const TECH_STACK: TechStackCategory[] = [
  {
    number: '01',
    title: 'FRONTEND',
    subtitle: 'User interfaces, design systems & client execution',
    skills: [
      { name: 'React', level: 'primary', context: 'Production applications, custom hooks, architecture' },
      { name: 'Next.js', level: 'primary', context: 'App Router, SSR, SSG, server actions' },
      { name: 'TypeScript', level: 'primary', context: 'Strict typing, generic models, interface design' },
      { name: 'JavaScript (ESNext)', level: 'primary', context: 'Deep runtime mechanics, async flow' },
      { name: 'Tailwind CSS', level: 'primary', context: 'Token systems, responsive layouts, utility craft' },
      { name: 'React Native', level: 'proficient', context: 'Mobile cross-platform client delivery' },
      { name: 'TanStack Start', level: 'proficient', context: 'Full-stack TypeScript exploration' },
      { name: 'Responsive Design', level: 'primary', context: 'Mobile-first, fluid layout grids' },
      { name: 'Accessibility (a11y)', level: 'primary', context: 'Keyboard flows, ARIA contracts, WCAG' },
      { name: 'Component Architecture', level: 'primary', context: 'Composition, tokens, design systems' }
    ]
  },
  {
    number: '02',
    title: 'STATE & DATA',
    subtitle: 'Data flow, synchronization & network contracts',
    skills: [
      { name: 'Zustand', level: 'primary', context: 'Lightweight, ergonomic store orchestration' },
      { name: 'TanStack Query', level: 'primary', context: 'Server cache invalidation, optimistic updates' },
      { name: 'Redux / Redux Toolkit', level: 'proficient', context: 'Enterprise legacy state orchestration' },
      { name: 'WebSockets', level: 'primary', context: 'Full-duplex audio and event streaming' },
      { name: 'REST APIs', level: 'primary', context: 'Resource-oriented API design and consumption' },
      { name: 'GraphQL', level: 'proficient', context: 'Declarative querying, schema adherence' }
    ]
  },
  {
    number: '03',
    title: 'BACKEND',
    subtitle: 'Application servers, persistence & APIs',
    skills: [
      { name: 'Node.js', level: 'primary', context: 'Event loop, streaming I/O, server services' },
      { name: 'Nest.js', level: 'primary', context: 'Modular enterprise architecture, controllers, guards' },
      { name: 'Express', level: 'primary', context: 'Lightweight REST services and middlewares' },
      { name: 'Laravel', level: 'proficient', context: 'Enterprise ERP maintenance and SQL tuning' },
      { name: 'PostgreSQL', level: 'primary', context: 'Relational modeling, indexing, query optimization' },
      { name: 'MongoDB', level: 'proficient', context: 'Document schemas and aggregation pipelines' }
    ]
  },
  {
    number: '04',
    title: 'INFRASTRUCTURE',
    subtitle: 'Deployment, containers & operational delivery',
    skills: [
      { name: 'AWS EC2', level: 'primary', context: 'Virtual machine hosting, audio AI deployment' },
      { name: 'Docker', level: 'proficient', context: 'Multi-stage containerization, reproducible builds' },
      { name: 'CI/CD Pipelines', level: 'proficient', context: 'Automated testing, build validation, releases' },
      { name: 'Git & GitHub', level: 'primary', context: 'Trunk-based workflows, review hygiene, automation' }
    ]
  },
  {
    number: '05',
    title: 'SYSTEMS & EXPERIMENTATION',
    subtitle: 'AI pipelines, runtime optimization & tooling',
    skills: [
      { name: 'ONNX Runtime', level: 'proficient', context: 'Local ML model inference in Node/browser' },
      { name: 'STT & TTS Pipelines', level: 'primary', context: 'Low-latency streaming voice architectures' },
      { name: 'BERT-based VAD', level: 'proficient', context: 'Voice Activity Detection & end-of-turn detection' },
      { name: 'AI & LLM Integration', level: 'primary', context: 'Structured tool calling, retrieval, agent flows' },
      { name: 'Developer Tooling', level: 'primary', context: 'VS Code extensions, CLI generators, automation' },
      { name: 'Software Architecture', level: 'primary', context: 'Domain modeling, decoupling, clean code' }
    ]
  }
];

export const PHILOSOPHY_PRINCIPLES: EngineeringPrinciple[] = [
  {
    number: '01',
    title: 'UNDERSTAND THE SYSTEM FIRST.',
    summary: 'Before touching any code or choosing a framework, map the real problem, data flow, and failure states.',
    rationale: 'Rushing to build before understanding the domain model leads to tangled abstractions. Software that lasts is built on a clear mental model of how data moves from origin to screen.'
  },
  {
    number: '02',
    title: 'SIMPLIFY BEFORE OPTIMIZING.',
    summary: 'The fastest code is the code that does not need to run; the cleanest architecture removes unnecessary layers.',
    rationale: 'Premature complexity is often disguised as cleverness. In the Spare-Parts ERP, removing unnecessary joins and adopting simple windowed virtualization did more than any esoteric caching engine.'
  },
  {
    number: '03',
    title: 'PERFORMANCE IS PART OF UX.',
    summary: 'A beautiful interface that stutters or spins a loader is a broken interface. Latency is an emotional tax.',
    rationale: 'Whether tuning an interactive Voice AI loop down to sub-second responses or getting Lighthouse to 100 on Afrilearn, speed communicates respect for the person using your software.'
  },
  {
    number: '04',
    title: 'GOOD COMPONENTS REDUCE FUTURE WORK.',
    summary: 'Design primitives should be composable, predictable, and strictly typed so teams move faster without breakage.',
    rationale: 'An ergonomic design system does not just look uniform—it reduces cognitive overhead. When tokens and contracts are explicit, building new features feels like assembling calibrated instruments.'
  },
  {
    number: '05',
    title: 'SHIP, OBSERVE, IMPROVE.',
    summary: 'Software is a living system. Real feedback and telemetry under actual load are worth more than theoretical perfection.',
    rationale: 'Engineering maturity means taking responsibility past git merge: monitoring error rates, profiling in production, reading real user friction, and continually refining the craft.'
  }
];
