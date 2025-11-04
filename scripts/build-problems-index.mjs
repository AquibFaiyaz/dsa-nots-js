#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Windows-safe resolution of repo root from this script's file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const ARRAYS_DIR = path.join(REPO_ROOT, 'Arrays');
const PUBLIC_PROBLEMS_DIR = path.join(REPO_ROOT, 'web', 'public', 'problems');
const OUTPUT_JSON = path.join(REPO_ROOT, 'web', 'src', 'data', 'problems.json');

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function readText(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (err) {
    return null;
  }
}

function extractTitleFromReadme(readme) {
  const lines = readme.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^#\s+(.*)$/);
    if (m) return m[1].trim();
  }
  return '';
}

function extractSourceUrl(readme) {
  const m = readme.match(/https?:\/\/[^\s`*)]+/);
  return m ? m[0] : '';
}

async function build() {
  await ensureDir(PUBLIC_PROBLEMS_DIR);
  await ensureDir(path.dirname(OUTPUT_JSON));

  const problems = [];

  let arrayEntries = [];
  try {
    arrayEntries = await fs.readdir(ARRAYS_DIR, { withFileTypes: true });
  } catch (err) {
    console.error('No Arrays directory found at', ARRAYS_DIR);
    process.exit(1);
  }

  for (const dirent of arrayEntries) {
    if (!dirent.isDirectory()) continue;
    const slug = dirent.name; // e.g., rearrange-array-elements-by-sign
    const problemDir = path.join(ARRAYS_DIR, slug);
    const readmePath = path.join(problemDir, 'README.md');
    const codePath = path.join(problemDir, 'solution', 'code.js');

    const readme = await readText(readmePath);
    const code = await readText(codePath);
    if (!readme || !code) continue;

    const title = extractTitleFromReadme(readme) || slug;
    const source = extractSourceUrl(readme);

    const targetDir = path.join(PUBLIC_PROBLEMS_DIR, slug);
    await ensureDir(targetDir);
    await fs.writeFile(path.join(targetDir, 'README.md'), readme, 'utf8');
    await fs.writeFile(path.join(targetDir, 'code.js'), code, 'utf8');

    problems.push({
      id: slug,
      category: 'Arrays',
      title,
      source,
      assets: {
        readmeUrl: `/problems/${slug}/README.md`,
        codeUrl: `/problems/${slug}/code.js`,
      },
    });
  }

  problems.sort((a, b) => a.title.localeCompare(b.title));
  await fs.writeFile(OUTPUT_JSON, JSON.stringify(problems, null, 2), 'utf8');
  console.log(`Generated ${problems.length} problems →`, path.relative(REPO_ROOT, OUTPUT_JSON));
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});


