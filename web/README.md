# DSA Notes Web (Vite + React)

## Scripts
- dev: Start the dev server
- build: Generate problems index and build the app
- preview: Preview the production build
- generate:problems: Build `src/data/problems.json` and copy assets to `public/`
- gen:problems: Alias for `generate:problems`

## Usage
1. Install deps:
```
cd web
npm install
```
2. Generate problems (from repo root Arrays/*):
```
npm run generate:problems
# or
npm run gen:problems
```
3. Start dev server:
```
npm run dev
```
4. Build (generator runs automatically):
```
npm run build
```

The generator copies each problem's README and code into `public/problems/<slug>/` and writes metadata to `src/data/problems.json`. The app lists problems and renders the README and code.


