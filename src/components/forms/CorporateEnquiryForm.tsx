'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { brand, isConfigured } from '@/config/brand';
import { corporateForm as copy } from '@/config/forms';
import { whatsappMessages } from '@/config/whatsapp';
import { ui } from '@/data/site';
import { corporateEnquiryUrl } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { Button, buttonClass } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { FormField } from './FormField';
import { FormSuccess } from './FormSuccess';

const digits = (v: string) => v.replace(/\D/g, '');

const schema = z.object({
  name: z.string().trim().min(2, copy.errors.name),
  company: z.string().trim().min(2, copy.errors.company),
  phone: z
    .string()
    .trim()
    .refine((v) => {
      const d = digits(v);
      return d.length === 10 || (d.length >= 11 && d.length <= 13);
    }, copy.errors.phone),
  email: z.string().trim().email(copy.errors.email),
  quantity: z.coerce.number({ message: copy.errors.quantity }).int(copy.errors.quantity).min(1, copy.errors.quantity).max(100000, copy.errors.quantity),
  preferredHamper: z.string().optional().default(''),
  budgetPerHamper: z.string().trim().max(60).optional().default(''),
  message: z.string().trim().max(1000, copy.errors.message).optional().default(''),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function CorporateEnquiryForm({ hampers }: { hampers: string[] }) {
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [sentMessage, setSentMessage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormValues>({ resolver: zodResolver(schema), shouldFocusError: true, reValidateMode: 'onChange' });

  const onSubmit = (values: FormValues) => {
    const payload = { ...values, quantity: String(values.quantity) };
    const url = corporateEnquiryUrl(payload);
    setSentMessage(whatsappMessages.corporateEnquiry(payload));
    window.open(url, '_blank', 'noopener,noreferrer');
    track('corporate_enquiry_submit', { quantity: values.quantity });
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <FormSuccess heading={copy.success.heading} body={copy.success.body}>
        <p className="text-small text-taupe">{copy.success.fallbackPrefix}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'sm')}>
            <WhatsAppIcon size={18} /> {copy.success.fallbackWhatsApp}
          </a>
          {isConfigured(brand.email) && (
            <a
              href={`mailto:${brand.email}?subject=${encodeURIComponent(`Corporate gifting enquiry — ${brand.brandName}`)}&body=${encodeURIComponent(sentMessage)}`}
              className={buttonClass('secondary', 'sm')}
            >
              {copy.success.fallbackEmail}
            </a>
          )}
          <a href={`tel:+${brand.whatsapp.countryCode}${brand.whatsapp.number}`} className={buttonClass('secondary', 'sm')}>
            {copy.success.fallbackCall} {brand.whatsapp.display}
          </a>
        </div>
        <button
          type="button"
          className="mt-8 min-h-[44px] text-small underline decoration-stone underline-offset-4 hover:text-clay"
          onClick={() => {
            reset();
            setSentUrl(null);
          }}
        >
          {copy.success.reset}
        </button>
      </FormSuccess>
    );
  }

  const f = copy.fields;
  return (
    <form data-form="corporate" onSubmit={handleSubmit(onSubmit)} noValidate aria-label={copy.heading} className="grid gap-6 sm:grid-cols-2">
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="text-small font-medium text-clay sm:col-span-2">
          {ui.forms.errorSummary}
        </p>
      )}
      <FormField id="ce-name" label={f.name.label} error={errors.name?.message}>
        {(a) => <input {...a} {...register('name')} type="text" autoComplete={f.name.autoComplete} placeholder={f.name.placeholder} />}
      </FormField>
      <FormField id="ce-company" label={f.company.label} error={errors.company?.message}>
        {(a) => <input {...a} {...register('company')} type="text" autoComplete={f.company.autoComplete} placeholder={f.company.placeholder} />}
      </FormField>
      <FormField id="ce-phone" label={f.phone.label} error={errors.phone?.message}>
        {(a) => <input {...a} {...register('phone')} type="tel" inputMode="tel" autoComplete={f.phone.autoComplete} placeholder={f.phone.placeholder} />}
      </FormField>
      <FormField id="ce-email" label={f.email.label} error={errors.email?.message}>
        {(a) => <input {...a} {...register('email')} type="email" inputMode="email" autoComplete={f.email.autoComplete} placeholder={f.email.placeholder} />}
      </FormField>
      <FormField id="ce-quantity" label={f.quantity.label} error={errors.quantity?.message}>
        {(a) => <input {...a} {...register('quantity')} type="number" inputMode="numeric" min={1} step={1} placeholder={f.quantity.placeholder} />}
      </FormField>
      <FormField id="ce-hamper" label={f.preferredHamper.label} optional optionalLabel={ui.forms.optional}>
        {(a) => (
          <select {...a} {...register('preferredHamper')} className={`${a.className} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='m1 1 5 5 5-5' fill='none' stroke='%23231B16' stroke-width='1.4'/%3E%3C/svg%3E\")" }}>
            <option value="">{f.preferredHamper.placeholder}</option>
            {hampers.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        )}
      </FormField>
      <FormField id="ce-budget" label={f.budgetPerHamper.label} optional optionalLabel={ui.forms.optional} className="sm:col-span-2">
        {(a) => <input {...a} {...register('budgetPerHamper')} type="text" placeholder={f.budgetPerHamper.placeholder} />}
      </FormField>
      <FormField id="ce-message" label={f.message.label} error={errors.message?.message} optional optionalLabel={ui.forms.optional} className="sm:col-span-2">
        {(a) => <textarea {...a} {...register('message')} rows={5} placeholder={f.message.placeholder} className={`${a.className} resize-y`} />}
      </FormField>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          <WhatsAppIcon /> {isSubmitting ? ui.forms.sending : copy.submitLabel}
        </Button>
      </div>
    </form>
  );
}
