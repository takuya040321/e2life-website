# データモデル定義

## コンテンツデータ型

### Skill（SE スキル）

```typescript
// src/lib/data/skills.ts

const skillCategories = [
  "language",
  "framework",
  "database",
  "cloud",
  "devops",
  "ai",
  "other",
] as const;

type SkillCategory = (typeof skillCategories)[number];

type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  yearsOfExperience: number;
  logoPath: string;
  description?: string;
};

// データ例
const skills: Skill[] = [
  {
    id: "typescript",
    name: "TypeScript",
    category: "language",
    yearsOfExperience: 5,
    logoPath: "/logos/typescript.svg",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "framework",
    yearsOfExperience: 3,
    logoPath: "/logos/nextjs.svg",
  },
];
```

### Career（職務経歴）

顧客名・契約金額は含めない。匿名化した状態で公開する。

```typescript
// src/lib/data/career.ts

const projectTypes = [
  "web-app",
  "mobile-app",
  "api",
  "infrastructure",
  "data-pipeline",
  "other",
] as const;

type ProjectType = (typeof projectTypes)[number];

type CareerProject = {
  id: string;
  period: {
    start: string;   // "2023-04" 形式
    end?: string;     // 継続中の場合は省略
  };
  projectType: ProjectType;
  title: string;            // 匿名化したプロジェクト概要
  description: string;      // 担当内容
  teamSize: string;         // "5-10名" のような範囲表記
  role: string;             // "バックエンドエンジニア" 等
  technologies: string[];   // 使用技術
  highlights: string[];     // 主な成果
};

// データ例
const projects: CareerProject[] = [
  {
    id: "project-001",
    period: { start: "2023-04", end: "2024-03" },
    projectType: "web-app",
    title: "大規模 EC サイトリニューアル",
    description: "既存の EC サイトを Next.js + microservices 構成にリニューアル",
    teamSize: "10-15名",
    role: "フロントエンドリード",
    technologies: ["Next.js", "TypeScript", "GraphQL", "AWS"],
    highlights: [
      "ページ表示速度を 40% 改善",
      "CI/CD パイプラインを構築",
    ],
  },
];
```

### ContactForm（問い合わせフォーム）

```typescript
// src/lib/validations/contact.ts
import { z } from "zod";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "名前を入力してください")
    .max(100, "100 文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  company: z
    .string()
    .max(200, "200 文字以内で入力してください")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "10 文字以上で入力してください")
    .max(5000, "5000 文字以内で入力してください"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
```

### SiteMetadata（サイト共通情報）

```typescript
// src/lib/data/site.ts

type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

type SiteMetadata = {
  title: string;
  description: string;
  url: string;
  author: string;
  socialLinks: SocialLink[];
};

const siteMetadata: SiteMetadata = {
  title: "e2life.dev",
  description: "AI で開発プロセス自体を設計するエンジニア",
  url: "https://e2life.dev",
  author: "takuya",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/takuya040321",
      icon: "github",
    },
  ],
};
```

## データソース

| フェーズ | ソース | 格納場所 | 更新方法 |
|---|---|---|---|
| MVP | ローカルファイル | `src/lib/data/*.ts` | 手動編集 → PR → マージ |
| フェーズ 2 | Google Sheets API | `src/lib/data/*.ts`（自動更新） | Claude Code Routine → PR → マージ |
| フェーズ 2 | GitHub API | `src/lib/data/*.ts`（自動更新） | Claude Code Routine → PR → マージ |

### MVP のデータ管理

- TypeScript ファイルで型安全にデータを定義する
- JSON ではなく `.ts` ファイルを使い、型チェックを効かせる
- ビルド時に静的にバンドルされる

### フェーズ 2 のデータ管理

- Claude Code Routine が週 1 回、外部 API からデータを取得
- 取得したデータで `src/lib/data/*.ts` を更新
- PR を作成し、テスト通過 + AI レビュー後にマージ
- ランタイムでの外部 API 呼び出しはしない（ビルド時に静的化）

## バリデーションルール

### クライアントサイド

React Hook Form + Zod でリアルタイムバリデーション:

- フォーカスアウト時にバリデーション実行
- エラーメッセージをフィールド下に表示
- 全フィールドが valid になるまで送信ボタンを disabled

### サーバーサイド

Server Action 内で同じ Zod スキーマを使って再検証:

- クライアントバリデーションのバイパス対策
- スキーマは `src/lib/validations/` で一元管理し、クライアント・サーバーで共有
