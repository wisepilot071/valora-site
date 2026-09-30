'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { contactForm as copy } from '@/config/forms';
import { generalEnquiryUrl } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { Button, buttonClass } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { FormField } from './FormField';
import { FormSuccess } from './FormSuccess';

const schema = z.object({
  name: z.string().trim().min(2, copy.errors.name),
  message: z.string().trim().min(5, copy.errors.message).max(1000),
});
type Values = z.infer<typeof schema>;

/** A short personal-gifting question, sent via WhatsApp. */
export function ContactForm() {
  const [url, setUrl] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = (v: Values) => {
    const link = generalEnquiryUrl(v);
    window.open(link, '_blank', 'noopener,noreferrer');
    track('contact_submit');
    setUrl(link);
  };

  if (url) {
    return (
      <FormSuccess heading={copy.success.heading} body={copy.success.body}>
        <div className="flex flex-wrap gap-3">
          <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'sm')}>
            <WhatsAppIcon size={18} /> WhatsApp
          </a>
          <button type="button" className={buttonClass('ghost', 'sm')} onClick={() => { reset(); setUrl(null); }}>
            {copy.success.reset}
          </button>
        </div>
      </FormSuccess>
    );
  }

  return (
    <form data-form="contact" onSubmit={handleSubmit(onSubmit)} noValidate aria-label={copy.heading} className="space-y-5">
      <FormField id="cf-name" label={copy.fields.name.label} error={errors.name?.message}>
        {(a) => <input {...a} {...register('name')} type="text" autoComplete={copy.fields.name.autoComplete} placeholder={copy.fields.name.placeholder} />}
      </FormField>
      <FormField id="cf-message" label={copy.fields.message.label} error={errors.message?.message}>
        {(a) => <textarea {...a} {...register('message')} rows={3} placeholder={copy.fields.message.placeholder} className={`${a.className} resize-y`} />}
      </FormField>
      <Button type="submit" variant="secondary">
        <WhatsAppIcon size={18} /> {copy.submitLabel}
      </Button>
    </form>
  );
}
