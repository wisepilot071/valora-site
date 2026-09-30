import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { brand } from '@/config/brand';
import { colors } from '@/config/design-tokens';
import { seo } from '@/data/seo';
import { corporateForm, contactForm } from '@/config/forms';
import { ui } from '@/data/site';
import { CartProvider } from '@/lib/cart';
import { getCartCatalog } from '@/lib/catalog';
import { buildMetadata, siteUrl } from '@/lib/seo';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { RevealObserver } from '@/components/ui/Reveal';
import { SEOHead } from '@/components/ui/SEOHead';

const display = localFont({
  src: [
    { path: '../fonts/cormorant-garamond-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/cormorant-garamond-latin-500-italic.woff2', weight: '500', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

const sans = localFont({
  src: [
    { path: '../fonts/hanken-grotesk-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/hanken-grotesk-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

const home = seo.pages.home;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...buildMetadata({ title: home.title, description: home.description, path: home.path, keywords: home.keywords, absoluteTitle: true }),
  title: { default: home.title, template: seo.titleTemplate },
  applicationName: brand.brandName,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: colors.paper,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={brand.locale} className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        {/* Marks JS as available so scroll-reveal can hide content before revealing it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a href="#main" className="sr-only z-[60] bg-espresso px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          {ui.skipToContent}
        </a>
        <CartProvider catalog={getCartCatalog()}>
          <AnnouncementBar />
          <Navbar />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <RevealObserver />
        <SEOHead schema={[organizationSchema(), websiteSchema()]} />
        {process.env.NEXT_PUBLIC_STATIC_PREVIEW === '1' && (
          <script
            type="application/json"
            id="vl-preview-data"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({ catalog: getCartCatalog(), brand: brand.brandName, phone: `${brand.whatsapp.countryCode}${brand.whatsapp.number}`, ui: ui.cart, forms: { corporate: corporateForm, contact: contactForm } }).replace(/</g, '\\u003c'),
            }}
          />
        )}
      </body>
    </html>
  );
}
