import type { SVGProps } from 'react';

export function WhatsAppIcon({ size = 20, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" aria-hidden focusable={false} {...props}>
      <path d="M4.2 19.8 5.3 16A8.2 8.2 0 1 1 8.4 19l-4.2.8Z" />
      <path
        d="M9.2 8.4c.2-.4.5-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.8 1.3 1.7 2.2 2.1.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .5-.2 1.3-1 1.7-.7.4-1.8.4-3.2-.2-1.5-.7-2.8-2-3.6-3.4-.7-1.3-.7-2.3-.3-3.2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
