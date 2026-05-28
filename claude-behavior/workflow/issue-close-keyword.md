---
name: Issue を部分的にしか対応していない PR では Closes キーワードを使わない
description: GitHub の自動クローズキーワード（Closes / Fixes / Resolves）は PR マージ時に Issue を自動クローズする。残作業がある状態で使うと事故になる
type: claude-behavior
---

Issue を部分的にしか対応していない PR では `Closes #N` / `Fixes #N` / `Resolves #N` を書かない。マージ時に自動クローズされてしまう。

**Why:** PR #5 で `Closes #4 の一部` と書いたところ、GitHub が `Closes #4` を検出して Issue を自動クローズしてしまった。チェックボックスが残っているのにクローズされるのは不適切。

**How to apply:** 部分対応の場合は `Refs #4`、`#4 のフェーズ 1〜2 を対応` など、自動クローズキーワードを避けた表現を使う。全タスク完了の最終 PR でのみ `Closes #N` を使う。

関連: [one-issue-one-pr.md](one-issue-one-pr.md)
