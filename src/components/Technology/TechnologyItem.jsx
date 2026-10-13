import React from 'react';
import { Link } from 'react-router-dom';
import { Layers3 } from 'lucide-react';
import {
  siAlgolia, siAndroid, siApachekafka, siBootstrap, siClaude, siCss, siDocker, siExpo,
  siExpress, siFastapi, siFigma, siFlutter, siFramer, siGit, siGithub, siGithubactions,
  siGo, siGooglecloud, siGooglegemini, siGsap, siGraphql, siHtml5, siHuggingface,
  siJavascript, siKubernetes, siLangchain, siMongodb, siMysql, siNextdotjs, siNginx, siNodedotjs,
  siOpenapiinitiative, siPostgresql, siPrometheus, siPytorch, siPython, siReact, siRedis,
  siShopify, siStripe, siSupabase, siSwift, siTailwindcss, siTerraform, siThreedotjs,
  siVercel,
} from 'simple-icons';
import { faAws, faJava, faOpenai } from '@fortawesome/free-brands-svg-icons';
import './TechnologyComponents.css';

const BRAND_MARKS = {
  algolia: siAlgolia,
  android: siAndroid,
  aws: faAws,
  bootstrap: siBootstrap,
  claude: siClaude,
  css: siCss,
  docker: siDocker,
  expo: siExpo,
  express: siExpress,
  fastapi: siFastapi,
  figma: siFigma,
  flutter: siFlutter,
  framer: siFramer,
  git: siGit,
  github: siGithub,
  githubactions: siGithubactions,
  go: siGo,
  googlecloud: siGooglecloud,
  gemini: siGooglegemini,
  gsap: siGsap,
  graphql: siGraphql,
  html5: siHtml5,
  huggingface: siHuggingface,
  java: faJava,
  javascript: siJavascript,
  kafka: siApachekafka,
  kubernetes: siKubernetes,
  langchain: siLangchain,
  mongodb: siMongodb,
  mysql: siMysql,
  nextjs: siNextdotjs,
  nginx: siNginx,
  node: siNodedotjs,
  openai: faOpenai,
  openapi: siOpenapiinitiative,
  postgres: siPostgresql,
  prometheus: siPrometheus,
  pytorch: siPytorch,
  python: siPython,
  react: siReact,
  redis: siRedis,
  shopify: siShopify,
  stripe: siStripe,
  supabase: siSupabase,
  swift: siSwift,
  tailwind: siTailwindcss,
  terraform: siTerraform,
  threejs: siThreedotjs,
  vercel: siVercel,
};

function TechnologyMark({ technology }) {
  const mark = BRAND_MARKS[technology.icon];
  const color = mark?.hex ? `#${mark.hex}` : technology.icon === 'rag' ? 'var(--accent)' : 'var(--black)';

  if (mark?.path) {
    return (
      <svg
        className="technology-item__svg"
        viewBox="0 0 24 24"
        role="img"
        aria-label={`${technology.name} logo`}
        style={{ '--tech-color': color }}
      >
        <path d={mark.path} />
      </svg>
    );
  }

  if (mark?.icon) {
    const [width, height, , , paths] = mark.icon;
    return (
      <svg
        className="technology-item__svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${technology.name} logo`}
        style={{ '--tech-color': color }}
      >
        {(Array.isArray(paths) ? paths : [paths]).map((path, index) => (
          <path d={path} key={index} />
        ))}
      </svg>
    );
  }

  return <Layers3 className="technology-item__svg technology-item__svg--concept" aria-label={`${technology.name} icon`} />;
}

export default function TechnologyItem({
  technology,
  variant = 'card',
  showCategory = true,
  tabIndex,
}) {
  if (!technology) return null;

  return (
    <Link
      to={`/technology/${technology.slug}`}
      className={`technology-item technology-item--${variant}`}
      aria-label={`${technology.name}${showCategory ? `, ${technology.category}` : ''}`}
      tabIndex={tabIndex}
    >
      <span className="technology-item__mark">
        <TechnologyMark technology={technology} />
      </span>
      <span className="technology-item__copy">
        <span className="technology-item__name">{technology.name}</span>
        {showCategory && <span className="technology-item__category">{technology.category}</span>}
      </span>
    </Link>
  );
}
