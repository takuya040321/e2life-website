---
name: git add は対象を分離し staged 内容を確認してからコミットする
description: 削除済みファイルや存在しないパスを git add の引数に混ぜると pathspec エラーで add 全体が失敗し、コミット内容が欠落する。commit 前に staged 内容を確認する
type: claude-behavior
---

`git add a b c` のように複数パスを一度に指定したとき、1 つでも存在しないパス（特に `git rm` 済みの削除ファイル）が混ざると pathspec エラーで **add 全体が中断**し、何もステージされない。これに気づかず `git commit` すると、意図したファイルが入らない欠落コミットになる。

**Why:** 実際にこのミスが発生した。`git rm` 済みの `sitemap.ts` を `git add robots.ts layout.tsx sitemap.ts` に混ぜたため add が失敗、最初の chore コミットが削除のみになり、`git reset --soft` でやり直す羽目になった。コミット粒度を重視するこのリポでは、欠落コミットは特に避けたい（[commit-granularity.md](commit-granularity.md)）。

**How to apply:**

- 削除（`git rm` 済み）の反映と、変更・追加ファイルの `git add` を **混ぜない**。削除はそれ自体で既にステージされている
- `git add` 実行後・`git commit` 前に必ず `git status -s` または `git diff --staged --stat` で**ステージ内容を確認**する
- 複数コミットを連続で作る場合、各 `git add` の結果を確認してから次へ進む（チェーン実行で 1 つの失敗を見落とさない）

関連: [commit-granularity.md](commit-granularity.md)
