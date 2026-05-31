# テスト方針

## テスト種類と範囲

| テスト           | ツール                    | 対象                                                                             | 実行タイミング |
| ---------------- | ------------------------- | -------------------------------------------------------------------------------- | -------------- |
| Unit Test        | Vitest + Testing Library  | ユーティリティ関数、データ変換、コンポーネント描画、reCAPTCHA 検証               | PR ごと        |
| Integration Test | Vitest + Testing Library  | Server Actions、外部 API 連携、Server Components + データ層                      | PR ごと        |
| E2E Test         | Playwright                | 全ページ表示、ナビゲーション、フォーム送信、PDF DL、レスポンシブ、クロスブラウザ | PR ごと        |
| Performance Test | Lighthouse CI             | Core Web Vitals (LCP, CLS, INP)                                                  | PR ごと        |
| Security Test    | Playwright + カスタム検証 | XSS、CSRF、フォームバリデーション、HTTP ヘッダー、reCAPTCHA バイパス防止         | PR ごと        |

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

## CI/CD 連携

### GitHub Actions テストフロー

```yaml
# .github/workflows/test.yml
name: Test
on:
  pull_request:
    branches: [main]

jobs:
  unit-integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:coverage

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm test:e2e

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm test:lighthouse
```

### PR ごとの自動実行

- PR を作成・更新するたびに全テストが自動実行される
- 全テスト通過が main マージの必須条件
- Lighthouse スコアが基準値を下回った場合は PR にコメントで警告

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
- PR description にテストの意図と範囲を記録する
