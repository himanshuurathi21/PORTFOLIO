export const projects = [
  {
    id: 'medisoft',
    number: '01',
    title: "RATHI's MEDISOFT",
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    status: 'Live in a pharmacy',
    accent: 'cyan',
    tagline: 'A billing system real people rely on.',
    description:
      'A medical store management system with billing, inventory, expiry alerts, compliance registers and printable reports. Built for day-to-day pharmacy counter work and live in a real pharmacy.',
    overview:
      'RATHI’s MEDISOFT is a local browser application that runs the counter workflow of a medical store. It combines batch-aware billing, stock and expiry management, statutory registers, printable bills and sales reporting in one place, without asking staff to work across separate spreadsheets.',
    problem:
      'A pharmacy counter cannot stop for slow software. Batch numbers, expiry dates, stock levels and Schedule H, H1, H2 and NDPS records all need to be correct at the moment of sale, then available for inspection and reporting later. The system needed to be fast enough for daily use and simple enough for non-technical staff.',
    features: [
      'Fast counter billing with batch, expiry and quantity-aware line items',
      'Inventory stock with batch selection, expiry tracking and expiry alerts',
      'Schedule H, Schedule H1, Schedule H2 and Narcotics/NDPS registers',
      'Print-ready bill preview, saved history and reprint flow',
      'Sales reports and business summaries',
      'Backup and restore, including Supabase-backed cloud backup',
      'Native text, dot-matrix and Notepad print options',
      'Local launcher and setup flow for Windows machines',
    ],
    modules: [
      {
        name: 'Billing',
        detail: 'Batch-aware line items, customer details and a save-and-print counter flow.',
      },
      {
        name: 'Inventory',
        detail: 'Stock, batches, expiry dates and replenishment visibility.',
      },
      {
        name: 'Compliance registers',
        detail: 'Schedule H, H1, H2 and NDPS records generated from actual sales.',
      },
      {
        name: 'Reports & history',
        detail: 'Sales summaries, saved bills, reprints and export options.',
      },
      {
        name: 'Backup & restore',
        detail: 'Local file backup plus Supabase cloud backup for store data.',
      },
    ],
    contribution: [
      'Built the complete billing, inventory and reporting workflow',
      'Implemented compliance registers and expiry-aware stock handling',
      'Added print/reprint flows for everyday counter use',
      'Packaged the local launcher and setup flow for non-technical staff',
    ],
    tech: ['JavaScript', 'Node.js', 'Supabase', 'HTML/CSS', 'PDF Export'],
    cover: '/assets/images/projects/medisoft/cover.jpg',
    coverAlt:
      'Illustrated pharmacy counter with a billing preview, stock blister pack and expiry alert for MEDISOFT',
    previewHost: 'medisoft · local app',
    gallery: [
      {
        src: '/assets/images/projects/medisoft/home.jpg',
        alt: 'MEDISOFT dashboard with store modules',
        caption: 'Dashboard: billing, inventory, reports and compliance in one counter app.',
      },
      {
        src: '/assets/images/projects/medisoft/billing.jpg',
        alt: 'MEDISOFT billing screen with batch-aware line items',
        caption: 'Billing with batch selection, quantity, discount and print controls.',
      },
      {
        src: '/assets/images/projects/medisoft/inventory.jpg',
        alt: 'MEDISOFT inventory stock screen',
        caption: 'Inventory stock with batch and expiry visibility.',
      },
      {
        src: '/assets/images/projects/medisoft/reports.jpg',
        alt: 'MEDISOFT sales report screen',
        caption: 'Sales reporting for day-to-day review.',
      },
      {
        src: '/assets/images/projects/medisoft/bill-preview.jpg',
        alt: 'MEDISOFT print-ready bill preview',
        caption: 'A print-ready cash memo preview generated from a saved bill.',
      },
    ],
    links: {
      demo:
        'https://mail.google.com/mail/?view=cm&fs=1&to=rathihimanshuu%40gmail.com&su=Request%20for%20RATHI%27s%20MEDISOFT%20Demo&body=Hello%20Himanshu%2C%0A%0AI%20am%20interested%20in%20RATHI%27s%20MEDISOFT%20-%20your%20medical%20store%20management%20system.%20I%20would%20like%20to%20request%20a%20demo%20and%20know%20more%20about%20features%2C%20pricing%2C%20installation%20and%20support.%0A%0APlease%20share%20details%20and%20schedule%20a%20demo%20at%20your%20convenience.%0A%0AEnter%20your%20details%20-%0ANAME%3A%0AMOB%20NO%3A%0AMedical%20Store%20Name%20(optional)%3A%0ACity%3A%0A%0AThank%20you!',
    },
    note: 'Available on request. The button opens a pre-filled email; the app is not publicly downloadable. Screenshots use demo branding and fictional records.',
  },
  {
    id: 'kaushal',
    number: '02',
    title: 'KAUSHAL CHAKRA',
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    status: 'Live · Minor project',
    accent: 'purple',
    tagline: 'Trade skills, not money.',
    description:
      'A skill-bartering platform, built as my second-year minor project, that finds fair 2-5 person exchange cycles instead of relying on rare one-to-one swaps. It handles acceptance, session completion, ratings, chat, credits and skill verification.',
    overview:
      'KaushalChakra began as my second-year minor project and grew into a complete skill-bartering platform. It turns skill exchange into a closed loop: members list what they can teach, what they want to learn and when they are free, then a bounded DFS matcher looks for multi-person cycles where everyone gives and receives. The product carries the exchange through acceptance, sessions, reviews, chat and skill verification without money changing hands.',
    problem:
      'Direct barter only works when two people happen to want exactly what the other offers. That leaves most willing teachers and learners stuck. KaushalChakra solves the matching problem with 2-5 person cycles, then adds the trust layer that makes those cycles safe to accept: mutual approval, completion tracking, ratings, scoped chat and verified proficiency.',
    features: [
      'Bounded DFS matching for fair 2-5 person exchange cycles',
      'Cycle review and acceptance flow for every participant',
      'Session completion that closes a cycle only when all sides finish',
      'Ratings and reviews after completed exchanges',
      'In-app chat scoped to confirmed exchanges, using 5-second polling',
      'Notifications for matches, messages and session milestones',
      'Skill proficiency levels used as a matching tie-breaker',
      'Credit fallback: teach now to earn a credit, or redeem one to learn now',
      'Quiz and certificate-based skill verification with admin review',
    ],
    modules: [
      {
        name: 'Matching engine',
        detail: 'Finds cycles, proposes them to every member and waits for mutual acceptance.',
      },
      {
        name: 'My Exchanges',
        detail: 'Review the full cycle, complete your side and rate partners after completion.',
      },
      {
        name: 'Credits',
        detail: 'Teaches the platform what to do when no cycle fits right now.',
      },
      {
        name: 'Verify Skills',
        detail: 'Instant quizzes for popular skills plus certificate links reviewed by an admin.',
      },
      {
        name: 'Admin analytics',
        detail: 'Cycle-size breakdown and a cyclic-versus-direct-swap measure of the engine’s value.',
      },
    ],
    contribution: [
      'Built the platform as my second-year minor project and extended it into a full exchange system',
      'Designed and built the matching and exchange flow',
      'Implemented credit fallback, notifications, ratings and scoped chat',
      'Built quiz and certificate-based skill verification',
      'Added admin analytics that measure the value of cyclic matching',
    ],
    tech: ['React', 'Express', 'Prisma', 'PostgreSQL', 'Tailwind', 'JWT'],
    cover: '/assets/images/projects/kaushal/cover.jpg',
    coverAlt:
      'Illustrated skill-exchange cycle connecting design, coding and music learners around a 2-5 person cycle badge',
    previewHost: 'kaushalchakra-app.onrender.com',
    gallery: [
      {
        src: '/assets/images/projects/kaushal/home.jpg',
        alt: 'KaushalChakra landing page with login form',
        caption: 'Landing page: the multi-person barter promise and a direct login path.',
      },
      {
        src: '/assets/images/projects/kaushal/dashboard.jpg',
        alt: 'KaushalChakra member dashboard in the waiting pool',
        caption: 'Member dashboard with credit progress and the live waiting-pool state.',
      },
      {
        src: '/assets/images/projects/kaushal/verify.jpg',
        alt: 'KaushalChakra skill verification page',
        caption: 'Skill verification through quizzes or a certificate review request.',
      },
      {
        src: '/assets/images/projects/kaushal/credits.jpg',
        alt: 'KaushalChakra credits page',
        caption: 'The credit fallback that keeps the exchange moving when no cycle fits.',
      },
      {
        src: '/assets/images/projects/kaushal/admin.jpg',
        alt: 'KaushalChakra admin analytics dashboard',
        caption: 'Admin analytics: cycle sizes, users waiting and high-demand skill gaps.',
      },
    ],
    links: {
      live: 'https://kaushalchakra-app.onrender.com',
      github: 'https://github.com/himanshuurathi21/KAUSHAL-CHAKRA',
    },
    note: 'Live build and public source are linked. Screenshots use seeded demo accounts. Built as a second-year minor project.',
  },
  {
    id: 'netpulse',
    number: '03',
    title: 'NETPULSE',
    category: 'desktop',
    categoryLabel: 'Desktop Application',
    status: 'Windows .exe',
    accent: 'coral',
    tagline: 'Network diagnosis, without the guesswork.',
    description:
      'A Windows desktop suite for network fault diagnosis, OSI-layer root-cause analysis and Wi-Fi site surveys, with a 15-scenario Simulation Lab for demos and training.',
    overview:
      'NetPulse scans a real network, compares the evidence and turns it into a plain-language diagnosis. It covers Wi-Fi signal, ping, packet loss, DNS and traceroute, then reports the probable root cause with its OSI layer, severity, confidence and a suggested fix. A separate survey workspace captures Wi-Fi coverage, speed tests and map data, and exports the evidence for reports. An AI-assisted assignment agent recommends next steps and auto-generates ticket summaries.',
    problem:
      'Connectivity symptoms rarely name their cause. Support staff and students need a repeatable way to separate signal, DNS, routing and internet problems without guessing. They also need to practise on realistic faults and document coverage without renting a commercial survey suite.',
    features: [
      'Live scans for Wi-Fi signal, ping latency, packet loss, DNS and traceroute',
      'Rule-based root-cause analysis with OSI layer, severity and confidence',
      'Real-time network monitoring with live dashboard',
      'AI assignment agent that recommends fixes and auto-generates task tickets',
      'Wi-Fi Hotspot, LAN Cable and Mobile Internet diagnostic modes',
      '15-scenario Simulation Lab for demos and training',
      'GPS-located Wi-Fi site surveys with real speed tests and a signal timeline',
      'Coverage map, heatmap and optional floor-plan overlay',
      'Multi-page PDF survey reports',
      'CSV, Excel, JSON and KML exports',
      'Packaged as a Windows .exe with no AI API or paid service required',
    ],
    modules: [
      {
        name: 'Live diagnostics',
        detail: 'One-click collection of signal, latency, DNS and route evidence.',
      },
      {
        name: 'Diagnosis',
        detail: 'Probable fault, OSI layer, severity, confidence and a suggested fix.',
      },
      {
        name: 'Real-time monitor',
        detail: 'Live dashboard showing connection health, bandwidth and alert stream.',
      },
      {
        name: 'AI assignment agent',
        detail: 'Suggests fixes, assigns severity, and drafts ticket summaries from scan results.',
      },
      {
        name: 'Simulation Lab',
        detail: '15 built-in fault scenarios for training and demos.',
      },
      {
        name: 'Site survey',
        detail: 'Survey points, speed tests, map/heatmap and signal timeline.',
      },
      {
        name: 'Reports & exports',
        detail: 'PDF survey reports plus CSV, Excel, JSON and KML data.',
      },
    ],
    contribution: [
      'Built the diagnostic scan pipeline and rule-based analysis engine',
      'Implemented the Simulation Lab and the survey data model',
      'Added map/heatmap visualisation and multi-format export',
      'Generated PDF survey reports and packaged the app for Windows',
      'Integrated AI assignment agent and real-time monitoring dashboard.',
    ],
    tech: ['Node.js', 'JavaScript', 'HTML/CSS', 'Canvas API', 'PDF Export', 'pkg', 'TensorFlow', 'Socket.io'],
    cover: '/assets/images/projects/netpulse/cover.jpg',
    coverAlt:
      'Illustrated network fault map tracing a Layer 3 timeout from gateway to access point and client',
    previewHost: 'netpulse · desktop app with AI',
    gallery: [
      {
        src: '/assets/images/projects/netpulse/home.jpg',
        alt: 'NETPULSE desktop home screen',
        caption: 'Desktop home: diagnostic modes, survey tools and the 15-scenario lab.',
      },
      {
        src: '/assets/images/projects/netpulse/simulation.jpg',
        alt: 'NETPULSE Simulation Lab scenario results',
        caption: 'Simulation Lab: a realistic fault injected without touching a live network.',
      },
      {
        src: '/assets/images/projects/netpulse/diagnosis.jpg',
        alt: 'NETPULSE root-cause diagnosis panel',
        caption: 'Root-cause diagnosis with OSI layer, severity, confidence and a fix.',
      },
      {
        src: '/assets/images/projects/netpulse/traceroute.jpg',
        alt: 'NETPULSE traceroute and evidence panel',
        caption: 'Traceroute evidence alongside the diagnosis and suggested action.',
      },
      {
        src: '/assets/images/projects/netpulse/ai-agent.jpg',
        alt: 'NETPULSE AI assignment agent interface',
        caption: 'AI agent reviewing diagnostics and suggesting the next action.',
      },
      {
        src: '/assets/images/projects/netpulse/monitor.jpg',
        alt: 'NETPULSE real-time monitoring dashboard',
        caption: 'Live dashboard showing connection health, bandwidth and alert stream.',
      },
    ],
    links: {
      live: '/assets/files/NetPulse.exe',
      github: 'https://github.com/himanshuurathi21/NetPulse',
    },
    note: 'Windows build available on request. Source is public; screenshots use the built-in Simulation Lab, not a live network. AI agent and real-time monitor are mock-layer prototypes ready for a FastAPI backend. Windows executable available in the Releases section.',
  },
  {
    id: 'greenroute',
    number: '04',
    title: 'GreenRoute',
    category: 'web',
    categoryLabel: 'Web App',
    status: 'Academic build',
    accent: 'purple',
    tagline: 'See the carbon behind every route.',
    description:
      'A multi-modal route planner and carbon dashboard built on live OpenStreetMap data. It compares car, motorcycle, cycling and walking options on emissions, cost and practicality.',
    overview:
      'GreenRoute is a browser-based route planner and carbon-analysis dashboard built for an Environmental Studies curriculum. It geocodes real places, requests mode-specific routes and compares distance, travel time, CO₂, operating cost and practicality. The result is a transparent recommendation, a savings estimate and a local trip history that never invents data it does not have.',
    problem:
      'Route planners usually optimise for time and leave environmental cost invisible. GreenRoute makes the trade-offs comparable in one place. It also refuses to fake completeness: without a GTFS feed it labels bus and metro estimates as carbon-only corridor calculations, never as real schedules, fares or geometry.',
    features: [
      'Live geocoding through OpenStreetMap Nominatim with debounced search and rate limiting',
      'Mode-specific OSRM routing for car, motorcycle, bicycle and foot',
      'Scope 1, Scope 2 and per-passenger emissions calculations',
      'Regional EV grid-intensity modelling - EVs are never treated as zero-emission',
      'Fuel and electricity cost comparison using real tariffs',
      'Weighted recommendation across environment, practicality, time and cost',
      'Transit corridor estimates that are explicitly carbon-only',
      'Savings calculator with annual CO₂ avoided and tree-year equivalence',
      'Local trip history with search, filters, CSV/JSON export and impact totals',
      'In-app methodology audit with every factor, formula and source URL',
    ],
    modules: [
      {
        name: 'Planner',
        detail: 'Origin, destination, vehicle profile, tariff and grid preferences.',
      },
      {
        name: 'Results',
        detail: 'Map, mode comparison, recommendation and savings estimate.',
      },
      {
        name: 'History',
        detail: 'Verified local trips with filters, aggregate stats and export.',
      },
      {
        name: 'Impact',
        detail: 'Annual CO₂ savings and equivalence calculations.',
      },
      {
        name: 'Methodology',
        detail: 'Inspectable factors, coefficients and source links.',
      },
      {
        name: 'Settings',
        detail: 'Persistent vehicle, tariff and grid-intensity choices.',
      },
    ],
    contribution: [
      'Built the React and TypeScript route-planning interface and data flows',
      'Integrated Nominatim geocoding and mode-specific OSRM routing',
      'Implemented emissions, cost, savings and recommendation calculations',
      'Built local history/export and the in-app methodology audit',
    ],
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Leaflet',
      'Recharts',
      'OSRM',
      'Nominatim',
      'Vitest',
    ],
    cover: '/assets/images/projects/greenroute/cover.jpg',
    coverAlt:
      'Illustrated route map comparing relative CO₂ for car, motorcycle, cycle and walking modes',
    previewHost: 'greenroute · local build',
    gallery: [
      {
        src: '/assets/images/projects/greenroute/planner.jpg',
        alt: 'GreenRoute route planner form',
        caption: 'Planner: real locations, vehicle profile and travel-mode selection.',
      },
      {
        src: '/assets/images/projects/greenroute/results.jpg',
        alt: 'GreenRoute route results with map and mode comparison',
        caption: 'Results: route map and the mode comparison with emissions and cost.',
      },
      {
        src: '/assets/images/projects/greenroute/comparison.jpg',
        alt: 'GreenRoute detailed mode comparison',
        caption: 'Detailed comparison showing why the recommended mode wins.',
      },
      {
        src: '/assets/images/projects/greenroute/transit.jpg',
        alt: 'GreenRoute transit corridor estimate',
        caption: 'Transit is labelled as a carbon-only corridor estimate, not a real schedule.',
      },
      {
        src: '/assets/images/projects/greenroute/history.jpg',
        alt: 'GreenRoute saved trip history',
        caption: 'Local trip history with search, filters and aggregate impact.',
      },
    ],
    links: {
      live: 'https://greenroute-evs.netlify.app/',
      github: 'https://github.com/himanshuurathi21/greenroute-evs',
    },
    note: 'Live deployment on Netlify and public source repository available. Screenshots come from the running build.',
  },
  {
    id: 'autobiz',
    number: '05',
    title: 'AutoBiz AI',
    category: 'ai',
    categoryLabel: 'AI & Data',
    status: 'Live prototype',
    accent: 'cyan',
    tagline: 'A business co-pilot, minus the overhead.',
    description:
      'A front-end prototype of an AI business platform for Indian SMEs: guided onboarding, tailored business analysis, agent chat, analytics and a marketplace - all running on mock data.',
    overview:
      'AutoBiz AI explores how an AI business platform could feel for an Indian SME owner. The prototype starts with onboarding, turns the answers into a readable business snapshot, then opens a workspace where agent conversations, revenue analytics and a marketplace live side by side. Every API call is routed through a mock layer that can be pointed at a real FastAPI backend later.',
    problem:
      'Small business owners are often sold “AI” as a black box. AutoBiz explores a more legible workflow: explain the business, see what the platform understood, then choose agents and inspect the numbers they would act on. The prototype needed to prove the product experience before a real backend existed.',
    features: [
      'Six-step guided onboarding covering industry, size, revenue, goals, challenges and team',
      'Free-text and document-upload onboarding alternatives',
      'Animated analysis screen and a tailored results page',
      'WhatsApp-inspired agent chat across a roster of agent personas',
      'Recharts analytics for revenue, categories, customer segments and traffic',
      'Searchable and filterable agent marketplace',
      'English/Hindi switch plus light and dark themes',
      'Mobile-first app shell with desktop sidebar and mobile bottom navigation',
      'Mock API layer ready to be switched to a real FastAPI server',
    ],
    modules: [
      {
        name: 'Onboarding',
        detail: 'Guided, free-text and upload paths converge on one analysis flow.',
      },
      {
        name: 'Results',
        detail: 'A business snapshot with strengths, gaps and next steps.',
      },
      {
        name: 'Agents',
        detail: 'Agent list and a WhatsApp-style chat surface with mock conversations.',
      },
      {
        name: 'Business',
        detail: 'Analytics dashboard for revenue, categories, segments and traffic.',
      },
      {
        name: 'Community',
        detail: 'Agent marketplace with search and filters.',
      },
      {
        name: 'Dashboard',
        detail: 'Settings and controls for theme, language and workspace preferences.',
      },
    ],
    contribution: [
      'Designed and built the full React and TypeScript front end',
      'Implemented all onboarding paths and the results experience',
      'Built the agent chat, analytics and marketplace views',
      'Created the shared design system and mock API layer',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'Recharts', 'React Router'],
    cover: '/assets/images/projects/autobiz/cover.jpg',
    coverAlt:
      'Illustrated AI agent flow turning business inputs into restock, follow-up and pricing actions, labelled as a front-end prototype with mock data',
    previewHost: 'autobiz-business-ai-agent.netlify.app',
    gallery: [
      {
        src: '/assets/images/projects/autobiz/home.jpg',
        alt: 'AutoBiz AI landing page',
        caption: 'Landing page for the AI business platform prototype.',
      },
      {
        src: '/assets/images/projects/autobiz/onboarding.jpg',
        alt: 'AutoBiz guided onboarding goals step',
        caption: 'Guided onboarding: six steps, with goals and challenges selected.',
      },
      {
        src: '/assets/images/projects/autobiz/results.jpg',
        alt: 'AutoBiz analysis results page',
        caption: 'Results: a readable business snapshot generated from the onboarding answers.',
      },
      {
        src: '/assets/images/projects/autobiz/chat.jpg',
        alt: 'AutoBiz agent chat interface',
        caption: 'Agent workspace with a WhatsApp-inspired demo conversation.',
      },
      {
        src: '/assets/images/projects/autobiz/analytics.jpg',
        alt: 'AutoBiz business analytics dashboard',
        caption: 'Business dashboard with revenue, category and traffic charts.',
      },
      {
        src: '/assets/images/projects/autobiz/marketplace.jpg',
        alt: 'AutoBiz community agent marketplace',
        caption: 'Community marketplace for discovering and hiring agents.',
      },
    ],
    links: {
      live: 'https://autobiz-business-ai-agent.netlify.app/',
      github: 'https://github.com/himanshuurathi21/autobiz-business-ai-agent',
    },
    note: 'Front-end prototype: agent replies, metrics and marketplace data are mocked. No production AI backend is connected.',
  },
  {
    id: 'spendwise',
    number: '06',
    title: 'SpendWise',
    category: 'ai',
    categoryLabel: 'AI & Data',
    status: 'Live',
    accent: 'lime',
    tagline: 'Spend smarter. See further.',
    description:
      'A personal finance workspace that connects transactions, budgets, goals, subscriptions and net worth, with offline-first storage, reports and an installable PWA shell.',
    overview:
      'SpendWise brings the moving parts of personal finance into one workspace. Transactions feed budgets and goals; recurring charges surface subscriptions and price hikes; reports turn the month into something readable; and a portfolio view adds net worth. The app is built to keep working offline, with a PWA install path and a Capacitor shell for mobile.',
    problem:
      'Most money apps show spending after the fact, one screen at a time. SpendWise connects a transaction to the budget it affects, the goal it delays and the recurring charge behind it, so the user can see the consequence of a decision instead of just a category total.',
    features: [
      'Dashboard with balance, financial health score, savings rate, streak and goal progress',
      'Transaction history with category edits, bulk actions, receipts and PDF export',
      'Budgets with periods, rollover and over-budget alerts',
      'Savings goals with contributions and progress tracking',
      'Analytics for monthly trends, categories, recurring costs and price hikes',
      'Subscription management, portfolio/net worth and an advisor view',
      'UPI and bank-sync surfaces with import flows',
      'Parental controls with a PIN gate and kid mode',
      'Offline-first storage with Dexie and Supabase-backed auth/sync',
      'Installable PWA plus a Capacitor mobile shell',
    ],
    modules: [
      {
        name: 'Dashboard',
        detail: 'At-a-glance money state, insights and quick-add entry.',
      },
      {
        name: 'Transactions',
        detail: 'Search, filter, categorise, attach receipts and export.',
      },
      {
        name: 'Budgets & goals',
        detail: 'Limits, rollover, savings targets and contributions.',
      },
      {
        name: 'Analytics',
        detail: 'Trends, recurring charges, subscriptions and price-hike detection.',
      },
      {
        name: 'Reports & portfolio',
        detail: 'PDF reports, tax report and net-worth tracking.',
      },
      {
        name: 'Sync & privacy',
        detail: 'Supabase sync surfaces, local Dexie cache and parental controls.',
      },
    ],
    contribution: [
      'Built the React and TypeScript app and shared design system',
      'Implemented the transaction, budget, goal and analytics flows',
      'Added offline persistence and Supabase-backed sync surfaces',
      'Created PDF reports, the PWA setup and the Capacitor shell',
    ],
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Supabase',
      'Dexie',
      'Recharts',
      'Capacitor',
    ],
    cover: '/assets/images/projects/spendwise/cover.jpg',
    coverAlt:
      'Illustrated finance workspace with a spending donut, net-worth sparkline and budget category chips',
    previewHost: 'spendwise-pk-hr.netlify.app',
    gallery: [
      {
        src: '/assets/images/projects/spendwise/dashboard.jpg',
        alt: 'SpendWise dashboard with balance and insights',
        caption: 'Dashboard: balance, health score, streak and an AI-style spending insight.',
      },
      {
        src: '/assets/images/projects/spendwise/transactions.jpg',
        alt: 'SpendWise transaction history',
        caption: 'Transaction history with categories, filters and bulk actions.',
      },
      {
        src: '/assets/images/projects/spendwise/budget.jpg',
        alt: 'SpendWise budget manager',
        caption: 'Budgets with limits, spending progress and rollover controls.',
      },
      {
        src: '/assets/images/projects/spendwise/insights.jpg',
        alt: 'SpendWise dashboard insights and goal progress',
        caption: 'Lower dashboard: goal progress, gamification and money insights.',
      },
    ],
    links: {
      live: 'https://spendwise-pk-hr.netlify.app/',
      github: 'https://github.com/himanshuurathi21/SpendWise',
    },
    note: 'Live build and public source are linked. Screenshots use local demo transactions, not personal financial data.',
  },
  {
    id: 'mehfil',
    number: '07',
    title: 'MEHFIL',
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    status: 'Case study',
    accent: 'lime',
    tagline: 'Every visit. Every sip. Every reward.',
    description:
      'A mobile-first loyalty system for a chai and Maggie shop. It verifies every purchase, runs the reward cycles, and turns a free chai into a one-time QR code staff can scan at the counter.',
    overview:
      'MEHFIL replaces paper punch cards with a verified digital loyalty flow. Customers create an account, submit a purchase request, and watch their Chai, Maggie and qualifying-visit progress update after the shop approves it. When a reward unlocks, the app issues a secure one-time QR code that staff redeem through a camera scanner.',
    problem:
      'A small café cannot afford to lose track of loyalty visits or honour the same reward twice. Paper cards are easy to fake, hard to audit, and give the owner almost no view of who is close to a reward. MEHFIL needed to verify purchases without adding a payment gateway, OTP cost or extra counter hardware.',
    features: [
      'Email and password accounts with bcrypt-hashed passwords and HTTP-only cookie sessions',
      'Customer dashboard for Chai, Maggie and eligible-visit progress',
      'Purchase requests that move from PENDING to admin approval or rejection',
      'Loyalty rules: 8 Chai for a bun maska, 8 Maggie for a free Maggie, 5 eligible visits for a free chai',
      'One purchase can count toward Chai or Maggie and the visit cycle at the same time',
      'Secure one-time reward QR redeemed by staff through the admin camera scanner',
      'Duplicate-approval protection and a complete admin audit log',
      'Installable mobile-first interface with no OTP, SMS or paid analytics',
    ],
    modules: [
      {
        name: 'Customer dashboard',
        detail: 'Live counters, unlocked rewards and recent activity in one mobile screen.',
      },
      {
        name: 'Purchase request → approval',
        detail: 'The shop verifies each visit before it counts; transactional approval blocks duplicates.',
      },
      {
        name: 'Central loyalty engine',
        detail: 'Applies the ₹15 visit threshold, one-visit-per-purchase rule and cycle resets.',
      },
      {
        name: 'Reward QR & scanner',
        detail: 'One-time token, camera scan, single redemption and an audit entry.',
      },
      {
        name: 'Admin console',
        detail: 'Pending queue, users, reward states, scanner and audit history.',
      },
    ],
    contribution: [
      'Built the customer, admin and reward-redemption flows end to end',
      'Implemented the central loyalty engine and its cycle-reset rules',
      'Added duplicate-approval protection, role checks and audit logging',
      'Shipped the responsive Next.js interface and deployed the live build',
    ],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind'],
    cover: '/assets/images/projects/mehfil/cover.jpg',
    coverAlt:
      'Illustrated MEHFIL loyalty card with eight stamps, a free reward and a one-time QR code beside a chai glass',
    previewHost: 'mehfil · case study',
    gallery: [
      {
        src: '/assets/images/projects/mehfil/home.jpg',
        alt: 'MEHFIL loyalty landing page with reward rules',
        caption: 'Customer home: reward rules, install prompt and the start of the loyalty journey.',
      },
      {
        src: '/assets/images/projects/mehfil/rewards.jpg',
        alt: 'MEHFIL how-it-works section with reward tiers',
        caption: 'The full reward ladder and how a purchase becomes an approved visit.',
      },
      {
        src: '/assets/images/projects/mehfil/login.jpg',
        alt: 'MEHFIL login and sign-up screen',
        caption: 'Password login and sign-up - no OTP or SMS cost for the shop.',
      },
    ],
    links: {},
    note: 'Case study only. Source code and the live build are not public. Screenshots come from the running product.',
  },
];

export const filters = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'ai', label: 'AI & Data' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'web', label: 'Web Apps' },
];
