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

## コード品質基準

このリポは public。ソースコード自体がポートフォリオとして評価される。

- ESLint + Prettier を厳密に設定し、一貫したコードスタイルを維持する
- TypeScript strict mode + any 禁止
- コンポーネントは責務を明確に分離する（UI / ロジック / データ取得）
- ディレクトリ構成は App Router のベストプラクティスに沿う
- PR description には「なぜこう作ったか」の設計判断を記録する
- README.md はアーキテクチャ・セットアップ手順・テスト戦略を網羅する
- GitHub Actions で lint / test / Lighthouse を PR ごとに自動実行する

## 開発フロー

- feature ブランチを切り、PR ベースで開発する
- PR title は Conventional Commits 形式（`feat: ...`、`fix: ...`）
- PR description に変更の目的・設計判断・テスト結果を記録する
- closed PR 一覧が開発ストーリーとして読めるように意識する
- main への直 push 禁止

## 注意

- claude-assets-public 未整備のため、現在ルールは直書き。整備後に symlink に切り替える
