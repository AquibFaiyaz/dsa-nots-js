# DSA Notes (JS) — Problems + Web App

A monorepo for maintaining DSA problem notes and an interactive React app (Vite) to browse them.

- Problems live as Markdown + JS solutions under category folders (e.g., `Arrays/...`).
- A generator script copies problem assets to the web app and builds an index consumed by the UI.
- The web app supports dark/light mode, search suggestions, and a VS Code–like code viewer.

## Requirements
- Node.js 18+ and npm

## Quick start
```bash
# from project root
cd web
npm install
npm run generate:problems   # copies problem assets and builds index
npm run dev                 # open http://localhost:5173
```

## Build and preview
```bash
cd web
npm run build   # also runs the generator
npm run preview # local preview of the production build
```

## Project structure
```
.
├─ Arrays/
│  ├─ <problem-slug>/
│  │  ├─ README.md              # Problem statement, examples, explanation
│  │  └─ solution/code.js       # Exported solve(input) or module.exports = solve
│  └─ ...
├─ scripts/
│  └─ build-problems-index.mjs  # Copies problem assets into web/public and builds problems.json
├─ web/
│  ├─ public/
│  │  └─ problems/              # Generated: copied problem assets
│  ├─ src/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ search/
│  │  ├─ theme/
│  │  └─ data/problems.json     # Generated: problems index
│  └─ package.json
└─ README.md (this file)
```

## Adding a new problem
1. Create a folder under the appropriate category, e.g.:
   - `Arrays/<kebab-case-problem>/`
2. Add the files:
   - `README.md` — follow `AGENT_INSTRUCTIONS.md` (include Input, Output, and an Explanation under Examples)
   - `solution/code.js` — export `solve` with minimal comments for readability
3. Regenerate data for the web app:
```bash
cd web
npm run generate:problems
```
4. Start (or refresh) the dev server:
```bash
npm run dev
```

## Web app features
- Dark/Light mode toggle (persistent)
- Left navigation with categories and problems
- Search with suggestions dropdown; selecting a result navigates and expands the correct category
- README rendered with section boxes; code shown in Monaco Editor (read-only, folding, indent guides)

## Useful scripts (from `web/`)
- `npm run dev` — start dev server
- `npm run generate:problems` — copy problems and create `src/data/problems.json`
- `npm run build` — generate + build production assets
- `npm run preview` — preview production build

## Git ignore notes
The following are generated and safe to ignore/regen via scripts:
- `web/public/problems/`
- `web/src/data/problems.json`

## Troubleshooting
- “No problems found” in UI: run `npm run generate:problems` in `web/`.
- Windows path issues when generating: already handled in `scripts/build-problems-index.mjs` via Windows-safe path resolution.
- Fonts not loading: run `npm install` inside `web/` to fetch `@fontsource/*` packages.

## License
MIT


