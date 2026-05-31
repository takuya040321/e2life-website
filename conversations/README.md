<!--
  claude-assets/templates/record-layers/conversations-README.md から配備された starter README。
  conversations/ は件数が無限増殖するため索引は作らない。README は運用ルールのみ。
  運用ルールの原本: claude-assets/rules/record-layers.md「conversations(対話の経緯層)」
-->

# 対話の経緯

> セッションとユーザーの対話の経緯を時系列で残す。
> 件数が無限増殖するため **索引は作らない**。月別サブディレクトリとファイル名で時系列把握する。

## 運用ルール

- **配置**: `conversations/YYYY-MM/YYYY-MM-DD-<topic>.md`(月別サブディレクトリで仕切る)
- **書く**: 議論の往復(質問・回答・差し戻し)、途中で出た代替案・却下案の検討、解釈の食い違いを埋めたやりとり、結論の背後にある文脈
- **書かない**: 結論だけ(→ `decisions/`)、再利用可能な汎用知見(→ `learnings/`)、着手単位のタスク(→ Issue / `tasks.yaml`)

## なぜ索引(README の 1 行サマリ運用)を作らないか

月 30〜50 件規模の時系列ログに 1 行サマリを付け続ける運用は破綻する。
ファイル名(`YYYY-MM-DD-<topic>.md`)と月別サブディレクトリの自然な仕切りで時系列把握できれば十分。

詳細運用: `.claude/rules/record-layers.md` の「conversations(対話の経緯層)」
