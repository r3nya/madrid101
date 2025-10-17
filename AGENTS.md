# Repository Guidelines

This repository is an Astro 5 + Starlight documentation site for practical guides to living in Madrid. Use the commands and conventions below to contribute consistently and safely.

## Project Structure & Module Organization
- Content: `src/content/docs/` (use `.md` by default; `.mdx` only when components are needed).
- Components: `src/components/` (small, focused Astro components).
- Images/assets: `src/assets/images/` or co-located with content.
- Config: `astro.config.mjs` (site, sidebar), `src/content/config.ts` (schema), `biome.json` (format/lint).
- Utilities: `scripts/` (e.g., `sort-sidebar`).

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server at `http://localhost:4321`.
- `npm run build`: Production build + TypeScript validation; runs link checks.
- `npm run preview`: Preview the built site locally.
- `npm run test`: Run tests in watch mode.
- `npm run test:run`: Run tests once (CI mode).
- `npm run biome:check`: Format and lint with auto-fix.
- `npm run biome:lint` / `npm run biome:format`: Lint or format only.
- `npm run biome:ci`: CI-friendly lint/format check (must pass before PR).
- `node scripts/sort-sidebar`: Normalize sidebar order (Latin A–Z, then Russian А–Я).

## Pre-commit Requirements
Before committing changes, ensure these checks pass:
- `npm run biome:ci` - Lint and format check
- `npm run build` - Build and TypeScript validation
- Fix any link warnings from starlight-links-validator

## Project Architecture

This is an **Astro 5 + Starlight** documentation site for Madrid living guides, targeting Russian-speaking digital nomads and expats.

### Key Technologies
- **Framework**: Astro 5 with TypeScript
- **Theme**: Starlight (Astro's documentation theme)
- **Content**: Markdown/MDX files in `/src/content/docs/`
- **Code Quality**: Biome (replaces ESLint/Prettier)
- **Validation**: starlight-links-validator plugin

### Content Structure
All content lives in `/src/content/docs/` with these main sections:
- `/faq/` - FAQ organized by topic (city authorities, healthcare, education, finance)
- `/food/` - Food and dining information
- `/groups/` - Community groups and chat information
- `/housing/` - Housing (rental, co-living, providers)
- `/services/` - Services and utilities
- `/spanish/` - Spanish language learning resources
- `/spare-time/` - Leisure activities (sport, culture, hobby)
- `/transport/` - Transportation options
- `/taxes/` - Tax information
- `/waste-management/` - Waste management

### Site Configuration
- **Config**: `astro.config.mjs` contains Starlight sidebar structure and site metadata
- **Content Schema**: `/src/content/config.ts` uses Starlight's docs schema
- **Custom Head**: `/src/components/Head.astro` adds OpenGraph image generation
- **Site URL**: http://madrid101.xyz/

## Content Guidelines

### File Organization
- Use kebab-case for file names: `long-term-rental.mdx`
- Prefer `.md` for static content, `.mdx` only when components needed
- Keep assets in same folder or local `images/` directory
- Include `index.mdx` for section overviews

### Sidebar Ordering
- All pages in content directories should use `sidebar: order: N` in frontmatter
- Order pages alphabetically with Latin alphabet first, then Russian alphabet:
  - Latin titles (A-Z) come first
  - Russian titles (А-Я) come second: А, Б, В, Г, Д, Е, Ё, Ж, З, И, Й, К, Л, М, Н, О, П, Р, С, Т, У, Ф, Х, Ц, Ч, Ш, Щ, Ъ, Ы, Ь, Э, Ю, Я
  - Other characters come last
  - Example: `sidebar: order: 1` for first page alphabetically
  - When adding new pages, update existing order numbers to maintain alphabetical sequence

### Writing Standards
- **Primary Language**: Russian
- **Audience**: Digital nomads, expats, residents in Madrid
- **Tone**: Helpful, neutral, practical
- **Facts**: Include official sources, addresses, phone numbers, costs, requirements
- **Dates**: Use `YYYY-MM-DD` format
- **Grammar Check**: Always check grammar when updating content in `/src/content/docs/`

### Content Formatting
- Always include frontmatter with `title`, `description`, `lastUpdated` (update when modifying content)
- Use Starlight components: `<LinkCard>`, `<CardGrid>`, `<Steps>`, `<Aside>`, `<Badge>`
- Internal links: absolute from site root (`/transport/bike`)
- Phone numbers: clickable format `[+34 612 345 678](tel:+34612345678)`
- Include Spanish terms with Russian explanations when relevant
- One H1 per page (from title); start content headings at H2
- Use descriptive link text, avoid "click here" or raw URLs

### Image Handling
- OpenGraph images auto-generated for each page via `/src/pages/og/[...slug].ts`
- Custom images in `/src/assets/images/` or co-located with content
- Use descriptive names: `topic-keyword-detail.webp`
- Prefer modern formats: `.webp`/`.avif` when possible
- Keep images under ~500 KB when feasible
- Provide meaningful `alt` text in Russian

### Code & Asset Guidelines
- Follow Astro component conventions; keep components small and focused
- Use TypeScript for utilities or configuration
- Avoid global CSS; rely on Starlight theming and semantic HTML
- Use `.md` by default; switch to `.mdx` only when components needed
- Do not embed third-party scripts in MDX content

## Commit Guidelines
Use Conventional Commits format:
- `feat: add long-term rental tips`
- `fix: correct taxi phone number formatting`
- `docs: update spanish resources page`
- Branch names: `feat/...`, `fix/...`, `docs/...`, `chore/...`

## Content Maintenance
Regular updates needed for:
- Transportation prices and schedules
- Government service procedures
- Housing market information
- Restaurant and service recommendations
- Contact information and websites

## Testing & Validation
- Unit tests: Vitest for data utilities (e.g., `/src/data/coffee.test.ts`)
- Run tests: `npm run test` (watch mode) or `npm run test:run` (CI mode)
- TypeScript validation: Via `astro check` in build process
- Link validation: Via starlight-links-validator plugin
- Code quality: Biome for formatting and linting
- Before committing: Run `npm run biome:ci` and `npm run build` - fix all warnings/errors

## Custom Commands
Available in `/scripts/`:
- `sort-sidebar` - Sort pages by Latin alphabet first, then Russian alphabet, and update sidebar order
- `submit-urls-to-bing.mjs` - Submit sitemap URLs to Bing Webmaster Tools

## Development Notes
- Biome handles all formatting and linting (configured in `biome.json`)
- TypeScript checking included in build process
- Link validation runs automatically via starlight-links-validator
- Verify information from multiple sources; include disclaimers for time-sensitive content
- **IMPORTANT**: Always run `npm run biome:check` after making any code changes
