# コーディング規約

## TypeScript

### strict mode

`tsconfig.json` で `strict: true` を設定する。

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### any 禁止

- `any` は使わない。`unknown` + 型ガードで代替する
- ESLint の `@typescript-eslint/no-explicit-any` を `error` に設定
- やむを得ない場合は `// eslint-disable-next-line` + コメントで理由を明記

### 型定義の方針

- コンポーネントの Props: `type` を使う（交差型の方が多い）
- データモデル: `type` を使う（data-models.md で定義）
- ユーティリティ型: `type` を使う
- ライブラリに合わせて `interface` が必要な場合のみ `interface`

```typescript
// Props
type ButtonProps = {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
};

// データモデル
type Skill = {
  name: string;
  category: SkillCategory;
  yearsOfExperience: number;
  logoPath: string;
};
```

## コンポーネント

### 関数コンポーネント

- 関数宣言（`function`）を使う。アロー関数はコールバック内のみ
- `export default` はページコンポーネント（`page.tsx`, `layout.tsx`）のみ
- それ以外は名前付きエクスポート（`export function`）

```typescript
// ページコンポーネント
export default function SkillsPage() {
  return <SkillGrid />;
}

// 通常のコンポーネント
export function SkillGrid() {
  return <div>...</div>;
}
```

### Props 型定義

- Props 型はコンポーネントと同じファイルで定義する
- 外部から参照が必要な場合のみ `export` する

```typescript
type SkillBadgeProps = {
  skill: Skill;
  showYears?: boolean;
};

export function SkillBadge({ skill, showYears = true }: SkillBadgeProps) {
  return <div>...</div>;
}
```

### Server / Client の分離

- デフォルトは Server Components
- `"use client"` はファイル先頭に書く（インライン宣言しない）
- Client Components は最小範囲に絞る

```
components/
├── sections/
│   ├── hero-section.tsx          # Server Component
│   └── hero-animation.tsx        # "use client" (Framer Motion)
```

## ファイル・ディレクトリ命名規則

### ファイル名

- kebab-case を使う: `skill-badge.tsx`, `contact-form.tsx`
- PascalCase は使わない: ~~`SkillBadge.tsx`~~
- テストファイル: `skill-badge.test.tsx`

### ディレクトリ名

- kebab-case を使う: `case-study/`, `sns-pipeline/`
- Next.js の規約に従うもの: `(marketing)/`, `(detail)/`

### 特殊ファイル

Next.js App Router の規約ファイルはそのまま:
- `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`

## インポート順序

以下の順序で並べ、グループ間に空行を入れる:

```typescript
// 1. React / Next.js
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

// 2. 外部ライブラリ
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

// 3. 内部モジュール (エイリアス @/)
import { Button } from "@/components/ui/button";
import { SkillBadge } from "@/components/shared/skill-badge";

// 4. 型 (type-only import)
import type { Skill } from "@/lib/data/skills";

// 5. スタイル
import "@/styles/globals.css";
```

ESLint の `import/order` で自動ソート・自動修正する。

## スタイリング

### Tailwind CSS v4

- ユーティリティクラスを直接使う
- カスタムクラスは `@apply` ではなくコンポーネント化で解決する
- 長いクラスリストは改行して整理する

```typescript
// 短い場合はそのまま
<button className="rounded-lg bg-blue-600 px-4 py-2 text-white">

// 長い場合は改行
<div
  className={cn(
    "flex items-center gap-4 rounded-lg border p-4",
    "transition-colors hover:border-blue-500",
    isActive && "border-blue-500 bg-blue-50"
  )}
>
```

### shadcn/ui

- UI コンポーネントは shadcn/ui をベースにする
- カスタマイズは `components/ui/` 内で行う
- Tailwind CSS のテーマトークン（CSS 変数）で色・間隔を統一する

### cn ユーティリティ

`clsx` + `tailwind-merge` を組み合わせた `cn()` を使う:

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## ESLint 設定

```javascript
// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling"],
        "newlines-between": "always",
      }],
    },
  },
];
```

## Prettier 設定

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`prettier-plugin-tailwindcss` で Tailwind CSS のクラス順序を自動ソートする。

## git

### Conventional Commits

```
<type>(<scope>): <subject>

[body]

[footer]
```

| type | 用途 |
|---|---|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `docs` | ドキュメント |
| `style` | コードスタイル（ロジック変更なし） |
| `refactor` | リファクタリング |
| `test` | テスト |
| `chore` | ビルド・ツール設定 |
| `perf` | パフォーマンス改善 |

### ブランチ命名

```
<type>/<description>
```

- `feat/contact-form`
- `fix/mobile-navigation`
- `docs/design-documents`
- `chore/eslint-config`
