---
name: PR マージは --merge（no-ff）で枝分かれが見えるようにする
description: gh pr merge は --merge を使い、--squash や --rebase は使わない。git log --graph でブランチの枝分かれが残るようにする
type: claude-behavior
---

PR のマージは `gh pr merge --merge`（merge commit、no-ff）を使う。squash や rebase ではなく、ブランチの枝分かれが `git log --graph` で見えるようにする。

**Why:** ユーザーが「きちんと枝分かれがわかるようにマージして」と指示。コミット履歴を開発ストーリーとして読めることを重視している。

**How to apply:** `gh pr merge <number> --merge` を使う。`--squash` や `--rebase` は使わない。

関連: [commit-granularity.md](commit-granularity.md)
