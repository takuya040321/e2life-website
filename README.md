# e2life

個人 Web サイト [e2life.dev](https://e2life.dev)

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
| 品質ゲート        | ローカル Claude Hooks (push 前検証)     |

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
│   ├── (marketing)/          # LP、問い合わせ
│   ├── (detail)/             # スキル、経歴、AI 関連ページ
│   ├── actions/              # Server Actions
│   └── layout.tsx
├── components/
│   ├── ui/                   # shadcn/ui コンポーネント
│   ├── layout/               # Header, Footer, Navigation
│   ├── sections/             # LP セクション
│   └── shared/               # 共通コンポーネント
├── lib/                      # ユーティリティ、定数
└── styles/                   # グローバルスタイル
```

## ページ構成

| パス               | 内容                   | ステータス |
| ------------------ | ---------------------- | ---------- |
| `/`                | ランディングページ     | MVP        |
| `/skills`          | 技術スキル             | MVP        |
| `/career`          | 職務経歴               | MVP        |
| `/contact`         | 問い合わせフォーム     | MVP        |
| `/ai/`             | AI 活用ハブ            | フェーズ 2 |
| `/ai/ecosystem`    | マルチリポエコシステム | フェーズ 2 |
| `/ai/agents`       | サブエージェント構成   | フェーズ 2 |
| `/ai/recording`    | 5 層記録システム       | フェーズ 2 |
| `/ai/autonomous`   | 自走モードと安全設計   | フェーズ 2 |
| `/ai/security`     | セキュリティ設計       | フェーズ 2 |
| `/ai/sns-pipeline` | SNS 自動化パイプライン | フェーズ 2 |

## 開発

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# テスト実行
npm run test          # Unit + Integration
npm run test:e2e      # E2E (Playwright)
npm run test:perf     # Lighthouse CI

# Lint & Format
npm run lint
npm run format
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
- 品質ゲート: ローカル Claude Hooks（`.claude/settings.json` の PreToolUse で push 前に format / lint / 型チェック / unit test / build / E2E / Lighthouse を直列実行）
- デプロイ: Vercel（main push で本番デプロイ）

## ライセンス

All rights reserved.
