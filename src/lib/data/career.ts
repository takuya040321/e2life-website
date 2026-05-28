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
    period: { start: "2024-04" },
    projectType: "web-app",
    title: "AI 活用開発プロセス設計・個人サイト構築",
    description:
      "マルチエージェント構成による品質管理と自己改善する開発プロセスを設計。ポートフォリオサイトを Next.js 16 で構築",
    teamSize: "1名",
    role: "フルスタックエンジニア",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Claude Code"],
    highlights: [
      "AI エージェントによる自動レビュー・テストパイプラインを構築",
      "CI/CD を GitHub Actions + Vercel で完全自動化",
    ],
  },
  {
    id: "project-002",
    period: { start: "2023-04", end: "2024-03" },
    projectType: "web-app",
    title: "大規模 EC サイトリニューアル",
    description:
      "既存のモノリシックな EC サイトを Next.js + microservices 構成にリニューアル。フロントエンドチームのリードとしてアーキテクチャ設計から実装まで担当",
    teamSize: "10-15名",
    role: "フロントエンドリード",
    technologies: ["Next.js", "TypeScript", "GraphQL", "AWS", "Docker"],
    highlights: [
      "ページ表示速度を 40% 改善（LCP 3.2s → 1.9s）",
      "コンポーネント設計ガイドラインを策定し、チーム全体のコード品質を向上",
      "CI/CD パイプラインを構築し、デプロイ頻度を週1回から日次に改善",
    ],
  },
  {
    id: "project-003",
    period: { start: "2021-10", end: "2023-03" },
    projectType: "api",
    title: "決済基盤 API リプレイス",
    description:
      "レガシーな決済 API を Node.js + TypeScript でリプレイス。高可用性と厳密なトランザクション管理を実現",
    teamSize: "5-8名",
    role: "バックエンドエンジニア",
    technologies: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS", "Terraform"],
    highlights: [
      "API レスポンスタイムを平均 200ms 以下に改善",
      "99.99% の可用性を達成するインフラ構成を設計",
    ],
  },
  {
    id: "project-004",
    period: { start: "2020-04", end: "2021-09" },
    projectType: "web-app",
    title: "社内業務管理システム開発",
    description:
      "社内の業務フローをデジタル化する Web アプリケーションを開発。React + Java のフルスタック構成",
    teamSize: "5-7名",
    role: "フルスタックエンジニア",
    technologies: ["React", "TypeScript", "Java", "MySQL", "AWS"],
    highlights: ["業務処理時間を 60% 削減", "ユーザビリティテストを実施し、UI/UX を継続改善"],
  },
  {
    id: "project-005",
    period: { start: "2018-04", end: "2020-03" },
    projectType: "infrastructure",
    title: "クラウドインフラ基盤構築・運用",
    description:
      "オンプレミス環境から AWS へのマイグレーションプロジェクト。インフラ設計から運用体制の構築まで担当",
    teamSize: "3-5名",
    role: "インフラエンジニア",
    technologies: ["AWS", "Docker", "Terraform", "Python", "GitHub Actions"],
    highlights: [
      "インフラコストを 30% 削減しつつ、可用性を向上",
      "IaC（Infrastructure as Code）を導入し、環境構築を自動化",
    ],
  },
];
