# 和モダン刷新 実装計画書 (2026-06-04)

## 1. 概要

e2life.dev の全ページデザインを **和モダン (墨と朱)** へ刷新する。
既存「ダーク AI モダン (赤→オレンジグロー)」方針を上書きする。

- 採用デザインモック: `docs/design-proposals/2026-06-04/design-05-japanese-modern.png`
- バリエーション比較資料: `docs/design-proposals/2026-06-04/design-01〜05D-*.png`
- 実装方式: Codex CLI による段階的 commit (Phase 単位)
- 計画書作成: Claude Code (PA) / 実装: Codex
- 監督: Claude Code (PA) が Phase 完了ごとに成果物をモック照合レビュー

### 重要な前提

- **本 repo は公開 repo** (e2life.dev のソース)。顧客名・契約金額・案件具体情報は一切含めない。`career/` の匿名化方針を維持。落款 SVG の刻印・metadata にも本名・イニシャルを含めない (干支「戌」or "e2life" の範囲内に限定)。
- **採用は case 5 のみ**。5A/5B/5C/5D のバリエーション要素は採用しない。5C の参考は **ダークモードの色彩のみ流用** し、構造は case 5 を維持する。

## 2. 採用デザインの核

「AI で開発プロセス自体を設計するエンジニア」を **和の余白と書道タッチで表現** する。
他のエンジニアポートフォリオと混ざらない唯一性を獲得するためのリブランディング。

主要視覚要素:

- 和紙テクスチャ背景 (生成り色)
- 大きな墨の円相 (Hero の主役)
- 朱の落款 (アクセント、ロゴ的に使う)
- 明朝体 (Noto Serif JP) メイン + Geist Mono 補助
- 縦組みアクセント (副次的に演出)
- 余白の徹底活用

## 3. デザイントークン (和モダン版)

`src/app/globals.css` の `:root` と `@media (prefers-color-scheme: dark)` の両方を **同一 commit (Phase 1) で更新** する。Tailwind v4 の `@theme inline` ブロックは構造維持。

| 用途 | ライト | ダーク (補助) |
|---|---|---|
| `--background` | `#f5f0e6` (和紙生成り) | `#0d0a08` (墨地) |
| `--card` | `#fbf8f1` (和紙微差) | `#15110e` |
| `--secondary` / `--muted` | `#ede4d3` (薄茶) | `#1c1814` |
| `--border` | `#d4c4a8` (砂色) | `#3a3128` |
| `--foreground` | `#1a1a1a` (墨色) | `#f5f0e6` |
| `--muted-foreground` | `#6b5f54` (薄墨) | `#a89986` |
| `--primary` | `#1a1a1a` (墨) | `#f5f0e6` |
| `--primary-foreground` | `#f5f0e6` | `#1a1a1a` |
| `--destructive` / `--ring` | `#c8331e` (朱) | `#d94a35` |
| `--accent` (新規: 朱) | `#c8331e` | `#d94a35` |
| `--accent-foreground` | `#f5f0e6` | `#f5f0e6` |
| `--gold` (新規: 差し色) | `#c9a87c` | `#d9b88c` |
| `--accent-from` / `--accent-to` | Phase 1 で **残置**、最終 Phase で削除 | — |

- `--radius`: `0.25rem` に変更 (角張った和の感じ、shadcn 標準より小さく)
- `--font-serif`: 新規追加 (`var(--font-noto-serif-jp)`)
- `--font-sans`: `var(--font-geist-sans)` + Noto Sans JP フォールバック維持
- `--font-mono`: `var(--font-geist-mono)` 維持

### 中間状態の管理

- Phase 1 では新トークンを **追加** し、旧トークン (`--accent-from` / `--accent-to`) を **残置**
- shadcn/ui コンポーネントが新トークンで意図せず変色しないことを Phase 1 commit 前に目視確認
- 旧トークン削除は最終 Phase (Phase 7) で全ページ刷新完了後にまとめて実施
- 各 Phase commit 後の main は「表示崩れなく」「両デザインの中間でも読める」状態を完了条件とする

## 4. ビジュアルアセット

### 4.1 和紙テクスチャ

- `public/textures/washi.svg` (新規) — SVG パターン、軽量 < 5KB
- 不透明度を背景に対し 6〜10% 程度 (可読性優先)
- 全ページ共通の body 背景に CSS で重ねる

### 4.2 円相 (Enso)

- `public/illustrations/enso.svg` (新規)
- 筆運びの滲み・かすれを SVG パスで再現
- Framer Motion で `pathLength` アニメ (1.2 秒、初回ロード時のみ)
- Hero の主役要素

### 4.3 落款 (Hanko)

- `public/illustrations/hanko-e2life.svg` (新規)
- 朱の角印モチーフ、刻印は `e2life` or `戌` (干支、本人特定リスク低)
- **SVG の中身 (path / title / desc / metadata) に本名・イニシャル等の個人特定情報を含めない**
- Footer 右下 + Header の e2life.dev ロゴ脇に固定配置

### 4.4 墨の滲み

- `public/textures/sumi-blot.svg` (新規)
- セクション区切りや背景に淡く配置
- パフォーマンス重視で 1 〜 2 種類のバリエーションのみ用意

### 4.5 SVG 追加時のパフォーマンス確認

- Phase 2 commit 前に Lighthouse Performance スコアが Phase 0 計測値 (下記 9.1) を下回らないことを確認
- 4KB を超える SVG はインライン化 vs 外部ファイル化を選定 (Performance 結果次第)

## 5. ページ別実装方針

### `/` トップ (`src/app/(marketing)/page.tsx`)

| セクション | 構成 |
|---|---|
| Hero | 大きな円相 (SVG, Framer Motion フェードイン) + 横組み明朝見出し + 朱の落款 (右上 or 左下) + 縦組みサブ「実績を見る」 |
| Strengths | 3 つのカード、和紙背景に墨と朱の細罫線、見出しは明朝、本文は Geist Sans |
| CaseStudy | 縦タイムライン、墨色の縦線 + 朱の点でフェーズ表示 |
| CTA | 朱の角ボタン「お問い合わせ」(主)、墨の枠線ボタン「スキルを見る」(副) |

### `/skills` (`src/app/(detail)/skills/page.tsx`)

- カテゴリフィルタ: 横並びの墨ライン、選択中はテキスト下に朱の細線
- SkillGrid: 和紙風カード、墨で囲み朱の差し色 (習熟度表示等)
- カテゴリラベルは明朝見出し優先、アイコンは控えめ

### `/career` (`src/app/(detail)/career/page.tsx`)

- CareerCard: 縦の墨線で連結、朱の点で時期マーク (タイムライン構造)
- 既存の匿名化方針を維持 (顧客名・契約金額なし)
- 巻物風の縦スクロール演出 (任意、Phase 5 内で判断)

### `/contact` (`src/app/(marketing)/contact/page.tsx`)

- フォーム: 和紙背景、墨の細罫線、フォーカス時に朱のリング
- 送信ボタン: 朱の角ボタン
- reCAPTCHA v3 既存維持
- 朱の落款を右下に固定

### `/ai` ハブ (`src/app/(detail)/ai/page.tsx`)

- 「AI で開発プロセス自体を設計するエンジニア」コンセプトの **具体性を支える本丸ページ**
- 6 サブテーマ (ecosystem / agents / recording / autonomous / security / sns-pipeline) へのナビ
- 和紙背景に墨の見出し、朱の番号 (壱・弐・参…) でナビ装飾
- 各サブページへのカードは円相風の囲みで統一

### `/ai/[slug]` サブページ (`src/app/(detail)/ai/[slug]/page.tsx`)

- 各テーマの詳細解説 (技術的具体性が和モダンで表現される唯一の場所)
- 本文タイポグラフィ: 明朝主役、コードブロックは Geist Mono + 墨枠
- mermaid 図表は和モダン配色に調整 (墨 + 朱 + 金)
- 図表内のテキストも明朝 (Noto Serif JP) で統一

### 共通レイアウト (`src/components/layout/`)

- Header: 半透明白和紙のオーバーレイ + e2life.dev ロゴ (左) + ナビ (右、明朝) + 落款ミニ
- Footer: 墨の薄い帯、朱の細線アクセント、コピーライト
- コンテンツ幅: `max-w-5xl` 維持、`px-6` 維持

## 6. アニメーション (Framer Motion)

| 対象 | アニメーション | 持続時間 |
|---|---|---|
| 円相 | 初回 SVG パス描画 | 1.2s |
| セクション登場 | フェードアップ (`y: 20 → 0, opacity: 0 → 1`) | 0.4s |
| 朱の落款 | hover で `y: -2px` | 0.2s |
| CTA ボタン | hover で背景色わずか暗転 | 0.15s |

過剰演出は避ける (「品質と構造」のトーンを維持)。
すべての装飾アニメは `prefers-reduced-motion` を尊重。

## 7. アクセシビリティ

- コントラスト比 WCAG AA 以上を維持
  - `#1a1a1a` on `#f5f0e6` → 14.4:1 (AAA)
  - `#c8331e` on `#f5f0e6` → 5.3:1 (AA Large、本文には使わずアクセントのみ)
  - `#6b5f54` on `#f5f0e6` → 5.2:1 (AA Body OK)
- 円相 SVG / 落款 SVG に `aria-hidden="true"` (装飾要素)
- 縦組み利用箇所 (writing-mode) には必ず横組みの代替テキスト or aria-label
- フォーカスリング: 朱の 2px 細線 (`outline-offset: 2px`)

## 8. ダークモード対応

- Phase 1 でライト / ダーク両方のトークンを同時更新 (中間状態を作らない)
- `prefers-color-scheme: dark` で墨地ベースに切り替え
- 円相は金色 (`var(--gold)`) に、落款は朱を維持
- ダークモードの色彩は `design-05c-dark-japanese.png` を参考に流用 (構造は case 5 を維持、5C のレイアウト要素は採用しない)
- 最終 Phase で微調整のみ

## 9. 実装フェーズ (Codex への分割指示単位)

### 9.0 Phase 0: 計測ベースライン取得 (Codex 着手前、Claude Code または手動)

- 現状の Lighthouse スコア (Performance / Accessibility / Best Practices / SEO) を計測
- `.lighthouserc.json` の `minScore` を現状値 + マージン -0.05 程度で **明示的に固定**
- 計測結果を `docs/lighthouse-baseline-2026-06-04.md` に記録
- 各 Phase 完了時にこの値を下回らないことを完了条件にする

### 9.1 Phase 一覧

| Phase | スコープ | 主要対象ファイル | commit メッセージ例 |
|---|---|---|---|
| 1 | デザイントークン更新 (ライト / ダーク両方同時) + Noto Serif JP フォント追加 + shadcn/ui 既存コンポーネントの色変色確認 + 既存 spec の影響範囲確認 | `src/app/globals.css`, `src/app/layout.tsx`, `src/components/ui/*` | `feat(design): switch tokens to Japanese-modern palette` |
| 2 | 和紙 / 円相 / 落款 / 墨滲み SVG アセット作成 + 共通レイアウト (Header / Footer) 刷新 + 影響 e2e spec の更新 | `public/textures/*`, `public/illustrations/*`, `src/components/layout/*`, 影響 `src/e2e/*.spec.ts` | `feat(design): add Japanese-modern visual assets and layout shell` |
| 3 | トップ (`/`) Hero / Strengths / CaseStudy / CTA 刷新 + Framer Motion 導入 + `navigation.spec.ts` / `responsive.spec.ts` / `seo.spec.ts` 更新 | `src/app/(marketing)/page.tsx`, `src/components/sections/*`, `src/e2e/{navigation,responsive,seo}.spec.ts` | `feat(top): redesign landing with enso hero and ink sections` |
| 4 | `/skills` 刷新 + `skills-filter.spec.ts` 更新 | `src/app/(detail)/skills/page.tsx`, `src/components/skills/*`, `src/e2e/skills-filter.spec.ts` | `feat(skills): apply Japanese-modern design` |
| 5 | `/career` 刷新 + `pdf-download.spec.ts` 更新 (該当する場合) | `src/app/(detail)/career/page.tsx`, `src/components/career/*`, `src/e2e/pdf-download.spec.ts` | `feat(career): apply Japanese-modern timeline` |
| 6 | `/contact` 刷新 + `contact-form.spec.ts` 更新 + `security.spec.ts` 確認 | `src/app/(marketing)/contact/page.tsx`, `src/components/contact/*`, `src/e2e/{contact-form,security}.spec.ts` | `feat(contact): apply Japanese-modern form` |
| 7 | `/ai` ハブ + `/ai/[slug]` 全 6 サブページ刷新 + mermaid 配色調整 + 旧トークン (`--accent-from` / `--accent-to`) 削除 + ダークモード最終調整 + 全 Lighthouse 再確認 | `src/app/(detail)/ai/**`, `src/components/ai/*`, `globals.css` (旧トークン削除) | `feat(ai): apply Japanese-modern to ai hub and subpages, finalize` |

### 9.2 各 Phase 完了条件

- 該当ページ / コンポーネントが和モダンデザインで表示される
- 影響する e2e spec が全パス
- `npm run lint` / `npm run test` / `npm run build` が全パス
- Lighthouse スコアが Phase 0 ベースライン値以上
- main 直 push (`CLAUDE.md` の方針に従う) 後の本番が表示崩れなし
- Claude Code (PA) がデザインモック (`design-05-japanese-modern.png`) と照合してレビュー、世界観のブレを次 Phase 指示に反映

## 10. Codex への引き継ぎテンプレ

Phase ごとに以下のテンプレで Codex に指示する想定:

```
e2life-website の和モダン刷新を Phase <N> として実装してください。

参照ドキュメント:
- 計画書: docs/implementation-plan-2026-06-04-japanese-modern.md
- デザインモック (採用案): docs/design-proposals/2026-06-04/design-05-japanese-modern.png
- ダーク色彩参考: docs/design-proposals/2026-06-04/design-05c-dark-japanese.png (色彩のみ流用、構造は case 5 を維持)
- Lighthouse ベースライン: docs/lighthouse-baseline-2026-06-04.md

今回のスコープ: <Phase N の内容>
対象ファイル: <表 9.1 の主要対象ファイル>

制約:
- TypeScript strict、any 禁止
- Tailwind v4 + shadcn/ui ベース
- Conventional Commits 形式
- main 直 push (PR 不要、e2life-website CLAUDE.md 準拠)
- 本 repo は公開 repo。顧客名・契約金額・本名・イニシャル・案件具体情報を含めない
- Lighthouse スコアは `docs/lighthouse-baseline-2026-06-04.md` の値以上
- 影響する e2e spec を同 commit に含める
- 旧トークン (`--accent-from` / `--accent-to`) は Phase 7 で削除、それまで残置

不明点・判断が必要な事項:
- ユーザー本人に直接質問せず、Claude Code (PA) 経由で確認すること
- Claude Code への確認は GitHub Issue or commit メッセージで明示

commit message に「なぜこう作ったか」を含めてください。
Phase 完了後、Claude Code (PA) がモック照合レビューを行います。
```

## 11. 既存 `design-brief.md` の扱い

Phase 1 着手時に `design-brief.md` を以下のように改訂する:

- 「採用デザイン: ダークAIモダン」セクションを **「採用デザイン: 和モダン (墨と朱)」** に置き換える
- 旧トークン表とコンセプトは **本 design-brief.md からは削除**、判断経緯は PA repo `decisions/se/` (or `personal-life/`) のデザイン方針記録に集約
- 本 design-brief.md 冒頭に PA decisions/ への参照リンクを追加 (「経緯は PA decisions/ を参照」)
- 本実装計画書へのリンクも冒頭に追加

(設計趣旨: `quality/decisions-edit-history-vs-current.md` 規律に従い、design-brief.md は現役運用文として最新方針のみ保持、判断経緯は PA decisions に分離)

## 12. 関連リポへの申し送り

実装着手時に PA repo `decisions/se/` (or `personal-life/`) に新規方針判断として記録する。
本ドキュメント単独では PA への申し送りは行わない (PA セッション側で別途実施)。

## 13. リスクと回避策

| リスク | 回避策 |
|---|---|
| 「先端 AI コンセプト」と「和」の組み合わせが顧客に伝わらない | `/ai` ハブ + サブページ群で技術的具体性を和モダンで表現 (Phase 7)。FAQ / about セクションで意図補強 |
| 縦組み多用で可読性が落ちる | 主役は横組み、縦組みは演出のみ。`writing-mode` 使用箇所を限定 |
| 和紙テクスチャ・円相 SVG でパフォーマンスが落ちる | SVG パターン化、Phase 2 で個別計測、Lighthouse ベースライン維持 |
| ダークモード切替時の世界観の連続性 | Phase 1 でライト / ダーク両方同時更新、5C を色彩のみ流用 |
| 6+1 Phase 実装中に世界観がブレる | 各 Phase 完了時に Claude Code (PA) がデザインモックと照合、次 Phase 指示に反映 |
| main 直 push 中間状態で本番が崩れる | Phase 1 で旧トークン残置、各 Phase 完了条件に「表示崩れなし」追加、最終 Phase で旧トークン削除 |
| 既存 e2e spec / Playwright スナップショットがデザイン変更で壊れる | 各 Phase で影響 spec を同 commit に含める。Phase 1 で全 spec の影響範囲を事前確認 |
| `/ai` Phase を後回しにすると「世界観だけで中身が無い」と読まれる | `/ai` を Phase 7 に明示配置、Phase 7 完了で全体一貫性を保証 |
| 落款 SVG に本名・個人特定情報が混入 | Phase 2 commit 前に SVG 中身 (path / title / desc / metadata) を点検、刻印は `e2life` / `戌` に限定 |

## 14. 完了基準

- 全 6 ページ (`/`, `/skills`, `/career`, `/contact`, `/ai`, `/ai/[slug]` 全 6 テーマ) が和モダンデザインで表示される
- 旧トークン (`--accent-from` / `--accent-to`) が削除されている
- ライト / ダーク両モードで世界観が一貫している
- Lighthouse Performance / Accessibility / Best Practices / SEO スコアが Phase 0 ベースライン以上
- 全 e2e テスト (Playwright 7 spec) がパス
- `design-brief.md` が和モダン版に更新済み、判断経緯は PA decisions/ に分離
- Claude Code (PA) が全 Phase のモック照合レビュー完了

## 15. レビュー履歴

- 2026-06-04: 初版 (pa-reviewer / ceo-reviewer 並列レビューを通過)
  - pa-reviewer 指摘: 公開 repo 前提明示 / case 5 採用範囲明示 / 監督責務明示 / Codex 不明点経路明示 / 世界観ブレリスク追記 → すべて反映
  - ceo-reviewer 指摘: `/ai` 配下を Phase 7 に追加 / Phase 中間状態管理 (旧トークン残置) / e2e spec 更新計画 / ダークモード Phase 1 同時更新 / 落款 SVG 個人情報点検 / design-brief.md 履歴は PA decisions に分離 → すべて反映
