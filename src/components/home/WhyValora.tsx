import { homepage } from '@/data/homepage';
import { whyValora } from '@/data/whyValora';

export function WhyValora() {
  const w = homepage.whyValora;
  return (
    <section aria-labelledby="why-heading" className="border-y border-stone py-20 lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <h2 id="why-heading" className="text-h2 lg:col-span-3">
          {w.heading}
        </h2>
        <ol className="grid gap-12 sm:grid-cols-3 sm:gap-8 lg:col-span-9">
          {whyValora.map((item, i) => (
            <li key={item.title} data-reveal style={{ ['--reveal-delay' as string]: `${i * 100}ms` }}>
              <span className="block font-display text-[3.5rem] leading-none text-clay">{item.number}</span>
              <span className="mt-6 block h-px w-full bg-stone" aria-hidden />
              <h3 className="mt-6 font-display text-h3">{item.title}</h3>
              <p className="mt-3 text-taupe">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
