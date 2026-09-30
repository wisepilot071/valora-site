/**
 * Form labels, hints, validation messages and success copy.
 */
export const corporateForm = {
  id: 'corporate',
  eyebrow: 'Corporate Gifting',
  heading: 'Tell us about the occasion.',
  intro:
    'Share a few details and we’ll come back with a considered selection. Submitting opens WhatsApp with your enquiry ready to send.',
  submitLabel: 'Send enquiry on WhatsApp',
  fields: {
    name: { label: 'Name', placeholder: 'Your full name', autoComplete: 'name' },
    company: { label: 'Company', placeholder: 'Company or organisation', autoComplete: 'organization' },
    phone: { label: 'Phone', placeholder: '10-digit mobile number', autoComplete: 'tel' },
    email: { label: 'Email', placeholder: 'you@company.com', autoComplete: 'email' },
    quantity: { label: 'Number of hampers', placeholder: 'e.g. 40' },
    preferredHamper: { label: 'Preferred hamper', placeholder: 'Not sure yet' },
    budgetPerHamper: { label: 'Budget per hamper', placeholder: 'e.g. ₹3,000 – ₹5,000' },
    message: { label: 'Message', placeholder: 'Occasion, timelines, anything we should know' },
  },
  errors: {
    name: 'Please tell us your name.',
    company: 'Please add your company name.',
    phone: 'Please enter a valid phone number, 10 digits or with country code.',
    email: 'That email doesn’t look quite right.',
    quantity: 'Please enter how many hampers you need (at least 1).',
    message: 'Please keep your message under 1,000 characters.',
  },
  success: {
    heading: 'Thank you — we’ll be in touch.',
    body: 'Your enquiry should now be open in WhatsApp. Press send there and we’ll reply shortly.',
    fallbackPrefix: 'WhatsApp didn’t open?',
    fallbackWhatsApp: 'Try again',
    fallbackEmail: 'Email us instead',
    fallbackCall: 'Call us',
    reset: 'Send another enquiry',
  },
};

export const contactForm = {
  id: 'question',
  heading: 'Ask us anything',
  submitLabel: 'Ask on WhatsApp',
  fields: {
    name: { label: 'Name', placeholder: 'Your name', autoComplete: 'name' },
    message: { label: 'Your question', placeholder: 'A gift for my sister’s housewarming…' },
  },
  errors: {
    name: 'Please tell us your name.',
    message: 'Please write a short message (at least 5 characters).',
  },
  success: {
    heading: 'Thank you — we’ll be in touch.',
    body: 'Your message should now be open in WhatsApp. Press send there and we’ll reply shortly.',
    reset: 'Ask something else',
  },
};
