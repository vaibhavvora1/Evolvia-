// Editorial posts and article detail content.
export const blog = [
  {
    "id": "ai-in-software-dev",
    "slug": "ai-in-software-dev",
    "title": "How AI Changes Software Engineering Work",
    "category": "AI & Engineering",
    "date": "Oct 2026",
    "readTime": "5 min",
    "image": "/asset-10.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "points": [
      "Compress research and prototyping cycles",
      "Increase value of technical judgment and design taste",
      "Maintain strict evaluation benchmarks before production"
    ],
    "summary": "AI changes engineering workflows by multiplying thoughtful builders and emphasizing system design, evaluation, and production constraints.",
    "tags": [
      "Applied AI",
      "Productivity",
      "Architecture"
    ],
    "paragraphs": [
      "AI changes the nature of engineering work in a more interesting way than it changes the engineering profession itself. The strongest teams use AI to compress research cycles, speed up routine implementation, and focus human attention on system design, trade-offs, and product judgment.",
      "This does not eliminate the need for senior technical taste. It increases the value of people who can define what a system should do, what constraints matter, and how to evaluate output before it reaches production. In other words, AI is a multiplier for thoughtful builders, not a replacement for them.",
      "The real shift is in the workflow: faster prototyping, easier exploration, and more time spent understanding user goals and edge cases. The companies that win are the ones that combine AI with clear engineering standards, not the ones that push raw model output straight to production."
    ],
    "relatedIds": [
      "building-for-scale",
      "rag-production",
      "cloud-cost-control"
    ]
  },
  {
    "id": "building-for-scale",
    "slug": "building-for-scale",
    "title": "Building for Scale: Architecture as Constraints",
    "category": "Architecture",
    "date": "Sep 2026",
    "readTime": "6 min",
    "image": "/asset-08.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "points": [
      "Simplicity as an architectural discipline",
      "Avoid premature microservices sprawl",
      "Decouple services only when throughput or domains require it"
    ],
    "summary": "Architecture should be a consequence of real constraints, not a fashion statement. Keep systems simple until scale requires complexity.",
    "tags": [
      "Distributed Systems",
      "Cloud",
      "Scalability"
    ],
    "paragraphs": [
      "Architecture should be a consequence of constraints, not a fashion statement. Many teams adopt microservices too early, creating a sprawling operational burden before the product has reached the point where distribution and load justify that complexity.",
      "At Evolvia, we prefer systems that stay simple until the real reasons for complexity appear: throughput bottlenecks, team boundaries, or event-driven workflows that genuinely require decoupling across services. The right architecture is one you can explain in a sentence and operate without ceremony.",
      "Simplicity is not a lack of ambition. It is the discipline that keeps product and infrastructure aligned while the business grows."
    ],
    "relatedIds": [
      "cloud-cost-control",
      "ai-in-software-dev",
      "rag-production"
    ]
  },
  {
    "id": "cloud-cost-control",
    "slug": "cloud-cost-control",
    "title": "Treating Cloud Cost as a Core Design Variable",
    "category": "Cloud & DevOps",
    "date": "Aug 2026",
    "readTime": "4 min",
    "image": "/asset-21.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "points": [
      "Align telemetry, architecture, and business model",
      "Detect cost accumulation before bills arrive",
      "Design observable query paths and right-sized infrastructure"
    ],
    "summary": "Cloud cost overruns stem from early trade-offs. Make resource allocation explicit from day one with continuous telemetry.",
    "tags": [
      "DevOps",
      "AWS",
      "Kubernetes"
    ],
    "paragraphs": [
      "Cloud cost overruns are rarely caused by a single expensive service. They are usually an accumulation of decisions made while speed was the priority and cost was an abstract future problem. By the time those decisions are visible in a monthly bill, they are already baked into the system design.",
      "The better approach is to treat cost as a design variable from the start. That means making performance and resource trade-offs explicit, understanding the real cost of a query path or background job, and designing for observability before demand spikes.",
      "When architecture, telemetry, and business model are aligned, cloud cost becomes a product discipline rather than a recurring operational surprise."
    ],
    "relatedIds": [
      "building-for-scale",
      "rag-production",
      "design-system-value"
    ]
  },
  {
    "id": "design-system-value",
    "slug": "design-system-value",
    "title": "The Compounding Advantage of Design Systems",
    "category": "Design & UX",
    "date": "Jul 2026",
    "readTime": "5 min",
    "image": "/asset-18.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "points": [
      "Reduce repetitive decision-making across teams",
      "Establish shared interaction vocabulary",
      "Evolve design tokens with product reality"
    ],
    "summary": "Design systems yield compounding velocity when they solve real friction, encoding interaction patterns teams rely on.",
    "tags": [
      "Design Systems",
      "Figma",
      "UI/UX"
    ],
    "paragraphs": [
      "Design systems become valuable not because they make a product look consistent, but because they reduce the amount of repetitive decision-making a team has to do. Over time, that compounding effect becomes a serious productivity advantage.",
      "The first year is often frustrating because a design system feels like overhead. The second year pays off because the team has a common language for interaction, layout, and motion, which makes implementation faster and quality more consistent.",
      "The best design systems are not static libraries. They evolve with product reality and encode the patterns teams keep returning to because they work in context."
    ],
    "relatedIds": [
      "ai-in-software-dev",
      "building-for-scale",
      "cloud-cost-control"
    ]
  },
  {
    "id": "rag-production",
    "slug": "rag-production",
    "title": "Lessons from Deploying RAG Pipelines in Production",
    "category": "Applied AI",
    "date": "Jun 2026",
    "readTime": "7 min",
    "image": "/asset-06.webp",
    "imageWidth": 1376,
    "imageHeight": 768,
    "points": [
      "Bridge the gap between prototypes and reliable software",
      "Ground answers with verifiable document citations",
      "Enforce strict evaluation and hallucination guards"
    ],
    "summary": "Moving from notebook demos to enterprise RAG demands rigorous chunking, hybrid search, and deterministic validation layers.",
    "tags": [
      "RAG",
      "Vector Search",
      "Python"
    ],
    "paragraphs": [
      "Retrieval-augmented generation succeeds in demos because the setup is narrow, controlled, and highly curated. Production introduces noisy data, changing retrieval quality, and downstream expectations that the system behaves predictably over time.",
      "The gap between a promising prototype and a reliable AI feature is usually filled by evaluation, observability, and system boundaries. If you do not define what success looks like, which outputs are acceptable, and how retrieval quality will be measured, the model will appear confident while the product quietly drifts out of alignment.",
      "Good RAG systems do not just retrieve context well; they provide a disciplined framework for satisfying user intent in a way that remains auditable and composable over time."
    ],
    "relatedIds": [
      "ai-in-software-dev",
      "building-for-scale",
      "cloud-cost-control"
    ]
  }
];
export { blog as BLOG_POSTS };
export default blog;
