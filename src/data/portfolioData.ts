import { Project, Experience, Education, Leadership, TechStackCategory, LabExperiment, EngineeringPrinciple } from '../types';

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
    image: '/assets/projects/isp-marketplace.png',
    images: [
      '/assets/projects/isp-marketplace.png',
      '/assets/projects/isp-marketplace-dark.png'
    ],
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
    image: '/assets/projects/spare-parts-erp.png',
    images: [
      '/assets/projects/spare-parts-erp.png',
      '/assets/projects/spare-parts-erp-dark.png'
    ],
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
    image: '/assets/projects/ai-visa-interview.png',
    images: [
      '/assets/projects/ai-visa-interview.png',
      '/assets/projects/ai-visa-interview-dark.png'
    ],
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
    image: '/assets/projects/afrilearn-platform.png',
    images: [
      '/assets/projects/afrilearn-platform.png',
      '/assets/projects/afrilearn-platform-dark.jpg'
    ],
    imageAlt: 'Afrilearn EdTech Platform Course Dashboard',
    isPrivate: true,
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
    role: 'Full-Stack Engineer | QA & Project Coordination',
    period: 'Sept 2025 – Jan 2026',
    location: 'Fulltime',
    description: 'Led test case design, regression testing, API validation, and production bug analysis across web and mobile releases, improving release stability and reducing post-deployment issues.',
    keyResponsibilities: [
      'Led test case design, regression testing, API validation, and production bug analysis across web and mobile releases, improving release stability and reducing post-deployment issues.',
      'ISP Marketplace (India): Built web & mobile apps (React, React Native, Tailwind) with User/Admin tiers and NestJS backend APIs',
      'Spare-Parts ERP (China, 10M+ records): Took ownership of React + Laravel ERP, optimizing 10M+ records via SQL tuning & virtualization, cutting 10s+ timeouts to ms'
    ],
    subProjects: [
      {
        title: 'ISP Marketplace (India)',
        highlights: [
          'Built the web and mobile applications using React, React Native, and Tailwind for a multi-tenant ISP marketplace with User, ISP Admin, and Super Admin dashboards, while also contributing to the NestJS backend and API implementation.',
          'Collaborated across frontend and backend to integrate REST APIs with NestJS and PostgreSQL, implementing and debugging data flows across user and administrative workflows.'
        ]
      },
      {
        title: 'Spare-Parts ERP (China, 10M+ records)',
        highlights: [
          'Took ownership of a large-scale React + Laravel ERP, stabilizing existing foundations and completing core business workflows.',
          'Optimized workflows operating over 10M+ records through SQL tuning, efficient data loading, frontend virtualization, and caching, reducing 10+ second timeouts to millisecond-level responses while preserving the user experience.'
        ]
      }
    ],
    technologies: ['React', 'React Native', 'Tailwind CSS', 'NestJS', 'PostgreSQL', 'Laravel', 'SQL Tuning', 'TypeScript']
  },
  {
    company: 'AfriLearn International',
    role: 'Software Engineer',
    period: 'July 2025 – Sept 2025',
    location: 'Fulltime',
    description: 'Built an AI-powered conversational voice interview platform and deployed production web & AI streaming infrastructure on AWS EC2.',
    keyResponsibilities: [
      'Built an AI-powered visa interview platform with real-time voice conversation using low-latency STT → LLM → TTS streaming, WebSockets, audio buffering, and custom BERT-based Voice Activity Detection with ONNX.',
      'Deployed and maintained production web and AI infrastructure on AWS EC2, implementing reliable streaming workflows and reducing reliance on third-party hosting services.',
      'Rebuilt the public website end-to-end, improving Lighthouse performance from ~60 to 100 across SEO, UX, and performance, contributing to 600+ new users in one month.'
    ],
    technologies: ['Next.js', 'WebSockets', 'ONNX', 'BERT VAD', 'AWS (EC2)', 'STT/TTS', 'Tailwind CSS', 'Core Web Vitals']
  },
  {
    company: 'Self Employed',
    role: 'Fullstack Developer (Freelance)',
    period: 'Apr 2025 – June 2025',
    location: 'Remote',
    description: 'Built and shipped production Next.js and TypeScript applications with authentication, role-based admin dashboards, and client-specific workflows.',
    keyResponsibilities: [
      'Built and shipped production Next.js and TypeScript applications with authentication, role-based admin dashboards, and client-specific workflows.'
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Authentication', 'Tailwind CSS']
  },
  {
    company: 'Adot Technologies',
    role: 'Co-Founder / Frontend Developer',
    period: 'Aug 2024 – Mar 2025',
    location: 'Remote',
    description: 'Designed and built Adot ERP and company website using Next.js, TypeScript, and Shadcn/UI with a reusable component-driven UI system.',
    keyResponsibilities: [
      'Designed and built Adot ERP and company website using Next.js, TypeScript, Shadcn/UI.',
      'Built a reusable, component-driven UI system to accelerate development across multiple dashboards.'
    ],
    technologies: ['Next.js', 'TypeScript', 'Shadcn/UI', 'Tailwind CSS', 'Component Architecture']
  },
  {
    company: 'WTB Import and IT Solution',
    role: 'Frontend Developer',
    period: 'Dec 2023 – July 2024',
    location: 'Remote',
    description: 'Built React and Redux dashboards integrated with REST and GraphQL APIs, focusing on performance, reliable data flows, and responsive user interfaces.',
    keyResponsibilities: [
      'Built React and Redux dashboards integrated with REST and GraphQL APIs, focusing on performance, reliable data flows, and responsive user interfaces.'
    ],
    technologies: ['React', 'Redux', 'GraphQL', 'REST APIs', 'Performance Optimization']
  },
  {
    company: 'Faith Import & Trade',
    role: 'Fullstack Developer',
    period: 'Aug 2023 – Nov 2023',
    location: 'Contract / Hybrid',
    description: 'Delivered a Next.js + PostgreSQL internal task management system with secure authentication and PWA capabilities.',
    keyResponsibilities: [
      'Delivered a Next.js + PostgreSQL internal task management system with secure authentication and PWA capabilities.'
    ],
    technologies: ['Next.js', 'PostgreSQL', 'PWA', 'Authentication', 'TypeScript']
  },
  {
    company: 'TechTonic Tribe',
    role: 'Education Lead (Volunteer)',
    period: 'Dec 2023 – July 2024',
    location: 'Volunteer',
    description: 'Taught modern web development and mentored aspiring developers in our local tech community.',
    keyResponsibilities: [
      'Created a practical curriculum covering modern JavaScript, React state patterns, and Git workflows',
      'Ran live coding workshops and code review sessions for beginner and intermediate developers',
      'Mentored students on building portfolios, debugging real code, and preparing for engineering roles'
    ],
    technologies: ['JavaScript', 'React', 'Git Workflows', 'Web Fundamentals', 'Mentorship']
  }
];

export const EDUCATION: Education[] = [
  {
    institution: 'Debre Berhan University',
    degree: 'BSc in Software Engineering.',
    location: 'Debre Berhan, Ethiopia',
    year: '2024'
  },
  {
    institution: 'FreeCodeCamp',
    degree: 'Responsive Web Design Certification',
    year: '2024'
  }
];

export const LEADERSHIP: Leadership[] = [
  {
    organization: 'TechTonic Tribe',
    role: 'Education Lead',
    period: 'Dec 2023 – July 2024',
    type: 'Volunteer',
    description: 'Led technical education initiatives, mentoring aspiring engineers in modern web development and software fundamentals.'
  }
];

export const TECH_STACK: TechStackCategory[] = [
  {
    number: '01',
    title: 'FRONTEND & MOBILE',
    subtitle: 'Interfaces, component systems & cross-platform apps',
    skills: [
      { name: 'React', level: 'primary', context: 'Hooks, state management, component architecture' },
      { name: 'Next.js', level: 'primary', context: 'App Router, SSR, SSG, server actions' },
      { name: 'React Native', level: 'primary', context: 'Cross-platform mobile apps for iOS and Android' },
      { name: 'TypeScript', level: 'primary', context: 'Strict typing, domain models, interface contracts' },
      { name: 'JavaScript', level: 'primary', context: 'Async patterns, DOM APIs, modern runtime features' },
      { name: 'Tailwind CSS', level: 'primary', context: 'Design tokens, responsive layouts, utility craft' },
      { name: 'Redux', level: 'proficient', context: 'Predictable state containers for complex dashboards' },
      { name: 'Zustand', level: 'primary', context: 'Ergonomic, lightweight client state management' },
      { name: 'Component Architecture', level: 'primary', context: 'Composition, reusability, token consistency' },
      { name: 'Performance Optimization', level: 'primary', context: 'Bundle splitting, virtualization, render auditing' }
    ]
  },
  {
    number: '02',
    title: 'BACKEND & APIS',
    subtitle: 'Services, data modeling, real-time protocols & auth',
    skills: [
      { name: 'Node.js', level: 'primary', context: 'Event loop, streaming I/O, server services' },
      { name: 'NestJS', level: 'primary', context: 'Modular architecture, dependency injection, guards' },
      { name: 'Django', level: 'proficient', context: 'Python backend services, ORM, REST framework' },
      { name: 'PostgreSQL', level: 'primary', context: 'Relational modeling, indexing, query tuning' },
      { name: 'MongoDB', level: 'proficient', context: 'Document modeling, aggregation pipelines' },
      { name: 'REST APIs', level: 'primary', context: 'Resource-oriented API design and integration' },
      { name: 'GraphQL', level: 'proficient', context: 'Declarative querying and type generation' },
      { name: 'WebSockets', level: 'primary', context: 'Real-time duplex events and audio streaming' },
      { name: 'Data Modeling', level: 'primary', context: 'Schema design, entity relationships, query access patterns' },
      { name: 'Authentication', level: 'primary', context: 'JWT, session management, RBAC, OAuth' }
    ]
  },
  {
    number: '03',
    title: 'CLOUD & DEVOPS',
    subtitle: 'Deployment compute, containerization & workflows',
    skills: [
      { name: 'AWS (EC2)', level: 'primary', context: 'Compute instance configuration, audio pipeline servers' },
      { name: 'Docker', level: 'proficient', context: 'Containerization, reproducible local environments' },
      { name: 'CI/CD', level: 'proficient', context: 'Automated test suites, build checks, deployment' },
      { name: 'Git', level: 'primary', context: 'Branch workflows, pull requests, automated actions' }
    ]
  },
  {
    number: '04',
    title: 'TESTING & QA',
    subtitle: 'Quality assurance, regression testing & debugging',
    skills: [
      { name: 'Jest', level: 'primary', context: 'Unit testing, component test suites, test runners' },
      { name: 'Regression Testing', level: 'primary', context: 'End-to-end stability checks, release safety gates' },
      { name: 'API Testing', level: 'primary', context: 'Payload validation, contract assertions, mock servers' },
      { name: 'Production Debugging', level: 'primary', context: 'Log analysis, error tracing, runtime bug isolation' }
    ]
  },
  {
    number: '05',
    title: 'OTHERS & AI PIPELINES',
    subtitle: 'Voice systems, local ML inference & streaming',
    skills: [
      { name: 'STT / TTS Streaming', level: 'primary', context: 'Low-latency speech-to-text and text-to-speech loops' },
      { name: 'ONNX Runtime', level: 'proficient', context: 'Local ML model inference in Node and browser' },
      { name: 'Voice Activity Detection', level: 'proficient', context: 'BERT-based VAD for natural conversational pacing' },
      { name: 'Audio Buffering', level: 'primary', context: 'WebSocket chunking, jitter mitigation, audio queues' }
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
