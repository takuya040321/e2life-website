# テスト方針

## テスト種類と範囲

| テスト           | ツール                    | 対象                                                                             | 実行タイミング |
| ---------------- | ------------------------- | -------------------------------------------------------------------------------- | -------------- |
| Unit Test        | Vitest + Testing Library  | ユーティリティ関数、データ変換、コンポーネント描画、reCAPTCHA 検証               | push 前        |
| Integration Test | Vitest + Testing Library  | Server Actions、外部 API 連携、Server Components + データ層                      | push 前        |
| E2E Test         | Playwright                | 全ページ表示、ナビゲーション、フォーム送信、PDF DL、レスポンシブ、クロスブラウザ | push 前        |
| Performance Test | Lighthouse CI             | Core Web Vitals (LCP, CLS, INP)                                                  | push 前        |
| Security Test    | Playwright + カスタム検証 | XSS、CSRF、フォームバリデーション、HTTP ヘッダー、reCAPTCHA バイパス防止         | push 前        |

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

## 品質ゲート (ローカル Claude Hooks)

GitHub Actions による CI は 2026-06-02 に全廃した（詳細: PA `decisions/website/2026-06-02-ci-to-hooks-migration.md`）。
代替として、品質ゲートはローカル Claude Hooks の `PreToolUse` で `git push` 直前に直列実行する。

### 実行段階

`.claude/settings.json` の `PreToolUse` Bash matcher で以下を直列実行し、1 つでも失敗すれば push を中止する（`exit 2`）:

1. `pnpm format:check` (Prettier)
2. `pnpm lint` (ESLint)
3. `pnpm exec tsc --noEmit` (TypeScript)
4. `pnpm test` (Vitest unit / integration)
5. `pnpm build` (Next.js)
6. `pnpm test:e2e` (Playwright)
7. `pnpm test:lighthouse` (Lighthouse CI)

各段階の開始時に `[stage] 実行中...` を stderr に出力する。失敗時は段階名 + 失敗内容を表示。

### 運用

- `git push` 前に全段階を通過することが必須
- Playwright のブラウザバイナリは事前に `pnpm exec playwright install --with-deps chromium` で導入しておく
- Lighthouse は `.lighthouserc.json` の `upload.target: temporary-public-storage` でローカル実行
- 基準値を下回った段階で push がブロックされる

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
- commit message にテストの意図と範囲を記録する（CLAUDE.md L70 に準拠）
