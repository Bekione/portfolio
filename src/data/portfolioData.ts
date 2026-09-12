import { Project, Experience, TechStackCategory, LabExperiment, EngineeringPrinciple } from '../types';

export const PERSONAL_INFO = {
  name: 'Bereket Kinfe',
  title: 'Software Engineer',
  focus: 'Thoughtful interfaces, reliable systems, and products that feel good to use',
  location: 'Addis Ababa, Ethiopia',
  status: 'Open to remote & product engineering roles',
  email: 'bereket.kinfe23@gmail.com',
  github: 'https://github.com/Bekione',
  linkedin: 'https://www.linkedin.com/in/bereket-k/',
  upwork: 'https://www.upwork.com/freelancers/~012d26bbc748699f75',
  bioShort: "I'm a software engineer who likes working across the whole product - from interfaces and frontend architecture to APIs, data, and the messy problems underneath them.",
  bioExtended: [
    "I like working where product decisions, interfaces, and engineering meet.",
    "Over the last few years I've worked on everything from multi-tenant marketplaces and large ERP systems to AI-powered voice applications and mobile products.",
    "I enjoy taking complicated requirements, understanding the system underneath them, and turning them into software that feels simple to use."
  ],
  verifiedFacts: [
    { label: 'BASED IN', value: 'Addis Ababa, Ethiopia' },
    { label: 'EXPERIENCE', value: '~4 Years Building Software' },
    { label: 'PRIMARY STACK', value: 'TypeScript, React, Next.js, Node.js' },
    { label: 'INTERESTS', value: 'Architecture, Performance, DX, AI, OSS' }
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
    type: 'Web & Mobile Platform',
    role: 'Lead Frontend & Product Engineer',
    technologies: ['React', 'React Native', 'TypeScript', 'Tailwind CSS', 'Nest.js', 'PostgreSQL'],
    shortDescription: 'A multi-tenant ISP marketplace with separate experiences for customers, ISP admins, and platform admins. I owned the frontend architecture across web and mobile.',
    problem: 'Multiple telecom providers needed their own isolated workspaces while sharing a catalog, checkout, and billing flow. Customers needed a simple self-service mobile app, while ISP admins needed deep line management and subscriber controls.',
    solution: 'I designed a unified frontend architecture that routes users into three distinct experiences based on their role: the customer marketplace, the provider admin portal, and the platform super-admin. We shared core business logic and component conventions between React for web and React Native for mobile.',
    result: 'Shipped a clean, dependable multi-tenant platform with strict tenant boundaries, reliable checkout, and consistent UX across desktop and mobile devices.',
    highlights: [
      'Designed tenant-aware routing and state isolation for 3 distinct user tiers',
      'Shared component patterns and business logic across React Web and React Native mobile clients',
      'Integrated Nest.js REST APIs and PostgreSQL with robust error boundaries and optimistic state updates',
      'Built a clean, accessible design system with Tailwind CSS for rapid feature delivery'
    ],
    image: '/assets/projects/isp-marketplace.jpg',
    imageAlt: 'ISP Marketplace Network Performance Dashboard',
    featuredAspect: 'architecture',
    isPrivate: true
  },
  {
    id: 'spare-parts-erp',
    number: '02',
    title: 'Spare-Parts Enterprise ERP',
    year: '2024',
    type: 'High-Volume ERP System',
    role: 'Full-Stack Performance Engineer',
    technologies: ['React', 'Laravel', 'MySQL / SQL Optimization', 'Windowed Virtualization', 'Redis'],
    shortDescription: 'An enterprise system managing over 10 million spare-parts records, inventory mutations, and wholesale orders. I reworked the frontend and query layers when the system started crawling under heavy load.',
    problem: 'The ERP had become painfully slow under high inventory volume. Warehouse teams faced 10+ second page freezes, gateway timeouts, and browser crashes while searching or scanning barcodes across millions of parts.',
    solution: 'I dug into the data pipeline from database to DOM. Implemented windowed table virtualization to render only visible rows, refactored heavy Eloquent queries into compound-indexed raw SQL joins, and added client-side request deduplication with targeted Redis caching.',
    result: 'Cut response times from 10+ second timeouts down to 40–120ms. The tables now scroll at 60fps with over 100k rows in memory, and warehouse staff stopped losing work to browser memory crashes.',
    highlights: [
      'Rendered 100,000+ rows smoothly with windowed table virtualization',
      'Refactored unindexed queries into compound-indexed SQL joins to eliminate N+1 bottlenecks',
      'Added client-side request deduplication and multi-level caching',
      'Fixed browser memory leaks during rapid SKU barcode scanning sessions'
    ],
    metrics: [
      { label: 'Query Latency', value: '42ms', change: 'from 10s+ timeouts' },
      { label: 'Catalog Records', value: '10M+', change: 'indexed and searchable' },
      { label: 'DOM Memory', value: '-78%', change: 'client memory footprint reduction' }
    ],
    image: '/assets/projects/spare-parts-erp.jpg',
    imageAlt: 'Spare-Parts Enterprise ERP High-Density Inventory Table',
    featuredAspect: 'performance',
    isPrivate: true
  },
  {
    id: 'ai-visa-interview',
    number: '03',
    title: 'AI Visa Interview Platform',
    year: '2025',
    type: 'Real-Time Voice AI',
    role: 'Audio Pipeline & Systems Engineer',
    technologies: ['WebSockets', 'ONNX Runtime', 'BERT-based VAD', 'STT / LLM / TTS', 'AWS EC2', 'TypeScript'],
    shortDescription: 'A mock visa interview simulator where applicants practice conversational interviews with an AI consular officer in real time with natural conversational pace.',
    problem: 'Voice AI often feels awkward because of 2–3 second response lags and speech collisions. If an applicant pauses to think, naive bots interrupt; if they finish speaking, long silence breaks the immersion.',
    solution: 'I built an end-to-end streaming audio pipeline over WebSockets. Integrated ONNX runtime with a custom BERT-based Voice Activity Detection model to accurately detect semantic end-of-thought, then streamed synthesised TTS audio chunks back to the browser before the full reply finished generating.',
    result: 'Brought turnaround latency under one second on AWS EC2, creating a realistic, high-pressure interview environment that feels like speaking to an actual person.',
    highlights: [
      'Full-duplex WebSocket audio streaming pipeline with jitter buffering',
      'Local ONNX inference with BERT-based VAD for natural end-of-thought detection',
      'Streamed chunked TTS audio playback to minimize time-to-first-sound',
      'Resilient connection handling and network jitter mitigation for mobile users'
    ],
    image: '/assets/projects/ai-visa-interview.jpg',
    imageAlt: 'AI Visa Interview Platform Real-Time Audio Streaming Interface',
    featuredAspect: 'ai-voice',
    isPrivate: true
  },
  {
    id: 'afrilearn-platform',
    number: '04',
    title: 'Afrilearn Platform',
    year: '2025',
    type: 'EdTech Web Platform',
    role: 'Frontend Architect & Performance Lead',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Core Web Vitals', 'Semantic SEO'],
    shortDescription: 'The public web platform for Afrilearn, an AI-powered education platform. I rebuilt the frontend architecture for speed, accessibility, and discoverability.',
    problem: 'The original site had a Google Lighthouse score hovering around 60, bloated JavaScript bundles, slow load times on mobile networks, and missed organic search opportunities.',
    solution: 'I rebuilt the frontend on Next.js: trimmed bundle weight, implemented strict route-based code splitting, preloaded critical assets, optimized responsive media, and added structured JSON-LD educational schemas.',
    result: 'Achieved a perfect 100/100 Lighthouse score across Performance, Accessibility, Best Practices, and SEO. Cut LCP from 3.8s down to 0.7s, helping onboard over 600 new active students in the first month.',
    highlights: [
      'Achieved 100/100 Google Lighthouse across all four audit categories',
      'Reduced Largest Contentful Paint (LCP) from 3.8s down to 0.7s on mobile connections',
      'Added structured educational schemas (JSON-LD) for Google rich snippets',
      'Built accessible, keyboard-first onboarding modules and lesson flows'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100', change: 'improved from ~60' },
      { label: 'Monthly Growth', value: '+600', change: 'new students in 30 days' },
      { label: 'LCP Metric', value: '0.7s', change: 'from 3.8s initial load' }
    ],
    image: '/assets/projects/afrilearn-platform.jpg',
    imageAlt: 'Afrilearn EdTech Platform Course Dashboard',
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
    description: 'A freelance management app with automated invoice generation, client onboarding portals, contract delivery, and Stripe billing.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Better Auth', 'React Query'],
    githubUrl: 'https://github.com/Bekione/FreelanceHub',
    notes: 'Clean multi-tenant client billing and payment automation.',
    status: 'Open Source'
  },
  {
    id: 'quota-keeper',
    title: 'Quota Keeper',
    category: 'Developer Tool',
    description: 'Local-first developer dashboard for monitoring multi-provider API quotas, token rate-limits, and budget alerts with offline-first client storage.',
    technologies: ['Next.js 16', 'TypeScript', 'Supabase', 'Dexie IndexedDB', 'Framer Motion'],
    githubUrl: 'https://github.com/Bekione/quota-keeper',
    notes: 'Privacy-first token tracking without sending credentials to third parties.',
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
    description: 'Collaborative web app enabling groups of friends to collect video memories and time-locked surprise messages.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Vercel Blob', 'Framer Motion'],
    githubUrl: 'https://github.com/Bekione/birthday-drop',
    notes: 'Real-time interactive reveal sequences with rich media handling.',
    status: 'Production'
  },
  {
    id: 'everleaf-medical',
    title: 'EverLeaf Medical Center',
    category: 'Landing Page',
    description: 'Clean, accessible healthcare clinic website featuring clinical directories, appointment booking flows, and semantic SEO.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Schema.org'],
    githubUrl: 'https://github.com/Bekione/EverLeaf-Medical-Center-Website',
    notes: 'Mobile-first design with 100/100 accessibility and structured medical metadata.',
    status: 'Open Source'
  }
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    company: 'Fanaye Technologies',
    role: 'Frontend Engineer & Product Lead',
    period: 'Sept 2025 – Jan 2026',
    location: 'Addis Ababa, Ethiopia',
    description: 'I led frontend development across web and mobile for a multi-tenant ISP platform and worked closely with the backend team to ship on schedule.',
    keyResponsibilities: [
      'Built web and mobile interfaces for an ISP marketplace serving customers, providers, and platform admins',
      'Broke down technical requirements, coordinated sprint deliverables, and ran QA testing cycles',
      'Implemented core Nest.js REST endpoints and worked on PostgreSQL schema design and queries',
      'Triaged production issues, wrote automated tests, and verified release stability'
    ],
    technologies: ['React', 'React Native', 'Tailwind CSS', 'Nest.js', 'PostgreSQL', 'TypeScript']
  },
  {
    company: 'Afrilearn International',
    role: 'Software Engineer',
    period: 'July 2025 – Sept 2025',
    location: 'Remote',
    description: 'At Afrilearn, I worked on the public web platform and built a real-time conversational voice AI interview system.',
    keyResponsibilities: [
      'Rebuilt the public web architecture on Next.js, raising Lighthouse performance scores from ~60 to 100',
      'Built a low-latency audio pipeline (STT → LLM → TTS) streaming over WebSockets on AWS EC2',
      'Integrated local ONNX runtime with BERT-based voice activity detection for natural conversational turn-taking',
      'Implemented semantic SEO schemas that helped onboard +600 new active students in the first month'
    ],
    technologies: ['Next.js', 'WebSockets', 'ONNX', 'BERT VAD', 'AWS EC2', 'Tailwind CSS', 'Core Web Vitals']
  },
  {
    company: 'Self-Employed',
    role: 'Fullstack Developer (Freelance)',
    period: 'Apr 2025 – June 2025',
    location: 'Addis Ababa, Ethiopia',
    description: 'I worked with clients to design, build, and deploy custom web applications, admin portals, and internal tools.',
    keyResponsibilities: [
      'Built production web applications with Next.js, TypeScript, and clean role-based permissions',
      'Developed custom admin dashboards, transactional notifications, and client portals',
      'Managed cloud deployments, custom domain routing, SSL certificates, and CI/CD pipelines'
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'REST APIs']
  },
  {
    company: 'Adot Technologies',
    role: 'Co-Founder & Frontend Developer',
    period: 'Aug 2024 – Mar 2025',
    location: 'Addis Ababa, Ethiopia',
    description: 'Co-founded a software initiative where we built an internal ERP system and modern tooling for local businesses.',
    keyResponsibilities: [
      'Designed and built the Adot ERP interface and company web presence',
      'Created a reusable UI component library using Next.js, TypeScript, and Tailwind CSS',
      'Speeded up feature delivery by standardizing data table, modal, and form patterns'
    ],
    technologies: ['Next.js', 'TypeScript', 'shadcn/ui', 'Tailwind CSS', 'Design Systems']
  },
  {
    company: 'WTB Import and IT Solution',
    role: 'Frontend Developer',
    period: 'Dec 2023 – July 2024',
    location: 'Addis Ababa, Ethiopia',
    description: 'Built inventory tracking tools and management dashboards for retail and warehouse operations.',
    keyResponsibilities: [
      'Developed data-heavy frontend screens using React and Redux connected to REST and GraphQL APIs',
      'Improved UI responsiveness and cut initial bundle sizes through route and component lazy loading',
      'Collaborated with backend engineers to define clean API schemas and error handling contracts'
    ],
    technologies: ['React', 'Redux', 'GraphQL', 'REST APIs', 'JavaScript', 'CSS3']
  },
  {
    company: 'Faith Import & Trade',
    role: 'Fullstack Developer',
    period: 'Aug 2023 – Nov 2023',
    location: 'Addis Ababa, Ethiopia',
    description: 'Built an internal task management tool and mobile-friendly inventory tracker for field staff.',
    keyResponsibilities: [
      'Created an internal task management app with Next.js and PostgreSQL',
      'Added offline caching support (PWA) so field staff could log inventory without reliable internet',
      'Implemented role-based permissions to protect sensitive commercial and stock data'
    ],
    technologies: ['Next.js', 'PostgreSQL', 'PWA', 'TypeScript', 'Authentication']
  },
  {
    company: 'Techtonic Tribe',
    role: 'Education Lead (Volunteer)',
    period: '2023 – 2024',
    location: 'Addis Ababa, Ethiopia',
    description: 'Taught modern web development and mentored aspiring developers in our local tech community.',
    keyResponsibilities: [
      'Created a practical curriculum covering modern JavaScript, React state patterns, and Git workflows',
      'Ran live coding workshops and code review sessions for beginner and intermediate developers',
      'Mentored students on building portfolios, debugging real code, and preparing for engineering roles'
    ],
    technologies: ['JavaScript', 'React', 'Git Workflows', 'Web Fundamentals', 'Mentorship']
  }
];

export const TECH_STACK: TechStackCategory[] = [
  {
    number: '01',
    title: 'FRONTEND',
    subtitle: 'Interfaces, component systems & client apps',
    skills: [
      { name: 'React', level: 'primary', context: 'Hooks, state management, component architecture' },
      { name: 'Next.js', level: 'primary', context: 'App Router, SSR, SSG, server actions' },
      { name: 'TypeScript', level: 'primary', context: 'Strict typing, domain models, interface contracts' },
      { name: 'JavaScript (ESNext)', level: 'primary', context: 'Async patterns, DOM APIs, modern runtime features' },
      { name: 'Tailwind CSS', level: 'primary', context: 'Design tokens, responsive layouts, utility craft' },
      { name: 'React Native', level: 'proficient', context: 'Cross-platform mobile apps for iOS and Android' },
      { name: 'Responsive Design', level: 'primary', context: 'Mobile-first, fluid layout systems' },
      { name: 'Accessibility (a11y)', level: 'primary', context: 'Keyboard navigation, semantic HTML, ARIA' },
      { name: 'Component Systems', level: 'primary', context: 'Composition, reusability, token consistency' }
    ]
  },
  {
    number: '02',
    title: 'STATE & DATA',
    subtitle: 'Data flow, synchronization & network contracts',
    skills: [
      { name: 'Zustand', level: 'primary', context: 'Simple, ergonomic global state management' },
      { name: 'TanStack Query', level: 'primary', context: 'Server state, caching, optimistic mutations' },
      { name: 'WebSockets', level: 'primary', context: 'Real-time duplex events and audio streaming' },
      { name: 'REST APIs', level: 'primary', context: 'Resource-oriented API design and integration' },
      { name: 'GraphQL', level: 'proficient', context: 'Declarative querying and type generation' },
      { name: 'Redux Toolkit', level: 'proficient', context: 'Predictable state containers for legacy systems' }
    ]
  },
  {
    number: '03',
    title: 'BACKEND',
    subtitle: 'Application servers, APIs & databases',
    skills: [
      { name: 'Node.js', level: 'primary', context: 'Event loop, streaming I/O, server services' },
      { name: 'Nest.js', level: 'primary', context: 'Modular architecture, dependency injection, guards' },
      { name: 'Express', level: 'primary', context: 'Lightweight REST APIs and middleware' },
      { name: 'Laravel', level: 'proficient', context: 'Backend services, ORM, and SQL optimization' },
      { name: 'PostgreSQL', level: 'primary', context: 'Relational modeling, indexing, query tuning' },
      { name: 'Redis', level: 'proficient', context: 'Caching, latency reduction, session stores' }
    ]
  },
  {
    number: '04',
    title: 'INFRASTRUCTURE & TOOLS',
    subtitle: 'Deployment, containers & everyday workflow',
    skills: [
      { name: 'AWS EC2', level: 'primary', context: 'Hosting compute instances, audio pipeline services' },
      { name: 'Docker', level: 'proficient', context: 'Containerization, reproducible local environments' },
      { name: 'Git & GitHub', level: 'primary', context: 'Branch workflows, pull requests, automated actions' },
      { name: 'CI/CD Pipelines', level: 'proficient', context: 'Automated testing, build checks, deployment' }
    ]
  },
  {
    number: '05',
    title: "THINGS I'M EXPLORING",
    subtitle: 'Voice systems, local ML inference & developer tooling',
    skills: [
      { name: 'Streaming Voice AI', level: 'primary', context: 'Low-latency STT, LLM, and TTS pipelines' },
      { name: 'ONNX Runtime', level: 'proficient', context: 'Local ML model inference in Node and browser' },
      { name: 'Voice Activity Detection', level: 'proficient', context: 'BERT-based VAD for natural conversational pacing' },
      { name: 'LLM Integration', level: 'primary', context: 'Structured tool calling, retrieval, agent flows' },
      { name: 'Developer Tooling', level: 'primary', context: 'VS Code extensions, CLI utilities, workflow automation' }
    ]
  }
];

export const PHILOSOPHY_PRINCIPLES: EngineeringPrinciple[] = [
  {
    number: '01',
    title: 'UNDERSTAND BEFORE OPTIMIZING.',
    summary: 'I like knowing why something is slow or broken before reaching for another dependency.',
    rationale: 'Rushing to add libraries or caching layers often hides the real issue. Understanding how data moves and where time is actually spent leads to simpler, more permanent fixes.'
  },
  {
    number: '02',
    title: 'I NOTICE WHEN SOFTWARE FEELS SLOW.',
    summary: 'A technically correct interface can still be frustrating to use. Speed is part of user experience.',
    rationale: 'Whether tuning a voice AI response loop down under one second or fixing an ERP table that freezes under 100k rows, responsive software communicates respect for the person using it.'
  },
  {
    number: '03',
    title: 'I LIKE BORING, PREDICTABLE FOUNDATIONS.',
    summary: 'Good components, clear data flow, predictable state. Keep things simple until complexity is truly justified.',
    rationale: 'Clever abstractions often turn into maintenance headaches. Boring, well-tested primitives and explicit data contracts make codebases easy to understand and hard to break.'
  },
  {
    number: '04',
    title: 'I ENJOY MESSY PROBLEMS.',
    summary: 'Some of the most rewarding work starts with existing systems that are tangled or slow and bringing clarity to them.',
    rationale: 'Greenfield projects are fun, but taking a sluggish database query, an overgrown bundle, or a confusing multi-tenant workflow and untangling it is where engineering gets really satisfying.'
  },
  {
    number: '05',
    title: 'SHIP, LISTEN, AND REFINE.',
    summary: 'Real software lives with real users. Actual usage teaches you more than theoretical perfection.',
    rationale: 'You cannot predict every edge case on localhost. Getting working software into people\'s hands, monitoring how it behaves under real network conditions, and iterating is how products get great.'
  }
];
