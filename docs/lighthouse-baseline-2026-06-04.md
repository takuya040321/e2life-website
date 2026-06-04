# Lighthouse baseline: Phase 0 Japanese-modern redesign

## Measurement

- Date: 2026-06-04 13:13 JST (+0900)
- Target: Next.js production build served by `pnpm build && pnpm start`
- LHCI: `@lhci/cli 0.15.1`
- Lighthouse: `12.6.1`
- Node.js: `v24.9.0`
- pnpm: `11.4.0`
- Browser: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/149.0.0.0 Safari/537.36`
- Settings: desktop preset, 1 run per URL

Phase 0 records the current production Lighthouse scores before the Japanese-modern redesign. Later phases use the baseline values below as completion gates so visual changes do not silently regress the existing score floor.

## Measured scores

| URL                                | Performance | Accessibility | Best Practices |  SEO |
| ---------------------------------- | ----------: | ------------: | -------------: | ---: |
| http://localhost:3000              |        0.99 |          0.95 |           1.00 | 0.66 |
| http://localhost:3000/skills       |        1.00 |          0.96 |           1.00 | 0.69 |
| http://localhost:3000/career       |        0.99 |          0.95 |           1.00 | 0.66 |
| http://localhost:3000/contact      |        1.00 |          0.96 |           0.78 | 0.66 |
| http://localhost:3000/ai           |        1.00 |          0.95 |           1.00 | 0.66 |
| http://localhost:3000/ai/ecosystem |        1.00 |          0.95 |           1.00 | 0.66 |

## Baseline values

Baseline = measured score - 0.05 margin.

| URL                                | Performance | Accessibility | Best Practices |  SEO |
| ---------------------------------- | ----------: | ------------: | -------------: | ---: |
| http://localhost:3000              |        0.94 |          0.90 |           0.95 | 0.61 |
| http://localhost:3000/skills       |        0.95 |          0.91 |           0.95 | 0.64 |
| http://localhost:3000/career       |        0.94 |          0.90 |           0.95 | 0.61 |
| http://localhost:3000/contact      |        0.95 |          0.91 |           0.73 | 0.61 |
| http://localhost:3000/ai           |        0.95 |          0.90 |           0.95 | 0.61 |
| http://localhost:3000/ai/ecosystem |        0.95 |          0.90 |           0.95 | 0.61 |

## LHCI assertion floor

`.lighthouserc.json` applies category assertions globally across all collected URLs, so the fixed `minScore` values use the lowest URL-specific baseline in each category.

| Category       | Fixed minScore | Source URL                    |
| -------------- | -------------: | ----------------------------- |
| Performance    |           0.94 | http://localhost:3000         |
| Accessibility  |           0.90 | http://localhost:3000         |
| Best Practices |           0.73 | http://localhost:3000/contact |
| SEO            |           0.61 | http://localhost:3000         |

## Notes for Claude Code (PA) review

- Phase 0 contains no visual changes.
- The `/contact` Best Practices score measured at 0.78, so its baseline is fixed at 0.73 and kept as a future improvement target.
- SEO measured between 0.66 and 0.69 across the six URLs, so the global SEO assertion floor is fixed at 0.61.
