// Service catalogue and detail content.
export const services = [
  {
    "id": "web",
    "number": "01",
    "title": "Web Development",
    "shortTitle": "Web",
    "category": "Full-Stack Engineering",
    "tagline": "Fast, search-friendly React and Next.js applications engineered for scale.",
    "points": [
      "Fast React and Next.js apps",
      "Secure APIs and databases",
      "SEO-ready and mobile-first"
    ],
    "tags": [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "GraphQL"
    ],
    "technologies": [
      "react",
      "next-js",
      "node-js",
      "graphql",
      "postgresql"
    ],
    "icon": "code",
    "image": "/asset-07.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "stat": "40+ launched products",
    "overview": [
      "We build responsive, search-friendly web applications that prioritize render performance, resilient API boundaries, and clear developer ergonomics. Every web project begins with a careful evaluation of business domain requirements and user traffic expectations.",
      "Our engineering approach pairs modern React and Next.js component architectures with robust server-side runtimes like Node.js and Go. We emphasize type safety, automated tests, and accessible interaction patterns.",
      "From custom customer dashboards to high-throughput content platforms, we build systems designed for long-term maintainability without bloated dependencies."
    ],
    "included": [
      "Full-stack architecture and schema design",
      "Production React / Next.js implementation with SSR and static caching",
      "Secure REST & GraphQL API endpoints",
      "Relational and document database integration (PostgreSQL / MongoDB)",
      "Lighthouse performance and accessibility auditing (90+ standard)",
      "CI/CD automated deployment and production telemetry"
    ],
    "workflow": [
      {
        "step": "01",
        "title": "Technical Discovery",
        "desc": "Map core data models, identify API integrations, and establish latency budgets."
      },
      {
        "step": "02",
        "title": "System Architecture",
        "desc": "Design scalable component contracts, database schemas, and state management rules."
      },
      {
        "step": "03",
        "title": "Iterative Sprints",
        "desc": "Bi-weekly deployable increments with verified milestone deliverables and code reviews."
      },
      {
        "step": "04",
        "title": "Hardening & Launch",
        "desc": "Perform security scans, accessibility checks, edge caching configuration, and operational handover."
      }
    ],
    "projectsUsed": [
      "finora",
      "urbanx"
    ],
    "faq": [
      {
        "q": "Which rendering strategy do you recommend for web apps?",
        "a": "We evaluate your content dynamics: dynamic user portals typically use server-side rendering (SSR) or incremental static regeneration (ISR) in Next.js, while authenticated dashboards benefit from fast client-side rendering with edge caching."
      },
      {
        "q": "How do you ensure web performance and SEO?",
        "a": "We enforce strict bundle budgets, eliminate unused CSS, compress images to modern WebP formats, and verify Core Web Vitals on every release."
      },
      {
        "q": "Do you provide full documentation and code handover?",
        "a": "Yes. Every project includes repository documentation, environment variable specifications, OpenAPI schemas, and full intellectual property transfer."
      }
    ],
    "relatedIds": [
      "cloud",
      "design",
      "software"
    ]
  },
  {
    "id": "mobile",
    "number": "02",
    "title": "Mobile App Development",
    "shortTitle": "Mobile",
    "category": "Native & Cross-Platform",
    "tagline": "High-performance iOS and Android applications with offline-first reliability.",
    "points": [
      "Build fluid iOS and Android apps",
      "Support offline-first experiences",
      "Optimize speed and battery"
    ],
    "tags": [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "Firebase"
    ],
    "technologies": [
      "react-native",
      "flutter",
      "swift",
      "android",
      "firebase"
    ],
    "icon": "mobile",
    "image": "/asset-03.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "stat": "15+ shipped apps",
    "overview": [
      "We engineer native and cross-platform mobile experiences that feel responsive, look refined, and handle erratic network conditions gracefully.",
      "Using React Native and Flutter, we deliver unified single-codebase solutions without sacrificing platform-specific UX fidelity, camera integrations, or background synchronization capabilities.",
      "Our mobile builds feature rigorous memory management, minimal cold-start times, and persistent offline caches designed for real-world constraints."
    ],
    "included": [
      "Cross-platform React Native or Flutter architecture",
      "Native Swift (iOS) and Kotlin (Android) modules when required",
      "Offline-first data persistence and conflict resolution",
      "Push notification orchestration and deep-linking pipelines",
      "Automated App Store and Google Play release pipelines",
      "Crash analytics and real-time session observability"
    ],
    "workflow": [
      {
        "step": "01",
        "title": "Mobile Strategy",
        "desc": "Define device target profiles, offline state rules, and native hardware requirements."
      },
      {
        "step": "02",
        "title": "Interactive Prototype",
        "desc": "Validate gestures, screen transitions, and ergonomic reachability on physical test devices."
      },
      {
        "step": "03",
        "title": "Core Implementation",
        "desc": "Build reactive UI screens, background sync workers, and state management."
      },
      {
        "step": "04",
        "title": "Store Certification",
        "desc": "Verify app guidelines compliance, configure certificates, and publish to app marketplaces."
      }
    ],
    "projectsUsed": [
      "urbanx",
      "finora"
    ],
    "faq": [
      {
        "q": "Should we choose React Native or native development?",
        "a": "For most product teams, React Native or Flutter delivers 95% code sharing and fast feature iteration without noticeable performance loss. For hardware-heavy workloads, we write custom native Swift/Kotlin modules."
      },
      {
        "q": "How are offline capabilities implemented?",
        "a": "We use local encrypted storage (SQLite/WatermelonDB) to cache reads and queue mutations locally, syncing with backend services as soon as connectivity restores."
      }
    ],
    "relatedIds": [
      "web",
      "design",
      "software"
    ]
  },
  {
    "id": "ai",
    "number": "03",
    "title": "AI & Automation",
    "shortTitle": "AI",
    "category": "Intelligent Systems",
    "tagline": "Production-ready AI workflows, grounded retrieval pipelines, and autonomous agents.",
    "points": [
      "Automate repetitive business workflows",
      "Build reliable AI agents",
      "Connect models with business data"
    ],
    "tags": [
      "PyTorch",
      "OpenAI",
      "LangChain",
      "Python",
      "FastAPI"
    ],
    "technologies": [
      "python",
      "openai",
      "langchain",
      "rag-systems",
      "fastapi"
    ],
    "icon": "ai",
    "image": "/asset-17.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "stat": "10+ AI systems in production",
    "overview": [
      "We take machine learning models out of the laboratory and place them safely into operational production. Our applied AI systems ground language models in private enterprise data to eliminate hallucinations.",
      "We design multi-step agent workflows, retrieval-augmented generation (RAG) architectures, and automated data extraction pipelines with built-in auditability.",
      "Every AI integration includes fallback logic, token budget controls, and human-in-the-loop escalation paths to ensure organizational trust."
    ],
    "included": [
      "Retrieval-Augmented Generation (RAG) vector pipelines",
      "Context-aware conversational AI and support bots",
      "Automated document extraction and semantic search",
      "Model routing across OpenAI, Claude, and Gemini",
      "Hallucination prevention guardrails and evaluation metrics",
      "Python/FastAPI inference microservices with latency budgets"
    ],
    "workflow": [
      {
        "step": "01",
        "title": "Data & Feasibility Audit",
        "desc": "Review source documents, data sanitation needs, and define acceptable accuracy thresholds."
      },
      {
        "step": "02",
        "title": "Retrieval & RAG Setup",
        "desc": "Chunk and embed knowledge bases into high-throughput vector indices with metadata filters."
      },
      {
        "step": "03",
        "title": "Prompt & Agent Pipeline",
        "desc": "Engineer deterministic prompts, tool-calling interfaces, and fallback safety layers."
      },
      {
        "step": "04",
        "title": "Production Hardening",
        "desc": "Monitor drift, latency, token expenditures, and human-in-the-loop review rates."
      }
    ],
    "projectsUsed": [
      "nexa-ai"
    ],
    "faq": [
      {
        "q": "How do you prevent AI models from hallucinating?",
        "a": "We restrict model outputs strictly to relevant retrieved source passages (RAG), supply explicit boundary instructions, and add verification checks before responses are rendered to users."
      },
      {
        "q": "Is our proprietary business data sent to public model training sets?",
        "a": "No. We configure enterprise APIs and zero-retention policies so your business documents and queries are never used for model training."
      }
    ],
    "relatedIds": [
      "software",
      "cloud",
      "web"
    ]
  },
  {
    "id": "cloud",
    "number": "04",
    "title": "Cloud & DevOps",
    "shortTitle": "Cloud",
    "category": "Platform Architecture",
    "tagline": "Resilient cloud infrastructure, automated CI/CD pipelines, and cost-controlled hosting.",
    "points": [
      "Design resilient cloud architecture",
      "Automate deployment and operations",
      "Monitor performance and reliability"
    ],
    "tags": [
      "AWS",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform"
    ],
    "technologies": [
      "aws",
      "google-cloud",
      "docker",
      "kubernetes",
      "terraform"
    ],
    "icon": "cloud",
    "image": "/asset-21.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "stat": "99.9% availability SLA delivered",
    "overview": [
      "We design, provision, and maintain fault-tolerant cloud platforms that allow engineering teams to ship code repeatedly with zero downtime.",
      "Using Terraform infrastructure-as-code, Docker containers, and managed Kubernetes, we establish reproducible hosting environments across AWS and Google Cloud.",
      "We treat cloud infrastructure economics as a key product constraint, auditing wasteful over-provisioning to lower recurring hosting bills."
    ],
    "included": [
      "Terraform Infrastructure-as-Code (IaC) configuration",
      "Docker containerization and Kubernetes cluster management",
      "Zero-downtime blue/green automated CI/CD deployment pipelines",
      "Prometheus and Grafana telemetry, log aggregation, and alert routing",
      "VPC networking, IAM security hardening, and SSL certificate automation",
      "Cloud cost engineering and rightsizing analysis"
    ],
    "workflow": [
      {
        "step": "01",
        "title": "Architecture Review",
        "desc": "Assess current workload constraints, single points of failure, and recovery objectives."
      },
      {
        "step": "02",
        "title": "Declarative Provisioning",
        "desc": "Codify infrastructure with Terraform to guarantee repeatable environments."
      },
      {
        "step": "03",
        "title": "Pipeline Automation",
        "desc": "Automate GitHub Actions pipelines with linting, security scans, and preview deployments."
      },
      {
        "step": "04",
        "title": "Observability & SLA",
        "desc": "Deploy structured metrics dashboards, error alerts, and automated backup routines."
      }
    ],
    "projectsUsed": [
      "cloudcore",
      "nexa-ai"
    ],
    "faq": [
      {
        "q": "Which cloud provider do you recommend?",
        "a": "We recommend AWS or Google Cloud depending on your team’s existing tooling and compliance needs. We design containerized workloads so you are never locked into a single vendor."
      },
      {
        "q": "Can you help us lower our cloud hosting expenses?",
        "a": "Yes. Through automated autoscaling, database connection pooling, and storage lifecycle policies, we routinely reduce client cloud bills by 30-50%."
      }
    ],
    "relatedIds": [
      "software",
      "web",
      "ai"
    ]
  },
  {
    "id": "design",
    "number": "05",
    "title": "UI/UX Engineering",
    "shortTitle": "Design",
    "category": "Design Systems & Motion",
    "tagline": "Accessible design systems, high-fidelity prototypes, and cohesive digital aesthetics.",
    "points": [
      "Design accessible product systems",
      "Prototype useful interactions",
      "Ship precise responsive interfaces"
    ],
    "tags": [
      "Figma",
      "Design Systems",
      "Prototyping",
      "GSAP",
      "Accessibility"
    ],
    "technologies": [
      "figma",
      "gsap",
      "html5",
      "css3",
      "react"
    ],
    "icon": "design",
    "image": "/asset-18.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "stat": "Design systems used by 5+ companies",
    "overview": [
      "We unite interface aesthetics with technical feasibility. We craft design systems in Figma and translate them directly into production code with pixel-level precision.",
      "Our UI/UX process avoids superficial decoration; instead, we prioritize user task clarity, cognitive load reduction, and seamless keyboard and screen-reader accessibility.",
      "From motion choreography to comprehensive component libraries, we help ambitious products stand out with cohesive visual confidence."
    ],
    "included": [
      "Design tokens and typography scales",
      "Comprehensive Figma component libraries and variant states",
      "High-fidelity clickable interaction prototypes",
      "WCAG 2.1 AA accessibility auditing and keyboard navigation",
      "Production CSS/React implementation and motion design",
      "Usability research and user journey optimization"
    ],
    "workflow": [
      {
        "step": "01",
        "title": "UX Research & Flows",
        "desc": "Map core user workflows, error states, and information hierarchy."
      },
      {
        "step": "02",
        "title": "Design System Tokens",
        "desc": "Establish semantic color tokens, typography scales, and responsive grid rules."
      },
      {
        "step": "03",
        "title": "Component Library",
        "desc": "Build accessible, reusable UI components with dark and light state variants."
      },
      {
        "step": "04",
        "title": "Engineering Handoff",
        "desc": "Directly implement production CSS and component interfaces alongside frontend teams."
      }
    ],
    "projectsUsed": [
      "urbanx",
      "finora"
    ],
    "faq": [
      {
        "q": "Do you deliver only Figma files or working code as well?",
        "a": "Both. Our designers are also engineers, so we deliver comprehensive Figma libraries and production-ready React components with clean CSS tokens."
      }
    ],
    "relatedIds": [
      "web",
      "mobile",
      "software"
    ]
  },
  {
    "id": "software",
    "number": "06",
    "title": "Custom Software",
    "shortTitle": "Software",
    "category": "Enterprise Solutions",
    "tagline": "Bespoke backend architectures, legacy modernization, and distributed microservices.",
    "points": [
      "Model complex business workflows",
      "Modernize critical legacy systems",
      "Integrate your existing platforms"
    ],
    "tags": [
      "Go",
      "Python",
      "PostgreSQL",
      "Redis",
      "Kafka"
    ],
    "technologies": [
      "go",
      "python",
      "postgresql",
      "redis",
      "apache-kafka"
    ],
    "icon": "software",
    "image": "/asset-05.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "stat": "Complex systems, real constraints",
    "overview": [
      "Off-the-shelf software rarely handles unique operational business rules. We design custom software systems around your exact data models, regulatory mandates, and scalability requirements.",
      "We write concurrent backend services in Go and Python, architect relational databases in PostgreSQL, and decouple asynchronous pipelines with Apache Kafka.",
      "We specialize in legacy modernization — replacing fragile legacy codebases incrementally without requiring risky, big-bang system rewrites."
    ],
    "included": [
      "Enterprise domain modeling and business logic architecture",
      "Concurrent, compiled backend services (Go / Python)",
      "Relational database modeling with strict ACID guarantees",
      "Asynchronous event queues and caching (Kafka / Redis)",
      "Legacy system modernization and data migration pipelines",
      "Comprehensive integration testing and API contracts"
    ],
    "workflow": [
      {
        "step": "01",
        "title": "Domain Modeling",
        "desc": "Document existing data silos, transactional boundaries, and throughput bottlenecks."
      },
      {
        "step": "02",
        "title": "Service Isolation",
        "desc": "Carve out modular service boundaries with typed interfaces and backward-compatible schemas."
      },
      {
        "step": "03",
        "title": "Incremental Build",
        "desc": "Deliver production-tested services alongside legacy platforms via reverse proxies."
      },
      {
        "step": "04",
        "title": "Safe Cutover",
        "desc": "Execute zero-downtime database migrations with automated rollback procedures."
      }
    ],
    "projectsUsed": [
      "finora",
      "cloudcore",
      "nexa-ai"
    ],
    "faq": [
      {
        "q": "How do you handle migrating live databases?",
        "a": "We employ dual-write and phased reconciliation strategies to verify data consistency before switching primary traffic, eliminating downtime and data loss risk."
      }
    ],
    "relatedIds": [
      "cloud",
      "web",
      "ai"
    ]
  },
  {
    "id": "ai-chatbots",
    "title": "AI Chatbots & Conversational AI",
    "shortTitle": "Chatbots",
    "category": "Intelligent Systems",
    "tagline": "Context-aware conversational assistants connected to live business data.",
    "points": [
      "Answer customer questions instantly",
      "Qualify leads around the clock",
      "Escalate complex requests smoothly"
    ],
    "tags": [
      "OpenAI",
      "LangChain",
      "React",
      "FastAPI"
    ],
    "technologies": [
      "openai",
      "langchain",
      "react",
      "fastapi"
    ],
    "icon": "chat",
    "image": "/asset-25.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "overview": [
      "Customer support teams shouldn’t be bogged down by repetitive inquiries. We build intelligent conversational agents that understand customer intent and provide accurate, verified answers 24/7.",
      "Our conversational systems integrate directly with your product databases, ticketing tools, and CRM platforms to answer queries with real-time operational context.",
      "When an issue requires human empathy or complex judgment, our bots automatically escalate the conversation to the right team member with full conversation summaries."
    ],
    "included": [
      "Conversational AI agent development and persona configuration",
      "Integration with CRM, Zendesk, Slack, or internal databases",
      "Multi-channel widget deployment (web, mobile, WhatsApp)",
      "Graceful human-in-the-loop escalation routing",
      "Sentiment analysis and conversation analytics dashboard"
    ],
    "workflow": [
      {
        "step": "01",
        "title": "Intent Mapping",
        "desc": "Identify top recurring customer queries and define escalation criteria."
      },
      {
        "step": "02",
        "title": "Knowledge Integration",
        "desc": "Connect internal documentation and APIs with strict response boundaries."
      },
      {
        "step": "03",
        "title": "Interface Deployment",
        "desc": "Deploy accessible chat interfaces tailored to your brand styling."
      },
      {
        "step": "04",
        "title": "Feedback Tuning",
        "desc": "Continuously evaluate answer ratings and refine prompt guardrails."
      }
    ],
    "projectsUsed": [
      "nexa-ai"
    ],
    "faq": [
      {
        "q": "Can the chatbot book appointments or initiate orders?",
        "a": "Yes. Using function-calling APIs, the chatbot can securely execute pre-approved workflows like checking order status or creating calendar reservations."
      }
    ],
    "relatedIds": [
      "ai",
      "document-qa-rag",
      "workflow-automation"
    ]
  },
  {
    "id": "document-qa-rag",
    "title": "Document Q&A (RAG Pipelines)",
    "shortTitle": "RAG Q&A",
    "category": "Intelligent Systems",
    "tagline": "Semantic search and verifiable document question-answering for private knowledge.",
    "points": [
      "Ask questions across trusted documents",
      "Cite relevant source passages",
      "Keep private knowledge searchable"
    ],
    "tags": [
      "RAG",
      "Python",
      "PostgreSQL",
      "LangChain"
    ],
    "technologies": [
      "rag-systems",
      "python",
      "postgresql",
      "langchain"
    ],
    "icon": "document",
    "image": "/asset-06.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "overview": [
      "Unstructured enterprise knowledge locked in PDFs, internal wikis, and technical manuals is difficult to search with keyword queries. We build semantic Retrieval-Augmented Generation (RAG) platforms that let team members query thousands of documents conversationally.",
      "Every answer generated by our RAG systems cites exact source document chapters and page numbers, enabling instant human verification.",
      "We operate on self-hosted or private vector databases, ensuring private business policies, intellectual property, and medical/legal records remain confidential."
    ],
    "included": [
      "Multi-format ingestion pipeline (PDF, Markdown, DOCX, Notion)",
      "High-dimensional vector embeddings with hybrid keyword search",
      "Strict source citation and attribution engine",
      "Access control and role-based document segmentation",
      "Continuous answer quality evaluation and relevancy tracking"
    ],
    "workflow": [
      {
        "step": "01",
        "title": "Document Parsing",
        "desc": "Extract clean text, tables, and metadata from heterogeneous document formats."
      },
      {
        "step": "02",
        "title": "Vector Indexing",
        "desc": "Chunk documents by semantic units and index them with high-accuracy embeddings."
      },
      {
        "step": "03",
        "title": "Hybrid Retrieval",
        "desc": "Combine BM25 keyword matching with vector cosine similarity for optimal recall."
      },
      {
        "step": "04",
        "title": "Citation Output",
        "desc": "Return answers with verifiable snippets, links, and confidence scores."
      }
    ],
    "projectsUsed": [
      "nexa-ai"
    ],
    "faq": [
      {
        "q": "How does RAG differ from standard ChatGPT?",
        "a": "Standard models only know their static training data and hallucinate when they lack information. RAG injects your actual, current documents into the context window, forcing the model to ground its response exclusively on your verified material."
      }
    ],
    "relatedIds": [
      "ai",
      "ai-chatbots",
      "workflow-automation"
    ]
  },
  {
    "id": "workflow-automation",
    "title": "AI Workflow Automation",
    "shortTitle": "Automation",
    "category": "Intelligent Systems",
    "tagline": "Connect business tools and automate recurring operational handoffs with intelligent agents.",
    "points": [
      "Automate email and CRM updates",
      "Generate recurring business reports",
      "Connect tools without manual handoffs"
    ],
    "tags": [
      "Python",
      "OpenAI",
      "Node.js",
      "FastAPI"
    ],
    "technologies": [
      "python",
      "openai",
      "node-js",
      "fastapi"
    ],
    "icon": "workflow",
    "image": "/asset-12.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "overview": [
      "Repetitive copy-pasting between spreadsheets, CRMs, and email inboxes slows high-performing teams down. We engineer deterministic workflow automations augmented with lightweight AI reasoning.",
      "Our automations ingest incoming data, summarize or categorize items, update backend databases, and dispatch appropriate notifications without human friction.",
      "We build with comprehensive audit logging, retry queues, and notification webhooks so operations teams remain in full control of every automated step."
    ],
    "included": [
      "Multi-system API webhook orchestration",
      "Intelligent document and receipt data extraction",
      "Automated email draft generation and CRM pipeline progression",
      "Audit log telemetry and error alerting via Slack / email",
      "Self-healing retry queues for transient third-party API outages"
    ],
    "workflow": [
      {
        "step": "01",
        "title": "Process Audit",
        "desc": "Identify manual handoffs that consume the highest team hours each week."
      },
      {
        "step": "02",
        "title": "Contract Definition",
        "desc": "Specify payload schemas and exception-handling fallback states."
      },
      {
        "step": "03",
        "title": "Agent Integration",
        "desc": "Implement automated workers with rate limiting and verification logic."
      },
      {
        "step": "04",
        "title": "Pilot & Handover",
        "desc": "Run shadow tests alongside manual teams to confirm zero data errors before full switch."
      }
    ],
    "projectsUsed": [
      "finora",
      "nexa-ai"
    ],
    "faq": [
      {
        "q": "What happens if a third-party service is down?",
        "a": "Our worker pipelines use persistent message queues (Redis/Kafka) with exponential backoff retries, ensuring no task is ever dropped."
      }
    ],
    "relatedIds": [
      "ai",
      "software",
      "cloud"
    ]
  }
];

export const aiServices = services.filter((s) => s.category === 'Intelligent Systems' || s.tags.includes('OpenAI'));
export { services as SERVICES_DATA };
