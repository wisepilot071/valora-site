import Link from 'next/link';
import { brand, isConfigured } from '@/config/brand';
import { footerLinks, getNavigation } from '@/config/navigation';
import { ui } from '@/data/site';
import { generalEnquiryUrl, externalLinkProps } from '@/lib/whatsapp';
import { InstagramIcon, MailIcon } from '@/components/ui/Icons';
import { Logo } from '@/components/ui/Logo';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

const heading = 'mb-5 font-sans text-eyebrow font-medium uppercase text-sage';
const link = 'link-underline inline-flex min-h-[44px] items-center text-paper/90 hover:text-paper';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-espresso text-paper">
      <div className="container-site pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="full" tone="light" height={96} className="-ml-1" />
            <p className="mt-6 max-w-sm text-small text-paper/80">{brand.positioning}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className={heading}>{ui.footer.navHeading}</h2>
            <ul>
              {getNavigation().map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={heading}>{ui.footer.contactHeading}</h2>
            <ul>
              <li>
                <a href={generalEnquiryUrl()} {...externalLinkProps} className={`${link} gap-3`}>
                  <WhatsAppIcon size={18} /> {brand.whatsapp.display}
                </a>
              </li>
              {isConfigured(brand.email) && (
                <li>
                  <a href={`mailto:${brand.email}`} className={`${link} gap-3`}>
                    <MailIcon size={18} /> {brand.email}
                  </a>
                </li>
              )}
              {brand.serviceArea.show && <li className="mt-2 text-small text-paper/70">{brand.serviceArea.label}</li>}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className={heading}>{ui.footer.corporateHeading}</h2>
            <p className="mb-2 text-small text-paper/75">{ui.footer.corporateBody}</p>
            <Link href={footerLinks.corporate.href} className={link}>
              {footerLinks.corporate.label}
            </Link>
            {brand.instagram && (
              <div className="mt-8">
                <h2 className={heading}>{ui.footer.socialHeading}</h2>
                <a href={brand.instagram} {...externalLinkProps} className={`${link} gap-3`}>
                  <InstagramIcon size={18} /> {ui.footer.instagram}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-paper/15 pt-8 text-[0.8125rem] text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.brandName}
          </p>
        </div>
      </div>
    </footer>
  );
}
