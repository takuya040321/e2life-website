# テスト方針

## テスト種類と範囲

| テスト           | ツール                    | 対象                                                                             | 実行タイミング           |
| ---------------- | ------------------------- | -------------------------------------------------------------------------------- | ------------------------ |
| Unit Test        | Vitest + Testing Library  | ユーティリティ関数、データ変換、コンポーネント描画、reCAPTCHA 検証               | push 前 + GitHub Actions |
| Integration Test | Vitest + Testing Library  | Server Actions、外部 API 連携、Server Components + データ層                      | push 前 + GitHub Actions |
| E2E Test         | Playwright                | 全ページ表示、ナビゲーション、フォーム送信、PDF DL、レスポンシブ、クロスブラウザ | push 前のみ              |
| Performance Test | Lighthouse CI             | Core Web Vitals (LCP, CLS, INP)                                                  | push 前のみ              |
| Security Test    | Playwright + カスタム検証 | XSS、CSRF、フォームバリデーション、HTTP ヘッダー、reCAPTCHA バイパス防止         | push 前のみ              |

「push 前 + GitHub Actions」は手元と GitHub の両方で走るもの、「push 前のみ」は手元だけで走るもの。
振り分けの理由は「品質ゲート (二層構成)」を参照。

## テストファイル配置

コロケーション方式を採用する。テスト対象ファイルと同じディレクトリに `.test.ts` / `.test.tsx` を置く。

```
src/
├── components/
│   └── shared/
│       ├── skill-badge.tsx
│       └── skill-badge.test.tsx
├── lib/
│   ├── utils/
│   │   ├── format.ts
│   │   └── format.test.ts
│   └── validations/
│       ├── contact.ts
│       └── contact.test.ts
├── app/
│   └── actions/
│       ├── contact.ts
│       └── contact.test.ts
└── e2e/
    ├── navigation.spec.ts
    ├── contact-form.spec.ts
    ├── pdf-download.spec.ts
    ├── responsive.spec.ts
    └── security.spec.ts
```

- Unit / Integration テスト: `.test.ts` / `.test.tsx`（コロケーション）
- E2E テスト: `src/e2e/` ディレクトリに `.spec.ts`

## テスト命名規則

### テストファイル名

- テスト対象ファイル名 + `.test.ts` / `.test.tsx`
- E2E: 機能名 + `.spec.ts`

### テストケース

`describe` + `it` で構造化する。日本語は使わず英語で書く。

```typescript
describe("SkillBadge", () => {
  it("renders skill name and experience years", () => {
    // ...
  });

  it("hides years when showYears is false", () => {
    // ...
  });
});
```

### テストの構造

AAA パターン（Arrange, Act, Assert）に従う:

```typescript
it("validates email format", () => {
  // Arrange
  const invalidEmail = "not-an-email";

  // Act
  const result = contactSchema.safeParse({ email: invalidEmail });

  // Assert
  expect(result.success).toBe(false);
});
```

## テスト実行コマンド

```bash
# Unit / Integration テスト
pnpm test              # 全テスト実行
pnpm test:watch        # ウォッチモード
pnpm test:coverage     # カバレッジ付き

# E2E テスト
pnpm test:e2e          # Playwright 全テスト
pnpm test:e2e:ui       # Playwright UI モード

# Lighthouse
pnpm test:lighthouse   # Lighthouse CI 実行
```

## 品質ゲート (二層構成)

品質ゲートは **手元 (ローカル Claude Hooks)** と **GitHub (GitHub Actions)** の二層で持つ。
2 つは同じ検査を重ねているように見えるが、担っている役割が違う。

| 層                      | 役割                 | 効くところ                                                      | 効かないところ                                          |
| ----------------------- | -------------------- | --------------------------------------------------------------- | ------------------------------------------------------- |
| 手元 (ローカル Hooks)   | 公開する前に気付ける | push を止めるので壊れた状態が GitHub に出ない。重い検査も置ける | 発火する条件が限られる (後述)                           |
| GitHub (GitHub Actions) | どの経路でも必ず走る | push の出所を問わず実行され、結果が履歴として残る               | push した後にしか分からない。実行が重い検査には向かない |

**片方だけでは穴が残る**。手元だけだと「走らない経路」を塞げず、GitHub だけだと公開前に止められない。
だから両方を持つ。

### 実際に起きた穴 (2026-06-14 〜 2026-09-05)

ローカル Hooks は `.claude/settings.json` に書かれている。つまり
**Claude Code をこのディレクトリで起動したセッションからの `git push` でしか発火しない**。
別のリポジトリ (PA 等) のセッションから `cd` してきて push すると、読み込まれている設定は
そちら側のものなので、7 段階が 1 つも走らないまま push が通る。

実害として、2026-06-14 以降に別リポジトリのセッション経由で push された変更が Prettier 未整形のまま
蓄積し、2026-09-05 時点で **14 ファイル** が `pnpm format:check` で fail する状態になっていた
(同日 `fc0e428` で整形済み)。

問題は蓄積したこと自体よりも、**約 3 ヶ月間ずっと気付けなかった**こと。
検査が走らないだけでなく、失敗が表に出る場所がどこにも無かったため、
「壊れていない」のか「見ていないだけ」なのかを区別する手段が無かった。

### どちらに何を置くか

| 検査                           | コマンド                 | 手元 Hooks | GitHub Actions |
| ------------------------------ | ------------------------ | ---------- | -------------- |
| 書式 (Prettier)                | `pnpm format:check`      | ○          | ○              |
| lint (ESLint)                  | `pnpm lint`              | ○          | ○              |
| 型 (TypeScript)                | `pnpm exec tsc --noEmit` | ○          | ○              |
| テスト (Vitest)                | `pnpm test`              | ○          | ○              |
| ビルド (Next.js)               | `pnpm build`             | ○          | —              |
| E2E (Playwright)               | `pnpm test:e2e`          | ○          | —              |
| パフォーマンス (Lighthouse CI) | `pnpm test:lighthouse`   | ○          | —              |

振り分けの基準は 2 つ:

- **(a) 漏れると静かに溜まるものは両方に置く** — 書式・lint・型・テストは、通っていなくても画面上は
  何も起きない。気付かないまま溜まる性質があるので、必ず走る側にも置く。上の 14 ファイルがこれに当たる
- **(b) 実行が重い、または他の仕組みが既に見ているものは手元だけ** — E2E と Lighthouse は 1 回で数分かかり、
  ブラウザの準備も要る。両方に置くと push のたびの待ち時間が伸びるだけになる

### ビルドを GitHub 側に置かない理由

`pnpm build` は **Vercel が本番デプロイのたびに必ず実行する**。
ビルドが壊れていればデプロイが失敗するので、公開される前に必ず気付ける。
同じ検査を 3 か所 (手元 / GitHub / Vercel) で持っても、増えるのは待ち時間だけになる。
上の基準 (b) の「他の仕組みが既に見ているもの」がこれに当たる。

### 2026-06-02 の廃止判断との関係

GitHub Actions の CI は 2026-06-02 に一度全廃した
(詳細: PA repo `decisions/website/2026-06-02-ci-to-hooks-migration.md`)。廃止理由は 2 つ:

1. CI 待ちが長い — 6 ジョブに分かれており、それぞれが `pnpm install` から始まっていた
2. CI YAML との二重管理

今回はこの判断を否定するのではなく、**当時の理由を解消した上で戻している**:

| 当時の理由           | 今回の対応                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| CI 待ちが長い        | 1 ジョブにまとめて `pnpm install` を 1 回に。対象も軽い 4 つに絞る                                         |
| CI YAML との二重管理 | 二重になるのは同じ pnpm script を呼ぶ 4 行だけ。検査の中身は `package.json` の script 側に一元化されたまま |

判断の経緯: PA repo `decisions/website/2026-09-05-quality-gate-two-layer.md`

### 手元 (ローカル Claude Hooks) の実行段階

`.claude/settings.json` の `PreToolUse` Bash matcher で以下を直列実行し、1 つでも失敗すれば push を中止する（`exit 2`）:

1. `pnpm format:check` (Prettier)
2. `pnpm lint` (ESLint)
3. `pnpm exec tsc --noEmit` (TypeScript)
4. `pnpm test` (Vitest unit / integration)
5. `pnpm build` (Next.js)
6. `pnpm test:e2e` (Playwright)
7. `pnpm test:lighthouse` (Lighthouse CI)

各段階の開始時に `[stage] 実行中...` を stderr に出力する。失敗時は段階名 + 失敗内容を表示。

#### 運用

- `git push` 前に全段階を通過することが必須
- **別リポジトリのセッションから push するときは発火しない**。その場合は上の 7 コマンドを手で実行してから push する
- Playwright のブラウザバイナリは事前に `pnpm exec playwright install --with-deps chromium` で導入しておく
- Lighthouse は `.lighthouserc.json` の `upload.target: temporary-public-storage` でローカル実行
- 基準値を下回った段階で push がブロックされる

### GitHub (GitHub Actions) の実行内容

`.github/workflows/ci.yml` の 1 ジョブで、main への push と pull request のたびに以下を順に実行する:

1. `pnpm format:check` (Prettier)
2. `pnpm lint` (ESLint)
3. `pnpm exec tsc --noEmit` (TypeScript)
4. `pnpm test` (Vitest unit / integration)

#### 運用

- 1 ジョブにまとめているため `pnpm install --frozen-lockfile` は 1 回しか走らない
- pnpm のバージョンは `package.json` の `packageManager` (pnpm@11.4.0) に従う。ワークフロー側にバージョンを書かない
- Node.js は 22 系
- ジョブ名・ステップ名は日本語で書く (このリポジトリの規約)
- 結果は README のバッジ、リポジトリの Actions タブ、commit 一覧の合否印から確認できる

## テストカバレッジ方針

| 対象               | 目標カバレッジ                 |
| ------------------ | ------------------------------ |
| ユーティリティ関数 | 90% 以上                       |
| バリデーション     | 100%                           |
| Server Actions     | 80% 以上                       |
| コンポーネント     | 70% 以上（描画テスト中心）     |
| E2E                | 全ページ・全主要フローをカバー |

- カバレッジ数値の追求よりも、重要なパスのテストを優先する
- reCAPTCHA 検証、フォームバリデーション、エラーハンドリングは高カバレッジ必須

## AI によるテスト自動化フロー

### 実装時のテスト同時生成

- 新しいコンポーネント・関数を実装する際は、テストも同時に生成する
- commit message にテストの意図と範囲を記録する（CLAUDE.md「開発フロー」に準拠）
