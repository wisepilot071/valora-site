'use client';

import type { Product } from '@/data/types';
import { ui } from '@/data/site';
import { productEnquiryUrl, externalLinkProps } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { buttonClass } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function EnquireLink({ product, variant = 'secondary', size = 'md', className = '', iconOnly = false }: { product: Product; variant?: 'secondary' | 'ghost' | 'primary'; size?: 'sm' | 'md' | 'lg'; className?: string; iconOnly?: boolean }) {
  return (
    <a
      href={productEnquiryUrl(product)}
      {...externalLinkProps}
      onClick={() => track('whatsapp_enquiry', { slug: product.slug })}
      className={iconOnly ? `inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-stone transition-colors hover:border-espresso ${className}` : buttonClass(variant, size, className)}
      aria-label={iconOnly ? `${ui.product.enquire}: ${product.name} (opens WhatsApp)` : undefined}
    >
      <WhatsAppIcon size={18} />
      {!iconOnly && <span>{ui.product.enquire}</span>}
    </a>
  );
}
