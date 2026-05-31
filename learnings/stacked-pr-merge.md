# スタック PR のマージで --delete-branch を使わない

初出: 2026-05-31

## 症状

スタック PR（PR-B の base が PR-A の feature ブランチ、のように PR を積み上げる構成）で、
`gh pr merge <PR-A> --merge --delete-branch` を実行すると、**PR-A の base ブランチが削除**され、
それを base にしていた **PR-B が自動的にクローズ**される。クローズされた PR は base ブランチが
消えているため `gh pr reopen` も失敗する。

## 対策

- スタック PR のマージでは **`--delete-branch` を使わない**
- 上流（PR-A）をマージしたあと、下流（PR-B）の base を main へ**手動変更**してからマージする:
  ```
  gh pr merge <PR-A> --merge
  gh pr edit <PR-B> --base main
  # <PR-B> の CI / mergeable を確認してから
  gh pr merge <PR-B> --merge
  ```
- ブランチ削除はすべてのマージが終わってからまとめて行う

## リカバリ（誤ってクローズされた場合）

- head ブランチが残っていれば、`gh pr create --base main --head <head>` で**同一ブランチから PR を作り直す**
