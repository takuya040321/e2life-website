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

### e2life.dev の取得と設定

1. Vercel ダッシュボード → Settings → Domains
2. `e2life.dev` を追加（Vercel 経由で取得、年 $12〜15）
3. DNS 設定は Vercel が自動管理
4. SSL 証明書も自動発行・更新

### ドメイン構成

| ドメイン         | 設定                                    |
| ---------------- | --------------------------------------- |
| `e2life.dev`     | プライマリドメイン                      |
| `www.e2life.dev` | `e2life.dev` にリダイレクト             |
| `*.vercel.app`   | Vercel デフォルトドメイン（残しておく） |

## 環境変数設定

env-vars.md を参照。Vercel ダッシュボードの Settings → Environment Variables から設定する。

## デプロイフロー

### 通常フロー

```
feature ブランチで開発
  → PR 作成
  → Vercel がプレビュー URL を自動生成
  → GitHub Actions でテスト自動実行
  → コードレビュー + プレビュー確認
  → main にマージ
  → Vercel が本番に自動デプロイ
```

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
- 本番 URL（https://e2life.dev）でページ表示を確認
- Lighthouse スコアが基準値を満たしているか

## ロールバック手順

### Vercel ダッシュボードからのロールバック

1. Vercel ダッシュボード → Deployments
2. ロールバック先のデプロイを選択
3. 「...」メニュー → 「Promote to Production」
4. 即座に指定したデプロイが本番に切り替わる

### git revert によるロールバック

問題のあるコミットを revert して新しい PR を作成する:

```bash
git revert <commit-hash>
git push origin <branch>
# PR 作成 → マージ → 自動デプロイ
```

### 注意事項

- Vercel ダッシュボードからのロールバックは即座に反映される
- git revert はテスト・レビューを経てからデプロイされるため安全
- 緊急時は Vercel ダッシュボード、通常は git revert を使う
