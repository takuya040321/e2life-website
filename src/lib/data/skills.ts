export const skillCategories = [
  "language",
  "framework",
  "database",
  "cloud",
  "devops",
  "ai",
  "other",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

export const skillCategoryLabels: Record<SkillCategory, string> = {
  language: "言語",
  framework: "フレームワーク",
  database: "データベース",
  cloud: "クラウド",
  devops: "DevOps",
  ai: "AI",
  other: "その他",
};

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  yearsOfExperience: number;
  logoPath: string;
  description?: string;
};

export const skills: Skill[] = [
  {
    id: "typescript",
    name: "TypeScript",
    category: "language",
    yearsOfExperience: 5,
    logoPath: "/logos/typescript.svg",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "language",
    yearsOfExperience: 8,
    logoPath: "/logos/javascript.svg",
  },
  {
    id: "python",
    name: "Python",
    category: "language",
    yearsOfExperience: 3,
    logoPath: "/logos/python.svg",
  },
  {
    id: "java",
    name: "Java",
    category: "language",
    yearsOfExperience: 5,
    logoPath: "/logos/java.svg",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "framework",
    yearsOfExperience: 3,
    logoPath: "/logos/nextdotjs.svg",
  },
  {
    id: "react",
    name: "React",
    category: "framework",
    yearsOfExperience: 5,
    logoPath: "/logos/react.svg",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "framework",
    yearsOfExperience: 6,
    logoPath: "/logos/nodedotjs.svg",
  },
  {
    id: "express",
    name: "Express",
    category: "framework",
    yearsOfExperience: 5,
    logoPath: "/logos/express.svg",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    yearsOfExperience: 5,
    logoPath: "/logos/postgresql.svg",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    yearsOfExperience: 6,
    logoPath: "/logos/mysql.svg",
  },
  {
    id: "redis",
    name: "Redis",
    category: "database",
    yearsOfExperience: 3,
    logoPath: "/logos/redis.svg",
  },
  {
    id: "aws",
    name: "AWS",
    category: "cloud",
    yearsOfExperience: 5,
    logoPath: "/logos/amazonaws.svg",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    category: "cloud",
    yearsOfExperience: 2,
    logoPath: "/logos/googlecloud.svg",
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    yearsOfExperience: 5,
    logoPath: "/logos/docker.svg",
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    category: "devops",
    yearsOfExperience: 3,
    logoPath: "/logos/githubactions.svg",
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "devops",
    yearsOfExperience: 2,
    logoPath: "/logos/terraform.svg",
  },
  {
    id: "claude",
    name: "Claude",
    category: "ai",
    yearsOfExperience: 2,
    logoPath: "/logos/claude.svg",
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "ai",
    yearsOfExperience: 2,
    logoPath: "/logos/openai.svg",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "ai",
    yearsOfExperience: 2,
    logoPath: "/logos/githubcopilot.svg",
  },
];
