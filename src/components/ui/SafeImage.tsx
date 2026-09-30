'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { Mark } from './Icons';

/**
 * next/image with a branded fallback. If a file is missing the frame keeps its
 * size (no layout shift, no broken-image icon) and shows the VALORA mark.
 * Always render inside a sized, position:relative parent when using `fill`.
 */
export function SafeImage({ alt, className = '', label, ...props }: ImageProps & { label?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={alt} className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linen text-taupe">
        <Mark size={28} className="text-clay" />
        {label && <span className="font-display text-lg">{label}</span>}
      </div>
    );
  }
  return (
    <Image
      alt={alt}
      className={className}
      onError={() => {
        if (process.env.NODE_ENV === 'development') console.warn(`[VALORA] Image not found: ${String(props.src)}`);
        setFailed(true);
      }}
      {...props}
    />
  );
}
