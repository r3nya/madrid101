# Repository Guidelines

This project is an Astro 5 + Starlight documentation site with practical guides for living in Madrid. Follow these conventions to keep contributions consistent and safe.

## Project Structure & Module Organization
- Content: `src/content/docs/` (prefer `.md`; use `.mdx` only when components are needed).
- Components: `src/components/` (small, focused Astro components).
- Images: `src/assets/images/` or co-located with content.
- Config: `astro.config.mjs` (site, sidebar), `src/content/config.ts` (schema), `biome.json` (format/lint).
- Scripts: `scripts/` utilities (e.g., `sort-sidebar`).

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server at `http://localhost:4321`.
- `npm run build`: Build for production and run TypeScript + link validation.
- `npm run preview`: Preview the built site locally.
- `npm run biome:check`: Format and lint with fixes.
- `npm run biome:lint` / `npm run biome:format`: Lint or format only.
- `npm run biome:ci`: CI-friendly check (must pass before PR).
- `node scripts/sort-sidebar`: Sort sidebar: Latin A–Z, then Russian А–Я.

## Coding Style & Naming Conventions
- Language: Russian; tone is helpful, neutral, practical.
- Filenames: kebab-case (e.g., `long-term-rental.mdx`).
- Frontmatter: `title`, `description`, `lastUpdated` (`YYYY-MM-DD`).
- Links: internal are absolute (e.g., `/transport/bike`); phones clickable `[+34 612 345 678](tel:+34612345678)`.
- Images: descriptive names (`topic-keyword.webp`), prefer `.webp/.avif`, ≤~500 KB, meaningful Russian `alt`.
- Components: use Starlight components (`<LinkCard>`, `<CardGrid>`, `<Steps>`, `<Aside>`, `<Badge>`). Avoid global CSS and third‑party scripts in MDX.

## Testing & Validation
- Use TypeScript checks (via build), link validation, and Biome. Run `npm run biome:ci` and `npm run build` before committing. Fix all warnings/errors.

## Commit & Pull Request Guidelines
- Conventional Commits: `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`.
- Branch naming: `feat/...`, `fix/...`, `docs/...`, `chore/...`.
- Before PR: run `npm run biome:ci` and `npm run build`; update `lastUpdated`; ensure sidebar `order` follows A–Z then А–Я. Provide a clear description, linked issues, and screenshots if UI-affecting.
