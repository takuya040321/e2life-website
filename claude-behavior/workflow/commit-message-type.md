---
name: コミットメッセージは type(scope) を内容に合わせて正確に使い分ける
description: feat / fix / chore / test / ci / docs / style / refactor / perf を変更内容に合わせて選び、scope で対象を明示する
type: claude-behavior
---

コミットメッセージの `<type>(<scope>): <subject>` を内容に合った type で正確に使い分ける。`feat` は新機能のみ、設定系は `chore`、テストは `test`、CI は `ci` など。

**Why:** ユーザーがコミットメッセージの内容が適切でないと指摘。type と実際の変更内容が一致していることを重視している。

**How to apply:** `docs/coding-standards.md` の type 一覧（feat / fix / docs / style / refactor / test / chore / perf）に従い、scope でさらに対象を明示する。例: `chore(deps):`、`feat(layout):`、`test(unit):`。

関連: [commit-granularity.md](commit-granularity.md)
