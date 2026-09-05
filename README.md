# e2life

[![CI](https://github.com/takuya040321/e2life-website/actions/workflows/ci.yml/badge.svg)](https://github.com/takuya040321/e2life-website/actions/workflows/ci.yml)

個人 Web サイト [e2life](https://e2life-website.vercel.app)

AI を活用した開発プロセス設計を実践するエンジニアのサイト。

## 技術スタック

| カテゴリ          | 技術                                    |
| ----------------- | --------------------------------------- |
| フレームワーク    | Next.js 16 (App Router, PPR, Turbopack) |
| 言語              | TypeScript (strict mode)                |
| スタイリング      | Tailwind CSS v4                         |
| UI コンポーネント | shadcn/ui                               |
| アニメーション    | Framer Motion                           |
| フォーム          | React Hook Form + reCAPTCHA v3          |
| テスト            | Vitest + Testing Library + Playwright   |
| パフォーマンス    | Lighthouse CI                           |
| ホスティング      | Vercel                                  |
| 品質ゲート        | GitHub Actions + ローカル Claude Hooks  |

## アーキテクチャ

- **レンダリング**: Partial Prerendering (PPR) + `use cache`
- **コンポーネント**: Server Components（デフォルト）+ Client Components（インタラクティブ）
- **フォーム処理**: Server Actions
- **最適化**: React Compiler（自動メモ化）、next/image、next/font
- **ルート整理**: Route Groups `(marketing)` / `(detail)`

## ディレクトリ構成

```
src/
├── app/
│   ├── (marketing)/          # トップページ、お問い合わせ
│   ├── (detail)/             # 自分について、AI 活用、ハーネス設計
│   ├── actions/              # Server Actions
│   └── layout.tsx
├── components/
│   ├── ui/                   # shadcn/ui コンポーネント
│   ├── layout/               # Header, Footer
│   ├── sections/             # トップページのセクション
│   └── shared/               # 共通コンポーネント
├── lib/
│   ├── data/                 # ページ定義データ
│   ├── utils/                # ユーティリティ
│   └── validations/          # 入力バリデーション
└── e2e/                      # Playwright の E2E テスト
```

## ページ構成

| パス                 | 内容                         |
| -------------------- | ---------------------------- |
| `/`                  | トップページ                 |
| `/ai`                | AI 活用ハブ                  |
| `/ai/[slug]`         | AI 活用の詳細（12 トピック） |
| `/harness`           | ハーネス設計ハブ             |
| `/harness/[harness]` | 役割ごとの詳細（5 役割）     |
| `/about`             | 自分について                 |
| `/contact`           | お問い合わせ                 |

### `/ai/[slug]`

| slug                    | 内容                             |
| ----------------------- | -------------------------------- |
| `sns`                   | SNS 発信の自動化                 |
| `curation`              | 情報収集・配信                   |
| `image-generation`      | 画像コンテンツの生成             |
| `video-ip`              | 動画・キャラクター IP 制作       |
| `knowledge`             | ナレッジ・記録の自動化           |
| `website-self-drive`    | Web サイトの AI 自走運営         |
| `multi-repo-platform`   | マルチリポジトリ AI 開発基盤     |
| `design-process`        | 設計工程の AI 化                 |
| `accounting`            | 会計・経理の自動化               |
| `mail-calendar`         | メール・カレンダー対応の半自動化 |
| `document-generation`   | ドキュメント作成の自動化         |
| `personal-life-support` | 個人生活の AI サポート           |

### `/harness/[harness]`

| harness          | 内容         |
| ---------------- | ------------ |
| `secretary`      | 秘書役       |
| `department`     | 部門担当     |
| `implementation` | 実装担当     |
| `review`         | レビュー担当 |
| `record`         | 記録担当     |

## 開発

パッケージ管理は pnpm を使う（`packageManager: pnpm@11.4.0`）。

```bash
# 依存パッケージのインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# テスト実行
pnpm test              # Unit + Integration (Vitest)
pnpm test:e2e          # E2E (Playwright)
pnpm test:lighthouse   # Lighthouse CI

# Lint / Format / 型チェック
pnpm lint
pnpm format
pnpm typecheck
```

## テスト戦略

| 種類        | ツール                    | 対象                                             |
| ----------- | ------------------------- | ------------------------------------------------ |
| Unit        | Vitest + Testing Library  | ユーティリティ関数、コンポーネント               |
| Integration | Vitest + Testing Library  | Server Actions、API 連携                         |
| E2E         | Playwright                | ユーザーフロー、レスポンシブ、クロスブラウザ     |
| Performance | Lighthouse CI             | Core Web Vitals (LCP, CLS, INP)                  |
| Security    | Playwright + カスタム検証 | XSS、CSRF、フォームバリデーション、HTTP ヘッダー |

## 開発フロー

- ブランチ戦略: main 直 push（個人 site で 1 人作業のため、PR 必須を 2026-06-01 に廃止）
- コミット規約: [Conventional Commits](https://www.conventionalcommits.org/)
- 品質ゲート: 二層構成
  - ローカル Claude Hooks: `.claude/settings.json` の PreToolUse で push 前に format / lint / 型チェック / unit test / build / E2E / Lighthouse を直列実行
  - GitHub Actions: main への push と pull request で format / lint / 型チェック / unit test を実行（`.github/workflows/ci.yml`）
  - 使い分けの考え方は [docs/testing.md](docs/testing.md) を参照
- デプロイ: Vercel（main push で本番デプロイ）

## ライセンス

All rights reserved.
