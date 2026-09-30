import type { Metadata } from 'next';
import { brand, isConfigured } from '@/config/brand';
import { corporateForm, contactForm } from '@/config/forms';
import { contact } from '@/data/contact';
import { seo } from '@/data/seo';
import { getVisibleProducts } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { generalEnquiryUrl } from '@/lib/whatsapp';
import { ui } from '@/data/site';
import { ButtonLink } from '@/components/ui/Button';
import { MailIcon } from '@/components/ui/Icons';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { SEOHead } from '@/components/ui/SEOHead';
import { CorporateEnquiryForm } from '@/components/forms/CorporateEnquiryForm';
import { ContactForm } from '@/components/forms/ContactForm';

const p = seo.pages.contact;
export const metadata: Metadata = buildMetadata({ title: p.title, description: p.description, path: p.path, keywords: p.keywords });

export default function ContactPage() {
  const hampers = getVisibleProducts().map((x) => x.name);
  const emailOk = isConfigured(brand.email);
  return (
    <>
      <header className="container-site pb-14 pt-10 lg:pb-20 lg:pt-16">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-clay" aria-hidden />
          {contact.eyebrow}
        </p>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="text-display lg:col-span-7">{contact.h1}</h1>
          <div className="lg:col-span-5">
            <p className="font-display text-h3 italic">{contact.intro}</p>
            <p className="mt-4 text-taupe">{contact.introBody}</p>
          </div>
        </div>
      </header>

      <div className="container-site grid gap-16 border-t border-stone pb-24 pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-32 lg:pt-20">
        <section id={corporateForm.id} aria-labelledby="corporate-form-heading" className="scroll-mt-28 lg:col-span-7">
          <p className="eyebrow mb-4">{corporateForm.eyebrow}</p>
          <h2 id="corporate-form-heading" className="text-h2">{corporateForm.heading}</h2>
          <p className="mb-10 mt-4 max-w-xl text-taupe">{corporateForm.intro}</p>
          <CorporateEnquiryForm hampers={hampers} />
          <a href={generalEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-small underline decoration-stone underline-offset-4 hover:text-clay">
            <WhatsAppIcon size={18} /> {contact.corporate.whatsappLabel}
          </a>
        </section>

        <aside aria-labelledby="personal-heading" className="lg:col-span-4 lg:col-start-9">
          <div className="border border-stone p-8 lg:sticky lg:top-28 lg:p-10">
            <p className="eyebrow mb-4">{contact.personal.eyebrow}</p>
            <h2 id="personal-heading" className="text-h3">{contact.personal.heading}</h2>
            <p className="mt-3 text-taupe">{contact.personal.body}</p>
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={generalEnquiryUrl()} external>
                <WhatsAppIcon size={18} /> {contact.personal.whatsappLabel}
              </ButtonLink>
              {emailOk && (
                <ButtonLink href={`mailto:${brand.email}`} variant="secondary">
                  <MailIcon size={18} /> {contact.personal.emailLabel}
                </ButtonLink>
              )}
            </div>
            <dl className="mt-8 space-y-3 border-t border-stone pt-6 text-small">
              <div>
                <dt className="text-taupe">{ui.nav.whatsapp}</dt>
                <dd><a href={generalEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center hover:text-clay">{brand.whatsapp.display}</a></dd>
              </div>
              {emailOk && (
                <div>
                  <dt className="text-taupe">Email</dt>
                  <dd><a href={`mailto:${brand.email}`} className="inline-flex min-h-[44px] items-center hover:text-clay">{brand.email}</a></dd>
                </div>
              )}
              {brand.serviceArea.show && (
                <div>
                  <dt className="text-taupe">{contact.serviceAreaLabel}</dt>
                  <dd>{brand.serviceArea.label}</dd>
                </div>
              )}
            </dl>
            <div className="mt-10 border-t border-stone pt-8">
              <h3 className="mb-5 font-display text-[1.5rem]">{contactForm.heading}</h3>
              <ContactForm />
            </div>
          </div>
        </aside>
      </div>
      <SEOHead schema={breadcrumbSchema([{ name: ui.breadcrumb.home, path: '/' }, { name: contact.eyebrow, path: '/contact' }])} />
    </>
  );
}
