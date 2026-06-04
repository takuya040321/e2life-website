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

- **本 repo は公開 repo** (e2life.dev のソース)。顧客名・契約金額・案件具体情報は一切含めない。`career/` の匿名化方針を維持。落款 SVG の刻印・metadata にも本名・イニシャルを含めない (刻印は `e2life` で確定)。
- **採用は case 5 のみ**。5A/5B/5C/5D のバリエーション要素は採用しない。5C の参考は **ダークモードの色彩のみ流用** し、構造は case 5 を維持する。
- **Header ナビは日本語化** (AI / スキル / 経歴 / お問い合わせ)。`navigation.spec.ts` を同 commit で更新する。
- **円相・落款 SVG は codex-image スキルで事前生成** する。Phase 2 着手前に PNG (or SVG) を `public/illustrations/` 配下に配置完了させる。

## 2. 採用デザインの核

「AI で開発プロセス自体を設計するエンジニア」を **和の余白と書道タッチで表現** する。
他のエンジニアポートフォリオと混ざらない唯一性を獲得するためのリブランディング。

主要視覚要素:

- 和紙テクスチャ背景 (生成り色)
- 大きな墨の円相 (Hero の主役)
- 朱の落款 (アクセント、ロゴ的に使う、刻印 `e2life`)
- 明朝体 (Noto Serif JP) メイン + Geist Mono 補助
- 縦組みアクセント (副次的に演出)
- 余白の徹底活用

## 3. デザイントークン (和モダン版)

`src/app/globals.css` の `:root` と `@media (prefers-color-scheme: dark)` の両方を **同一 commit (Phase 1) で更新** する。Tailwind v4 の `@theme inline` ブロックに `--font-serif` と `--color-gold` を追加する。

| 用途                            | ライト                              | ダーク (補助)    |
| ------------------------------- | ----------------------------------- | ---------------- |
| `--background`                  | `#f5f0e6` (和紙生成り)              | `#0d0a08` (墨地) |
| `--card`                        | `#fbf8f1` (和紙微差)                | `#15110e`        |
| `--secondary` / `--muted`       | `#ede4d3` (薄茶)                    | `#1c1814`        |
| `--border`                      | `#d4c4a8` (砂色)                    | `#3a3128`        |
| `--foreground`                  | `#1a1a1a` (墨色)                    | `#f5f0e6`        |
| `--muted-foreground`            | `#6b5f54` (薄墨)                    | `#a89986`        |
| `--primary`                     | `#1a1a1a` (墨)                      | `#f5f0e6`        |
| `--primary-foreground`          | `#f5f0e6`                           | `#1a1a1a`        |
| `--destructive` / `--ring`      | `#c8331e` (朱)                      | `#d94a35`        |
| `--accent` (新規: 朱)           | `#c8331e`                           | `#d94a35`        |
| `--accent-foreground`           | `#f5f0e6`                           | `#f5f0e6`        |
| `--gold` (新規: 差し色)         | `#c9a87c`                           | `#d9b88c`        |
| `--accent-from` / `--accent-to` | Phase 1 で **残置**、Phase 7 で削除 | —                |

- `--radius`: `0.25rem` に変更 (角張った和の感じ)。shadcn の `rounded-lg` / `rounded-xl` は基本そのまま、`--radius` 変更で連動する
- `--font-serif`: 新規追加 (`var(--font-noto-serif-jp)`)、`@theme inline` に同時登録
- `--font-sans`: `var(--font-geist-sans)` + Noto Sans JP フォールバック維持
- `--font-mono`: `var(--font-geist-mono)` 維持

### Noto Serif JP の読み込み方針

- `weights`: `["400", "700"]` のみに絞る (Lighthouse Performance 配慮)
- `subsets`: `["latin"]` (Japanese は Variable Font の動的フォールバック、または `--font-noto-serif-jp` を `display: "swap"` で渡す)
- `display`: `"swap"`
- `preload`: `false` (LCP に直接効かない明朝主役の見出し以外を遅延)
- `variable`: `--font-noto-serif-jp`

### 中間状態の管理

- Phase 1 では新トークンを **追加** し、旧トークン (`--accent-from` / `--accent-to`) を **残置**
- shadcn/ui コンポーネントが新トークンで意図せず変色しないことを Phase 1 commit 前に目視確認
- 旧トークン削除は Phase 7 で全ページ刷新完了後にまとめて実施 (`grep -r "accent-from\|accent-to" src/ public/` で残存ゼロを完了条件とする)
- 各 Phase commit 後の main は「表示崩れなく」「両デザインの中間でも読める」状態を完了条件とする
- 旧 `bg-grid` 背景 (`src/app/layout.tsx`) は **Phase 2 で和紙テクスチャに置換**。Phase 1 では残置

## 4. ビジュアルアセット

### 4.1 和紙テクスチャ

- `public/textures/washi.svg` (新規、Codex 手書きで SVG パターン化)
- 軽量 < 5KB、不透明度 6〜10%
- 全ページ共通の body 背景に CSS で重ねる (Phase 2 で `bg-grid` から置換)

### 4.2 円相 (Enso)

- `public/illustrations/enso.png` (もしくは enso.svg、codex-image で事前生成)
- **生成方針**: codex-image スキルで墨の円相を単独生成 (透過 PNG)。Phase 2 着手前に Claude Code (PA) が生成して配置
- Hero の主役要素、Framer Motion で初回フェードイン (1.2 秒)
- 透過 PNG を採用する場合、サイズは 1024x1024 (高解像度) で配置し CSS で縮小表示

### 4.3 落款 (Hanko)

- `public/illustrations/hanko-e2life.png` (codex-image で事前生成)
- 朱の角印モチーフ、刻印は `e2life` で確定
- **SVG / PNG の中身 (path / title / desc / metadata / EXIF) に本名・イニシャル等の個人特定情報を含めない**
- Footer 右下 + Header の e2life.dev ロゴ脇に固定配置

### 4.4 墨の滲み

- `public/textures/sumi-blot.svg` (新規、Codex 手書きの SVG パスで滲み再現)
- セクション区切りや背景に淡く配置
- パフォーマンス重視で 1 〜 2 種類のバリエーションのみ用意

### 4.5 SVG / PNG 追加時のパフォーマンス確認

- Phase 2 commit 前に Lighthouse Performance スコアが Phase 0 計測値 (下記 9.1) を下回らないことを確認
- 4KB を超える SVG はインライン化 vs 外部ファイル化を選定 (Performance 結果次第)
- 円相 / 落款 PNG は WebP 変換も検討

## 5. ページ別実装方針

### 共通レイアウト (`src/components/layout/`)

- Header (`src/components/layout/header.tsx`):
  - ナビは **日本語化** (AI / スキル / 経歴 / お問い合わせ)
  - 半透明白和紙のオーバーレイ + e2life.dev ロゴ (左) + ナビ (右、明朝) + 落款ミニ (右端)
  - `navigation.spec.ts` を Phase 1 と同 commit で更新 (期待文字列 AI / Skills / Career / Contact → AI / スキル / 経歴 / お問い合わせ)
- Footer (`src/components/layout/footer.tsx`): 墨の薄い帯、朱の細線アクセント、コピーライト、朱の落款
- コンテンツ幅: `max-w-5xl` 維持、`px-6` 維持

### `/` トップ (`src/app/(marketing)/page.tsx` + `src/components/sections/*`)

| セクション | 構成                                                                                          | 対象ファイル                             |
| ---------- | --------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Hero       | 円相 + 横組み明朝見出し + 朱の落款 + 縦組みサブ                                               | `hero-section.tsx`, `hero-animation.tsx` |
| Strengths  | 3 カード、和紙背景に墨と朱の細罫線                                                            | `strengths-section.tsx`                  |
| CaseStudy  | 縦タイムライン、墨色の縦線 + 朱の点                                                           | `case-study-section.tsx`                 |
| CTA        | 朱の角ボタン「お問い合わせ」(主) + 墨枠線ボタン「スキルを見る」(副) + **PDF link は現状維持** | `cta-section.tsx`                        |

### `/skills` (`src/app/(detail)/skills/page.tsx`)

- 対象コンポーネント: `src/components/shared/{skill-grid,category-filter,skill-badge}.tsx`
- カテゴリフィルタ: 横並びの墨ライン、選択中はテキスト下に朱の細線
- フィルタ button の **アクセシブル名は維持** (`skills-filter.spec.ts` に影響しない範囲で見た目刷新)
- SkillGrid: 和紙風カード、墨で囲み朱の差し色
- カテゴリラベルは明朝見出し優先

### `/career` (`src/app/(detail)/career/page.tsx`)

- 対象コンポーネント: `src/components/shared/career-card.tsx`
- CareerCard: 縦の墨線で連結、朱の点で時期マーク (タイムライン構造)
- 既存の匿名化方針を維持 (顧客名・契約金額なし)
- 巻物風の縦スクロール演出 (任意、Phase 5 内で判断)

### `/contact` (`src/app/(marketing)/contact/page.tsx`)

- 対象コンポーネント: `src/components/shared/contact-form.tsx`
- フォーム: 和紙背景、墨の細罫線、フォーカス時に朱のリング
- フォーム field label と submit button 名は **維持** (`contact-form.spec.ts` に影響しない範囲で見た目刷新)
- reCAPTCHA v3 既存維持、ロジックは触らない
- 朱の落款を右下に固定

### `/ai` ハブ (`src/app/(detail)/ai/page.tsx`)

- 「AI で開発プロセス自体を設計するエンジニア」コンセプトの **具体性を支える本丸ページ**
- 6 サブテーマ (ecosystem / agents / recording / autonomous / security / sns-pipeline) へのナビ
- 現状ハブ内で直接使用している `[var(--accent-from)]` を朱 (`var(--accent)`) に置換
- カード装飾は和紙風 + 朱の番号 (壱・弐・参…) で和モダン化
- 各サブページへのカードは円相風の囲みで統一

### `/ai/[slug]` サブページ (`src/app/(detail)/ai/[slug]/page.tsx`)

- 各テーマの詳細解説 (技術的具体性が和モダンで表現される唯一の場所)
- 本文タイポグラフィ: 明朝主役、コードブロックは Geist Mono + 墨枠
- **mermaid 図表は今回スコープ外** (現コードに存在しない。将来 mermaid 導入時に和モダン配色を別途検討)
- データモデル (`src/lib/data/ai-topics.ts`) は触らず、見た目のみ刷新

## 6. アニメーション (Framer Motion)

`framer-motion` は導入済み (`hero-animation.tsx` で使用中)。Phase 3 では **円相 path アニメーションへの置換 + reduced-motion 対応** を行う (新規導入ではなく置換)。

| 対象           | アニメーション                               | 持続時間 |
| -------------- | -------------------------------------------- | -------- |
| 円相           | 初回 SVG パス描画 (または PNG フェードイン)  | 1.2s     |
| セクション登場 | フェードアップ (`y: 20 → 0, opacity: 0 → 1`) | 0.4s     |
| 朱の落款       | hover で `y: -2px`                           | 0.2s     |
| CTA ボタン     | hover で背景色わずか暗転                     | 0.15s    |

過剰演出は避ける (「品質と構造」のトーンを維持)。
すべての装飾アニメは `prefers-reduced-motion` を尊重 (既存 HeroAnimation に追従)。

## 7. アクセシビリティ

- コントラスト比 WCAG AA 以上を維持
  - `#1a1a1a` on `#f5f0e6` → 14.4:1 (AAA)
  - `#c8331e` on `#f5f0e6` → 5.3:1 (AA Large、本文には使わずアクセントのみ)
  - `#6b5f54` on `#f5f0e6` → 5.2:1 (AA Body OK)
- 円相 SVG / 落款 SVG に `aria-hidden="true"` (装飾要素)
- 縦組み利用箇所 (writing-mode) には必ず横組みの代替テキスト or aria-label
- フォーカスリング: 朱の 2px 細線 (`outline-offset: 2px`)
- フィルタ button / フォーム label / submit button の **アクセシブル名は現状維持** (e2e spec 安定のため)

## 8. ダークモード対応

- Phase 1 でライト / ダーク両方のトークンを同時更新 (中間状態を作らない)
- `prefers-color-scheme: dark` で墨地ベースに切り替え
- 円相は金色 (`var(--gold)`) に、落款は朱を維持
- ダークモードの色彩は `design-05c-dark-japanese.png` を参考に流用 (構造は case 5 を維持、5C のレイアウト要素は採用しない)
- Phase 7 で全体一貫性を最終調整

## 9. 実装フェーズ (Codex への分割指示単位)

### 9.0 Phase 0: 計測ベースライン取得 (Codex 着手前、Claude Code または手動)

- **`.lighthouserc.json` の URL 配列を更新**: 既存 `/`, `/skills`, `/career`, `/contact` に加えて `/ai` と代表 slug `/ai/ecosystem` を追加
- 現状の Lighthouse スコアを **全 URL について計測** (Performance / Accessibility / Best Practices / SEO)
- `.lighthouserc.json` を **URL-specific assertion** (`assertMatrix`) で設定する。global floor は弱いため採用しない:
  - 各 URL × 各カテゴリで実測値 - 0.05 マージンを `minScore` として固定
  - 例: `/contact` の Best Practices は 0.73、それ以外の URL は 0.95 を維持
  - `/contact` だけが Best Practices 0.78 と低いため、global floor 0.73 では他 URL の degradation を検知できない
- **`warn` も Phase 完了ゲートとして扱う** (計画書 9.2 に明文化済み)。Performance / Best Practices / SEO は `warn`、Accessibility は `error`。warn でも baseline 未満なら Phase 未完了
- 計測結果を `docs/lighthouse-baseline-2026-06-04.md` に記録
- baseline doc に **SEO 0.61 floor は noindex 戦略 (`robots: { index: false }`) 起因の意図設計** であることを 1 行追記
- 各 Phase 完了時にこの値を下回らないことを完了条件にする
- **配色変更時はライト・ダーク両方を MUST 更新**: トークン変更だけでなく、新規 utility class や component の background-color も両モード対応必須。ハードコード値ではなく CSS 変数経由 (`var(--background)` 等) で書く。Phase 2 commit e5b25f6 の `.bg-washi` ハードコード回帰 → b4cb222 修正の事例参照

### 9.1 Phase 一覧

| Phase | スコープ                                                                                                                                                                                                                                                                                            | 主要対象ファイル                                                                                                                                                                                     | commit メッセージ例                                                                                                                                |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | デザイントークン更新 (ライト / ダーク両方同時、`@theme inline` に `--font-serif` `--color-gold` 追加) + Noto Serif JP フォント追加 + 共通レイアウト (Header / Footer) のナビ日本語化 + `navigation.spec.ts` 更新 + design-brief.md 改訂                                                             | `src/app/globals.css`, `src/app/layout.tsx`, `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`, `src/e2e/navigation.spec.ts`, `design-brief.md`                                 | `feat(design): switch tokens to Japanese-modern palette` (本文に「旧 accent tokens は Phase 7 まで残置」を明記)                                    |
| 2     | 和紙 / 円相 / 落款 / 墨滲み アセット作成・配置 (円相・落款は codex-image で事前生成済みを配置) + `bg-grid` から和紙テクスチャに切替                                                                                                                                                                 | `public/textures/washi.svg`, `public/illustrations/enso.png`, `public/illustrations/hanko-e2life.png`, `public/textures/sumi-blot.svg`, `src/app/layout.tsx` (body 背景切替)                         | `feat(design): add Japanese-modern visual assets` (アセットと layout 切替を 1 commit、または `feat(assets)` + `feat(layout)` の 2 commit に分割可) |
| 3     | トップ (`/`) Hero / Strengths / CaseStudy / CTA 刷新 + 円相 path アニメーション置換 + reduced-motion 対応 + 影響 spec 確認                                                                                                                                                                          | `src/app/(marketing)/page.tsx`, `src/components/sections/{hero,hero-animation,strengths,case-study,cta}-section.tsx`, `src/e2e/{navigation,responsive,seo}.spec.ts` (見出し文言保持で更新不要見込み) | `feat(top): redesign landing with enso hero and ink sections`                                                                                      |
| 4     | `/skills` 刷新 (フィルタ button の **アクセシブル名は維持**)                                                                                                                                                                                                                                        | `src/app/(detail)/skills/page.tsx`, `src/components/shared/{skill-grid,category-filter,skill-badge}.tsx`, `src/e2e/skills-filter.spec.ts` (基本更新不要見込み)                                       | `feat(skills): apply Japanese-modern design`                                                                                                       |
| 5     | `/career` 刷新 (PDF link はトップ CTA 側にあるため career 変更で `pdf-download.spec.ts` 更新は基本不要)                                                                                                                                                                                             | `src/app/(detail)/career/page.tsx`, `src/components/shared/career-card.tsx`                                                                                                                          | `feat(career): apply Japanese-modern timeline`                                                                                                     |
| 6     | `/contact` 刷新 (フォーム field label / submit button 名は **維持**) + **Best Practices 0.78 の原因調査と改善** (reCAPTCHA / CSP / headers 等が要因候補、Best Practices 0.95 以上を目標)                                                                                                            | `src/app/(marketing)/contact/page.tsx`, `src/components/shared/contact-form.tsx`, `src/e2e/contact-form.spec.ts` (基本更新不要見込み), `next.config.ts` (headers 設定見直しの可能性)                 | `feat(contact): apply Japanese-modern form` + `fix(contact): improve Best Practices score` (2 commit 推奨)                                         |
| 7     | `/ai` ハブ + `/ai/[slug]` 全 6 サブページ刷新 + ハブの `[var(--accent-from)]` 置換 + 旧トークン (`--accent-from` / `--accent-to`) 削除 + ダークモード最終調整 + **全 6 slug を Lighthouse URL 配列に一時追加してフル計測**、完了後は代表 slug `/ai/ecosystem` のみに戻す (mermaid 図表はスコープ外) | `src/app/(detail)/ai/page.tsx`, `src/app/(detail)/ai/[slug]/page.tsx`, `src/components/sections/*` (必要箇所), `globals.css` (旧トークン削除), `.lighthouserc.json` (URL 一時追加 → 戻し)            | `feat(ai): apply Japanese-modern to ai hub and subpages` + `refactor(design): remove legacy accent tokens` (2 commit 推奨)                         |

### 9.2 各 Phase 完了条件

- 該当ページ / コンポーネントが和モダンデザインで表示される
- 影響する e2e spec が全パス
- `npm run lint` / `npm run test` / `npm run build` が全パス
- Lighthouse スコアが Phase 0 ベースライン値以上 (**URL × カテゴリの URL-specific assertion**、warn / error を問わず baseline 未満なら Phase 未完了)
- main 直 push (`CLAUDE.md` の方針に従う) 後の本番が表示崩れなし
- Claude Code (PA) がデザインモック (`design-05-japanese-modern.png`) と照合してレビュー、世界観のブレを次 Phase 指示に反映
- Phase 7: `grep -r "accent-from\|accent-to" src/ public/` で旧トークン残存ゼロ
- Phase 7: 全 6 slug (`/ai/ecosystem` / `agents` / `recording` / `autonomous` / `security` / `sns-pipeline`) の Lighthouse をフル計測、全 URL × 全カテゴリで baseline 以上
- 新規ページ追加時は `src/e2e/dark-mode.spec.ts` の `darkModePages` 配列に URL を追加 (dark mode 回帰防止の網に新規ページを乗せる)

### 9.2.1 `warn` レベルの扱い (明文化)

`.lighthouserc.json` の `assertions` で Performance / Best Practices / SEO は `warn`、Accessibility は `error` を使用する。**`warn` も Phase 完了ゲートとして扱う**:

- `warn` の意味: 「push をブロックしない」だけ。Phase 完了判定では **`warn` でも baseline 未満なら Phase 未完了**
- Codex は各 Phase で `lhci` 出力 (Performance / Best Practices / SEO の warn 含む) を確認し、baseline 未満があれば原因対応 → 再計測
- Claude Code (PA) はモック照合レビュー時に `lhci` 出力を確認し、warn の発生有無を判定に含める
- `error` を増やさない理由: push ブロックすると Codex 1 セッション内の手戻りが多くなり、設計判断 (Best Practices 一時的に低下する変更) を許容できない。`warn` ベースで運用判断する

### 9.3 各 Phase 開始前のチェック

- 該当する `src/e2e/*.spec.ts` のアサーション内容を確認、見出し文言 / button 名 / label 名の維持範囲を把握
- `grep -r "accent-from\|accent-to" src/` で旧トークン使用箇所を確認 (Phase 3-7 で個別に置換が必要な箇所を把握)

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
- 落款 SVG / PNG の中身 (path / title / desc / metadata / EXIF) に個人特定情報を含めない
- Lighthouse スコアは `docs/lighthouse-baseline-2026-06-04.md` の値以上
- 影響する e2e spec を同 commit に含める
- 旧トークン (`--accent-from` / `--accent-to`) は Phase 7 で削除、それまで残置
- shadcn/ui のフィルタ button / フォーム label / submit button のアクセシブル名は維持 (e2e spec 安定のため)

不明点・判断が必要な事項:
- ユーザー本人に直接質問せず、Claude Code (PA) 経由で確認すること
- Claude Code への確認は GitHub Issue or commit メッセージで明示

commit message に「なぜこう作ったか」を含めてください。
Phase 完了後、Claude Code (PA) がモック照合レビューを行います。
```

## 11. 既存 `design-brief.md` の扱い

Phase 1 着手時に `design-brief.md` を以下のように改訂する (Phase 1 の同 commit に含める):

- 「採用デザイン: ダークAIモダン」セクションを **「採用デザイン: 和モダン (墨と朱)」** に置き換える
- 旧トークン表とコンセプトは **本 design-brief.md からは削除**、判断経緯は PA repo `decisions/website/2026-06-04-japanese-modern-design.md` に集約
- 本 design-brief.md 冒頭に PA decisions/ への参照リンクを追加 (「経緯は PA decisions/ を参照」)
- 本実装計画書へのリンクも冒頭に追加

(設計趣旨: `quality/decisions-edit-history-vs-current.md` 規律に従い、design-brief.md は現役運用文として最新方針のみ保持、判断経緯は PA decisions に分離)

## 12. 関連リポへの申し送り

実装着手時に PA repo `decisions/website/2026-06-04-japanese-modern-design.md` (作成済み、commit `0ff2039`) を参照。
本ドキュメント単独では PA への新規申し送りは行わない (既に記録済み)。

## 13. リスクと回避策

| リスク                                                                    | 回避策                                                                                                                                        |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 「先端 AI コンセプト」と「和」の組み合わせが顧客に伝わらない              | `/ai` ハブ + サブページ群で技術的具体性を和モダンで表現 (Phase 7)。FAQ / about セクションで意図補強                                           |
| 縦組み多用で可読性が落ちる                                                | 主役は横組み、縦組みは演出のみ。`writing-mode` 使用箇所を限定                                                                                 |
| 和紙テクスチャ・円相 PNG でパフォーマンスが落ちる                         | SVG パターン化 + PNG は WebP 変換検討、Phase 2 で個別計測、Lighthouse ベースライン維持                                                        |
| ダークモード切替時の世界観の連続性                                        | Phase 1 でライト / ダーク両方同時更新、5C を色彩のみ流用                                                                                      |
| 7 Phase 実装中に世界観がブレる                                            | 各 Phase 完了時に Claude Code (PA) がデザインモックと照合、次 Phase 指示に反映                                                                |
| main 直 push 中間状態で本番が崩れる                                       | Phase 1 で旧トークン残置、各 Phase 完了条件に「表示崩れなし」追加、Phase 7 で旧トークン削除                                                   |
| Phase 1 後の中間状態で旧グラデーション残存により世界観未達に見える        | Phase 1〜2 を連続して進める運用 (1 セッション内 or 翌セッション)、Phase 2 完了までは PA レビューでの世界観評価は留保                          |
| 既存 e2e spec / Playwright がデザイン変更で壊れる                         | アクセシブル名 (button 名 / label / heading 文言) を維持する範囲で見た目刷新。ナビ日本語化は `navigation.spec.ts` を Phase 1 同 commit で更新 |
| `/ai` Phase を後回しにすると「世界観だけで中身が無い」と読まれる          | `/ai` を Phase 7 に明示配置、Phase 7 完了で全体一貫性を保証                                                                                   |
| 落款 SVG / PNG に本名・個人特定情報が混入                                 | Phase 2 配置前に SVG/PNG 中身 (path / title / desc / metadata / EXIF) を点検、刻印は `e2life` のみ                                            |
| Noto Serif JP のフォント payload で Lighthouse 悪化                       | weights `[400, 700]`、`display: swap`、`preload: false`、subsets `latin` に絞る。Japanese は動的フォールバック                                |
| `bg-grid` と和紙テクスチャ背景の競合                                      | Phase 2 で `bg-grid` を和紙テクスチャに置換 (Phase 1 では残置、両者共存しない)                                                                |
| 円相・落款の codex-image 生成品質がモック由来でブレる                     | Phase 2 着手前に Claude Code (PA) が生成→目視確認、必要なら再生成                                                                             |
| LHCI が global floor だと URL 別 degradation を検知できない               | **URL-specific assertion (`assertMatrix`)** を Phase 0 で採用、URL × カテゴリで実測 -0.05 マージンの floor を固定                             |
| `warn` レベルが Phase 完了判定で曖昧に扱われ、Lighthouse 悪化が放置される | 計画書 9.2.1 で「warn も Phase 完了ゲート、baseline 未満なら Phase 未完了」を明文化、Codex は lhci 出力を毎 Phase 確認                        |
| Phase 7 で全 6 slug の最終確認が抜ける                                    | 9.1 Phase 7 で「全 6 slug を Lighthouse URL 配列に一時追加してフル計測」を明記、完了後は代表 slug に戻す                                      |
| 配色変更でライト/ダークの片方を更新し忘れる                               | 計画書 9.0 / 9.2 で MUST 規定、`src/e2e/dark-mode.spec.ts` で全 URL の dark mode を構造的検証                                                  |

## 14. 完了基準

- 全 6 ページ (`/`, `/skills`, `/career`, `/contact`, `/ai`, `/ai/[slug]` 全 6 テーマ) が和モダンデザインで表示される
- 旧トークン (`--accent-from` / `--accent-to`) が削除されている (`grep` 完了確認)
- ライト / ダーク両モードで世界観が一貫している
- Lighthouse Performance / Accessibility / Best Practices / SEO スコアが Phase 0 ベースライン以上 (全 URL 含む `/ai`, `/ai/ecosystem`)
- 全 e2e テスト (Playwright 7 spec) がパス
- `design-brief.md` が和モダン版に更新済み、判断経緯は PA decisions/ に分離
- Claude Code (PA) が全 Phase のモック照合レビュー完了

## 15. レビュー履歴

- 2026-06-04 初版: pa-reviewer / ceo-reviewer 並列レビューを通過
  - pa-reviewer 指摘: 公開 repo 前提明示 / case 5 採用範囲明示 / 監督責務明示 / Codex 不明点経路明示 / 世界観ブレリスク追記 → すべて反映
  - ceo-reviewer 指摘: `/ai` 配下を Phase 7 に追加 / Phase 中間状態管理 (旧トークン残置) / e2e spec 更新計画 / ダークモード Phase 1 同時更新 / 落款 SVG 個人情報点検 / design-brief.md 履歴は PA decisions に分離 → すべて反映
- 2026-06-04 v2: Codex (実装担当) レビューを通過
  - 計画書補強の主要 5 点 (Phase 0 URL 拡張 / Phase 表の対象ファイル実体合わせ / Phase 1 中間状態の世界観未達リスク明記 / Phase 3 「導入」→「置換」表現修正 / Phase 7 mermaid スコープ外明示) → すべて反映
  - ユーザー裁定 4 件 (ナビ日本語化 / 落款 `e2life` 確定 / 円相・落款 codex-image 事前生成 / Phase 7 分割せずそのまま) → すべて反映
  - 追加リスク (Noto Serif JP フォント payload / `bg-grid` 競合 / codex-image 生成品質) → 追記
- 2026-06-04 v3: Phase 0 実装後の三者レビュー (PA / CEO / Codex) 反映
  - LHCI を **URL-specific assertion (`assertMatrix`)** に変更 (Codex 指摘: global floor だと `/contact` 0.73 に他 URL が引きずられる)
  - **`warn` レベルも Phase 完了ゲートとして扱う** ことを 9.2.1 で明文化 (Codex 指摘: `warn` は CI 失敗にならず Phase 完了判定が曖昧)
  - Phase 6 スコープに **/contact Best Practices 0.78 の原因調査 + 改善** を追加 (CEO 指摘: 案件発注側が通過する CTA ページの放置リスク)
  - Phase 7 で **全 6 slug を Lighthouse URL 配列に一時追加してフル計測** を明記 (Codex 指摘: `/ai/ecosystem` のみ代表計測では他 5 slug の最終確認が抜ける)
  - baseline doc に **SEO 0.61 = noindex 戦略起因の意図設計** を 1 行追記する旨を 9.0 で明記 (PA / CEO / Codex 全員から指摘)
  - リスク表に「LHCI global floor の弱さ」「warn 放置」「Phase 7 最終確認抜け」の 3 項目追加
- 2026-06-04 v3.1: Phase 2 追加対応の三者再レビュー反映
  - CEO 推奨: 「全 Phase でライト・ダーク両更新 MUST」を 9.0 に追加、リスク表に対応リスク追加
  - CEO 推奨: 「新規ページ追加時は dark-mode.spec.ts の darkModePages 配列に URL を追加」を 9.2 に追加
  - Phase 2 ハードコード回帰 (e5b25f6) → 修正 (b4cb222) の経緯を踏まえた予防規律
