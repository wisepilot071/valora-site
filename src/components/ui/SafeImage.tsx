'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import blurMap from '@/data/generated/blur-placeholders.json';
import { Mark } from './Icons';

const blurs = blurMap as Record<string, string>;

/** Tiny blurred preview for a /public image, generated at build time. */
export const blurFor = (src: ImageProps['src']) => (typeof src === 'string' ? blurs[src] : undefined);

/**
 * next/image that never leaves an empty frame:
 * 1. shows a blurred preview while the photo loads,
 * 2. if the optimised image fails, retries the original file once,
 * 3. only if that fails too, shows the branded VALORA placeholder.
 * Always render inside a sized, position:relative parent when using `fill`.
 */
export function SafeImage({ alt, className = '', label, src, unoptimized, ...props }: ImageProps & { label?: string }) {
  const [attempt, setAttempt] = useState(0);
  const blur = blurFor(src);

  if (attempt > 1) {
    return (
      <div role="img" aria-label={alt} className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linen text-taupe">
        <Mark size={28} className="text-clay" />
        {label && <span className="font-display text-lg">{label}</span>}
      </div>
    );
  }
  return (
    <Image
      key={attempt}
      src={src}
      alt={alt}
      className={className}
      placeholder={blur ? 'blur' : 'empty'}
      blurDataURL={blur}
      unoptimized={attempt === 1 || unoptimized}
      onError={() => {
        if (process.env.NODE_ENV === 'development') console.warn(`[VALORA] Image failed (attempt ${attempt + 1}): ${String(src)}`);
        setAttempt((a) => a + 1);
      }}
      {...props}
    />
  );
}
