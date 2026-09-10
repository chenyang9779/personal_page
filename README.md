# Chenyang Wu — Personal Website

A static personal website for Chenyang Wu, built with plain HTML, CSS, and JavaScript.

## Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, responsive grid, dark mode via system preference
- **Vanilla JavaScript** — mobile nav toggle, scroll-aware navigation highlighting
- **Zero build step, zero dependencies**

## Project structure

```
.
├── index.html              # Main page (all content lives here)
├── css/
│   └── style.css           # All styles — design system, layout, responsive
├── js/
│   └── main.js             # Navigation toggle, scroll highlighting, theme
├── favicon.svg             # Site favicon
├── robots.txt              # Search engine directives
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deployment
├── .gitignore
└── README.md
```

### Files to edit for content changes

| What you want to change | Edit this |
|---|---|
| All page content (hero, work, experience, about, skills, education, contact) | `index.html` |
| Colours, typography, spacing, layout | `css/style.css` |
| Navigation behaviour, mobile menu | `js/main.js` |

## Local development

No build tool is required. The site is a collection of static files.

To preview locally, serve the root directory with any static file server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node (if available)
npx serve .

# Or open index.html directly in a browser
```

Then visit `http://localhost:8000`.

## Building

There is no build step. All files are production-ready as-is.

## Deploying to GitHub Pages

### Option A: `chenyang9779.github.io` repository

1. Clone this repository as `chenyang9779.github.io`.
2. Push to the `main` branch.
3. GitHub Actions will automatically deploy.
4. The site will be live at `https://chenyang9779.github.io`.

### Option B: Custom domain with a different repo name

1. Enable GitHub Pages in **Settings → Pages**, set source to `main` branch, root path.
2. Push to `main`.
3. The site will be live at `https://<username>.github.io/<repo-name>`.

### Option C: Manual deployment

1. Push all files (except `node_modules/` — not applicable here) to the `main` branch of a GitHub repository.
2. Enable GitHub Pages in repository settings pointing to `main` branch.

## CV / Resume PDF

Place your CV PDF as `cv.pdf` in the project root directory.

The site includes links to `cv.pdf` in the hero section and footer.

## Design decisions

- **Typography-led**: Georgia serif for headings, system sans-serif for body, system monospace for technical labels.
- **Color**: Warm off-white background, single muted blue accent, full dark mode via system preference.
- **No cards, shadows, or gradients**: Information hierarchy through typography, spacing, and horizontal rules.
- **Responsive**: Deliberate layouts at 375px, 768px, 1024px, and 1440px+.
- **Accessible**: Semantic HTML, keyboard navigation, visible focus states, sufficient contrast, `prefers-reduced-motion` support.
- **Fast**: No JavaScript frameworks, no build step, no external dependencies (except Inter font for UI elements).

## Licence

Private — do not redistribute.
