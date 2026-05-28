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
    id: "nextjs",
    name: "Next.js",
    category: "framework",
    yearsOfExperience: 3,
    logoPath: "/logos/nextjs.svg",
  },
  {
    id: "react",
    name: "React",
    category: "framework",
    yearsOfExperience: 5,
    logoPath: "/logos/react.svg",
  },
];
