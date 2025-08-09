# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site (includes `astro check` for TypeScript validation) |
| `npm run preview` | Preview built site locally |
| `npm run biome:check` | Format and lint code with auto-fix |
| `npm run biome:lint` | Lint code only |
| `npm run biome:format` | Format code only |
| `npm run biome:ci` | CI-friendly lint and format check (required before commits) |

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
- `/housing/` - Housing (rental, co-living, providers)
- `/services/` - Services and utilities
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

### Writing Standards
- **Primary Language**: Russian
- **Audience**: Digital nomads, expats, residents in Madrid
- **Tone**: Helpful, neutral, practical
- **Facts**: Include official sources, addresses, phone numbers, costs, requirements
- **Dates**: Use `YYYY-MM-DD` format

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

## Development Notes
- Biome handles all formatting and linting (configured in `biome.json`)
- TypeScript checking included in build process
- Link validation runs automatically via starlight-links-validator
- Verify information from multiple sources; include disclaimers for time-sensitive content
- **IMPORTANT**: Always run `npm run biome:check` after making any code changes
