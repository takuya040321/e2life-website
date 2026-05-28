---
name: コミットは責務ごとに細かく分割する
description: セットアップ・実装・テスト・CI・スタイルなどを 1 コミットに混ぜず、論理的な単位ごとに分ける
type: claude-behavior
---

コミットは責務の単位で分割する。セットアップ・レイアウト・ページ・テスト・CI・スタイル修正などを 1 コミットにまとめてはいけない。

**Why:** ユーザーが PR レビュー時にコミット粒度を確認している。closed PR 一覧が開発ストーリーとして読めることを重視している（CLAUDE.md の開発フローに記載）。

**How to apply:** 作業完了後にまとめてコミットするのではなく、論理的な単位ごとにコミットを分ける。例: `chore(deps)` → `chore(lint)` → `chore(test)` → `feat(layout)` → `feat(pages)` → `test(unit)` → `ci` → `style(docs)`。

関連: [commit-message-type.md](commit-message-type.md)
