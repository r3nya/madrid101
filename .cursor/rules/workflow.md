## Local Development

```bash
npm run dev           # Start development server
npm run build         # Type-check (astro check) + production build
npm run preview       # Preview production build
```

## Pre-commit Checklist

- `npm run biome:ci` — Lint + format check should pass
- `npm run build` — Build and type-check should pass
- Fix any link warnings from `starlight-links-validator`

## Content Updates

1. Update `lastUpdated` in frontmatter when modifying content
2. Ensure all links are working and up-to-date
3. Test locally before committing
4. Consider SEO implications of content changes
