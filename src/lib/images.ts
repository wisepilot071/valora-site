import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

/** Development-only warning for image paths that don't exist in /public. */
export function warnMissingImages(srcs: string[], context: string) {
  if (process.env.NODE_ENV !== 'development') return;
  for (const src of srcs) {
    if (/^https?:\/\//.test(src)) continue;
    const file = path.join(process.cwd(), 'public', src);
    if (!fs.existsSync(file)) console.warn(`[VALORA] Missing image for ${context}: ${src} — a branded placeholder will be shown.`);
  }
}
