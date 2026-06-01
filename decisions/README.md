<!--
  claude-assets/templates/record-layers/decisions-README.md から配備された starter README。
  この repo で初めて decisions/ にファイルを追加するときに索引へ 1 行追加する。
  運用ルールの原本: claude-assets/rules/record-layers.md「各層の README.md 整備ルール」
-->

# 判断の記録

> なぜそう決めたか、他の案をなぜ却下したかを残す。
> 同じ判断を見直すときにここから辿る。必要時に参照する層(`@import` しない)。

## 索引

- [2026-05-30-dark-ai-design.md](2026-05-30-dark-ai-design.md) — サイトデザインをダーク AI モダン（D2 グリッド）に採用
- [2026-05-31-drop-data-auto-sync.md](2026-05-31-drop-data-auto-sync.md) — データ自動同期を廃止し手動運用に
- [2026-05-31-ai-pages-content-scope.md](2026-05-31-ai-pages-content-scope.md) — AI 詳細ページは公開可能な技術枠組みのみ掲載
- [2026-06-01-drop-pr-workflow.md](2026-06-01-drop-pr-workflow.md) — PR 必須運用を廃止し main 直 push 運用に

## 書く / 書かない

- **書く**: 採用した方針 / 設計、なぜそれを選んだか、却下した代替案と理由、見直しトリガー
- **書かない**: 単なる作業ログ(→ `conversations/`)、汎用 How-To(→ `learnings/`)

## ファイル名規則

- `YYYY-MM-DD-<topic>.md`、または対象が安定なら `<対象>.md`(冒頭に決定履歴の表で追記型)

## 棚卸し

- **月 1 定期**(目安: 月初のセッション)
- **件数 20 件超で視認性チェック**(H2 でカテゴリ分けを検討)
- 確認軸: 本体ファイルとの整合 / 1 行サマリの現状一致 / 重複・統合余地 / 件数閾値超過時の構造化

詳細運用: `.claude/rules/record-layers.md` の「各層の README.md 整備ルール」
