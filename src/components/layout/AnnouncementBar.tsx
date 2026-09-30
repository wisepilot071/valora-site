import Link from 'next/link';
import { homepage } from '@/data/homepage';

export function AnnouncementBar() {
  const a = homepage.announcement;
  if (!a.enabled) return null;
  return (
    <div className="on-dark bg-olive text-paper">
      <p className="container-site flex min-h-[44px] items-center justify-center gap-3 text-center text-[0.8125rem] tracking-[0.02em]">
        {a.href ? (
          <>
            <Link href={a.href} className="inline-flex min-h-[44px] items-center sm:hidden">
              {a.text} <span aria-hidden className="ml-1.5">→</span>
            </Link>
            <span className="hidden sm:inline">{a.text}</span>
            <Link href={a.href} className="link-underline hidden min-h-[44px] items-center whitespace-nowrap font-medium sm:inline-flex">
              {a.linkLabel} <span aria-hidden className="ml-1.5">→</span>
            </Link>
          </>
        ) : (
          <span>{a.text}</span>
        )}
      </p>
    </div>
  );
}
