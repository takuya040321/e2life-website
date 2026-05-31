# Playwright getByRole の name はデフォルト部分一致

初出: 2026-05-31

## ハマりどころ

Playwright の `getByRole("link", { name: "AI" })` は、name が**デフォルトで部分一致**。
ナビの「AI」リンクを狙ったつもりが、ケーススタディの「**AI** 活用の詳細」リンクとも一致して
**複数マッチ（strict mode violation）→ E2E 失敗**になった。

## 対策

- 短い・他に含まれやすいラベルを狙うときは **`exact: true`** で厳密一致にする:
  ```ts
  await page.getByRole("link", { name: "AI", exact: true }).click();
  ```

## 切り分けの順序

1. E2E が複数マッチで落ちたら、まず狙ったテキストが**他要素の部分文字列**になっていないか確認
2. `exact: true`、または親要素でスコープを絞る（`page.getByRole("navigation").getByRole("link", ...)`）
