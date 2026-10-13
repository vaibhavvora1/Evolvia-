import { CONTACT_EMAIL } from '../config/contact';

export const services = [
  {
    id: 'web',
    number: '01',
    title: 'Web Development',
    shortTitle: 'Web',
    category: 'Full-Stack Engineering',
    tagline: 'Fast, search-friendly React and Next.js applications engineered for scale.',
    points: ['Fast React and Next.js apps', 'Secure APIs and databases', 'SEO-ready and mobile-first'],
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'GraphQL'],
    technologies: ['react', 'next-js', 'node-js', 'graphql', 'postgresql'],
    icon: 'code',
    image: '/asset-07.webp',
    imageWidth: 1376, imageHeight: 768,
    stat: '40+ launched products',
    overview: [
      'We build responsive, search-friendly web applications that prioritize render performance, resilient API boundaries, and clear developer ergonomics. Every web project begins with a careful evaluation of business domain requirements and user traffic expectations.',
      'Our engineering approach pairs modern React and Next.js component architectures with robust server-side runtimes like Node.js and Go. We emphasize type safety, automated tests, and accessible interaction patterns.',
      'From custom customer dashboards to high-throughput content platforms, we build systems designed for long-term maintainability without bloated dependencies.'
    ],
    included: [
      'Full-stack architecture and schema design',
      'Production React / Next.js implementation with SSR and static caching',
      'Secure REST & GraphQL API endpoints',
      'Relational and document database integration (PostgreSQL / MongoDB)',
      'Lighthouse performance and accessibility auditing (90+ standard)',
      'CI/CD automated deployment and production telemetry'
    ],
    workflow: [
      { step: '01', title: 'Technical Discovery', desc: 'Map core data models, identify API integrations, and establish latency budgets.' },
      { step: '02', title: 'System Architecture', desc: 'Design scalable component contracts, database schemas, and state management rules.' },
      { step: '03', title: 'Iterative Sprints', desc: 'Bi-weekly deployable increments with verified milestone deliverables and code reviews.' },
      { step: '04', title: 'Hardening & Launch', desc: 'Perform security scans, accessibility checks, edge caching configuration, and operational handover.' }
    ],
    projectsUsed: ['finora', 'urbanx'],
    faq: [
      { q: 'Which rendering strategy do you recommend for web apps?', a: 'We evaluate your content dynamics: dynamic user portals typically use server-side rendering (SSR) or incremental static regeneration (ISR) in Next.js, while authenticated dashboards benefit from fast client-side rendering with edge caching.' },
      { q: 'How do you ensure web performance and SEO?', a: 'We enforce strict bundle budgets, eliminate unused CSS, compress images to modern WebP formats, and verify Core Web Vitals on every release.' },
      { q: 'Do you provide full documentation and code handover?', a: 'Yes. Every project includes repository documentation, environment variable specifications, OpenAPI schemas, and full intellectual property transfer.' }
    ],
    relatedIds: ['cloud', 'design', 'software']
  },
  {
    id: 'mobile',
    number: '02',
    title: 'Mobile App Development',
    shortTitle: 'Mobile',
    category: 'Native & Cross-Platform',
    tagline: 'High-performance iOS and Android applications with offline-first reliability.',
    points: ['Build fluid iOS and Android apps', 'Support offline-first experiences', 'Optimize speed and battery'],
    tags: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    technologies: ['react-native', 'flutter', 'swift', 'android', 'firebase'],
    icon: 'mobile',
    image: '/asset-03.webp',
    imageWidth: 1376, imageHeight: 768,
    stat: '15+ shipped apps',
    overview: [
      'We engineer native and cross-platform mobile experiences that feel responsive, look refined, and handle erratic network conditions gracefully.',
      'Using React Native and Flutter, we deliver unified single-codebase solutions without sacrificing platform-specific UX fidelity, camera integrations, or background synchronization capabilities.',
      'Our mobile builds feature rigorous memory management, minimal cold-start times, and persistent offline caches designed for real-world constraints.'
    ],
    included: [
      'Cross-platform React Native or Flutter architecture',
      'Native Swift (iOS) and Kotlin (Android) modules when required',
      'Offline-first data persistence and conflict resolution',
      'Push notification orchestration and deep-linking pipelines',
      'Automated App Store and Google Play release pipelines',
      'Crash analytics and real-time session observability'
    ],
    workflow: [
      { step: '01', title: 'Mobile Strategy', desc: 'Define device target profiles, offline state rules, and native hardware requirements.' },
      { step: '02', title: 'Interactive Prototype', desc: 'Validate gestures, screen transitions, and ergonomic reachability on physical test devices.' },
      { step: '03', title: 'Core Implementation', desc: 'Build reactive UI screens, background sync workers, and state management.' },
      { step: '04', title: 'Store Certification', desc: 'Verify app guidelines compliance, configure certificates, and publish to app marketplaces.' }
    ],
    projectsUsed: ['urbanx', 'finora'],
    faq: [
      { q: 'Should we choose React Native or native development?', a: 'For most product teams, React Native or Flutter delivers 95% code sharing and fast feature iteration without noticeable performance loss. For hardware-heavy workloads, we write custom native Swift/Kotlin modules.' },
      { q: 'How are offline capabilities implemented?', a: 'We use local encrypted storage (SQLite/WatermelonDB) to cache reads and queue mutations locally, syncing with backend services as soon as connectivity restores.' }
    ],
    relatedIds: ['web', 'design', 'software']
  },
  {
    id: 'ai',
    number: '03',
    title: 'AI & Automation',
    shortTitle: 'AI',
    category: 'Intelligent Systems',
    tagline: 'Production-ready AI workflows, grounded retrieval pipelines, and autonomous agents.',
    points: ['Automate repetitive business workflows', 'Build reliable AI agents', 'Connect models with business data'],
    tags: ['PyTorch', 'OpenAI', 'LangChain', 'Python', 'FastAPI'],
    technologies: ['python', 'openai', 'langchain', 'rag-systems', 'fastapi'],
    icon: 'ai',
    image: '/asset-17.webp',
    imageWidth: 1376, imageHeight: 768,
    stat: '10+ AI systems in production',
    overview: [
      'We take machine learning models out of the laboratory and place them safely into operational production. Our applied AI systems ground language models in private enterprise data to eliminate hallucinations.',
      'We design multi-step agent workflows, retrieval-augmented generation (RAG) architectures, and automated data extraction pipelines with built-in auditability.',
      'Every AI integration includes fallback logic, token budget controls, and human-in-the-loop escalation paths to ensure organizational trust.'
    ],
    included: [
      'Retrieval-Augmented Generation (RAG) vector pipelines',
      'Context-aware conversational AI and support bots',
      'Automated document extraction and semantic search',
      'Model routing across OpenAI, Claude, and Gemini',
      'Hallucination prevention guardrails and evaluation metrics',
      'Python/FastAPI inference microservices with latency budgets'
    ],
    workflow: [
      { step: '01', title: 'Data & Feasibility Audit', desc: 'Review source documents, data sanitation needs, and define acceptable accuracy thresholds.' },
      { step: '02', title: 'Retrieval & RAG Setup', desc: 'Chunk and embed knowledge bases into high-throughput vector indices with metadata filters.' },
      { step: '03', title: 'Prompt & Agent Pipeline', desc: 'Engineer deterministic prompts, tool-calling interfaces, and fallback safety layers.' },
      { step: '04', title: 'Production Hardening', desc: 'Monitor drift, latency, token expenditures, and human-in-the-loop review rates.' }
    ],
    projectsUsed: ['nexa-ai'],
    faq: [
      { q: 'How do you prevent AI models from hallucinating?', a: 'We restrict model outputs strictly to relevant retrieved source passages (RAG), supply explicit boundary instructions, and add verification checks before responses are rendered to users.' },
      { q: 'Is our proprietary business data sent to public model training sets?', a: 'No. We configure enterprise APIs and zero-retention policies so your business documents and queries are never used for model training.' }
    ],
    relatedIds: ['software', 'cloud', 'web']
  },
  {
    id: 'cloud',
    number: '04',
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud',
    category: 'Platform Architecture',
    tagline: 'Resilient cloud infrastructure, automated CI/CD pipelines, and cost-controlled hosting.',
    points: ['Design resilient cloud architecture', 'Automate deployment and operations', 'Monitor performance and reliability'],
    tags: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform'],
    technologies: ['aws', 'google-cloud', 'docker', 'kubernetes', 'terraform'],
    icon: 'cloud',
    image: '/asset-21.webp',
    imageWidth: 1376, imageHeight: 768,
    stat: '99.9% availability SLA delivered',
    overview: [
      'We design, provision, and maintain fault-tolerant cloud platforms that allow engineering teams to ship code repeatedly with zero downtime.',
      'Using Terraform infrastructure-as-code, Docker containers, and managed Kubernetes, we establish reproducible hosting environments across AWS and Google Cloud.',
      'We treat cloud infrastructure economics as a key product constraint, auditing wasteful over-provisioning to lower recurring hosting bills.'
    ],
    included: [
      'Terraform Infrastructure-as-Code (IaC) configuration',
      'Docker containerization and Kubernetes cluster management',
      'Zero-downtime blue/green automated CI/CD deployment pipelines',
      'Prometheus and Grafana telemetry, log aggregation, and alert routing',
      'VPC networking, IAM security hardening, and SSL certificate automation',
      'Cloud cost engineering and rightsizing analysis'
    ],
    workflow: [
      { step: '01', title: 'Architecture Review', desc: 'Assess current workload constraints, single points of failure, and recovery objectives.' },
      { step: '02', title: 'Declarative Provisioning', desc: 'Codify infrastructure with Terraform to guarantee repeatable environments.' },
      { step: '03', title: 'Pipeline Automation', desc: 'Automate GitHub Actions pipelines with linting, security scans, and preview deployments.' },
      { step: '04', title: 'Observability & SLA', desc: 'Deploy structured metrics dashboards, error alerts, and automated backup routines.' }
    ],
    projectsUsed: ['cloudcore', 'nexa-ai'],
    faq: [
      { q: 'Which cloud provider do you recommend?', a: 'We recommend AWS or Google Cloud depending on your team’s existing tooling and compliance needs. We design containerized workloads so you are never locked into a single vendor.' },
      { q: 'Can you help us lower our cloud hosting expenses?', a: 'Yes. Through automated autoscaling, database connection pooling, and storage lifecycle policies, we routinely reduce client cloud bills by 30-50%.' }
    ],
    relatedIds: ['software', 'web', 'ai']
  },
  {
    id: 'design',
    number: '05',
    title: 'UI/UX Engineering',
    shortTitle: 'Design',
    category: 'Design Systems & Motion',
    tagline: 'Accessible design systems, high-fidelity prototypes, and cohesive digital aesthetics.',
    points: ['Design accessible product systems', 'Prototype useful interactions', 'Ship precise responsive interfaces'],
    tags: ['Figma', 'Design Systems', 'Prototyping', 'GSAP', 'Accessibility'],
    technologies: ['figma', 'gsap', 'html5', 'css3', 'react'],
    icon: 'design',
    image: '/asset-18.webp',
    imageWidth: 1376, imageHeight: 768,
    stat: 'Design systems used by 5+ companies',
    overview: [
      'We unite interface aesthetics with technical feasibility. We craft design systems in Figma and translate them directly into production code with pixel-level precision.',
      'Our UI/UX process avoids superficial decoration; instead, we prioritize user task clarity, cognitive load reduction, and seamless keyboard and screen-reader accessibility.',
      'From motion choreography to comprehensive component libraries, we help ambitious products stand out with cohesive visual confidence.'
    ],
    included: [
      'Design tokens and typography scales',
      'Comprehensive Figma component libraries and variant states',
      'High-fidelity clickable interaction prototypes',
      'WCAG 2.1 AA accessibility auditing and keyboard navigation',
      'Production CSS/React implementation and motion design',
      'Usability research and user journey optimization'
    ],
    workflow: [
      { step: '01', title: 'UX Research & Flows', desc: 'Map core user workflows, error states, and information hierarchy.' },
      { step: '02', title: 'Design System Tokens', desc: 'Establish semantic color tokens, typography scales, and responsive grid rules.' },
      { step: '03', title: 'Component Library', desc: 'Build accessible, reusable UI components with dark and light state variants.' },
      { step: '04', title: 'Engineering Handoff', desc: 'Directly implement production CSS and component interfaces alongside frontend teams.' }
    ],
    projectsUsed: ['urbanx', 'finora'],
    faq: [
      { q: 'Do you deliver only Figma files or working code as well?', a: 'Both. Our designers are also engineers, so we deliver comprehensive Figma libraries and production-ready React components with clean CSS tokens.' }
    ],
    relatedIds: ['web', 'mobile', 'software']
  },
  {
    id: 'software',
    number: '06',
    title: 'Custom Software',
    shortTitle: 'Software',
    category: 'Enterprise Solutions',
    tagline: 'Bespoke backend architectures, legacy modernization, and distributed microservices.',
    points: ['Model complex business workflows', 'Modernize critical legacy systems', 'Integrate your existing platforms'],
    tags: ['Go', 'Python', 'PostgreSQL', 'Redis', 'Kafka'],
    technologies: ['go', 'python', 'postgresql', 'redis', 'apache-kafka'],
    icon: 'software',
    image: '/asset-05.webp',
    imageWidth: 1376, imageHeight: 768,
    stat: 'Complex systems, real constraints',
    overview: [
      'Off-the-shelf software rarely handles unique operational business rules. We design custom software systems around your exact data models, regulatory mandates, and scalability requirements.',
      'We write concurrent backend services in Go and Python, architect relational databases in PostgreSQL, and decouple asynchronous pipelines with Apache Kafka.',
      'We specialize in legacy modernization — replacing fragile legacy codebases incrementally without requiring risky, big-bang system rewrites.'
    ],
    included: [
      'Enterprise domain modeling and business logic architecture',
      'Concurrent, compiled backend services (Go / Python)',
      'Relational database modeling with strict ACID guarantees',
      'Asynchronous event queues and caching (Kafka / Redis)',
      'Legacy system modernization and data migration pipelines',
      'Comprehensive integration testing and API contracts'
    ],
    workflow: [
      { step: '01', title: 'Domain Modeling', desc: 'Document existing data silos, transactional boundaries, and throughput bottlenecks.' },
      { step: '02', title: 'Service Isolation', desc: 'Carve out modular service boundaries with typed interfaces and backward-compatible schemas.' },
      { step: '03', title: 'Incremental Build', desc: 'Deliver production-tested services alongside legacy platforms via reverse proxies.' },
      { step: '04', title: 'Safe Cutover', desc: 'Execute zero-downtime database migrations with automated rollback procedures.' }
    ],
    projectsUsed: ['finora', 'cloudcore', 'nexa-ai'],
    faq: [
      { q: 'How do you handle migrating live databases?', a: 'We employ dual-write and phased reconciliation strategies to verify data consistency before switching primary traffic, eliminating downtime and data loss risk.' }
    ],
    relatedIds: ['cloud', 'web', 'ai']
  },
  // Specialized AI services accessible as standalone service slugs
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots & Conversational AI',
    shortTitle: 'Chatbots',
    category: 'Intelligent Systems',
    tagline: 'Context-aware conversational assistants connected to live business data.',
    points: ['Answer customer questions instantly', 'Qualify leads around the clock', 'Escalate complex requests smoothly'],
    tags: ['OpenAI', 'LangChain', 'React', 'FastAPI'],
    technologies: ['openai', 'langchain', 'react', 'fastapi'],
    icon: 'chat',
    image: '/asset-25.webp',
    imageWidth: 1376, imageHeight: 768,
    overview: [
      'Customer support teams shouldn’t be bogged down by repetitive inquiries. We build intelligent conversational agents that understand customer intent and provide accurate, verified answers 24/7.',
      'Our conversational systems integrate directly with your product databases, ticketing tools, and CRM platforms to answer queries with real-time operational context.',
      'When an issue requires human empathy or complex judgment, our bots automatically escalate the conversation to the right team member with full conversation summaries.'
    ],
    included: [
      'Conversational AI agent development and persona configuration',
      'Integration with CRM, Zendesk, Slack, or internal databases',
      'Multi-channel widget deployment (web, mobile, WhatsApp)',
      'Graceful human-in-the-loop escalation routing',
      'Sentiment analysis and conversation analytics dashboard'
    ],
    workflow: [
      { step: '01', title: 'Intent Mapping', desc: 'Identify top recurring customer queries and define escalation criteria.' },
      { step: '02', title: 'Knowledge Integration', desc: 'Connect internal documentation and APIs with strict response boundaries.' },
      { step: '03', title: 'Interface Deployment', desc: 'Deploy accessible chat interfaces tailored to your brand styling.' },
      { step: '04', title: 'Feedback Tuning', desc: 'Continuously evaluate answer ratings and refine prompt guardrails.' }
    ],
    projectsUsed: ['nexa-ai'],
    faq: [
      { q: 'Can the chatbot book appointments or initiate orders?', a: 'Yes. Using function-calling APIs, the chatbot can securely execute pre-approved workflows like checking order status or creating calendar reservations.' }
    ],
    relatedIds: ['ai', 'document-qa-rag', 'workflow-automation']
  },
  {
    id: 'document-qa-rag',
    title: 'Document Q&A (RAG Pipelines)',
    shortTitle: 'RAG Q&A',
    category: 'Intelligent Systems',
    tagline: 'Semantic search and verifiable document question-answering for private knowledge.',
    points: ['Ask questions across trusted documents', 'Cite relevant source passages', 'Keep private knowledge searchable'],
    tags: ['RAG', 'Python', 'PostgreSQL', 'LangChain'],
    technologies: ['rag-systems', 'python', 'postgresql', 'langchain'],
    icon: 'document',
    image: '/asset-06.webp',
    imageWidth: 1376, imageHeight: 768,
    overview: [
      'Unstructured enterprise knowledge locked in PDFs, internal wikis, and technical manuals is difficult to search with keyword queries. We build semantic Retrieval-Augmented Generation (RAG) platforms that let team members query thousands of documents conversationally.',
      'Every answer generated by our RAG systems cites exact source document chapters and page numbers, enabling instant human verification.',
      'We operate on self-hosted or private vector databases, ensuring private business policies, intellectual property, and medical/legal records remain confidential.'
    ],
    included: [
      'Multi-format ingestion pipeline (PDF, Markdown, DOCX, Notion)',
      'High-dimensional vector embeddings with hybrid keyword search',
      'Strict source citation and attribution engine',
      'Access control and role-based document segmentation',
      'Continuous answer quality evaluation and relevancy tracking'
    ],
    workflow: [
      { step: '01', title: 'Document Parsing', desc: 'Extract clean text, tables, and metadata from heterogeneous document formats.' },
      { step: '02', title: 'Vector Indexing', desc: 'Chunk documents by semantic units and index them with high-accuracy embeddings.' },
      { step: '03', title: 'Hybrid Retrieval', desc: 'Combine BM25 keyword matching with vector cosine similarity for optimal recall.' },
      { step: '04', title: 'Citation Output', desc: 'Return answers with verifiable snippets, links, and confidence scores.' }
    ],
    projectsUsed: ['nexa-ai'],
    faq: [
      { q: 'How does RAG differ from standard ChatGPT?', a: 'Standard models only know their static training data and hallucinate when they lack information. RAG injects your actual, current documents into the context window, forcing the model to ground its response exclusively on your verified material.' }
    ],
    relatedIds: ['ai', 'ai-chatbots', 'workflow-automation']
  },
  {
    id: 'workflow-automation',
    title: 'AI Workflow Automation',
    shortTitle: 'Automation',
    category: 'Intelligent Systems',
    tagline: 'Connect business tools and automate recurring operational handoffs with intelligent agents.',
    points: ['Automate email and CRM updates', 'Generate recurring business reports', 'Connect tools without manual handoffs'],
    tags: ['Python', 'OpenAI', 'Node.js', 'FastAPI'],
    technologies: ['python', 'openai', 'node-js', 'fastapi'],
    icon: 'workflow',
    image: '/asset-12.webp',
    imageWidth: 1376, imageHeight: 768,
    overview: [
      'Repetitive copy-pasting between spreadsheets, CRMs, and email inboxes slows high-performing teams down. We engineer deterministic workflow automations augmented with lightweight AI reasoning.',
      'Our automations ingest incoming data, summarize or categorize items, update backend databases, and dispatch appropriate notifications without human friction.',
      'We build with comprehensive audit logging, retry queues, and notification webhooks so operations teams remain in full control of every automated step.'
    ],
    included: [
      'Multi-system API webhook orchestration',
      'Intelligent document and receipt data extraction',
      'Automated email draft generation and CRM pipeline progression',
      'Audit log telemetry and error alerting via Slack / email',
      'Self-healing retry queues for transient third-party API outages'
    ],
    workflow: [
      { step: '01', title: 'Process Audit', desc: 'Identify manual handoffs that consume the highest team hours each week.' },
      { step: '02', title: 'Contract Definition', desc: 'Specify payload schemas and exception-handling fallback states.' },
      { step: '03', title: 'Agent Integration', desc: 'Implement automated workers with rate limiting and verification logic.' },
      { step: '04', title: 'Pilot & Handover', desc: 'Run shadow tests alongside manual teams to confirm zero data errors before full switch.' }
    ],
    projectsUsed: ['finora', 'nexa-ai'],
    faq: [
      { q: 'What happens if a third-party service is down?', a: 'Our worker pipelines use persistent message queues (Redis/Kafka) with exponential backoff retries, ensuring no task is ever dropped.' }
    ],
    relatedIds: ['ai', 'software', 'cloud']
  }
];

export const aiServices = services.filter((s) => s.category === 'Intelligent Systems' || s.tags.includes('OpenAI'));

export const projects = [
  {
    id: 'nexa-ai',
    index: '01',
    title: 'Nexa AI',
    category: 'AI Platform',
    year: '2026',
    points: ['Route requests across model providers', 'Ground results in relevant context', 'Keep model decisions reviewable'],
    shortDescription: 'A modular AI workspace that routes requests through retrieval and multi-model inference pipelines.',
    technologies: ['python', 'next-js', 'fastapi', 'redis', 'aws'],
    image: '/asset-17.webp',
    imageWidth: 1376, imageHeight: 768,
    metric: 'Design focus · responsive inference',
    artwork: 'layers',
    featured: true,
    challenge: 'Enterprises deploying large language models faced unacceptable latency when querying deep knowledge bases, high costs from single-provider lock-in, and compliance risks due to untraceable model hallucinations.',
    solution: 'We engineered a modular AI inference workspace. The system decouples retrieval from generative inference, routes requests dynamically across provider models based on latency and cost, and verifies every answer against grounding documents.',
    features: [
      'Dynamic multi-model routing across OpenAI, Claude, and Gemini',
      'Grounded retrieval pipeline with vector similarity and citation highlights',
      'Operational audit trails showing prompt inputs, retrieved chunks, and token expenditures',
      'Human-in-the-loop review queues for sensitive or low-confidence inferences'
    ],
    architecture: [
      'React frontend with streaming token rendering and responsive chat ergonomics',
      'FastAPI async orchestration service for model load balancing and safety filtering',
      'Redis vector cache for sub-20ms semantic similarity search across warm queries',
      'AWS ECS containerized execution with automated autoscaling'
    ],
    developmentProcess: [
      'Mapped distinct user analysis tasks and established sub-2s latency budgets',
      'Benchmarked embedding models on proprietary enterprise corpora',
      'Built automated evaluation test suites to continuously verify grounding accuracy',
      'Hardened service boundaries with rate limiting and VPC security controls'
    ],
    results: [
      'Inference request latency budgets met with 99th percentile consistency',
      'Traceable source citations displayed on 100% of generated responses',
      'Flexible provider failover eliminated dependency on any single AI API outage'
    ],
    metrics: [
      'Latency budget defined and maintained',
      'Evaluation test coverage tracked across all system prompts',
      'Model decisions inspectable in structured JSON audit trails'
    ],
    timeline: 'Illustrative 12-week delivery plan',
    teamSize: 'Cross-functional engineering team (3 engineers, 1 designer)',
    industry: 'Applied AI & Enterprise Productivity',
    services: ['ai', 'software', 'cloud'],
    lessons: [
      'Design systematic evaluation test suites before deploying language models to users',
      'Keep retrieval logic clean and inspectable to quickly debug semantic drift',
      'Incorporate human review workflows into the core product architecture from day one'
    ],
    testimonial: {
      quote: 'The architectural clarity and speed of delivery allowed us to roll out dependable AI workflows without risk.',
      author: 'Technical Leadership',
      role: 'TODO: replace with real client testimonial'
    },
    gallery: ['/asset-17.webp', '/asset-06.webp', '/asset-10.webp'],
    relatedIds: ['finora', 'cloudcore', 'urbanx']
  },
  {
    id: 'finora',
    index: '02',
    title: 'Finora',
    category: 'FinTech',
    year: '2026',
    points: ['Coordinate cross-border payment flows', 'Surface settlement and review status', 'Keep transaction history traceable'],
    shortDescription: 'A multi-currency payment operations workspace that organizes settlement status and compliance review.',
    technologies: ['react', 'node-js', 'postgresql', 'docker', 'stripe'],
    image: '/asset-22.webp',
    imageWidth: 1376, imageHeight: 768,
    metric: 'Concept focus · payment operations',
    artwork: 'payment',
    featured: true,
    challenge: 'Cross-border merchant payouts suffered from fragmented status notifications, delayed error reporting, and complex multi-jurisdiction reporting overhead.',
    solution: 'We engineered a centralized payment operations platform that tracks lifecycle events across multiple payment rails, visualizes settlement states in real time, and unifies compliance reporting in a single interface.',
    features: [
      'Unified payment status dashboard with filterable ledger events',
      'Automated reconciliation pipelines with Stripe Connect and regional banking APIs',
      'Granular exception queues for flagged payments with manual clearance tooling',
      'Immutable transactional audit logs backed by PostgreSQL ACID transactions'
    ],
    architecture: [
      'React interface optimized for dense numerical readability and fast keyboard shortcuts',
      'Node.js microservices handling transaction webhooks and state transitions',
      'PostgreSQL database with strict row-level security and read replicas for reporting',
      'Dockerized deployment architecture with automated staging environments'
    ],
    developmentProcess: [
      'Modeled payment lifecycle states and defined idempotent webhook handlers',
      'Designed exception workflows to prevent stuck transactions during gateway timeouts',
      'Conducted security audits including secret rotation and OWASP compliance verification'
    ],
    results: [
      'Payment states mapped consistently across disparate payment gateways',
      'Zero double-charges due to strictly enforced idempotency keys',
      'Full compliance audit trail exports generated in under two seconds'
    ],
    metrics: [
      '100% idempotent transaction lifecycle states modeled',
      'Operational exception queues surfaced in unified UI',
      'Strict audit trails maintained for all financial events'
    ],
    timeline: 'Illustrative 16-week delivery plan',
    teamSize: 'Cross-functional engineering team (4 engineers, 1 architect)',
    industry: 'Financial Technology & Payments',
    services: ['web', 'software'],
    lessons: [
      'Treat transaction exceptions as first-class states rather than errors',
      'Keep financial ledgers append-only to preserve auditable history',
      'Separate presentation layers from critical payment reconciliation engines'
    ],
    testimonial: {
      quote: 'Our team was able to reason about complex multi-currency payouts with confidence and clarity.',
      author: 'Operations Director',
      role: 'TODO: replace with real client testimonial'
    },
    gallery: ['/asset-22.webp', '/asset-07.webp', '/asset-14.webp'],
    relatedIds: ['nexa-ai', 'urbanx', 'cloudcore']
  },
  {
    id: 'urbanx',
    index: '03',
    title: 'UrbanX',
    category: 'E-Commerce',
    year: '2025',
    points: ['Build a flexible headless storefront', 'Organize a large product catalog', 'Connect inventory across sales channels'],
    shortDescription: 'A headless storefront concept with edge rendering and inventory synchronization.',
    technologies: ['next-js', 'shopify', 'tailwind-css', 'graphql', 'vercel'],
    image: '/asset-15.webp',
    imageWidth: 1376, imageHeight: 768,
    metric: 'Concept focus · storefront performance',
    artwork: 'commerce',
    featured: false,
    challenge: 'A growing lifestyle brand experienced sluggish page load speeds on legacy eCommerce templates, causing cart drop-offs during high-traffic product releases.',
    solution: 'We engineered a modern headless storefront on Next.js, connecting catalog and inventory data via GraphQL to Shopify Plus while rendering pages from global edge networks.',
    features: [
      'Sub-second edge rendered catalog pages with instant client-side transitions',
      'Live stock availability checks with optimistic cart updates',
      'Faceted search and category filtering with URL state synchronization',
      'Mobile-first checkout paths optimized for one-thumb purchasing'
    ],
    architecture: [
      'Next.js App Router storefront deployed on global edge infrastructure',
      'GraphQL integration layer connecting product catalog, discounts, and checkout',
      'Static asset optimization serving responsive WebP images on high-speed CDNs',
      'Redis cache for instant autocomplete and high-velocity product counts'
    ],
    developmentProcess: [
      'Designed high-converting mobile shopping journeys with micro-animations',
      'Implemented incremental static regeneration for thousands of product SKUs',
      'Stress-tested storefront under simulated flash-sale traffic loads'
    ],
    results: [
      'Core Web Vitals scores achieved 95+ across mobile and desktop devices',
      'Zero catalog rendering latency observed during seasonal marketing surges',
      'Cart bounce rate reduced through streamlined multi-step checkout'
    ],
    metrics: [
      'Lighthouse performance standard 95+ maintained',
      'Edge-cached product page TTFB under 80ms',
      'Catalog operations and stock updates synchronized in real time'
    ],
    timeline: 'Illustrative 10-week delivery plan',
    teamSize: 'Product design and engineering team (2 frontend devs, 1 designer)',
    industry: 'Direct-to-Consumer & Retail',
    services: ['web', 'design'],
    lessons: [
      'Protect the critical shopping path from heavy third-party script bloat',
      'Pre-render static product shells and hydrate dynamic inventory asynchronously',
      'Build mobile-first: over 70% of eCommerce conversions originate on touchscreens'
    ],
    testimonial: {
      quote: 'The speed and visual polish of the new storefront directly elevated our brand experience.',
      author: 'Head of eCommerce',
      role: 'TODO: replace with real client testimonial'
    },
    gallery: ['/asset-15.webp', '/asset-18.webp', '/asset-07.webp'],
    relatedIds: ['finora', 'nexa-ai', 'cloudcore']
  },
  {
    id: 'cloudcore',
    index: '04',
    title: 'CloudCore',
    category: 'Cloud Platform',
    year: '2025',
    points: ['Monitor cluster and service health', 'Connect workloads with live telemetry', 'Automate repeatable operations'],
    shortDescription: 'A unified operations view for cluster health, workload metrics, and incident triage.',
    technologies: ['go', 'react', 'kubernetes', 'prometheus', 'docker'],
    image: '/asset-14.webp',
    imageWidth: 1376, imageHeight: 768,
    metric: 'Concept focus · infrastructure visibility',
    artwork: 'cloud',
    featured: false,
    challenge: 'Platform engineering teams spent hours triaging incident root causes across disparate logs, fragmented cloud consoles, and noisy alert channels.',
    solution: 'We engineered an infrastructure observability workspace that aggregates Kubernetes cluster telemetry, correlates alert incidents with recent deployments, and guides remediation steps.',
    features: [
      'Cluster workload status visualizer with live pod restart metrics',
      'Automated root-cause correlation between deployment events and latency spikes',
      'Runbook automation triggers for rolling back unhealthy deployments',
      'Team-based alert routing with customizable quiet-hour policies'
    ],
    architecture: [
      'React frontend using Canvas data charts for high-frequency telemetry streaming',
      'High-throughput Go collectors scraping Prometheus endpoints and Kubernetes APIs',
      'Time-series storage pipelines optimized for 30-day granular metric retention',
      'Self-hosted deployment on customer Kubernetes clusters for data security'
    ],
    developmentProcess: [
      'Interviewed on-call engineers to identify key questions asked during outages',
      'Built efficient binary telemetry protocols to minimize agent CPU overhead',
      'Validated incident response workflows during simulated infrastructure failures'
    ],
    results: [
      'Mean time to identify root causes reduced from 45 minutes to under 5 minutes',
      'Zero agent resource contention on client production nodes',
      'Clear visibility provided across hybrid-cloud Kubernetes clusters'
    ],
    metrics: [
      '100% of critical infrastructure services monitored in unified view',
      'High-cardinality metric charts rendered at 60 FPS',
      'Incident context connected directly to actionable remediation runbooks'
    ],
    timeline: 'Illustrative 14-week delivery plan',
    teamSize: 'Platform engineering team (3 systems engineers)',
    industry: 'Cloud Infrastructure & DevOps Tooling',
    services: ['cloud', 'software'],
    lessons: [
      'Prioritize actionable alerts over raw metrics volume to prevent alert fatigue',
      'Display recent code releases directly on latency graphs during outages',
      'Keep monitoring tooling independent of the systems being monitored'
    ],
    testimonial: {
      quote: 'Having all cluster health metrics correlated with deployment history changed how our on-call team operates.',
      author: 'Lead Site Reliability Engineer',
      role: 'TODO: replace with real client testimonial'
    },
    gallery: ['/asset-14.webp', '/asset-21.webp', '/asset-05.webp'],
    relatedIds: ['nexa-ai', 'finora', 'urbanx']
  }
];

export const team = [
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    tagline: 'Distributed systems architect and product strategy lead.',
    image: '/asset-19.webp',
    imageWidth: 928, imageHeight: 1152,
    points: ['Architects distributed systems', 'Guides product strategy', 'Builds thoughtful engineering culture'],
    initials: 'AM',
    bio: 'Connects system architecture with product direction and disciplined engineering practice.',
    overview: [
      'Arjun founded Evolvia Tech with a conviction that software should be robust, transparent, and engineered for long-term operational resilience rather than short-term hype.',
      'With over a decade of hands-on experience designing distributed architectures, high-throughput financial systems, and cloud platforms, Arjun actively guides core technical strategy for clients globally.',
      'He champions sustainable engineering practices, clean modular interfaces, and direct collaboration between founders and technical teams.'
    ],
    expertise: ['Distributed Systems', 'Cloud Architecture', 'Product Strategy', 'Systems Design'],
    skills: ['Go', 'PostgreSQL', 'Kubernetes', 'Cloud Platforms', 'Technical Leadership'],
    projects: ['finora', 'cloudcore', 'nexa-ai'],
    philosophy: 'Clarity before complexity. Start with fundamental constraints, build with intent, and write software that team members can maintain with pride.',
    socials: { linkedin: '#', twitter: '#', github: '#' },
    relatedIds: ['karan-patel', 'anaya-desai', 'riya-shah']
  },
  {
    id: 'riya-shah',
    name: 'Riya Shah',
    role: 'Creative Director',
    tagline: 'Computational designer and design systems lead.',
    image: '/asset-20.webp',
    imageWidth: 928, imageHeight: 1152,
    points: ['Shapes visual product strategy', 'Leads computational design', 'Crafts distinctive digital experiences'],
    initials: 'RS',
    bio: 'Shapes visual product direction and bridges interface aesthetics with frontend engineering.',
    overview: [
      'Riya leads design strategy, brand aesthetics, and interface design systems at Evolvia Tech. She believes that design is how a digital product functions, feels, and communicates integrity.',
      'Her background combines computational aesthetics, typography discipline, and frontend CSS architecture. She ensures that every pixel designed in Figma transitions effortlessly into production code.',
      'Under her leadership, Evolvia’s products have earned praise for understated elegance, accessibility standards, and calm interaction patterns.'
    ],
    expertise: ['Design Systems', 'Interface Architecture', 'Motion Design', 'Brand Systems'],
    skills: ['Figma', 'Design Tokens', 'Prototyping', 'CSS Architecture', 'Accessibility'],
    projects: ['urbanx', 'finora'],
    philosophy: 'Aesthetic restraint is a feature. Great digital design removes cognitive noise so users can achieve their goals with zero distraction.',
    socials: { linkedin: '#', twitter: '#' },
    relatedIds: ['anaya-desai', 'arjun-mehta', 'karan-patel']
  },
  {
    id: 'karan-patel',
    name: 'Karan Patel',
    role: 'Lead Engineer',
    tagline: 'Platform infrastructure and cloud-native systems engineer.',
    image: '/asset-13.webp',
    imageWidth: 928, imageHeight: 1152,
    points: ['Builds cloud-native platforms', 'Designs dependable data systems', 'Makes complexity easier to reason about'],
    initials: 'KP',
    bio: 'Specializes in platform engineering, database reliability, and asynchronous data pipelines.',
    overview: [
      'Karan is the Lead Systems Engineer at Evolvia Tech, overseeing core backend architecture, automated CI/CD pipelines, and cloud infrastructure.',
      'He specializes in building resilient containerized environments, low-latency API contracts, and dependable data systems across AWS and Google Cloud.',
      'Karan is passionate about open-source developer tooling, zero-downtime deployment strategies, and building observability pipelines that make complex systems transparent.'
    ],
    expertise: ['Cloud Infrastructure', 'Database Reliability', 'DevOps & CI/CD', 'Async Pipelines'],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Go', 'Python', 'Kafka', 'Terraform'],
    projects: ['cloudcore', 'nexa-ai'],
    philosophy: 'Reliability is not an afterthought; it is engineered into the data model, deployment pipeline, and monitoring alert before the first line of business code is deployed.',
    socials: { github: '#', linkedin: '#' },
    relatedIds: ['arjun-mehta', 'riya-shah', 'anaya-desai']
  },
  {
    id: 'anaya-desai',
    name: 'Anaya Desai',
    role: 'Product Strategist',
    tagline: 'Technical product discovery and roadmap lead.',
    image: '/asset-01.webp',
    imageWidth: 928, imageHeight: 1152,
    points: ['Connects user needs with technology', 'Guides discovery and validation', 'De-risks ambitious product decisions'],
    initials: 'AD',
    bio: 'Connects client business objectives with technical engineering roadmaps.',
    overview: [
      'Anaya guides product discovery, technical scope estimation, and customer validation at Evolvia Tech.',
      'She ensures that engineering resources are focused on building features that deliver verified commercial utility and high user engagement.',
      'With experience spanning enterprise software and high-growth venture products, Anaya excels at de-risking complex roadmaps and keeping delivery on schedule.'
    ],
    expertise: ['Product Discovery', 'Roadmap Planning', 'Agile Delivery', 'Requirements Modeling'],
    skills: ['User Research', 'Product Specs', 'Milestone Planning', 'Cross-functional Coordination'],
    projects: ['nexa-ai', 'urbanx'],
    philosophy: 'Ship value in increments. Clear communication, early validation, and transparent trade-offs protect both team morale and client capital.',
    socials: { linkedin: '#' },
    relatedIds: ['arjun-mehta', 'riya-shah', 'karan-patel']
  }
];

export const jobs = [
  {
    id: 'frontend',
    position: 'Frontend Developer',
    title: 'Frontend Developer',
    department: 'Web Engineering',
    location: 'Maninagar, Ahmedabad (Hybrid) or Remote',
    type: 'Full-time',
    experience: '3+ years',
    tagline: 'Architect accessible, high-performance React and Next.js digital platforms.',
    points: ['Architect accessible React experiences', 'Build precise interactions and motion', 'Optimize for responsive performance'],
    skills: ['React', 'Next.js', 'TypeScript', 'CSS Architecture', 'Accessibility'],
    image: '/asset-04.webp',
    imageWidth: 1376, imageHeight: 768,
    overview: [
      'We are looking for a skilled Frontend Engineer who cares deeply about UI performance, clean component hierarchies, and modern CSS architecture.',
      'In this role, you will collaborate closely with our creative directors and backend architects to deliver state-of-the-art web products for international clients.',
      'We value engineers who write semantic HTML, eliminate bundle bloat, and take pride in crafting smooth, accessible user interfaces.'
    ],
    responsibilities: [
      'Architect and ship production React and Next.js applications',
      'Implement responsive layouts and design tokens with pixel-accurate fidelity',
      'Optimize web platforms for Core Web Vitals, achieving 90+ Lighthouse scores',
      'Integrate REST and GraphQL APIs with typed contract validation',
      'Collaborate on accessible design systems adhering to WCAG 2.1 AA standards'
    ],
    requirements: [
      '3+ years of professional experience building production React applications',
      'Strong JavaScript and TypeScript fundamentals (ES6+, async flows, typed contracts)',
      'Deep knowledge of vanilla CSS, CSS variables, and modern layout models (Grid, Flexbox)',
      'Experience with performance profiling, bundle splitting, and SSR caching patterns'
    ],
    benefits: [
      'Competitive compensation reviewed annually',
      'Remote-first flexibility with sustainable working hours',
      'Annual equipment stipend for home office workstation',
      'Dedicated annual budget for learning, books, and technical conferences',
      'Comprehensive health insurance and wellness support'
    ],
    interviewProcess: [
      '30-minute introductory conversation with an engineering lead',
      'Technical architecture and code review discussion (no whiteboard puzzles)',
      'Collaborative design-to-code review session with the team',
      'Offer discussion and milestone alignment'
    ],
    faq: [
      { q: 'Is this role open to fully remote candidates?', a: 'Yes. While our headquarters are in Ahmedabad, we support fully remote engineers across compatible time zones.' },
      { q: 'What tools does the frontend team use daily?', a: 'We work primarily with React 19, Next.js, Vite, TypeScript, and modern CSS tokens, tracked via Git and GitHub.' }
    ],
    relatedIds: ['fullstack', 'ui-ux']
  },
  {
    id: 'backend',
    position: 'Backend Developer',
    title: 'Backend Developer',
    department: 'Distributed Systems',
    location: 'Maninagar, Ahmedabad (Hybrid) or Remote',
    type: 'Full-time',
    experience: '4+ years',
    tagline: 'Engineer fault-tolerant APIs, distributed data systems, and async pipelines.',
    points: ['Design fault-tolerant service boundaries', 'Optimize databases for throughput', 'Operate distributed production systems'],
    skills: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka'],
    image: '/asset-08.webp',
    imageWidth: 1376, imageHeight: 768,
    overview: [
      'We are seeking a senior Backend Engineer with experience designing scalable distributed microservices, transactional databases, and resilient APIs.',
      'You will own core data architecture from schema design and concurrency controls to caching strategies and cloud deployment.',
      'You will work on systems handling financial transactions, real-time telemetry, and high-velocity database writes with strict availability requirements.'
    ],
    responsibilities: [
      'Design and operate concurrent microservices written in Go and Node.js',
      'Model relational databases in PostgreSQL with strict normalization and query indexing',
      'Implement idempotent background workers and event streams using Redis and Kafka',
      'Author clean OpenAPI specifications and automated integration test suites',
      'Monitor production latency, database connection pools, and service metrics'
    ],
    requirements: [
      '4+ years of backend engineering experience with Go, Python, or Node.js',
      'Deep relational database knowledge (PostgreSQL indexes, query plans, locks, transactions)',
      'Proven experience building REST or gRPC APIs with authentication and rate limiting',
      'Familiarity with containerization (Docker) and message queue architectures'
    ],
    benefits: [
      'Above-market compensation package',
      'Generous paid time off and flexible scheduling',
      'High ownership in architectural decision-making',
      'Annual technical learning stipend'
    ],
    interviewProcess: [
      'Initial call with Founder / Technical Lead (30 min)',
      'System design and database modeling deep-dive (60 min)',
      'Team conversation on engineering practices and culture',
      'Formal offer'
    ],
    faq: [
      { q: 'What databases does Evolvia use most frequently?', a: 'We use PostgreSQL as our primary relational database, supplemented by Redis for in-memory caching and vector search.' }
    ],
    relatedIds: ['fullstack', 'devops']
  },
  {
    id: 'fullstack',
    position: 'Full Stack Developer',
    title: 'Full Stack Developer',
    department: 'Product Systems',
    location: 'Maninagar, Ahmedabad (Hybrid) or Remote',
    type: 'Full-time',
    experience: '3+ years',
    tagline: 'Ship complete features from database schemas to polished reactive interfaces.',
    points: ['Own features from data to interface', 'Connect APIs with product experiences', 'Make thoughtful architecture decisions'],
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    image: '/asset-07.webp',
    imageWidth: 1376, imageHeight: 768,
    overview: [
      'We are looking for a versatile Full Stack Developer who enjoys working across the entire stack — shaping database tables in the morning and polishing CSS interactions in the afternoon.',
      'You will work directly with clients and founders to deliver complete product milestones autonomously.',
      'This role is ideal for engineers who love shipping useful features end-to-end without getting bottlenecked by team handoffs.'
    ],
    responsibilities: [
      'Develop end-to-end features across React interfaces and Node.js backend services',
      'Design clean PostgreSQL relational schemas and write efficient query migrations',
      'Implement authenticated API endpoints with input validation and security tests',
      'Participate in design reviews and ensure high visual and interaction fidelity'
    ],
    requirements: [
      '3+ years of full-stack JavaScript / TypeScript engineering experience',
      'Proficiency with React and modern backend frameworks (Express, Fastify, Next.js)',
      'Solid understanding of SQL databases, schema migrations, and REST APIs',
      'Pragmatic problem solver with strong written communication skills'
    ],
    benefits: [
      'Competitive compensation and performance bonuses',
      'Remote-first working culture',
      'Comprehensive equipment and workstation stipend',
      'Clear career progression paths'
    ],
    interviewProcess: [
      'Introductory discussion (30 min)',
      'Technical walk-through of past projects (45 min)',
      'Collaborative problem-solving session (45 min)',
      'Offer discussion'
    ],
    faq: [
      { q: 'What is the balance between frontend and backend work?', a: 'Typically 60/40 or 50/50 depending on the current sprint milestone.' }
    ],
    relatedIds: ['frontend', 'backend']
  },
  {
    id: 'ai-engineer',
    position: 'AI Engineer',
    title: 'AI Engineer',
    department: 'Applied Intelligence',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    tagline: 'Build grounded LLM architectures, vector retrieval pipelines, and autonomous agents.',
    points: ['Build dependable AI workflows', 'Improve retrieval and evaluation quality', 'Deploy models into production'],
    skills: ['Python', 'PyTorch', 'LangChain', 'Vector DBs', 'FastAPI'],
    image: '/asset-10.webp',
    imageWidth: 1376, imageHeight: 768,
    overview: [
      'We are looking for an Applied AI Engineer who understands how to transform generative models into reliable, deterministic enterprise software.',
      'You will build semantic retrieval systems, fine-tune domain prompts, and engineer agentic tool-calling workflows that operate within strict latency and cost constraints.',
      'You will be at the forefront of designing production safeguards against model hallucinations.'
    ],
    responsibilities: [
      'Architect scalable Retrieval-Augmented Generation (RAG) pipelines in Python',
      'Deploy vector embedding indexing and hybrid search infrastructure',
      'Implement multi-agent workflows using LangChain and native provider APIs',
      'Develop automated benchmark suites to continuously evaluate model response accuracy',
      'Build low-latency FastAPI inference microservices'
    ],
    requirements: [
      '3+ years of software engineering experience with strong Python proficiency',
      'Hands-on experience deploying LLM applications, RAG pipelines, and vector databases',
      'Familiarity with embedding models, tokenization, and context window optimization',
      'Solid understanding of asynchronous APIs and microservice architecture'
    ],
    benefits: [
      'Top-tier competitive compensation',
      'Fully remote environment',
      'Access to state-of-the-art compute, GPU resources, and API credits',
      'Continuous learning budget for AI research and courses'
    ],
    interviewProcess: [
      'Initial discussion with Lead AI Architect (30 min)',
      'Technical discussion on RAG architectures and prompt evaluation (60 min)',
      'Team alignment call',
      'Offer'
    ],
    faq: [
      { q: 'Are we training foundational models or focusing on applied AI?', a: 'We focus on applied AI: grounding foundational models in proprietary data, building agentic pipelines, and optimizing inference.' }
    ],
    relatedIds: ['backend', 'fullstack']
  },
  {
    id: 'ui-ux',
    position: 'UI/UX Designer',
    title: 'UI/UX Designer',
    department: 'Product Design',
    location: 'Maninagar, Ahmedabad (Hybrid) or Remote',
    type: 'Full-time',
    experience: '2+ years',
    tagline: 'Design calm, accessible product design systems and tactile web experiences.',
    points: ['Design clear product systems', 'Prototype useful interaction patterns', 'Partner closely with engineers'],
    skills: ['Figma', 'Design Systems', 'Prototyping', 'Accessibility'],
    image: '/asset-11.webp',
    imageWidth: 1376, imageHeight: 768,
    overview: [
      'We are seeking a thoughtful UI/UX Designer who loves crafting cohesive design systems, clean typographic hierarchies, and intuitive product workflows.',
      'You will collaborate directly with our Creative Director and engineering teams to produce production-grade designs.',
      'We appreciate designers who understand how design decisions translate into CSS layout and DOM performance.'
    ],
    responsibilities: [
      'Design user flows, wireframes, and high-fidelity screens in Figma',
      'Maintain comprehensive design systems with tokens and auto-layout variants',
      'Create interactive prototypes to test workflows with stakeholders',
      'Conduct accessibility reviews ensuring compliance with WCAG standards'
    ],
    requirements: [
      '2+ years of professional product design experience for web or mobile software',
      'Mastery of Figma (auto-layout, components, variables, interactive prototyping)',
      'Strong portfolio demonstrating typography discipline, hierarchy, and system thinking',
      'Basic understanding of web technologies (HTML/CSS) is a strong plus'
    ],
    benefits: [
      'Competitive salary and growth opportunities',
      'Modern design tooling licenses (Figma, prototyping software)',
      'Flexible working hours and remote flexibility',
      'Health and wellness benefits'
    ],
    interviewProcess: [
      'Portfolio review discussion (30 min)',
      'Design critique and workflow discussion (45 min)',
      'Culture and values conversation',
      'Offer'
    ],
    faq: [
      { q: 'Is coding required for this role?', a: 'Coding is not required, but understanding how CSS layout works will make collaborating with our frontend engineers effortless.' }
    ],
    relatedIds: ['frontend']
  },
  {
    id: 'devops',
    position: 'DevOps Engineer',
    title: 'DevOps Engineer',
    department: 'Cloud Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    tagline: 'Automate deployments, operate resilient Kubernetes clusters, and scale cloud infrastructure.',
    points: ['Operate reliable cloud infrastructure', 'Automate deployments and environments', 'Improve observability and incident response'],
    skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Docker'],
    image: '/asset-23.webp',
    imageWidth: 1376, imageHeight: 768,
    overview: [
      'We are looking for a DevOps / Platform Engineer to lead infrastructure automation, deployment security, and cloud scalability for our systems.',
      'You will automate environments using Terraform, manage containerized workloads on Kubernetes, and build rapid CI/CD deployment pipelines.',
      'You will safeguard infrastructure uptime, configure observability dashboards, and eliminate manual operational bottlenecks.'
    ],
    responsibilities: [
      'Author and maintain Infrastructure-as-Code modules using Terraform',
      'Manage multi-cluster Kubernetes deployments on AWS and Google Cloud',
      'Build fast, secure CI/CD pipelines with automated test and security gating',
      'Configure centralized Prometheus, Grafana, and alert routing pipelines',
      'Perform cloud security audits, disaster recovery tests, and cost optimization'
    ],
    requirements: [
      '4+ years of professional experience managing cloud infrastructure on AWS or GCP',
      'Hands-on expertise with Kubernetes, Docker, and Helm',
      'Proficiency in Terraform for declarative infrastructure management',
      'Strong knowledge of Linux networking, DNS, SSL, and security principles'
    ],
    benefits: [
      'Competitive compensation package',
      '100% remote flexibility',
      'Comprehensive equipment stipend',
      'Paid cloud certification and training opportunities'
    ],
    interviewProcess: [
      'Introductory call (30 min)',
      'Infrastructure architecture discussion (60 min)',
      'Team alignment conversation',
      'Offer'
    ],
    faq: [
      { q: 'What clouds do we support?', a: 'Primarily AWS and Google Cloud Platform, using Terraform to keep configurations repeatable.' }
    ],
    relatedIds: ['backend']
  }
];

export const benefits = [
  { title: 'Remote-first', points: ['Work from your best location', 'Collaborate across time zones with async clarity'] },
  { title: 'Competitive pay', points: ['Earn above-market compensation', 'Transparent, milestone-based evaluations'] },
  { title: 'Real ownership', points: ['Ship meaningful decisions in small teams', 'Direct influence on architecture and product'] },
  { title: 'Learning budget', points: ['Dedicated annual budget for books, courses, and conferences', 'Weekly engineering knowledge shares'] },
  { title: 'Equipment budget', points: ['Workstation stipend for monitors, chair, and laptop', 'Tools of your choice provided'] },
  { title: 'No crunch culture', points: ['Sustainable working hours with deliberate planning', 'Respect for personal time and focus'] },
];

export const contactPerks = [
  'Work directly with engineering founders',
  'Sign NDAs within one business day',
  'Plan delivery with fixed milestones',
];
