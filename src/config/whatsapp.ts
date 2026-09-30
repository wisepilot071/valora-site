/**
 * Every WhatsApp message the site can send is written here.
 * Edit the wording freely; keep the ${...} placeholders.
 */
import { brand } from './brand';

export interface CartLineForMessage {
  name: string;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
}

export interface CorporateEnquiryForMessage {
  name: string;
  company: string;
  phone: string;
  email: string;
  quantity: string | number;
  preferredHamper: string;
  budgetPerHamper: string;
  message: string;
}

export interface GeneralEnquiryForMessage {
  name: string;
  message: string;
}

const b = brand.brandName;

export const whatsappMessages = {
  productEnquiry: (p: { name: string; price: string }) =>
    `Hi ${b}, I'd like to know more about ${p.name} (${p.price}).`,

  cartOrder: (lines: CartLineForMessage[], subtotal: string) =>
    [
      `Hi ${b}, I'd like to place an order:`,
      '',
      ...lines.map((l) => `• ${l.name} × ${l.quantity} — ${l.lineTotal}`),
      '',
      `Subtotal: ${subtotal}`,
      '',
      'Please confirm availability and delivery.',
    ].join('\n'),

  corporateEnquiry: (f: CorporateEnquiryForMessage) =>
    [
      `Hi ${b}, I have a corporate gifting enquiry:`,
      '',
      `Name: ${f.name}`,
      `Company: ${f.company}`,
      `Phone: ${f.phone}`,
      `Email: ${f.email}`,
      `Number of hampers: ${f.quantity}`,
      `Preferred hamper: ${f.preferredHamper || 'Not sure yet'}`,
      `Budget per hamper: ${f.budgetPerHamper || 'Open'}`,
      `Message: ${f.message || '—'}`,
    ].join('\n'),

  generalEnquiry: (f: GeneralEnquiryForMessage) =>
    [`Hi ${b}, I have a question.`, '', `Name: ${f.name}`, '', f.message].join('\n'),

  general: () => `Hi ${b}, I have a question.`,
};
