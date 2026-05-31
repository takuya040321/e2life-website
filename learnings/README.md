<!--
  claude-assets/templates/record-layers/learnings-README.md から配備された starter README。
  この repo で初めて learnings/ にファイルを追加するときに索引へ 1 行追加する。
  運用ルールの原本: claude-assets/rules/record-layers.md「各層の README.md 整備ルール」
-->

# 再利用できる知見

> 次に同じ場面で困らないための How-To / トラブルシュート集。
> 必要なときにここから個別ファイルへ辿る(`@import` しない)。

## 索引

<!-- 最初のファイルを追加したら 1 行サマリ付きで並べる。件数が増えたら H2 でカテゴリ分け -->
<!-- 例: - [<topic>.md](<topic>.md) — <1 行サマリ> -->

(まだ知見なし)

## 書く / 書かない

- **書く**: トラブルシュート手順、ツール / API のハマりどころ、設定値の意味と使い分け、メタな教訓
- **書かない**: この repo 1 回限りの判断(→ `decisions/`)、対話の経緯(→ `conversations/`)、公式 doc の丸写し

## ファイル名規則

- `<topic>.md`(kebab-case 推奨)。日付は中身の冒頭に書く。同じトピックは追記する

## 棚卸し

- **月 1 定期**(目安: 月初のセッション)
- **件数 20 件超で視認性チェック**(H2 でカテゴリ分けを検討)
- 確認軸: 本体ファイルとの整合 / 1 行サマリの現状一致 / 重複・統合余地 / 件数閾値超過時の構造化

詳細運用: `.claude/rules/record-layers.md` の「各層の README.md 整備ルール」
