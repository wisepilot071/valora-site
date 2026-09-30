import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/config/brand';

/**
 * Brand logo, from the files set in config/brand.ts.
 * variant "wordmark" = name only (header); "full" = name + tagline (menu, footer).
 */
export function Logo({
  className = '',
  onClick,
  variant = 'wordmark',
  tone = 'dark',
  height = 30,
  priority = false,
}: {
  className?: string;
  onClick?: () => void;
  variant?: 'wordmark' | 'full';
  tone?: 'dark' | 'light';
  height?: number;
  priority?: boolean;
}) {
  const full = variant === 'full';
  const size = full ? brand.logoSize : brand.wordmarkSize;
  const src = full ? (tone === 'light' ? brand.logoLight : brand.logo) : tone === 'light' ? brand.wordmarkLight : brand.wordmark;
  const width = Math.round((size.width / size.height) * height);
  return (
    <Link href="/" onClick={onClick} className={`inline-flex min-h-[44px] items-center ${className}`} aria-label={`${brand.brandName} — home`}>
      <Image src={src} alt={brand.logoAlt} width={width} height={height} priority={priority} unoptimized style={{ width, height }} />
    </Link>
  );
}
