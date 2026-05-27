# e2life-website

e2life.dev の個人 Web サイト。Next.js 16 + Vercel。

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| UI コンポーネント | shadcn/ui |
| アニメーション | Framer Motion |
| フォーム | React Hook Form + reCAPTCHA v3 |
| テスト | Vitest + Testing Library + Playwright |
| ホスティング | Vercel |

## ドキュメント

### 常時参照

- docs/coding-standards.md
- docs/architecture.md

### 実装時に参照

- docs/requirements.md
- docs/api.md
- docs/data-models.md

### テスト時に参照

- docs/testing.md

### デプロイ・運用時に参照

- docs/deploy.md
- docs/operations.md
- docs/env-vars.md

## 絶対ルール

- 個人情報・具体的事業判断をコードやコンテンツに含めない
- secret を commit しない（.env、API キー、トークン等）
- 実装時にテストコードも同時に生成する
- 職務経歴は匿名化する（顧客名・契約金額を含めない）

## git

- Conventional Commits 準拠（`<type>(<scope>): <subject>`）
- feature ブランチ + PR 必須（main 直 push 禁止）
- PR ごとに Vercel プレビュー URL が自動生成される

## 注意

- claude-assets-public 未整備のため、現在ルールは直書き。整備後に symlink に切り替える
