# Claude への指摘・改善ルール

> ユーザーからの指摘やルール違反から導出した再発防止ルール。
> 起動時に `@import` で自動ロードされる。

## workflow（タスク実行時の注意）

- [CI のジョブ名・レポートを日本語にする](workflow/ci-japanese.md) — GitHub Actions の `name:` フィールドは日本語で書く
- [コミットは責務ごとに細かく分割する](workflow/commit-granularity.md) — セットアップ・実装・テスト・CI・スタイルを 1 コミットに混ぜない
- [コミットメッセージは type(scope) を正確に使い分ける](workflow/commit-message-type.md) — feat / fix / chore / test / ci / docs / style / refactor / perf を内容に合わせる
- [Issue 部分対応 PR では Closes を使わない](workflow/issue-close-keyword.md) — 全タスク完了時のみ `Closes #N`、部分対応は `Refs #N`
- [PR マージは --merge（no-ff）で枝分かれを残す](workflow/pr-merge-strategy.md) — squash / rebase は使わない
- [1 Issue = 1 PR を厳守する](workflow/one-issue-one-pr.md) — Issue は PR 1 つで完了できるサイズに分割

## 関連

- 本層は CLAUDE.md の `@import` で自動ロードされる
- 全リポ共通ルールは PA repo `claude-assets/rules/`（private）に集約
- claude-assets-public 整備後は symlink 配備に切り替え予定
