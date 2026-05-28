# 環境変数一覧

## 環境変数

### MVP

| 変数名                           | 用途                          | 必須 | 取得元                    |
| -------------------------------- | ----------------------------- | ---- | ------------------------- |
| `NEXT_PUBLIC_GA_ID`              | Google Analytics 測定 ID      | 必須 | Google Analytics 管理画面 |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 サイトキー       | 必須 | Google reCAPTCHA 管理画面 |
| `RECAPTCHA_SECRET_KEY`           | reCAPTCHA v3 シークレットキー | 必須 | Google reCAPTCHA 管理画面 |
| `CONTACT_EMAIL`                  | 問い合わせメール送信先        | 必須 | 自分のメールアドレス      |

- `NEXT_PUBLIC_` プレフィックスはクライアントサイドで使用する変数に付ける
- `RECAPTCHA_SECRET_KEY` はサーバーサイドのみで使用するため `NEXT_PUBLIC_` を付けない

### フェーズ 2

| 変数名                         | 用途                    | 必須 | 取得元                               |
| ------------------------------ | ----------------------- | ---- | ------------------------------------ |
| `GOOGLE_SHEETS_API_KEY`        | Sheets API 認証         | 必須 | Google Cloud Console                 |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | 対象スプレッドシート ID | 必須 | スプレッドシートの URL               |
| `GITHUB_TOKEN`                 | GitHub API 認証         | 必須 | GitHub Settings > Developer settings |

## .env.example

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6L...
RECAPTCHA_SECRET_KEY=6L...

# Contact
CONTACT_EMAIL=your-email@example.com

# Phase 2: Google Sheets API
# GOOGLE_SHEETS_API_KEY=
# GOOGLE_SHEETS_SPREADSHEET_ID=

# Phase 2: GitHub API
# GITHUB_TOKEN=
```

## Vercel での環境変数設定手順

### 1. プロジェクト設定を開く

Vercel ダッシュボード → プロジェクト → Settings → Environment Variables

### 2. 環境変数を追加

各変数を以下の環境に設定する:

| 環境        | 用途                                     |
| ----------- | ---------------------------------------- |
| Production  | 本番デプロイ（main ブランチ）            |
| Preview     | プレビューデプロイ（PR ごと）            |
| Development | ローカル開発（`vercel env pull` で取得） |

### 3. 環境ごとの設定方針

| 変数                             | Production         | Preview                        | Development      |
| -------------------------------- | ------------------ | ------------------------------ | ---------------- |
| `NEXT_PUBLIC_GA_ID`              | 本番用 ID          | 設定しない（トラッキング不要） | 設定しない       |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | 本番用キー         | テスト用キー                   | テスト用キー     |
| `RECAPTCHA_SECRET_KEY`           | 本番用キー         | テスト用キー                   | テスト用キー     |
| `CONTACT_EMAIL`                  | 本番メールアドレス | テスト用アドレス               | テスト用アドレス |

### 4. ローカル開発での取得

```bash
# Vercel CLI で環境変数をローカルに取得
vercel env pull .env.local
```

`.env.local` は `.gitignore` に含まれており、リポジトリには commit されない。

## 注意事項

- `.env` / `.env.local` は絶対に commit しない（`.gitignore` で除外済み）
- シークレットキーは `NEXT_PUBLIC_` プレフィックスを付けない
- reCAPTCHA のテスト用キーは Google が公開している固定値を使用する
- フェーズ 2 の変数は MVP 時点ではコメントアウトしておく
