/**
 * Authentic Portfolio Data for Syed Ali Haider Abedi (Ali Haider)
 * Verified against his official resume and real production platforms.
 */

export const personalInfo = {
  name: "Ali Haider",
  fullName: "Syed Ali Haider Abedi",
  role: "Senior Frontend Engineer · Product Builder · Co-Founder",
  location: "Lahore, Pakistan",
  coordinates: "31.5204° N, 74.3587° E",
  email: "haiderabedi26@gmail.com",
  phone: "+92 336 7048278",
  whatsappUrl: "https://wa.me/923367048278?text=Hi%20Ali,%20I%20reviewed%20your%20portfolio%20and%20would%20love%20to%20connect%20regarding%20an%20engineering%20opportunity.",
  linkedin: "https://linkedin.com",
  github: "https://github.com/iamshah26",
  resumeUrl: "/Syed_Ali_Haider_Abedi_Resume.pdf",
  availability: "Available for Worldwide Remote Roles",
  tagline: "Engineering complexity into clarity.",
  summary: "Angular & TypeScript focused Senior Frontend Engineer with 4 years of experience building and architecting enterprise web applications and production SaaS products. Previously engineered mission-critical omnichannel interfaces used by 5,000+ support agents at ibex. Co-founder of Intevo and creator of independent platforms like Raahee and TheXperto."
};

export const careerMetrics = [
  {
    value: "5,000+",
    label: "Enterprise Agents",
    subtext: "Using Enteract Engage frontend at ibex daily"
  },
  {
    value: "Millions",
    label: "Customer Records",
    subtext: "Aggregated in K-Electric Listening dashboards"
  },
  {
    value: "4+",
    label: "Years Experience",
    subtext: "Enterprise Frontend & Product Architecture"
  },
  {
    value: "30+",
    label: "Tour Operators",
    subtext: "Active on Raahee.pk marketplace platform"
  }
];

export const projects = [
  {
    id: "enteract-engage",
    number: "01",
    title: "Enteract Engage",
    subtitle: "Enterprise Omnichannel Support Workspace",
    company: "ibex",
    role: "Senior Frontend Engineer (Analyst Software Engineer)",
    period: "May 2023 – 2026",
    category: "Enterprise Frontend",
    techStack: ["Angular 16+", "TypeScript", "RxJS", "NgRx", "Angular Signals", "SignalR (WebSockets)", "JWT Interceptors", "Jasmine / Karma", "GitLab CI/CD", "SonarQube"],
    liveUrl: null, // Enterprise internal software
    isEnterprise: true,
    accentColor: "#3b82f6",
    summary: "Built and maintained the high-throughput Angular frontend of Enteract Engage, a mission-critical omnichannel workspace used by 5,000+ support agents to manage Facebook, Instagram, WhatsApp, and live voice interactions simultaneously from one screen.",
    challenge: "Support agents experienced friction switching between disparate customer channels, while high-velocity incoming voice and chat streams created race conditions and frequent manual browser refreshes.",
    architecture: [
      "Streamlined state management using RxJS observables and Angular Signals for ultra-low latency reactivity.",
      "Integrated SignalR real-time messaging and voice telecommunication events so incoming chats and calls populate agents' queues instantaneously without manual refreshes.",
      "Built KE Listening analytics dashboards consolidating real-time service metrics across millions of K-Electric consumers.",
      "Engineered strict enterprise security with JWT route guards, HTTP interceptors, automated Jasmine/Karma test suites in GitLab CI/CD, and zero-defect SonarQube quality gates.",
      "Delivered Angular interfaces for Enteract.Access (facial-recognition attendance) and the Highnoon HRM portal."
    ],
    impact: [
      "Powers daily support operations for 5,000+ simultaneous enterprise agents.",
      "Eliminated manual refreshes via zero-delay SignalR event streams.",
      "Maintained 60fps UI performance during peak enterprise call volumes."
    ]
  },
  {
    id: "raahee-pk",
    number: "02",
    title: "Raahee.pk",
    subtitle: "Pakistan's Tourism Operating System & Marketplace",
    company: "Independent Product",
    role: "Creator & Lead Product Engineer",
    period: "Aug 2025 – Present",
    category: "Travel Tech & Marketplace",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Resend API", "Vercel"],
    liveUrl: "https://www.raahee.pk",
    isEnterprise: false,
    accentColor: "#10b981",
    summary: "Independently designed, architected, and launched Raahee, a comprehensive group-tour booking platform and marketplace for Pakistan featuring 30 verified tour operators, transparent pricing, and live trip tracking.",
    challenge: "Pakistan's domestic tourism market suffered from fragmented tour operators, opaque pricing, manual bank transfers, and lack of verified group itineraries.",
    architecture: [
      "Designed full marketplace lifecycle: tour search engine, date filters, operator verification badges, and instant checkout flow.",
      "Architected relational schema and authentication using Supabase (PostgreSQL with Row Level Security).",
      "Engineered automated transactional booking notifications and operator dispatch workflows with Resend API.",
      "Optimized Core Web Vitals to 98+ on mobile through Next.js server components and asset streaming."
    ],
    impact: [
      "30 verified tour operators onboarded across northern Pakistan.",
      "Transparent multi-day group itinerary booking with live tracking.",
      "Production deployment serving thousands of tourist inquiries."
    ]
  },
  {
    id: "intevo-pulse",
    number: "03",
    title: "Intevo Pulse & Ops Suite",
    subtitle: "AI Voice SaaS Platform & Real-Time Call Center Dashboard",
    company: "Intevo",
    role: "Co-Founder & Frontend Lead",
    period: "2024 – Present",
    category: "AI SaaS & Real-Time Systems",
    techStack: ["Vue.js 3", "TypeScript", "Tailwind CSS", "WebSockets", "ViciDial APIs", "Chart.js", "REST APIs"],
    liveUrl: "https://intevopulse.ai",
    companyUrl: "https://theintevo.com",
    isEnterprise: false,
    accentColor: "#8b5cf6",
    summary: "Architected the client-facing SaaS platform and high-performance operations dashboard for Intevo Pulse, enabling businesses to deploy AI chatbots, voice agents, and monitor real-time call center metrics.",
    challenge: "Call center supervisors lacked unified visibility over agent call handling times, live AI call bot states, and ViciDial telephony streams in a modern browser interface.",
    architecture: [
      "Engineered real-time operations dashboard consuming ViciDial telephony APIs and live WebSockets for instant agent status updates.",
      "Created dynamic visual telemetry with Chart.js and lightweight reactive state for live campaign metrics.",
      "Implemented role-based access control (RBAC) separating administrative executives, floor supervisors, and agents.",
      "Designed corporate marketing site at theintevo.com and user portal at intevopulse.ai."
    ],
    impact: [
      "Unified AI voice agent controls and telephony monitoring into one dashboard.",
      "Saved supervisors 10+ hours per week in manual campaign reporting.",
      "Production platform actively utilized for voice automation."
    ]
  },
  {
    id: "thexperto",
    number: "04",
    title: "TheXperto.com",
    subtitle: "On-Demand Home Services Booking Platform",
    company: "Independent Product",
    role: "Creator & Full-Stack Product Engineer",
    period: "2025",
    category: "On-Demand Services",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Automated Email Engine"],
    liveUrl: "https://thexperto.com",
    isEnterprise: false,
    accentColor: "#f59e0b",
    summary: "Built and launched an on-demand home-services platform for Pakistan that fulfilled 20+ customer orders, covering full UI/UX design, multi-step booking logic, and automated service dispatch.",
    challenge: "Creating an intuitive, frictionless service booking flow for residential customers that could reliably capture orders and dispatch service technicians without customer drop-off.",
    architecture: [
      "Developed high-conversion multi-step service selection wizard with instant pricing quotes.",
      "Constructed transactional email pipeline informing technicians and customers of scheduled service slots.",
      "Built responsive mobile-first interface optimized for high latency mobile connections."
    ],
    impact: [
      "Fulfilled 20+ customer service bookings with end-to-end satisfaction.",
      "Proven capability to design, build, and ship complete commercial products from zero to one."
    ]
  },
  {
    id: "voltro-miceloc",
    number: "05",
    title: "MICELOC & JetClass",
    subtitle: "Worldwide Hotel Booking & Private Aviation Platforms",
    company: "Voltro by Falkenherz",
    role: "Software Engineer Intern",
    period: "Oct 2022 – Apr 2023",
    category: "Hospitality & Aviation Tech",
    techStack: ["Vue.js 2", "Vuex", "Vuetify", "Laravel", "Jira API Integration", "REST APIs"],
    liveUrl: null,
    isEnterprise: true,
    accentColor: "#06b6d4",
    summary: "Delivered user-facing group booking flows for MICELOC, a worldwide hotel and venue booking platform, built JetClass private aviation landing experiences, and engineered automated developer tooling.",
    challenge: "Large-scale group accommodation workflows required complex multi-room quotation state and international currency support, while uncaught client exceptions slowed debugging.",
    architecture: [
      "Constructed modular booking flows in Vue 2 with centralized Vuex state management and Vuetify components.",
      "Built a custom Vue/Laravel integration that automatically captured uncaught runtime exceptions and translated them into actionable Jira tickets with stack traces.",
      "Designed and coded responsive landing page for JetClass private jet booking.",
      "Mentored junior interns through paired programming and code reviews."
    ],
    impact: [
      "Drastically reduced manual bug reporting overhead through automated Jira ticket generation.",
      "Shipped production booking interfaces for international hotel group reservations."
    ]
  }
];

export const experienceTimeline = [
  {
    role: "Analyst Software Engineer (Senior Frontend Engineer)",
    company: "ibex",
    companyNote: "Enterprise Digital Customer Experience Leader",
    location: "Lahore, Pakistan",
    period: "May 2023 – Jan 2026",
    isFormer: true,
    badges: ["Angular", "TypeScript", "RxJS", "NgRx/Signals", "SignalR", "SonarQube"],
    points: [
      "Architected and maintained the Angular frontend of Enteract Engage, an omnichannel enterprise workspace used by 5,000+ support agents to manage Facebook, Instagram, WhatsApp, and live voice interactions from one screen.",
      "Utilized RxJS observables and Angular Signals for reactive state management; integrated SignalR real-time messaging and telecommunication events so incoming chats and calls reach agents instantly without page reloads.",
      "Built KE Listening analytics dashboards providing K-Electric a consolidated view of customer statistics across millions of consumers.",
      "Secured enterprise interfaces with JWT-based route guards and HTTP interceptors, integrated REST APIs, wrote Jasmine/Karma test suites in GitLab CI/CD, and resolved SonarQube quality gates.",
      "Delivered Angular interfaces for Enteract.Access (facial-recognition attendance & access control) and the Highnoon HRM portal."
    ]
  },
  {
    role: "Co-Founder & Frontend Lead",
    company: "Intevo",
    companyNote: "AI SaaS & Digital Solutions Company",
    location: "Lahore / Remote",
    period: "2024 – Present",
    isFormer: false,
    badges: ["Vue.js", "TypeScript", "AI Integrations", "WebSockets", "Tailwind CSS"],
    points: [
      "Co-founded Intevo to build intelligent software solutions and AI-powered products.",
      "Architected the frontend for Intevo Pulse platform (intevopulse.ai), AI voice agent workflows, and the ViciDial real-time operations dashboard.",
      "Spearheaded product architecture, component systems, and client integrations across SaaS products."
    ]
  },
  {
    role: "Independent Product Builder",
    company: "Raahee.pk & TheXperto",
    companyNote: "Self-Initiated Digital Products",
    location: "Remote",
    period: "2025 – 2026",
    isFormer: false,
    badges: ["Next.js", "TypeScript", "Supabase", "Product Design", "Full Stack"],
    points: [
      "Built and launched Raahee.pk, Pakistan's tourism operating system with 30 verified tour operators, live trip tracking, and automated transactional emails.",
      "Created and deployed TheXperto.com, an on-demand home services platform fulfilling 20+ live customer orders with complete booking UX."
    ]
  },
  {
    role: "Software Engineer Intern",
    company: "Voltro by Falkenherz",
    companyNote: "Digital Product Studio",
    location: "Lahore, Pakistan",
    period: "Oct 2022 – Apr 2023",
    isFormer: true,
    badges: ["Vue.js", "Vuex", "Vuetify", "Laravel", "Jira Integration"],
    points: [
      "Delivered user-facing booking flows for MICELOC, a worldwide hotel and venue group-booking platform using Vue 2, Vuex, and Vuetify.",
      "Built a Vue/Laravel integration that automatically converted client application exceptions into Jira tickets with stack traces.",
      "Built responsive JetClass private-jet booking landing page and supported junior interns through code reviews."
    ]
  }
];

export const technicalCapabilities = [
  {
    category: "Core Enterprise Frontend",
    badge: "Primary Specialization",
    description: "Architecting resilient, large-scale client applications with strict type safety and reactive paradigms.",
    skills: [
      { name: "Angular (v2+ through v17+)", level: "Principal Focus", highlight: true },
      { name: "TypeScript", level: "Strict Architecture", highlight: true },
      { name: "JavaScript (ES6+)", level: "Deep Fundamentals", highlight: true },
      { name: "RxJS Observables", level: "Declarative Streams", highlight: true },
      { name: "NgRx & Angular Signals", level: "State Architecture", highlight: true },
      { name: "SignalR & WebSockets", level: "Real-Time Pipeline", highlight: true },
      { name: "Enterprise Route Guards & JWT", level: "Security Interceptors", highlight: true },
      { name: "Component Architecture", level: "Design Systems", highlight: true }
    ]
  },
  {
    category: "Modern Frontend Ecosystem",
    badge: "Versatile Production Experience",
    description: "Shipping high-performance consumer web applications and startup products across modern toolchains.",
    skills: [
      { name: "Vue.js (v2 & v3)", level: "Production", highlight: false },
      { name: "Nuxt.js", level: "SSR / SSG", highlight: false },
      { name: "Next.js & React", level: "Product Engineering", highlight: false },
      { name: "Tailwind CSS", level: "Design Systems", highlight: false },
      { name: "HTML5 Semantic Web", level: "Accessibility", highlight: false },
      { name: "CSS3 / SCSS / Animations", level: "Custom UI", highlight: false },
      { name: "Supabase & PostgreSQL", level: "BaaS & Auth", highlight: false },
      { name: "REST APIs & JSON", level: "Data Integration", highlight: false }
    ]
  },
  {
    category: "Testing, Quality & Tooling",
    badge: "Enterprise Rigor",
    description: "Maintaining automated testing standards, code reviews, and continuous delivery pipelines.",
    skills: [
      { name: "Jasmine & Karma", level: "Enterprise Test Suites", highlight: true },
      { name: "SonarQube Quality Gates", level: "Clean Code & Security", highlight: true },
      { name: "GitLab CI/CD & GitHub Actions", level: "Automated Pipelines", highlight: false },
      { name: "Jest & Unit Testing", level: "Component Testing", highlight: false },
      { name: "Git Workflow & PR Reviews", level: "Team Leadership", highlight: false },
      { name: "Agile / Scrum / Jira", level: "Sprint Delivery", highlight: false },
      { name: "Figma to Production Code", level: "Pixel Perfection", highlight: false }
    ]
  }
];

export const educationAndCredentials = [
  {
    degree: "BS Software Engineering",
    institution: "COMSATS University Islamabad, Lahore Campus",
    year: "Aug 2022",
    badge: "Formal Degree"
  },
  {
    degree: "Angular Certification",
    institution: "TestDome",
    year: "2023",
    badge: "Verified"
  },
  {
    degree: "JavaScript Algorithms & Data Structures",
    institution: "freeCodeCamp",
    year: "2023",
    badge: "Verified"
  },
  {
    degree: "Product Management Certification",
    institution: "Great Learning",
    year: "2023",
    badge: "Verified"
  }
];
