import type { ReactNode } from 'react';

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  optionalLabel?: string;
  className?: string;
  children: (a11y: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string; className: string }) => ReactNode;
}

export const fieldControlClass =
  'block w-full rounded-sm border bg-paper px-4 py-3 text-body text-espresso placeholder:text-taupe/70 transition-colors duration-fast focus:border-espresso focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[52px]';

/** Label + control + inline error, wired together for screen readers. */
export function FormField({ id, label, error, hint, optional, optionalLabel = 'optional', className = '', children }: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-small font-medium">
        <span>{label}</span>
        {optional && <span className="text-[0.75rem] font-normal text-taupe">{optionalLabel}</span>}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        className: `${fieldControlClass} ${error ? 'border-clay' : 'border-stone'}`,
      })}
      {hint && !error && (
        <p id={hintId} className="mt-2 text-[0.8125rem] text-taupe">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-[0.8125rem] font-medium text-clay">
          {error}
        </p>
      )}
    </div>
  );
}
