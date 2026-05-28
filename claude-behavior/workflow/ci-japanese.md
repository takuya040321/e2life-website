---
name: GitHub Actions のワークフロー名・ジョブ名は日本語で書く
description: CI レポートをユーザーが PR レビュー時に日本語で確認したい。`.github/workflows/*.yml` の `name:` フィールドを日本語にする
type: claude-behavior
---

GitHub Actions のワークフロー名・ジョブ名は日本語で書く。

**Why:** ユーザーが PR レビュー時に CI レポートを日本語で確認したい。英語のままだと指摘される。

**How to apply:** `.github/workflows/*.yml` のジョブ名（`name:` フィールド）を日本語にする。例: `name: リント（ESLint + Prettier）`、`name: ユニットテスト（Vitest）`。
