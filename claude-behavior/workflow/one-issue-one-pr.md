---
name: 1 Issue = 1 PR を厳守する
description: Issue は PR 1 つで完了できるサイズに分割し、PR は必ず Closes #N で Issue を閉じる
type: claude-behavior
---

1 Issue = 1 PR を厳守する。Issue は PR 1 つで完了できるサイズに分割し、PR は必ず `Closes #N` で Issue を閉じる。

**Why:** PR #5 で `Closes #4 の一部` と書いたところ、フェーズ 3〜5 が未完了なのに Issue が自動クローズされた。`Refs` で中途半端に紐づける運用はミスの温床になる。

**How to apply:**

- 大きなタスクはフェーズごとに別 Issue に分割してから着手する
- PR description では必ず `Closes #N` を使い、対象 Issue を完全に完了させる
- `Refs #N` での部分対応は禁止

**スコープ:** 全リポ共通ルール。PA `claude-assets/rules/git.md` および `task-management.md` R5 に統合済み。

関連: [issue-close-keyword.md](issue-close-keyword.md)
