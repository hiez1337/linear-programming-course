# Linear Programming Course - AI Coding Agent Instructions

## Project Overview
Educational website teaching linear programming concepts in Russian. Built with **Eleventy (11ty)** static site generator, **Alpine.js** for interactivity, and modern CSS with design tokens. Content includes theoretical material with MathJax formulas, practical examples, and interactive tests.

## Architecture & Structure

### Page Types
- **Landing page**: [index.html](../index.html) - Hero section with CTAs and feature cards
- **Content pages**: [basics.html](../basics.html), [simplex.html](../simplex.html), [duality.html](../duality.html) - Educational chapters with sidebar navigation
- **Utility pages**: [glossary.html](../glossary.html), [literature.html](../literature.html) - Reference materials
- **Interactive pages**: [test.html](../test.html) - Client-side quiz system with topic selection
- **Auth pages**: [login.html](../login.html), [register.html](../register.html) - Basic forms (no backend yet)

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
- Single stylesheet: [style.css](../style.css) - All pages link to it
- **Layout pattern for content pages**: Flexbox-based `.container` with `.sidebar` + `.content`
- Sidebar width: 250px fixed, sticky positioning, contains section navigation (`<aside class="sidebar">`)
- Content area: `.content` class, grows to fill remaining space
- Responsive: `@media (max-width: 992px)` switches to vertical stack
- Color scheme: Bootstrap-inspired - primary `#007bff`, dark gray `#343a40`, light bg `#f8f9fa`

### JavaScript Pa (Design System)
- Single stylesheet: [src/css/style.css](../src/css/style.css)
- **CSS Custom Properties** - All design tokens in `:root` for easy theming
  - Colors: `--color-primary-500`, `--color-success`, `--color-error`, etc.
  - Spacing: `--space-xs` (4px) through `--space-3xl` (64px)
  - Typography: `--font-size-base`, `--font-weight-bold`, etc.
  - Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
  - Transitions: `--transition-base` (300ms ease)

- **Alpine.js** for reactive components (quiz system)
- Quiz logic in [src/js/quiz.js](../src/js/quiz.js) using `Alpine.data('quizApp')`
- Quiz data in JSON: [src/js/quiz-data.json](../src/js/quiz-data.json)
- State management via Alpine reactive properties: `currentTopic`, `userAnswers`, `showResults`
- Form validation in login/register pages (vanilla JS, placeholder until backend)
- **No jQuery** - Pure vanilla JS or Alpine.js only, `.sr-only
- Educational pages use ID-based section anchors (`#section1_1`, `#section1_2`) linked from sidebar
- Breadcrumbs on content pages: `<div class="breadcrumbs"><a href="index.html">Главная</a> » Page Title</div>`
- Images stored in `assets/` folder (PNG diagrams with Russian filenames)

## Development Workflow
- **Build system**: Eleventy SSG (`npm run dev` for development, `npm run build` for production)
- **Source files**: All in `src/` directory (Nunjucks templates `.njk`)
- **Output**: Generated to `dist/` directory
- **Language**: All content in Russian (comments, text, filenames)
- **Hot reload**: Automatic browser refresh on file changes
- **Testing**: Navigate to `/test/` route to verify quiz functionality

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
breadcrumb: Breadcrumb T & Best Practices
- **No backend (yet)** - Login/register are placeholders, all quiz data client-side
- **Accessibility**: 
  - Russian `<html lang="ru">` in base template
  - ARIA labels on navigation (`aria-label="Главное меню"`)
  - Focus states on interactive elements
  - Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`)
- **Mobile-first**: Test at 992px breakpoint - sidebar stacks vertically
- **Performance**: 
  - Images optimized to WebP with `npm run optimize-images`
  - MathJax/Alpine.js only loaded when needed (conditional in front matter)
- **SEO**: Each page must have unique `title` and `description` in front matter
- **Math notation**: Keep LaTeX consistent - use `$...$` inline, `$$...$$` display

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
│   ├── assets/images/          # Optimized WebP images
│   ├── index.njk              # Homepage ✅
│   ├── test.njk               # Quiz page ✅
│   ├── login.njk              # Login form ✅
│   ├── register.njk           # Registration form ✅
│   └── [basics|simplex|duality|glossary|literature].njk  # ⏳ TODO
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
- Infrastructure setup (package.json, .eleventy.js, scripts)
- CSS design system with tokens
- Template architecture (layouts, components)
- Quiz refactored to Alpine.js with JSON data
- Homepage, test page, login/register forms converted to .njk
- Documentation (START.md, SETUP.md, copilot-instructions.md)

**Pending (⏳):**
- Convert remaining HTML pages to .njk:
  - basics.html → src/basics.njk (with content-page.njk layout)
  - simplex.html → src/simplex.njk
  - duality.html → src/duality.njk
  - glossary.html → src/glossary.njk
  - literature.html → src/literature.njk
- Run `npm run optimize-images` to convert 7 PNG files to WebP
- Test all pages in browser after `npm run dev`
- Delete old HTML files after successful migration

**Next Steps:**
1. User runs `npm install` to get dependencies
2. User runs `npm run dev` to test current setup
3. Agent helps migrate remaining content pages to .njk format
4. Run image optimization script
5. Review and iterate on design/functionality

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
