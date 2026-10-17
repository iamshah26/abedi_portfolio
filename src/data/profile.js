/**
 * Single source of truth for public portfolio copy.
 *
 * Every claim here is traceable to the resume in /public/Syed_Ali_Haider_Abedi_Resume.pdf or to the
 * public product websites (checked October 2026). Do not add metrics, testimonials or responsibilities
 * that cannot be traced to one of those sources. See CLAUDE.md → "Truthfulness rules".
 */

export const profile = {
  name: 'Ali Haider',
  fullName: 'Syed Ali Haider Abedi',
  role: 'Software Engineer / Product Builder',
  roleLong: 'Senior Frontend Engineer · Product Builder · Co-Founder of Intevo',
  location: 'Lahore, Pakistan',
  availability: 'Open to international remote engineering roles and selected collaborations.',
  email: 'haiderabedi26@gmail.com',
  links: {
    email: 'mailto:haiderabedi26@gmail.com',
    linkedin: 'https://linkedin.com/in/syed-ali-haider-abedi-09a743233',
    github: 'https://github.com/iamshah26',
    resume: '/Syed_Ali_Haider_Abedi_Resume.pdf'
  },
  portrait: '/profile.png'
}

export const contactLinks = [
  { id: 'email', label: 'Email', value: 'haiderabedi26@gmail.com', href: profile.links.email },
  { id: 'linkedin', label: 'LinkedIn', value: 'syed-ali-haider-abedi', href: profile.links.linkedin, external: true },
  { id: 'github', label: 'GitHub', value: 'iamshah26', href: profile.links.github, external: true },
  { id: 'resume', label: 'Resume', value: 'PDF · 1 page', href: profile.links.resume, external: true }
]

/** Concise, first-person story used by Chapter 05 and the static portfolio. */
export const story = [
  'I started in enterprise frontend engineering: large Angular applications where real-time data, security and test discipline are not optional.',
  'At ibex I built and maintained the Angular frontend of Enteract Engage, the workspace 5,000+ support agents use to answer chat, social and voice conversations from one screen.',
  'Alongside that work I began shipping my own products — Raahee and TheXperto — and co-founded Intevo, where I build the interfaces of products such as Intevo Pulse.',
  'I care about the space between an idea and a working product: the structure, the motion and the details that make software feel considered.'
]

export const expertise = {
  primary: ['Angular', 'TypeScript'],
  reactive: ['RxJS', 'NgRx', 'Signals', 'SignalR'],
  craft: ['Responsive application engineering', 'Real-time interfaces', 'Enterprise state management', 'Testing with Jasmine & Karma', 'SonarQube quality gates', 'GitLab CI/CD'],
  additional: ['JavaScript (ES6+)', 'Next.js', 'Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Supabase', 'Node.js / Express', 'REST APIs'],
  statement: 'Angular and TypeScript first. Reactive state with RxJS, NgRx and Signals. Real-time interfaces over SignalR. Tested, reviewed and shipped.'
}

/**
 * Timeline. The ibex end date follows the existing portfolio data (Jan 2026); the PDF resume still reads
 * "Present" and should be refreshed. Intevo carries no start year in public copy until confirmed.
 */
export const experience = [
  {
    id: 'intevo',
    period: 'Present',
    role: 'Co-Founder',
    org: 'Intevo',
    note: 'Product and technology engineering company. Frontend engineering, product building and interface development, including the Intevo Pulse interfaces and the Intevo company site.'
  },
  {
    id: 'freelance',
    period: 'Aug 2025 — Jan 2026',
    role: 'Freelance Software Engineer',
    org: 'Independent',
    note: 'Designed and launched Raahee and TheXperto; delivered production interfaces for Intevo Pulse.'
  },
  {
    id: 'ibex',
    period: 'May 2023 — Jan 2026',
    role: 'Analyst Software Engineer',
    org: 'ibex',
    note: 'Angular frontend of Enteract Engage; KE Listening dashboards; Enteract.Access and Highnoon HRM interfaces.'
  },
  {
    id: 'voltro',
    period: 'Oct 2022 — Apr 2023',
    role: 'Software Engineer Intern',
    org: 'Voltro by Falkenherz',
    note: 'MICELOC group-booking flows in Vue 2, Vuex and Vuetify; JetClass landing page.'
  },
  {
    id: 'comsats',
    period: 'Aug 2022',
    role: 'BS Software Engineering',
    org: 'COMSATS University Islamabad, Lahore Campus',
    note: 'Certifications: Angular (TestDome), JavaScript Algorithms & Data Structures (freeCodeCamp), Product Management (Great Learning).'
  }
]

/**
 * Projects / case studies. `image` paths are real public screenshots captured from the live sites.
 * `concept: true` means the visual is an original conceptual illustration because the product is
 * confidential or no approved imagery exists.
 */
export const projects = [
  {
    id: 'enteract-engage',
    index: '01',
    title: 'Enteract Engage',
    kicker: 'Enterprise engineering',
    org: 'ibex',
    period: 'May 2023 — Jan 2026',
    role: 'Analyst Software Engineer — Angular frontend',
    accent: '#B9A7E8',
    concept: true,
    conceptNote: 'Conceptual illustration. Enteract Engage is a confidential enterprise system, so no production screens are shown.',
    image: null,
    links: [],
    overview: 'Enteract Engage is an omnichannel customer-engagement workspace. Support agents handle Facebook, Instagram, WhatsApp and live voice interactions from a single screen. It is used by 5,000+ support agents.',
    problem: 'Agents work many conversations at once across very different channels. New chats and calls have to appear immediately, state has to stay consistent while events stream in, and the whole interface has to meet enterprise security and quality standards.',
    responsibility: 'I built and maintained the Angular frontend of Enteract Engage as part of the engineering team at ibex, and delivered Angular interfaces for related products.',
    features: [
      'Unified agent workspace for Facebook, Instagram, WhatsApp and live voice conversations.',
      'Real-time messaging and voice events, so new chats and calls reach agents without manual page refreshes.',
      'KE Listening analytics dashboards giving K-Electric a consolidated view of customer statistics across millions of customers.',
      'Angular interfaces for Enteract.Access, a face-recognition attendance and access-control product, and for the Highnoon HRM portal.'
    ],
    challenges: [
      'Merging continuous SignalR event streams into predictable reactive application state.',
      'Keeping a dense, multi-conversation interface responsive while it updates in real time.',
      'Securing routes and API calls in a large enterprise application.',
      'Holding quality steady under regular Scrum delivery.'
    ],
    implementation: [
      'Angular and TypeScript throughout.',
      'RxJS with NgRx and Signals for state management.',
      'SignalR integration for real-time messaging and voice events.',
      'JWT-based route guards and HTTP interceptors; REST API integration.',
      'Jasmine and Karma tests running in GitLab CI/CD; SonarQube issues resolved as part of delivery.'
    ],
    outcomes: [
      'The workspace is used by 5,000+ support agents.',
      'New chats and calls reach agents immediately, without manual refreshes.',
      'K-Electric received a consolidated statistics view across millions of customers through KE Listening.'
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Signals', 'SignalR', 'Jasmine', 'Karma', 'GitLab CI/CD', 'SonarQube']
  },
  {
    id: 'raahee',
    index: '02',
    title: 'Raahee',
    kicker: 'Independent travel platform',
    org: 'Independent product',
    period: 'Aug 2025 — Jan 2026',
    role: 'Designer and engineer — independently designed and launched',
    accent: '#F1785D',
    image: '/images/products/raahee.webp',
    links: [{ label: 'raahee.pk', href: 'https://raahee.pk' }],
    overview: 'Raahee describes itself as Pakistan\'s tourism operating system: a group-tour marketplace connecting travellers with verified tour operators, with transparent pricing and bookable departures.',
    problem: 'Group trips in Pakistan are still commonly arranged through social-media messages, with advance payments sent to operators travellers cannot verify and little visibility once a trip departs.',
    responsibility: 'I independently designed, built and launched the platform: product design, user experience, application implementation, booking workflows and integrations.',
    features: [
      'Trip discovery by destination and date.',
      'Verified tour-operator profiles and an operator partner path.',
      'Upcoming departures with individual trip pages and transparent pricing.',
      'Online booking with automated transactional emails.',
      'Departure status, digital tickets and live trip tracking.'
    ],
    challenges: [
      'Designing for trust in a market used to informal, unverifiable bookings.',
      'Modelling operators, trips, departures and seats in one coherent data model.',
      'Keeping travellers and operators informed through every booking step.'
    ],
    implementation: [
      'Next.js with TypeScript for the web application.',
      'Supabase for data and authentication.',
      'Resend for automated transactional email.'
    ],
    outcomes: [
      'Launched publicly at raahee.pk.',
      'Onboarded 30 verified tour operators.'
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Resend']
  },
  {
    id: 'intevo-pulse',
    index: '03',
    title: 'Intevo Pulse',
    kicker: 'AI voice product',
    org: 'Intevo',
    period: 'Product of Intevo',
    role: 'Frontend — client app, Ops dashboard and product site',
    accent: '#C1C4CB',
    image: '/images/products/pulse.webp',
    gallery: ['/images/products/pulse-detail-1.webp', '/images/products/pulse-detail-2.webp'],
    links: [
      { label: 'intevopulse.ai', href: 'https://intevopulse.ai' },
      { label: 'Client app', href: 'https://app.intevopulse.ai' },
      { label: 'Ops dashboard', href: 'https://ops.intevopulse.ai' }
    ],
    overview: 'Intevo Pulse is an AI voice product built within Intevo. It runs realtime AI voice agents for call centres, handling inbound support conversations, with live monitoring and full call transcripts.',
    problem: 'Call centres lose callers to long hold times and repetitive tier-one traffic. Teams running AI voice agents also need to see what every live call is doing and step in when a human is needed.',
    responsibility: 'I delivered production interfaces for Intevo Pulse: the client application, the operations dashboard and the product website. The AI, telephony and backend infrastructure are the work of the wider Intevo team and are not claimed here.',
    features: [
      'Product site with an in-browser live demo, where visitors speak to a real AI voice agent.',
      'Operations console showing live transcripts, sentiment, containment and latency for concurrent calls.',
      'Warm handoff to human agents with the transcript and detected intent attached.',
      'Client application for teams using the platform.'
    ],
    challenges: [
      'Making dense, fast-changing call data legible at a glance.',
      'Separating the client experience from the operational console while keeping one product language.',
      'Explaining a realtime voice product on a marketing site without overselling it.'
    ],
    implementation: [
      'Production interfaces built with Next.js, TypeScript and Vue.js across the Pulse surfaces and the Intevo site.'
    ],
    outcomes: [
      'The product site, client app and Ops dashboard are live at the links below.'
    ],
    stack: ['Next.js', 'TypeScript', 'Vue.js']
  },
  {
    id: 'thexperto',
    index: '04',
    title: 'TheXperto',
    kicker: 'Services platform',
    org: 'Independent product',
    period: 'Aug 2025 — Jan 2026',
    role: 'Builder — user experience, booking flow, automated email, deployment',
    accent: '#F3F0E9',
    image: '/images/products/thexperto.webp',
    links: [{ label: 'thexperto.com', href: 'https://thexperto.com' }],
    overview: 'TheXperto is an on-demand home-services product. Customers book laundry, dishwashing and ironing online, and a vetted university student is assigned to the job.',
    problem: 'Household help is usually arranged informally. The product needed a simple path from choosing a service to a confirmed, prepaid booking, plus a separate path for students who want to work.',
    responsibility: 'I built and launched the product end to end: the user experience, the booking flow, automated emails and deployment.',
    features: [
      'Service catalogue with clear per-service pricing.',
      'Multi-step booking: choose services, review, then enter details.',
      'Pay-in-advance booking with one assigned student per job.',
      'Separate sign-up path for students, and waitlists for upcoming services.'
    ],
    challenges: [
      'Keeping a multi-step booking short enough to finish on a phone.',
      'Serving two audiences, customers and student workers, from one site.'
    ],
    implementation: [
      'Responsive booking interface with automated confirmation emails.',
      'Deployed and operated as a live product.'
    ],
    outcomes: [
      'Fulfilled 20+ customer orders.'
    ],
    stack: ['Web application', 'Automated email', 'Deployment']
  },
  {
    id: 'intevo',
    index: '05',
    title: 'Intevo',
    kicker: 'Company and co-founder story',
    org: 'Intevo',
    period: 'Present',
    role: 'Co-Founder',
    accent: '#B9A7E8',
    image: '/images/products/intevo.webp',
    links: [{ label: 'theintevo.com', href: 'https://theintevo.com' }],
    overview: 'Intevo is a product and technology engineering company. It builds its own products, including Intevo Pulse, and engineers AI, software and digital platforms for businesses.',
    problem: 'A young product company has to do two things at once: build products of its own and earn trust as an engineering partner.',
    responsibility: 'As a co-founder I combine frontend engineering, product building, interface development and technical collaboration. I delivered the Intevo company website and the Intevo Pulse interfaces.',
    features: [
      'Company website presenting Intevo\'s products, services and engagement models.',
      'Intevo Pulse, the company\'s AI voice product (see its own case study).'
    ],
    challenges: [
      'Presenting a company and its product as two distinct, connected identities.',
      'Moving between engineering work and entrepreneurial decisions.'
    ],
    implementation: [
      'Company site and product interfaces built with Next.js, TypeScript and Vue.js.'
    ],
    outcomes: [
      'theintevo.com is live and presents the company and its products.'
    ],
    stack: ['Next.js', 'TypeScript', 'Vue.js']
  },
  {
    id: 'voltro',
    index: '06',
    title: 'MICELOC & JetClass',
    kicker: 'Earlier experience · Voltro by Falkenherz',
    org: 'Voltro by Falkenherz',
    period: 'Oct 2022 — Apr 2023',
    role: 'Software Engineer Intern',
    accent: '#C1C4CB',
    concept: true,
    conceptNote: 'Conceptual illustration. No approved product imagery is available for this work.',
    image: null,
    links: [],
    overview: 'At Voltro by Falkenherz I worked on MICELOC, a worldwide hotel and venue group-booking platform, and on JetClass, a private-jet booking brand.',
    problem: 'Group bookings for hotels and venues involve long, stateful flows. Developers also lost time turning application errors into bug reports by hand.',
    responsibility: 'As a software engineer intern I delivered user-facing features and tooling, and supported junior interns.',
    features: [
      'User-facing group-booking flows for MICELOC.',
      'A Vue/Laravel integration that automatically turns application exceptions into Jira tickets.',
      'The responsive JetClass private-jet booking landing page.'
    ],
    challenges: [
      'Managing multi-step booking state cleanly in Vue 2 and Vuex.',
      'Capturing useful error context automatically.'
    ],
    implementation: [
      'Vue 2, Vuex and Vuetify for booking flows.',
      'Vue and Laravel integration with the Jira API for automatic ticket creation.'
    ],
    outcomes: [
      'Reduced manual bug-report creation for the development team.',
      'Supported 3–4 junior interns through code reviews and pairing sessions.'
    ],
    stack: ['Vue 2', 'Vuex', 'Vuetify', 'Laravel', 'Jira API']
  }
]

export const projectById = id => projects.find(p => p.id === id)
