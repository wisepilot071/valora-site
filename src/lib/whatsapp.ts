import { brand } from '@/config/brand';
import {
  whatsappMessages,
  type CartLineForMessage,
  type CorporateEnquiryForMessage,
  type GeneralEnquiryForMessage,
} from '@/config/whatsapp';
import type { Product } from '@/data/types';
import { effectivePrice } from './pricing';
import { formatINR } from './format';

const phone = () => `${brand.whatsapp.countryCode}${brand.whatsapp.number}`.replace(/\D/g, '');

/** Build a wa.me deep link. The message is always URI-encoded. */
export const whatsappUrl = (message?: string) =>
  `https://wa.me/${phone()}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const productEnquiryUrl = (p: Product) =>
  whatsappUrl(whatsappMessages.productEnquiry({ name: p.name, price: formatINR(effectivePrice(p)) }));

export const cartOrderUrl = (lines: CartLineForMessage[], subtotal: number) =>
  whatsappUrl(whatsappMessages.cartOrder(lines, formatINR(subtotal)));

export const corporateEnquiryUrl = (f: CorporateEnquiryForMessage) =>
  whatsappUrl(whatsappMessages.corporateEnquiry(f));

export const generalEnquiryUrl = (f?: GeneralEnquiryForMessage) =>
  whatsappUrl(f ? whatsappMessages.generalEnquiry(f) : whatsappMessages.general());

/** Props every external WhatsApp link uses. */
export const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' } as const;
