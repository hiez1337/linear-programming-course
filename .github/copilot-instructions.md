# Linear Programming Course - AI Agent Instructions

## Project Overview
Educational website teaching linear programming in Russian. Built with **Eleventy 2.0**, **Alpine.js**, **MathJax 3**, deployed to **GitHub Pages**.

**Live site**: `https://hiez1337.github.io/linear-programming-course/`

## Architecture

### File Structure
```
src/
├── _includes/           # Nunjucks layouts (base.njk, header.njk, content-page.njk)
├── _data/               # JSON data files
├── css/style.css        # Design system (Dark Manga theme)
├── js/quiz.js           # Alpine.js quiz component
├── assets/images/       # PNG sources (WebP generated at build)
└── *.njk                # Pages (basics, simplex, duality, glossary, literature, test)
```

### Key Patterns

**Path Prefix** — All internal links must use `{{ pathPrefix }}` for GitHub Pages subdirectory:
```njk
<a href="{{ pathPrefix }}basics/">Link</a>
<link rel="stylesheet" href="{{ pathPrefix }}css/style.css">
```

**Responsive Images** — Use shortcode instead of `<img>`:
```njk
{% image "src/assets/images/diagram.png", "Alt text" %}
```
Generates AVIF/WebP/JPEG with srcset. Images output to `/dist/img/`.

**MathJax** — Enable per-page via front matter:
```njk
---
includeMathJax: true
---
```
Use `$...$` inline, `$$...$$` display. HTML minifier configured to ignore math fragments.

**Content Pages** — Use `content-page.njk` layout with sidebar:
```njk
---
layout: content-page.njk
title: Симплекс-метод
breadcrumb: Симплекс-метод
sections:
  - id: section2_1
    title: 2.1. Алгоритм
---
```

## Commands
```bash
npm run dev              # Dev server at localhost:8080
npm run build            # Production build to dist/
npm run optimize-images  # PNG → WebP conversion
```

## GitHub Pages Deployment
- Workflow: `.github/workflows/deploy.yml`
- Sets `ELEVENTY_PATH_PREFIX=/linear-programming-course/` at build time
- Deploys `dist/` via `actions/deploy-pages`

## Critical Configuration (.eleventy.js)
- `pathPrefix` from env var for subdirectory deployment
- `minifyJS: false` in htmlmin — prevents MathJax config corruption
- `ignoreCustomFragments` for `$...$` math patterns
- Responsive image shortcode with pathPrefix-aware `urlPath`

## Quiz System
- Data: `src/js/quiz-data.json` (topics: basics, simplex, duality, geometry, applications)
- Component: `src/js/quiz.js` using `Alpine.data('quizApp')`
- Accessibility: `<fieldset>/<legend>` grouping, `aria-live` for results

## Design Tokens (src/css/style.css)
```css
--color-bg-dark: #0a0a0a;
--color-accent-red: #d41159;
--color-accent-gold: #ffd700;
--space-md: 16px;
--transition-base: 300ms ease;
```

## Common Pitfalls
1. **Broken links on GitHub Pages** — Always use `{{ pathPrefix }}` not `/`
2. **Math not rendering** — Check `includeMathJax: true` in front matter
3. **Images 404** — Use `{% image %}` shortcode, not direct `<img>` paths
4. **CSS changes not visible** — Hard refresh; dev server has hot reload

## Language
All content and comments in **Russian**. Technical terms preserved in English where standard.

### Using Design Tokens
Always use CSS variables instead of hardcoded values:
```css
/* ❌ Don't */
color: #007bff;
padding: 16px;

/* ✅ Do */
color: var(--color-primary-500);
padding: var(--space-md);
```

### Creating New Components
1. Add styles in `src/css/style.css` under `/* Components */` section
2. Use design tokens for colors, spacing, shadows
3. Add hover states with `transition: var(--transition-base)`
4. Test responsive behavior at 992px breakpoint

## Important Constraints
- **No backend/server** - All functionality must be client-side
- **Accessibility**: Russian lang attribute `<html lang="ru">`, UTF-8 charset required
- **Mobile-first**: Test responsive behavior below 992px breakpoint
- Keep mathematical notation consistent with established LaTeX patterns in existing content
