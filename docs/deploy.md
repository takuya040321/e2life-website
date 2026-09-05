# デプロイ手順

## Vercel プロジェクト設定

### 初期セットアップ

1. Vercel にログイン（GitHub 連携）
2. 「Add New Project」から GitHub リポジトリ `e2life-website` をインポート
3. 以下を設定:

| 項目             | 設定値                           |
| ---------------- | -------------------------------- |
| Framework Preset | Next.js                          |
| Build Command    | `pnpm build`                     |
| Output Directory | `.next`（デフォルト）            |
| Install Command  | `pnpm install --frozen-lockfile` |
| Node.js Version  | 22.x                             |

### プロジェクト設定

| 項目        | 設定値                |
| ----------- | --------------------- |
| プラン      | Hobby（無料）         |
| リージョン  | Tokyo (hnd1)          |
| Auto-deploy | 有効（main ブランチ） |

## ドメイン設定

### Vercel 標準サブドメインで運用

- プライマリ URL は Vercel 標準サブドメイン `e2life-website.vercel.app`
- SSL 証明書は Vercel が自動発行・更新
- 独自ドメイン (`e2life.dev`) は 2026-07 に運用終了 (経緯: PA repo `decisions/website/`)

## 環境変数設定

env-vars.md を参照。Vercel ダッシュボードの Settings → Environment Variables から設定する。

## デプロイフロー

### 通常フロー

```
ローカルで開発
  → ローカル Claude Hooks (push 前) で品質ゲート通過
    (format / lint / type-check / unit test / build / E2E / Lighthouse 直列)
  → main に直 push（個人 site で 1 人作業、PR 廃止済み）
  → GitHub Actions が format / lint / type-check / unit test を実行
    (push の出所を問わず必ず走る層。ローカル Hooks が発火しない経路の受け皿)
  → Vercel が本番に自動デプロイ
```

品質ゲートは手元と GitHub の二層構成。どちらに何を置いているかと、その理由は testing.md を参照。

### プレビューデプロイ

- PR を作成すると Vercel が自動でプレビュー URL を生成する
- URL 形式: `https://e2life-website-<hash>-<username>.vercel.app`
- PR にコメントとしてプレビュー URL が投稿される
- PR を更新するたびにプレビューも自動更新

### 本番デプロイ

- main ブランチにマージすると自動で本番デプロイが実行される
- デプロイ完了まで通常 1 分以内
- ゼロダウンタイムデプロイ（Immutable Deployments）

### デプロイ確認

デプロイ後に以下を確認する:

- Vercel ダッシュボードでデプロイステータスが「Ready」
- 本番 URL（https://e2life-website.vercel.app）でページ表示を確認
- Lighthouse スコアが基準値を満たしているか

## ロールバック手順

### Vercel ダッシュボードからのロールバック

1. Vercel ダッシュボード → Deployments
2. ロールバック先のデプロイを選択
3. 「...」メニュー → 「Promote to Production」
4. 即座に指定したデプロイが本番に切り替わる

### git revert によるロールバック

問題のあるコミットを revert して main に直 push する:

```bash
git revert <commit-hash>
git push origin main
# Vercel が自動で本番デプロイ
```

### 注意事項

- Vercel ダッシュボードからのロールバックは即座に反映される
- git revert はテスト・レビューを経てからデプロイされるため安全
- 緊急時は Vercel ダッシュボード、通常は git revert を使う
