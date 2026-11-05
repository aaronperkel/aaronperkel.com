// Fails if the build-time resume PDF runs past one page. Run after
// `npm run build` (CI does). react-pdf writes one `/Type /Page` object per
// page (the page tree itself is `/Type /Pages`), uncompressed, so a regex count
// is enough — no PDF library needed.
import { readFileSync } from "node:fs";

const path = ".next/server/app/resume.pdf.body";
let pdf;
try {
  pdf = readFileSync(path, "latin1");
} catch {
  console.error(`${path} not found; run \`npm run build\` first.`);
  process.exit(1);
}

const pages = (pdf.match(/\/Type\s*\/Page(?!s)\b/g) ?? []).length;
if (pages !== 1) {
  console.error(`resume.pdf is ${pages} pages; it must fit on one.`);
  process.exit(1);
}
console.log("resume.pdf: 1 page");
