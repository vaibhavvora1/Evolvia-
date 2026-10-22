import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiRedux,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiOpenjdk,
  SiSocketdotio,
  SiJsonwebtokens,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiVercel,
  SiRender,
  SiNetlify,
  SiGithubactions,
  SiNginx,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiNpm,
  SiChatbot,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { RiOpenaiFill } from 'react-icons/ri';


// TODO: remove any technology we do not use
const technologies = [
  // ── Frontend ────────────────────────────────────────────────────────
  {
    slug: 'html5',
    name: 'HTML5',
    category: 'Frontend',
    icon: SiHtml5,
    level: 'Foundation',
    description: 'Semantic document structure for accessible, dependable digital experiences.',
  },
  {
    slug: 'css3',
    name: 'CSS3',
    category: 'Frontend',
    icon: SiCss,
    level: 'Foundation',
    description: 'Modern styling systems for responsive layouts and expressive web interfaces.',
  },
  {
    slug: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    icon: SiJavascript,
    level: 'Core',
    description: 'The core language behind responsive web applications and dynamic client experiences.',
  },
  {
    slug: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    icon: SiTypescript,
    level: 'Core',
    description: 'Static typing layer providing architectural safety across scalable frontend applications.',
  },
  {
    slug: 'react',
    name: 'React',
    category: 'Frontend',
    icon: SiReact,
    level: 'Core',
    description: 'A component-driven foundation for building responsive product interfaces and single-page apps.',
  },
  {
    slug: 'next-js',
    name: 'Next.js',
    category: 'Frontend',
    icon: SiNextdotjs,
    level: 'Framework',
    description: 'Full-stack React framework with server rendering, static export, and edge routing.',
  },
  {
    slug: 'vite',
    name: 'Vite',
    category: 'Frontend',
    icon: SiVite,
    level: 'Tooling',
    description: 'Next-generation frontend tooling offering rapid development cycles and lean production builds.',
  },
  {
    slug: 'redux',
    name: 'Redux',
    category: 'Frontend',
    icon: SiRedux,
    level: 'State management',
    description: 'Predictable state container for complex frontend workflows and asynchronous state management.',
  },
  {
    slug: 'tailwind-css',
    name: 'Tailwind CSS',
    category: 'Frontend',
    icon: SiTailwindcss,
    level: 'Framework',
    description: 'Utility-first CSS framework for composable and consistent design systems.',
  },
  {
    slug: 'bootstrap',
    name: 'Bootstrap',
    category: 'Frontend',
    icon: SiBootstrap,
    level: 'Framework',
    description: 'Responsive styling foundation for rapid interface scaffolding and cross-browser consistency.',
  },
  {
    slug: 'sass',
    name: 'Sass',
    category: 'Frontend',
    icon: SiSass,
    level: 'Styling',
    description: 'CSS preprocessor providing modular architecture, variables, and nested stylesheet rules.',
  },

  // ── Backend ─────────────────────────────────────────────────────────
  {
    slug: 'node-js',
    name: 'Node.js',
    category: 'Backend',
    icon: SiNodedotjs,
    level: 'Runtime',
    description: 'Event-driven JavaScript runtime built for high-throughput APIs and distributed microservices.',
    aliases: ['Node'],
  },
  {
    slug: 'express-js',
    name: 'Express.js',
    category: 'Backend',
    icon: SiExpress,
    level: 'Framework',
    description: 'Lightweight HTTP framework for Node.js powering modular REST services and middleware.',
  },
  {
    slug: 'python',
    name: 'Python',
    category: 'Backend',
    icon: SiPython,
    level: 'Core',
    description: 'Versatile language for backend services, data pipelines, automation, and applied AI systems.',
  },
  {
    slug: 'java',
    name: 'Java',
    category: 'Backend',
    icon: SiOpenjdk,
    level: 'Core',
    description: 'Enterprise runtime delivering thread safety, performance, and long-term backend reliability.',
  },
  {
    slug: 'socket-io',
    name: 'Socket.io',
    category: 'Backend',
    icon: SiSocketdotio,
    level: 'Real-time',
    description: 'Real-time bidirectional event communication for collaborative tools and streaming data.',
  },
  {
    slug: 'jwt',
    name: 'JWT',
    category: 'Backend',
    icon: SiJsonwebtokens,
    level: 'Authentication',
    description: 'Compact, URL-safe token standard for stateless session handling and API authorization.',
  },

  // ── Databases ───────────────────────────────────────────────────────
  {
    slug: 'mongodb',
    name: 'MongoDB',
    category: 'Databases',
    icon: SiMongodb,
    level: 'Document',
    description: 'Flexible document database designed for dynamic product schemas and horizontal scaling.',
  },
  {
    slug: 'postgresql',
    name: 'PostgreSQL',
    category: 'Databases',
    icon: SiPostgresql,
    level: 'Relational',
    description: 'ACID-compliant relational database for transactional safety and complex analytical queries.',
  },
  {
    slug: 'mysql',
    name: 'MySQL',
    category: 'Databases',
    icon: SiMysql,
    level: 'Relational',
    description: 'Proven relational database powering dependable data storage and web applications globally.',
  },
  {
    slug: 'redis',
    name: 'Redis',
    category: 'Databases',
    icon: SiRedis,
    level: 'In-memory',
    description: 'Ultra-low latency in-memory data store for caching, message brokering, and session state.',
  },
  {
    slug: 'firebase',
    name: 'Firebase',
    category: 'Databases',
    icon: SiFirebase,
    level: 'Platform',
    description: 'Managed cloud database platform with real-time listeners and managed authentication.',
  },

  // ── DevOps and Cloud ────────────────────────────────────────────────
  {
    slug: 'docker',
    name: 'Docker',
    category: 'DevOps and Cloud',
    icon: SiDocker,
    level: 'Containers',
    description: 'Container engine standardizing application runtimes across local and cloud environments.',
  },
  {
    slug: 'aws',
    name: 'AWS',
    category: 'DevOps and Cloud',
    icon: FaAws,
    level: 'Cloud',
    description: 'Resilient cloud infrastructure and managed services engineered for high availability.',
    aliases: ['Amazon Web Services', 'AWS Lambda'],
  },
  {
    slug: 'vercel',
    name: 'Vercel',
    category: 'DevOps and Cloud',
    icon: SiVercel,
    level: 'Deployment',
    description: 'Edge-native platform optimizing frontend builds, instant previews, and global delivery.',
  },
  {
    slug: 'render',
    name: 'Render',
    category: 'DevOps and Cloud',
    icon: SiRender,
    level: 'Deployment',
    description: 'Unified cloud platform for deploying full-stack web applications, databases, and cron workers.',
  },
  {
    slug: 'netlify',
    name: 'Netlify',
    category: 'DevOps and Cloud',
    icon: SiNetlify,
    level: 'Deployment',
    description: 'Modern hosting platform for automated frontend workflows and serverless functions.',
  },
  {
    slug: 'github-actions',
    name: 'GitHub Actions',
    category: 'DevOps and Cloud',
    icon: SiGithubactions,
    level: 'CI/CD',
    description: 'Automated CI/CD pipelines for linting, testing, image building, and production deployment.',
    aliases: ['CI/CD'],
  },
  {
    slug: 'nginx',
    name: 'Nginx',
    category: 'DevOps and Cloud',
    icon: SiNginx,
    level: 'Infrastructure',
    description: 'High-performance reverse proxy, load balancer, and static file server.',
  },

  // ── Tools ────────────────────────────────────────────────────────────
  {
    slug: 'git',
    name: 'Git',
    category: 'Tools',
    icon: SiGit,
    level: 'Version control',
    description: 'Distributed version control system ensuring codebase history integrity and safe collaboration.',
  },
  {
    slug: 'github',
    name: 'GitHub',
    category: 'Tools',
    icon: SiGithub,
    level: 'Collaboration',
    description: 'Centralized collaborative platform for code review, issue tracking, and repository management.',
  },
  {
    slug: 'vs-code',
    name: 'VS Code',
    category: 'Tools',
    icon: VscVscode,
    level: 'Editor',
    description: 'Lightweight code editor extended with comprehensive language servers and debugging tools.',
  },
  {
    slug: 'postman',
    name: 'Postman',
    category: 'Tools',
    icon: SiPostman,
    level: 'API tooling',
    description: 'API lifecycle tool for designing endpoints, automated contract testing, and documentation.',
  },
  {
    slug: 'figma',
    name: 'Figma',
    category: 'Tools',
    icon: SiFigma,
    level: 'Product design',
    description: 'Collaborative UI design software for prototyping, design token systems, and engineering handoff.',
  },
  {
    slug: 'npm',
    name: 'npm',
    category: 'Tools',
    icon: SiNpm,
    level: 'Package manager',
    description: 'Standard JavaScript package registry and dependency management tool.',
  },

  // ── AI ───────────────────────────────────────────────────────────────
  {
    slug: 'openai',
    name: 'OpenAI',
    category: 'AI',
    icon: RiOpenaiFill,
    level: 'Models and APIs',
    description: 'State-of-the-art LLMs and multimodal APIs for intelligent product agents and automation.',
  },
  {
    slug: 'prompt-engineering',
    name: 'Prompt Engineering',
    category: 'AI',
    icon: SiChatbot,
    level: 'Practice',
    description: 'Systematic prompt architecture, evaluation loops, and context orchestration for LLM workflows.',
  },
];

export const TECHNOLOGY_ORBIT_SLUGS = [
  'react', 'node-js', 'python', 'next-js', 'aws', 'mongodb', 'postgresql', 'docker', 'openai', 'github-actions',
];

export const HOME_MARQUEE_SLUGS = [
  'react', 'node-js', 'python', 'next-js', 'aws', 'mongodb', 'postgresql', 'docker', 'figma', 'vite',
];

export function findTechnology(value) {
  if (!value) return undefined;
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, '');
  return technologies.find((technology) => (
    technology.slug.replace(/[^a-z0-9]+/g, '') === normalized
    || technology.name.toLowerCase().replace(/[^a-z0-9]+/g, '') === normalized
    || technology.aliases?.some((alias) => alias.toLowerCase().replace(/[^a-z0-9]+/g, '') === normalized)
  ));
}

export { technologies };
export default technologies;
