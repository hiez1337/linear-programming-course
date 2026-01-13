# Linear Programming Course - AI Coding Agent Instructions

## Project Overview
Educational website teaching linear programming concepts in Russian. Built with **Eleventy (11ty)** static site generator, **Alpine.js** for interactivity, and modern CSS with design tokens. Content includes theoretical material with MathJax formulas, practical examples, and interactive tests.

## Architecture & Structure

### Page Types
- **Landing page**: src/index.njk → route `/` (Hero + CTAs + features)
- **Content pages**: src/basics.njk, src/simplex.njk, src/duality.njk – chapters with sidebar
- **Utility pages**: src/glossary.njk, src/literature.njk – reference materials
- **Interactive pages**: src/test.njk – client-side quiz (Alpine.js)
- **Auth pages**: src/login.njk, src/register.njk – forms (no backend)

### Template System (Nunjucks)
**Shared components** are in `src/_includes/`:
- `base.njk` - Main layout with `<head>`, conditional MathJax/Alpine.js loading
- `header.njk` - Navigation bar with automatic active state detection
- `footer.njk` - Footer component
- `content-page.njk` - Layout for educational pages with sidebar

**Front Matter** in `.njk` files:
```njk
---
layout: base.njk
title: Page Title
description: SEO description
includeMathJax: true    # Load MathJax for math content
includeAlpine: true     # Load Alpine.js for interactivity
permalink: /custom-url/ # Optional custom URL
---
```

**Active navigation** is automatic via `page.url | isActive("/path/")` filter in header.njk

## Key Patterns & Conventions

### Mathematical Content
- **All educational pages** ([basics.html](../basics.html), [simplex.html](../simplex.html), [duality.html](../duality.html), [glossary.html](../glossary.html)) use MathJax 3 for rendering LaTeX
- Required MathJax setup in `<head>`:
```html
<script>
    MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']]
        },
        svg: {
            fontCache: 'global'
        }
    };
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
```
- Use `$...$` for inline math, `$$...$$` for display math
- Complex multi-line equations use `$$\begin{aligned}...\end{aligned}$$`

### CSS & Styling
- Single stylesheet: src/css/style.css (design system)
- **Dark Manga Aesthetic**: deep dark bg `#0a0a0a`, crimson `#d41159`, gold `#ffd700`, purple accents
- **Layout pattern**: Flexbox `.container` with sticky `.sidebar` (250px) + fluid `.content`
- **Hero/CTA**: gradient backgrounds, red glow borders, diagonal overlay; responsive tweaks on mobile
- **Responsive**: Mobile-first; stacked layout ≤768px; tables scroll horizontally; reduced ornamental overlays

### Design System & JS
- **CSS Custom Properties** (in `:root`):
  - Colors: `--color-bg-dark`, `--color-accent-red`, `--color-accent-gold`, `--color-accent-purple`, gray scale
  - Spacing: `--space-xs` … `--space-3xl`
  - Typography: fonts (Noto Sans JP, IBM Plex Mono), sizes `--font-size-*`, weights
  - Shadows: red glow `--shadow-sm|md|lg|xl`
  - Transitions: `--transition-base`, `--transition-smooth`
- **Alpine.js**: quiz in src/js/quiz.js via `Alpine.data('quizApp')`; data in src/js/quiz-data.json
- **Navigation**: ID-based anchors (e.g., `#section1_1`) generated via `sections` in front matter; breadcrumbs in content layout
- **No jQuery**: vanilla JS + Alpine only; accessibility utilities include `.sr-only`
- **Images**: prefer WebP under `/assets/images/*.webp`; originals (PNG) kept as fallback

## Development Workflow
- **Build**: Eleventy SSG (`npm run dev` for development, `npm run build` for production)
- **Source**: `src/` (Nunjucks `.njk`, CSS, JS, assets)
- **Output**: `dist/`
- **Passthrough**: `.eleventy.js` passes `src/assets`, `src/css`, `src/js`
- **Language**: Russian content and comments
- **Hot reload**: Auto browser refresh; test quiz via `/test/`

### Key Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server with live reload (localhost:8080)
npm run build        # Build for production
npm run optimize-images  # Convert PNG to WebP
```

## Common Tasks

### Adding a New Content Page
1. Create `src/pagename.njk` with front matter:
```njk
---
layout: content-page.njk
title: Page Title
description: SEO description
breadcrumb: Breadcrumb Title
includeMathJax: true   # if page has math
includeAlpine: false   # enable if interactive JS is needed
---
```
2. Add `sections:` array for sidebar navigation:
```njk
sections:
  - id: sectionX_1
    title: 1. Раздел
  - id: sectionX_2
    title: 2. Раздел
```
3. Link in `src/_includes/header.njk` if needed; Eleventy generates `/pagename/` automatically.
4. Accessibility: ARIA labels, focus states, semantic HTML.
5. Performance: prefer WebP images in `/assets/images/`; optimize via `npm run optimize-images`.
6. MathJax/Alpine only when needed (controlled via front matter).

## File Structure
```
project-root/
├── .github/
│   └── copilot-instructions.md  # This file - AI agent guide
├── src/                         # Source files (Eleventy input)
│   ├── _includes/              # Nunjucks templates
│   │   ├── base.njk           # Main layout
│   │   ├── header.njk         # Navigation component
│   │   ├── footer.njk         # Footer component
│   │   └── content-page.njk   # Educational page layout
│   ├── _data/                  # JSON data files
│   │   └── quizData.json      # Quiz questions
│   ├── css/
│   │   └── style.css          # Complete design system
│   ├── js/
│   │   ├── quiz.js            # Alpine.js quiz component
│   │   └── quiz-data.json     # Quiz topics/questions
│   ├── assets/images/          # Optimized WebP images (and PNG fallbacks)
│   ├── index.njk              # Homepage ✅
│   ├── test.njk               # Quiz page ✅
│   ├── login.njk              # Login form ✅
│   ├── register.njk           # Registration form ✅
│   └── [basics|simplex|duality|glossary|literature].njk  # All pages migrated ✅
├── dist/                       # Generated site (gitignored)
├── scripts/
│   └── optimize-images.js     # PNG→WebP converter
├── package.json               # NPM dependencies
├── .eleventy.js               # Eleventy config
├── START.md                   # Setup instructions
└── [old HTML files]           # Legacy - can be removed after migration
```

## Technology Stack
- **SSG**: Eleventy 2.0+ (static site generator)
- **Templates**: Nunjucks (.njk) with YAML front matter
- **CSS**: Plain CSS with Custom Properties design system (no preprocessor)
- **JS**: Alpine.js 3.x for reactivity (2KB, Vue-like syntax)
- **Math**: MathJax 3 (CDN, conditionally loaded)
- **Images**: Sharp for optimization (PNG→WebP with 85% quality)
- **Dev Server**: Eleventy dev server with hot reload on port 8080

## Migration Status

**Completed (✅):**
- All pages migrated to `.njk` (basics, simplex, duality, glossary, literature)
- Dark Manga Aesthetic redesign in `src/css/style.css` (colors, typography, hero/CTA, animations)
- Quiz expanded and fully styled (Alpine.js + JSON)
- Images optimized to WebP in `src/assets/images/`; originals retained as fallback
- Old root HTML and legacy `style.css` removed from active use
- Documentation updated; Eleventy passthrough configured

**Next Steps:**
1. `npm install` (once per setup)
2. `npm run dev` to iterate; verify all routes and responsive styles
3. Use WebP for new images; run `npm run optimize-images` when adding PNG/JPG
4. Keep MathJax/Alpine conditional for performance

---
<h2>Chapter 1. Title</h2>
<h3 id="section1_1">1.1. Section Title</h3>
<p>Content with math: $x^2 + y^2$</p>
```
2. Add link in `src/_includes/header.njk`
3. Run `npm run dev` - Eleventy generates `/pagename/` route automatically

### Adding Test Questions
Edit [src/js/quiz-data.json](../src/js/quiz-data.json):
```json
{
  "topic-key": {
    "title": "Тест: Topic Name",
    "questions": [
      {
        "question": "Question text?",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": 2
      }
    ]
  }
}
```

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
