const technologies = [
  { slug: 'react', name: 'React', category: 'Frontend', icon: 'react', level: 'Core', description: 'A component-driven foundation for responsive product interfaces and cross-platform experiences.' },
  { slug: 'next-js', name: 'Next.js', category: 'Frontend', icon: 'nextjs', level: 'Core', description: 'A React framework for fast, search-friendly applications with flexible rendering and routing.' },
  { slug: 'javascript', name: 'JavaScript', category: 'Frontend', icon: 'javascript', level: 'Core', description: 'The flexible language behind interactive web products and modern server-side applications.' },
  { slug: 'html5', name: 'HTML5', category: 'Frontend', icon: 'html5', level: 'Foundation', description: 'Semantic document structure that makes digital experiences accessible and dependable.' },
  { slug: 'css3', name: 'CSS3', category: 'Frontend', icon: 'css', level: 'Foundation', description: 'A robust styling platform for responsive layouts, design systems, and expressive interfaces.' },
  { slug: 'bootstrap', name: 'Bootstrap', category: 'Frontend', icon: 'bootstrap', level: 'Framework', description: 'A proven responsive UI toolkit for consistent, production-ready web experiences.' },
  { slug: 'tailwind-css', name: 'Tailwind CSS', category: 'Frontend', icon: 'tailwind', level: 'Framework', description: 'A utility-first styling system that helps teams build precise interfaces with reusable design rules.' },
  { slug: 'graphql', name: 'GraphQL', category: 'Backend', icon: 'graphql', level: 'API', description: 'A typed query language that lets product clients request exactly the data they need.' },
  { slug: 'node-js', name: 'Node.js', category: 'Backend', icon: 'node', level: 'Core', description: 'A JavaScript runtime for scalable APIs, real-time systems, and shared full-stack tooling.', aliases: ['Node'] },
  { slug: 'express-js', name: 'Express.js', category: 'Backend', icon: 'express', level: 'Framework', description: 'A lightweight Node.js framework for clear, composable web services and APIs.' },
  { slug: 'python', name: 'Python', category: 'AI & Backend', groups: ['Backend', 'AI'], icon: 'python', level: 'Core', description: 'A versatile language for backend services, data pipelines, and applied machine learning.' },
  { slug: 'java', name: 'Java', category: 'Backend', icon: 'java', level: 'Core', description: 'A mature platform for dependable, high-throughput enterprise applications.' },
  { slug: 'rest-api', name: 'REST API', category: 'Backend', icon: 'openapi', level: 'API', description: 'A resource-oriented interface style for interoperable services and well-defined integrations.', aliases: ['REST'] },
  { slug: 'fastapi', name: 'FastAPI', category: 'Backend', icon: 'fastapi', level: 'Framework', description: 'A Python framework for building typed, high-performance APIs with clear contracts.' },
  { slug: 'go', name: 'Go', category: 'Backend', icon: 'go', level: 'Core', description: 'A compiled language for efficient services, infrastructure tooling, and concurrent workloads.' },
  { slug: 'mongodb', name: 'MongoDB', category: 'Database', icon: 'mongodb', level: 'Document', description: 'A document database that keeps flexible product data close to the way applications use it.' },
  { slug: 'postgresql', name: 'PostgreSQL', category: 'Database', icon: 'postgres', level: 'Relational', description: 'A reliable relational database for transactional workloads and rich, structured queries.' },
  { slug: 'mysql', name: 'MySQL', category: 'Database', icon: 'mysql', level: 'Relational', description: 'A widely adopted relational database for dependable application data and commerce systems.' },
  { slug: 'redis', name: 'Redis', category: 'Database', icon: 'redis', level: 'In-memory', description: 'An in-memory data platform for caching, queues, real-time state, and vector search.', aliases: ['Redis Vector', 'Vector DBs'] },
  { slug: 'supabase', name: 'Supabase', category: 'Database', icon: 'supabase', level: 'Platform', description: 'A developer platform built around PostgreSQL, authentication, storage, and real-time APIs.' },
  { slug: 'aws', name: 'AWS', category: 'Cloud', icon: 'aws', level: 'Primary', description: 'A broad cloud platform for resilient infrastructure, managed data, and global delivery.', aliases: ['Amazon Web Services', 'AWS Lambda'] },
  { slug: 'google-cloud', name: 'Google Cloud', category: 'Cloud', icon: 'googlecloud', level: 'Cloud', description: 'Cloud infrastructure and managed data services for scalable, connected products.', aliases: ['GCP'] },
  { slug: 'docker', name: 'Docker', category: 'DevOps', icon: 'docker', level: 'Containers', description: 'Portable containers that make application environments consistent from development to production.' },
  { slug: 'nginx', name: 'Nginx', category: 'DevOps', icon: 'nginx', level: 'Infrastructure', description: 'A high-performance web server and reverse proxy for secure, efficient traffic delivery.' },
  { slug: 'git', name: 'Git', category: 'DevOps', icon: 'git', level: 'Version control', description: 'Distributed version control that supports safe collaboration and traceable delivery.' },
  { slug: 'github', name: 'GitHub', category: 'DevOps', icon: 'github', level: 'Collaboration', description: 'A platform for source collaboration, code review, and repeatable software delivery.' },
  { slug: 'ci-cd', name: 'CI/CD', category: 'DevOps', icon: 'githubactions', level: 'Delivery', description: 'Automated integration and deployment workflows that make releases repeatable and safer.' },
  { slug: 'kubernetes', name: 'Kubernetes', category: 'DevOps', icon: 'kubernetes', level: 'Orchestration', description: 'Container orchestration for operating distributed workloads with predictable deployment controls.' },
  { slug: 'terraform', name: 'Terraform', category: 'DevOps', icon: 'terraform', level: 'Infrastructure as code', description: 'Versioned infrastructure definitions that make cloud environments reproducible.' },
  { slug: 'apache-kafka', name: 'Apache Kafka', category: 'DevOps', icon: 'kafka', level: 'Streaming', description: 'A distributed event-streaming platform for durable, real-time data flows.', aliases: ['Kafka'] },
  { slug: 'prometheus', name: 'Prometheus', category: 'DevOps', icon: 'prometheus', level: 'Observability', description: 'Metrics collection and alerting for understanding system behavior in production.' },
  { slug: 'openai', name: 'OpenAI', category: 'AI', icon: 'openai', level: 'Models & APIs', description: 'Model APIs for language, multimodal reasoning, and practical intelligent product features.', aliases: ['OpenAI API'] },
  { slug: 'gemini', name: 'Gemini', category: 'AI', icon: 'gemini', level: 'Models & APIs', description: 'Google’s multimodal model family for reasoning, content understanding, and AI workflows.' },
  { slug: 'claude', name: 'Claude', category: 'AI', icon: 'claude', level: 'Models & APIs', description: 'Anthropic’s language models for thoughtful assistance, analysis, and tool-using workflows.' },
  { slug: 'langchain', name: 'LangChain', category: 'AI', icon: 'langchain', level: 'Framework', description: 'Building blocks for connecting language models to data, tools, and application workflows.' },
  { slug: 'rag-systems', name: 'RAG Systems', category: 'AI', icon: 'rag', level: 'Architecture', description: 'Retrieval-augmented generation grounds model responses in relevant, verifiable source material.', aliases: ['RAG', 'RAG Pipelines'] },

  { slug: 'figma', name: 'Figma', category: 'Design', icon: 'figma', level: 'Product design', description: 'Collaborative design tooling for interface systems, prototyping, and shared product decisions.', aliases: ['Design Systems', 'Prototyping'] },
  { slug: 'gsap', name: 'GSAP', category: 'Design', groups: ['Frontend', 'Design'], icon: 'gsap', level: 'Motion', description: 'A precise animation toolkit for responsive, performant interface motion.' },
  { slug: 'framer-motion', name: 'Framer Motion', category: 'Design', groups: ['Frontend', 'Design'], icon: 'framer', level: 'Motion', description: 'A declarative motion library for expressive, accessible interactions in React.', aliases: ['Motion Design'] },
  { slug: 'three-js', name: 'Three.js', category: 'Design', icon: 'threejs', level: '3D & WebGL', description: 'A JavaScript library for creating interactive 3D experiences in the browser.' },
  { slug: 'react-native', name: 'React Native', category: 'Mobile', icon: 'react', level: 'Cross-platform', description: 'A React-based framework for building native-feeling iOS and Android applications.' },
  { slug: 'flutter', name: 'Flutter', category: 'Mobile', icon: 'flutter', level: 'Cross-platform', description: 'A UI toolkit for building polished, compiled mobile applications from one codebase.' },
  { slug: 'swift', name: 'Swift', category: 'Mobile', icon: 'swift', level: 'Native', description: 'Apple’s modern language for building native applications across its platforms.', aliases: ['iOS', 'iOS / Swift'] },
  { slug: 'android', name: 'Android', category: 'Mobile', icon: 'android', level: 'Native', description: 'The mobile platform and application ecosystem for a broad range of Android devices.', aliases: ['Android / Kotlin'] },
  { slug: 'firebase', name: 'Firebase', category: 'Mobile', icon: 'firebase', level: 'Platform', description: 'Managed application services for mobile authentication, data, messaging, and delivery.' },
  { slug: 'hugging-face', name: 'Hugging Face', category: 'AI', icon: 'huggingface', level: 'Models', description: 'An open ecosystem for discovering, sharing, and deploying machine-learning models.' },
  { slug: 'stripe', name: 'Stripe', category: 'Backend', icon: 'stripe', level: 'Payments', description: 'Payment infrastructure for online businesses, connected accounts, and financial workflows.', aliases: ['Stripe Connect'] },
  { slug: 'shopify', name: 'Shopify', category: 'Backend', icon: 'shopify', level: 'Commerce', description: 'Commerce infrastructure for storefronts, catalog operations, and order management.', aliases: ['Shopify Plus'] },
  { slug: 'vercel', name: 'Vercel', category: 'Cloud', icon: 'vercel', level: 'Edge delivery', description: 'A deployment platform for frontend applications and globally distributed web delivery.', aliases: ['Vercel Edge'] },
  { slug: 'algolia', name: 'Algolia', category: 'Backend', icon: 'algolia', level: 'Search', description: 'Search infrastructure for responsive discovery and relevant product experiences.' },
  { slug: 'expo', name: 'Expo', category: 'Mobile', icon: 'expo', level: 'Tooling', description: 'A toolchain that streamlines React Native development, testing, and release workflows.' },
];

export const TECHNOLOGY_ORBIT_SLUGS = [
  'react', 'node-js', 'python', 'next-js', 'aws', 'mongodb', 'postgresql', 'docker', 'openai', 'gsap',
];

export const HOME_MARQUEE_SLUGS = [
  'react', 'node-js', 'python', 'next-js', 'aws', 'mongodb', 'postgresql', 'docker', 'figma', 'gsap',
];

export function findTechnology(value) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, '');
  return technologies.find((technology) => (
    technology.slug.replace(/[^a-z0-9]+/g, '') === normalized
    || technology.name.toLowerCase().replace(/[^a-z0-9]+/g, '') === normalized
    || technology.aliases?.some((alias) => alias.toLowerCase().replace(/[^a-z0-9]+/g, '') === normalized)
  ));
}

export default technologies;
