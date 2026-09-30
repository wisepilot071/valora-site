/**
 * Builds tiny blurred previews for every image in /public/images so no image
 * frame is ever empty while the real photo loads. Runs automatically before
 * `npm run dev` and `npm run build`. Output: src/data/generated/blur-placeholders.json
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'public');
const out = path.resolve(process.cwd(), 'src/data/generated/blur-placeholders.json');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('[blur] sharp not available — keeping existing placeholders');
  process.exit(0);
}

const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) files.push(p);
  }
};
walk(path.join(root, 'images'));

const map = {};
for (const file of files.sort()) {
  const key = '/' + path.relative(root, file).split(path.sep).join('/');
  try {
    const buf = await sharp(file).resize(12, null, { fit: 'inside' }).webp({ quality: 40 }).toBuffer();
    map[key] = `data:image/webp;base64,${buf.toString('base64')}`;
  } catch (e) {
    console.warn(`[blur] skipped ${key}: ${e.message}`);
  }
}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(map, null, 0) + '\n');
console.log(`[blur] ${Object.keys(map).length} placeholders written`);
