// Portfolio projects and case study content.
export const projects = [
  {
    "id": "nexa-ai",
    "index": "01",
    "title": "Nexa AI",
    "category": "AI Platform",
    "year": "2026",
    "points": [
      "Route requests across model providers",
      "Ground results in relevant context",
      "Keep model decisions reviewable"
    ],
    "shortDescription": "A modular AI workspace that routes requests through retrieval and multi-model inference pipelines.",
    "technologies": [
      "python",
      "next-js",
      "fastapi",
      "redis",
      "aws"
    ],
    "image": "/asset-17.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "metric": "Design focus · responsive inference",
    "artwork": "layers",
    "featured": true,
    "challenge": "Enterprises deploying large language models faced unacceptable latency when querying deep knowledge bases, high costs from single-provider lock-in, and compliance risks due to untraceable model hallucinations.",
    "solution": "We engineered a modular AI inference workspace. The system decouples retrieval from generative inference, routes requests dynamically across provider models based on latency and cost, and verifies every answer against grounding documents.",
    "features": [
      "Dynamic multi-model routing across OpenAI, Claude, and Gemini",
      "Grounded retrieval pipeline with vector similarity and citation highlights",
      "Operational audit trails showing prompt inputs, retrieved chunks, and token expenditures",
      "Human-in-the-loop review queues for sensitive or low-confidence inferences"
    ],
    "architecture": [
      "React frontend with streaming token rendering and responsive chat ergonomics",
      "FastAPI async orchestration service for model load balancing and safety filtering",
      "Redis vector cache for sub-20ms semantic similarity search across warm queries",
      "AWS ECS containerized execution with automated autoscaling"
    ],
    "developmentProcess": [
      "Mapped distinct user analysis tasks and established sub-2s latency budgets",
      "Benchmarked embedding models on proprietary enterprise corpora",
      "Built automated evaluation test suites to continuously verify grounding accuracy",
      "Hardened service boundaries with rate limiting and VPC security controls"
    ],
    "results": [
      "Inference request latency budgets met with 99th percentile consistency",
      "Traceable source citations displayed on 100% of generated responses",
      "Flexible provider failover eliminated dependency on any single AI API outage"
    ],
    "metrics": [
      "Latency budget defined and maintained",
      "Evaluation test coverage tracked across all system prompts",
      "Model decisions inspectable in structured JSON audit trails"
    ],
    "timeline": "Illustrative 12-week delivery plan",
    "teamSize": "Cross-functional engineering team (3 engineers, 1 designer)",
    "industry": "Applied AI & Enterprise Productivity",
    "services": [
      "ai",
      "software",
      "cloud"
    ],
    "lessons": [
      "Design systematic evaluation test suites before deploying language models to users",
      "Keep retrieval logic clean and inspectable to quickly debug semantic drift",
      "Incorporate human review workflows into the core product architecture from day one"
    ],
    "testimonial": {
      "quote": "The architectural clarity and speed of delivery allowed us to roll out dependable AI workflows without risk.",
      "author": "Technical Leadership",
      "role": "TODO: replace with real client testimonial"
    },
    "gallery": [
      "/asset-17.webp",
      "/asset-06.webp",
      "/asset-10.webp"
    ],
    "relatedIds": [
      "finora",
      "cloudcore",
      "urbanx"
    ]
  },
  {
    "id": "finora",
    "index": "02",
    "title": "Finora",
    "category": "FinTech",
    "year": "2026",
    "points": [
      "Coordinate cross-border payment flows",
      "Surface settlement and review status",
      "Keep transaction history traceable"
    ],
    "shortDescription": "A multi-currency payment operations workspace that organizes settlement status and compliance review.",
    "technologies": [
      "react",
      "node-js",
      "postgresql",
      "docker",
      "stripe"
    ],
    "image": "/asset-22.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "metric": "Concept focus · payment operations",
    "artwork": "payment",
    "featured": true,
    "challenge": "Cross-border merchant payouts suffered from fragmented status notifications, delayed error reporting, and complex multi-jurisdiction reporting overhead.",
    "solution": "We engineered a centralized payment operations platform that tracks lifecycle events across multiple payment rails, visualizes settlement states in real time, and unifies compliance reporting in a single interface.",
    "features": [
      "Unified payment status dashboard with filterable ledger events",
      "Automated reconciliation pipelines with Stripe Connect and regional banking APIs",
      "Granular exception queues for flagged payments with manual clearance tooling",
      "Immutable transactional audit logs backed by PostgreSQL ACID transactions"
    ],
    "architecture": [
      "React interface optimized for dense numerical readability and fast keyboard shortcuts",
      "Node.js microservices handling transaction webhooks and state transitions",
      "PostgreSQL database with strict row-level security and read replicas for reporting",
      "Dockerized deployment architecture with automated staging environments"
    ],
    "developmentProcess": [
      "Modeled payment lifecycle states and defined idempotent webhook handlers",
      "Designed exception workflows to prevent stuck transactions during gateway timeouts",
      "Conducted security audits including secret rotation and OWASP compliance verification"
    ],
    "results": [
      "Payment states mapped consistently across disparate payment gateways",
      "Zero double-charges due to strictly enforced idempotency keys",
      "Full compliance audit trail exports generated in under two seconds"
    ],
    "metrics": [
      "100% idempotent transaction lifecycle states modeled",
      "Operational exception queues surfaced in unified UI",
      "Strict audit trails maintained for all financial events"
    ],
    "timeline": "Illustrative 16-week delivery plan",
    "teamSize": "Cross-functional engineering team (4 engineers, 1 architect)",
    "industry": "Financial Technology & Payments",
    "services": [
      "web",
      "software"
    ],
    "lessons": [
      "Treat transaction exceptions as first-class states rather than errors",
      "Keep financial ledgers append-only to preserve auditable history",
      "Separate presentation layers from critical payment reconciliation engines"
    ],
    "testimonial": {
      "quote": "Our team was able to reason about complex multi-currency payouts with confidence and clarity.",
      "author": "Operations Director",
      "role": "TODO: replace with real client testimonial"
    },
    "gallery": [
      "/asset-22.webp",
      "/asset-07.webp",
      "/asset-14.webp"
    ],
    "relatedIds": [
      "nexa-ai",
      "urbanx",
      "cloudcore"
    ]
  },
  {
    "id": "urbanx",
    "index": "03",
    "title": "UrbanX",
    "category": "E-Commerce",
    "year": "2025",
    "points": [
      "Build a flexible headless storefront",
      "Organize a large product catalog",
      "Connect inventory across sales channels"
    ],
    "shortDescription": "A headless storefront concept with edge rendering and inventory synchronization.",
    "technologies": [
      "next-js",
      "shopify",
      "tailwind-css",
      "graphql",
      "vercel"
    ],
    "image": "/asset-15.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "metric": "Concept focus · storefront performance",
    "artwork": "commerce",
    "featured": false,
    "challenge": "A growing lifestyle brand experienced sluggish page load speeds on legacy eCommerce templates, causing cart drop-offs during high-traffic product releases.",
    "solution": "We engineered a modern headless storefront on Next.js, connecting catalog and inventory data via GraphQL to Shopify Plus while rendering pages from global edge networks.",
    "features": [
      "Sub-second edge rendered catalog pages with instant client-side transitions",
      "Live stock availability checks with optimistic cart updates",
      "Faceted search and category filtering with URL state synchronization",
      "Mobile-first checkout paths optimized for one-thumb purchasing"
    ],
    "architecture": [
      "Next.js App Router storefront deployed on global edge infrastructure",
      "GraphQL integration layer connecting product catalog, discounts, and checkout",
      "Static asset optimization serving responsive WebP images on high-speed CDNs",
      "Redis cache for instant autocomplete and high-velocity product counts"
    ],
    "developmentProcess": [
      "Designed high-converting mobile shopping journeys with micro-animations",
      "Implemented incremental static regeneration for thousands of product SKUs",
      "Stress-tested storefront under simulated flash-sale traffic loads"
    ],
    "results": [
      "Core Web Vitals scores achieved 95+ across mobile and desktop devices",
      "Zero catalog rendering latency observed during seasonal marketing surges",
      "Cart bounce rate reduced through streamlined multi-step checkout"
    ],
    "metrics": [
      "Lighthouse performance standard 95+ maintained",
      "Edge-cached product page TTFB under 80ms",
      "Catalog operations and stock updates synchronized in real time"
    ],
    "timeline": "Illustrative 10-week delivery plan",
    "teamSize": "Product design and engineering team (2 frontend devs, 1 designer)",
    "industry": "Direct-to-Consumer & Retail",
    "services": [
      "web",
      "design"
    ],
    "lessons": [
      "Protect the critical shopping path from heavy third-party script bloat",
      "Pre-render static product shells and hydrate dynamic inventory asynchronously",
      "Build mobile-first: over 70% of eCommerce conversions originate on touchscreens"
    ],
    "testimonial": {
      "quote": "The speed and visual polish of the new storefront directly elevated our brand experience.",
      "author": "Head of eCommerce",
      "role": "TODO: replace with real client testimonial"
    },
    "gallery": [
      "/asset-15.webp",
      "/asset-18.webp",
      "/asset-07.webp"
    ],
    "relatedIds": [
      "finora",
      "nexa-ai",
      "cloudcore"
    ]
  },
  {
    "id": "cloudcore",
    "index": "04",
    "title": "CloudCore",
    "category": "Cloud Platform",
    "year": "2025",
    "points": [
      "Monitor cluster and service health",
      "Connect workloads with live telemetry",
      "Automate repeatable operations"
    ],
    "shortDescription": "A unified operations view for cluster health, workload metrics, and incident triage.",
    "technologies": [
      "go",
      "react",
      "kubernetes",
      "prometheus",
      "docker"
    ],
    "image": "/asset-14.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "metric": "Concept focus · infrastructure visibility",
    "artwork": "cloud",
    "featured": false,
    "challenge": "Platform engineering teams spent hours triaging incident root causes across disparate logs, fragmented cloud consoles, and noisy alert channels.",
    "solution": "We engineered an infrastructure observability workspace that aggregates Kubernetes cluster telemetry, correlates alert incidents with recent deployments, and guides remediation steps.",
    "features": [
      "Cluster workload status visualizer with live pod restart metrics",
      "Automated root-cause correlation between deployment events and latency spikes",
      "Runbook automation triggers for rolling back unhealthy deployments",
      "Team-based alert routing with customizable quiet-hour policies"
    ],
    "architecture": [
      "React frontend using Canvas data charts for high-frequency telemetry streaming",
      "High-throughput Go collectors scraping Prometheus endpoints and Kubernetes APIs",
      "Time-series storage pipelines optimized for 30-day granular metric retention",
      "Self-hosted deployment on customer Kubernetes clusters for data security"
    ],
    "developmentProcess": [
      "Interviewed on-call engineers to identify key questions asked during outages",
      "Built efficient binary telemetry protocols to minimize agent CPU overhead",
      "Validated incident response workflows during simulated infrastructure failures"
    ],
    "results": [
      "Mean time to identify root causes reduced from 45 minutes to under 5 minutes",
      "Zero agent resource contention on client production nodes",
      "Clear visibility provided across hybrid-cloud Kubernetes clusters"
    ],
    "metrics": [
      "100% of critical infrastructure services monitored in unified view",
      "High-cardinality metric charts rendered at 60 FPS",
      "Incident context connected directly to actionable remediation runbooks"
    ],
    "timeline": "Illustrative 14-week delivery plan",
    "teamSize": "Platform engineering team (3 systems engineers)",
    "industry": "Cloud Infrastructure & DevOps Tooling",
    "services": [
      "cloud",
      "software"
    ],
    "lessons": [
      "Prioritize actionable alerts over raw metrics volume to prevent alert fatigue",
      "Display recent code releases directly on latency graphs during outages",
      "Keep monitoring tooling independent of the systems being monitored"
    ],
    "testimonial": {
      "quote": "Having all cluster health metrics correlated with deployment history changed how our on-call team operates.",
      "author": "Lead Site Reliability Engineer",
      "role": "TODO: replace with real client testimonial"
    },
    "gallery": [
      "/asset-14.webp",
      "/asset-21.webp",
      "/asset-05.webp"
    ],
    "relatedIds": [
      "nexa-ai",
      "finora",
      "urbanx"
    ]
  }
];
export { projects as PROJECTS_DATA };
