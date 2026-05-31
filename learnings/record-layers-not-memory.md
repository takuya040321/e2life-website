# 記録は repo 内の record-layers に取る（標準メモリは使わない）

初出: 2026-05-31

## 知見

Claude セッションの振り返り・判断・知見は、**repo 内の record-layers**
（`conversations/` `decisions/` `learnings/` `claude-behavior/`）に記録する。

Claude Code 標準のメモリ（`~/.claude/.../memory/`）は**使わない（旧方式・廃止）**。理由は:

- **ローカル限定 + git 管理外**で、可視化・棚卸し・レビューに不向き
- repo ごとに分けられない（user-level でしか効かない）

→ 各 repo の root に記録層を置き、`CLAUDE.md` の `@claude-behavior/README.md` で `@import` して
起動時にロードする方式に統一されている。

## 配備

- `bash ~/projects/claude-assets/bin/install-record-layers.sh <repo の root>` で starter README を配備
- 各層に最初のファイルを追加するとき、README の索引に 1 行追加する（conversations は索引なし・月別サブディレクトリ）
- 運用ルールの原本: `~/projects/claude-assets/rules/record-layers.md`

## 層の使い分け（要約）

- `conversations/` — 対話の経緯（時系列）
- `decisions/` — 判断とその理由
- `learnings/` — 再利用できる知見（このファイルもここ）
- `claude-behavior/` — Claude への再発防止トリガー
