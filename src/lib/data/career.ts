export const projectTypes = [
  "web-app",
  "mobile-app",
  "api",
  "infrastructure",
  "data-pipeline",
  "other",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export type CareerProject = {
  id: string;
  period: {
    start: string;
    end?: string;
  };
  projectType: ProjectType;
  title: string;
  description: string;
  teamSize: string;
  role: string;
  technologies: string[];
  highlights: string[];
};

export const projects: CareerProject[] = [
  {
    id: "project-001",
    period: { start: "2023-04", end: "2024-03" },
    projectType: "web-app",
    title: "大規模 EC サイトリニューアル",
    description: "既存の EC サイトを Next.js + microservices 構成にリニューアル",
    teamSize: "10-15名",
    role: "フロントエンドリード",
    technologies: ["Next.js", "TypeScript", "GraphQL", "AWS"],
    highlights: ["ページ表示速度を 40% 改善", "CI/CD パイプラインを構築"],
  },
];
