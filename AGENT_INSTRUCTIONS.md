

Goal:
For each DSA problem URL given, create a folder `Arrays/<kebab-slug>/` containing:
- README.md
- solution/code.js

README.md structure (exact order):
1. Title — Problem name (H1)
2. Source — link to the original page (single line)
3. Problem — concise restatement of the problem (include Input/Output description)
4. Examples — for each sample include: Input, Output, and an Explanation justifying the output
5. Solution — concise bullets (3–8 short points) explaining the chosen algorithm and complexity
6. Dry run — 1–2 step-by-step traces on small inputs to show how algorithm works
7. Pseudocode — concise steps that mirror the algorithm implemented
8. Code — The link has JavaScript solution. Use that only exactly. Code must be runnable with `node`. Also add comments for better readability and revision for learner.

File: solution/code.js
- Include minimal comments and an exported function `function solve(input)` or `module.exports = function solve(input)`.
- If the problem expects interactive input, include a comment explaining how to run locally with sample input.

Formatting rules:
- README.md must use Markdown headers and code fences.
- Keep the Solution bullets concise (one sentence per bullet).
- In the Dry run, show intermediate states (arrays/sets/indices).
- Add `Complexity` line in Solution: Time: O(...), Space: O(...).

If the source page provides sample I/O, copy them; otherwise create 1-2 representative examples.

If you cannot reliably parse the page, use the page text and produce the best effort README from it.


Web app ingestion:
- After adding or updating problems under `Arrays/`, generate the web data:
  - `cd web && npm run generate:problems`
- This copies each problem's `README.md` and `solution/code.js` into the web app and updates `src/data/problems.json`.