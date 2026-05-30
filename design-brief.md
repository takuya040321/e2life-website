# e2life.dev デザインブリーフ

Claude Design 連携用のブランド・コンテンツ要約。デザイン刷新案を生成する際の入力として使う。

## サイトの性格

- 個人ポートフォリオサイト（e2life.dev）
- コンセプト: **「AI で開発プロセス自体を設計するエンジニア」**
- 訴求の核: マルチエージェント構成による品質管理と、自己改善する開発プロセス
- 公開リポであり、ソースコード自体がポートフォリオとして評価される

## 技術スタック

| レイヤー       | 技術                           |
| -------------- | ------------------------------ |
| フレームワーク | Next.js 16 (App Router)        |
| 言語           | TypeScript (strict / any 禁止) |
| スタイリング   | Tailwind CSS v4                |
| UI             | shadcn/ui                      |
| アニメーション | Framer Motion                  |
| フォーム       | React Hook Form + reCAPTCHA v3 |
| ホスティング   | Vercel                         |

## カラートークン（現状: shadcn neutral ベース）

CSS 変数は `src/app/globals.css` の `:root` / `prefers-color-scheme: dark` で定義。

### Light

| トークン        | 値        |
| --------------- | --------- |
| background      | `#ffffff` |
| foreground      | `#0a0a0a` |
| primary         | `#171717` |
| primary-fg      | `#fafafa` |
| secondary/muted | `#f5f5f5` |
| muted-fg        | `#737373` |
| border / input  | `#e5e5e5` |
| destructive     | `#ef4444` |

### Dark

| トークン        | 値        |
| --------------- | --------- |
| background      | `#0a0a0a` |
| foreground      | `#fafafa` |
| primary         | `#fafafa` |
| primary-fg      | `#171717` |
| secondary/muted | `#262626` |
| muted-fg        | `#a3a3a3` |
| border / input  | `#262626` |
| ring (dark)     | `#d4d4d4` |

- radius: `0.625rem`（`--radius`）
- font: Geist Sans（本文・見出し） / Geist Mono（コード）

## ページ構成

| パス       | 役割                                              | 主要セクション                     |
| ---------- | ------------------------------------------------- | ---------------------------------- |
| `/`        | トップ                                            | Hero → Strengths → CaseStudy → CTA |
| `/skills`  | スキル一覧（カテゴリフィルタ付き）                | SkillGrid + CategoryFilter         |
| `/career`  | 職務経歴（**匿名化済み**・顧客名/金額を含めない） | CareerCard 群                      |
| `/contact` | 問い合わせ                                        | ContactForm + reCAPTCHA v3         |

レイアウト共通: ヘッダー / フッター、コンテンツ幅 `max-w-5xl`、左右 `px-6`。

## Hero の現状コピー

- 見出し: 「AI で開発プロセス自体を設計するエンジニア」
- 補足: 「マルチエージェント構成による品質管理と、自己改善する開発プロセスで、プロジェクトの生産性を根本から変えます。」
- CTA: 「お問い合わせ」 / 「スキルを見る」

## トーン & 制約

- トーン: 信頼感・先端感・読みやすさ。過剰演出より「品質と構造」を感じさせる。
- 日本語 UI。レスポンシブ必須。
- 個人情報・具体的事業判断・顧客名・契約金額を一切含めない。
- ダークモード対応（`prefers-color-scheme`）。

## 探索したいデザイン方向（4 案）

1. **洗練ミニマル** — 大胆な余白、タイポグラフィ主役、モノクロ + 1 アクセント。
2. **開発者ターミナル風** — モノスペース、グリッド線、コードブロック風 UI、緑/シアンのアクセント。
3. **ダーク AI モダン** — ダーク基調、グラデーション/グロー、微細なノイズ、Framer Motion の動き。
4. **エディトリアル** — 超大型見出し、非対称レイアウト、セリフ見出し + サンセリフ本文。

各案とも Hero / Strengths / CaseStudy / CTA まで描き、横並び比較できる形が望ましい。
