/**
 * Renders JSON-LD structured data. Page titles, descriptions, canonicals and
 * Open Graph are handled by Next.js metadata (see src/lib/seo.ts).
 */
export function SEOHead({ schema }: { schema: Record<string, unknown> | Record<string, unknown>[] }) {
  const list = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {list.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape "<" so data can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
