## Frontmatter Structure

Always include these frontmatter fields:

```yaml
---
title: "Page Title"
description: "Brief description for SEO and navigation"
lastUpdated: YYYY-MM-DD
---
```

Optional frontmatter fields:
- `tableOfContents`: Customize TOC behavior
- `sidebar`: Configure sidebar appearance
- `template`: For special page types like splash pages

## Writing Style

- **Target audience**: Digital nomads, expats, and residents in Madrid
- **Language**: Primarily Russian, with some Spanish terms
- **Tone**: Helpful, informative, practical
- **Include practical information**: Addresses, phone numbers, costs, requirements

## Content Patterns

- Use Starlight components when appropriate:
  - `<LinkCard>` for external links
  - `<CardGrid>` for organized link collections
  - `<Steps>` for step-by-step instructions
  - `<Aside>` for notes, tips, warnings
  - `<Badge>` for categorization

## Links and References

- Use descriptive link text
- Include both Spanish and English resource names when relevant
- Provide direct links to official sources
- Include phone numbers in clickable format: `[+34 xxx xxx xxx](tel:+34xxxxxxxxx)`

## Badges and Categorization

Common badge types for housing/services:
- `<Badge text="Коливинг" variant="note" size="small" />`
- `<Badge text="Квартира" variant="success" size="small" />`
- `<Badge text="Комната" variant="tip" size="small" />`
- `<Badge text="Pet-friendly" variant="caution" size="small" />`
