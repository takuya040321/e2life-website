# e2life-website

e2life.dev の個人 Web サイト。Next.js 16 + Vercel。

## 技術スタック

| レイヤー          | 技術                                  |
| ----------------- | ------------------------------------- |
| フレームワーク    | Next.js 16 (App Router)               |
| 言語              | TypeScript                            |
| スタイリング      | Tailwind CSS                          |
| UI コンポーネント | shadcn/ui                             |
| アニメーション    | Framer Motion                         |
| フォーム          | React Hook Form + reCAPTCHA v3        |
| テスト            | Vitest + Testing Library + Playwright |
| ホスティング      | Vercel                                |

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
- main 直 push OK（個人 site で 1 人作業のため、PR 必須を 2026-06-01 に廃止）

## コード品質基準

このリポは public。ソースコード自体がポートフォリオとして評価される。

- ESLint + Prettier を厳密に設定し、一貫したコードスタイルを維持する
- TypeScript strict mode + any 禁止
- コンポーネントは責務を明確に分離する（UI / ロジック / データ取得）
- ディレクトリ構成は App Router のベストプラクティスに沿う
- commit message に「なぜこう作ったか」の設計判断を記録する
- README.md はアーキテクチャ・セットアップ手順・テスト戦略を網羅する
- 品質ゲートはローカル Claude Hooks (`.claude/settings.json` の PreToolUse) に集約し、`git push` 前に format / lint / 型チェック / unit test / build / E2E / Lighthouse を直列実行する

## 開発フロー

- main 直 push で開発する（PR なし、個人 site で 1 人作業のため）
- commit title は Conventional Commits 形式（`feat: ...`、`fix: ...`）
- commit message に変更の目的・設計判断・テスト結果を記録する
- commit log が開発ストーリーとして読めるように意識する

## Claude への指摘・改善記録

`claude-behavior/` 配下に記録する（PA repo の 5 層構造に準拠）。
`claude-behavior/README.md` は `@import` で起動時に自動ロード。

## 注意

- claude-assets-public 未整備のため、現在ルールは直書き。整備後に symlink に切り替える

@claude-behavior/README.md

@.claude/about-me/README.md
