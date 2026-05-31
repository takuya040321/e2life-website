# データモデル定義

## コンテンツデータ型

### Skill（SE スキル）

大本（single source of truth）は SE 事業の「スキルシート v1」（Google スプレッドシート）。
そこから手動で `*.ts` に同期する。
経験期間は「業務経験（累計）」と「トータル（業務 + 個人開発）」の 2 軸を月数で保持する。

```typescript
// src/lib/data/skills.ts

const skillCategories = [
  "language",
  "framework",
  "database",
  "vcs",
  "cicd",
  "package",
  "devtool",
  "ide",
  "library",
  "ai",
] as const;

type SkillCategory = (typeof skillCategories)[number];

// 大本シートの 3 段階レベル評価
type SkillLevel = "professional" | "work" | "learning";

type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  businessMonths: number | null; // 業務経験の累計月数。業務経験がなければ null
  totalMonths: number | null; // 業務 + 個人開発のトータル月数。実績がなければ null
  level: SkillLevel;
  projectCount: number; // 業務での担当案件数
  isStrong?: boolean; // 特に得意な技術か（大本シートの「特に得意」○/◎）
  logoPath?: string; // ロゴ未整備の場合は省略しフォールバック表示
  note?: string; // 用途・補足（大本シートの「備考」）
};

// データ例
const skills: Skill[] = [
  {
    id: "python",
    name: "Python",
    category: "language",
    businessMonths: 16,
    totalMonths: 22,
    level: "professional",
    projectCount: 4,
    isStrong: true,
    logoPath: "/logos/python.svg",
    note: "業務効率化ツール / EC 自動化",
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
    start: string; // "2023-04" 形式
    end?: string; // 継続中の場合は省略
  };
  projectType: ProjectType;
  title: string; // 匿名化したプロジェクト概要
  description: string; // 担当内容
  teamSize: string; // "5-10名" のような範囲表記
  role: string; // "バックエンドエンジニア" 等
  technologies: string[]; // 使用技術
  highlights: string[]; // 主な成果
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
    highlights: ["ページ表示速度を 40% 改善", "CI/CD パイプラインを構築"],
  },
];
```

### ContactForm（問い合わせフォーム）

```typescript
// src/lib/validations/contact.ts
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "名前を入力してください").max(100, "100 文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  company: z.string().max(200, "200 文字以内で入力してください").optional().or(z.literal("")),
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

| ソース           | 格納場所            | 更新方法               |
| ---------------- | ------------------- | ---------------------- |
| ローカルファイル | `src/lib/data/*.ts` | 手動編集 → PR → マージ |

大本は SE 事業のスキルシート（Google スプレッドシート）。そこから手動で `*.ts` に反映する。

### データ管理

- TypeScript ファイルで型安全にデータを定義する
- JSON ではなく `.ts` ファイルを使い、型チェックを効かせる
- ビルド時に静的にバンドルされる
- 大本スキルシートの変更は手動で `*.ts` に反映し、PR → マージで公開する

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
