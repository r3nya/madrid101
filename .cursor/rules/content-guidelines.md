## Frontmatter Structure

Always include these fields:

```yaml
---
title: "Page Title"
description: "Brief description for SEO and navigation"
lastUpdated: YYYY-MM-DD
---
```

Optional fields:
- `tableOfContents`: Customize TOC behavior
- `sidebar`: Configure sidebar appearance
- `template`: For special page types like splash pages
- `prev`/`next`: Override navigation when needed

## Writing Style

- **Audience**: Digital nomads, expats, and residents in Madrid
- **Language**: Primarily Russian; keep key Spanish terms in-line when needed
- **Tone**: Helpful, neutral, practical
- **Facts**: Prefer official sources; include addresses, phone numbers, costs, requirements
- **Dates**: Use `YYYY-MM-DD`

## Content Patterns

- Favor Starlight components when they aid clarity:
  - `<LinkCard>` for external links
  - `<CardGrid>` for link collections
  - `<Steps>` for step-by-step instructions
  - `<Aside>` for notes, tips, warnings
  - `<Badge>` for categorization

## Links & References

- Descriptive link text only; avoid "here".
- Include both Spanish and English names when relevant.
- Prefer absolute internal links (e.g., `/housing/long-term-rental`).
- Clickable phone format: `[+34 612 345 678](tel:+34612345678)`.
