# e2life

個人 Web サイト [e2life.dev](https://e2life.dev)

AI を活用した開発プロセス設計を実践するエンジニアのサイト。

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router, PPR, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Form | React Hook Form + reCAPTCHA v3 |
| Testing | Vitest + Testing Library + Playwright |
| Performance | Lighthouse CI |
| Hosting | Vercel |
| CI/CD | GitHub Actions |

## Architecture

- **Rendering**: Partial Prerendering (PPR) + `use cache`
- **Components**: Server Components (default) + Client Components (interactive)
- **Form Handling**: Server Actions
- **Optimization**: React Compiler (auto-memoization), next/image, next/font
- **Route Organization**: Route Groups `(marketing)` / `(detail)`

## Project Structure

```
src/
├── app/
│   ├── (marketing)/          # LP, Contact
│   ├── (detail)/             # Skills, Career, AI pages
│   ├── actions/              # Server Actions
│   └── layout.tsx
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Header, Footer, Navigation
│   ├── sections/             # LP sections
│   └── shared/               # Shared components
├── lib/                      # Utilities, constants
└── styles/                   # Global styles
```

## Pages

| Path | Description | Status |
|---|---|---|
| `/` | Landing Page | MVP |
| `/skills` | Technical Skills | MVP |
| `/career` | Career History | MVP |
| `/contact` | Contact Form | MVP |
| `/ai/` | AI Engineering Hub | Phase 2 |
| `/ai/ecosystem` | Multi-repo Ecosystem | Phase 2 |
| `/ai/agents` | Sub-agent Architecture | Phase 2 |
| `/ai/recording` | 5-Layer Recording System | Phase 2 |
| `/ai/autonomous` | Autonomous Mode Design | Phase 2 |
| `/ai/security` | Security Architecture | Phase 2 |
| `/ai/sns-pipeline` | SNS Automation Pipeline | Phase 2 |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test          # Unit + Integration
npm run test:e2e      # E2E (Playwright)
npm run test:perf     # Lighthouse CI

# Lint & Format
npm run lint
npm run format
```

## Testing Strategy

| Type | Tool | Scope |
|---|---|---|
| Unit | Vitest + Testing Library | Utility functions, components |
| Integration | Vitest + Testing Library | Server Actions, API integration |
| E2E | Playwright | Full user flows, responsive, cross-browser |
| Performance | Lighthouse CI | Core Web Vitals (LCP, CLS, INP) |
| Security | Playwright + custom | XSS, CSRF, form validation, headers |

## Development

- Branch strategy: feature branches + Pull Requests
- Commit format: [Conventional Commits](https://www.conventionalcommits.org/)
- CI: GitHub Actions (lint, test, Lighthouse on every PR)
- Deploy: Vercel (auto-deploy on merge, preview on PR)

## License

All rights reserved.
