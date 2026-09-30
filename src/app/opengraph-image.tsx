import { ImageResponse } from 'next/og';
import fs from 'node:fs/promises';
import path from 'node:path';
import { brand } from '@/config/brand';
import { colors } from '@/config/design-tokens';

export const alt = `${brand.brandName} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default async function OpengraphImage() {
  const photo = await fs.readFile(path.join(process.cwd(), 'public/images/og/valora-og-panel.jpg'));
  const src = `data:image/jpeg;base64,${photo.toString('base64')}`;
  const logo = await fs.readFile(path.join(process.cwd(), 'public', brand.logo));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: colors.paper }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 36, width: 460, padding: 64, color: colors.espresso }}>
          <img src={logoSrc} alt="" width={332} height={119} />
          <div style={{ width: 48, height: 2, background: colors.clay }} />
        </div>
        <img src={src} alt="" width={740} height={630} />
      </div>
    ),
    size,
  );
}
