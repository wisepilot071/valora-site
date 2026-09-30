/**
 * Zero-dependency analytics hook. No third-party scripts are loaded.
 * If you later add a provider that exposes window.dataLayer (e.g. GTM),
 * events flow into it automatically.
 */
type EventName =
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_whatsapp_checkout'
  | 'whatsapp_enquiry'
  | 'corporate_enquiry_submit'
  | 'contact_submit';

export function track(event: EventName, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...props });
  if (process.env.NODE_ENV === 'development') console.info('[analytics]', event, props);
}
