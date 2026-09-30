import { brand } from '@/config/brand';

const inr = new Intl.NumberFormat(brand.locale, {
  style: 'currency',
  currency: brand.currency,
  maximumFractionDigits: 0,
});

/** ₹3,450 */
export const formatINR = (amount: number) => inr.format(amount);
