import { homepage } from '@/data/homepage';
import { colors } from '@/config/design-tokens';

/** Line-drawn open hand, palm up, fingers toward the centre. Mirrored for the receiving hand. */
const HAND = {
  forearm: 'M0 318 C 50 314, 96 306, 128 300 M0 376 C 60 376, 110 372, 150 360',
  palm: 'M128 300 C 170 296, 226 296, 282 292 M150 360 C 206 346, 262 336, 300 322',
  fingers: 'M282 292 C 304 290, 318 282, 320 270 C 321 262, 314 260, 308 265 M300 322 C 318 316, 330 304, 334 290 C 336 280, 328 276, 322 282 M292 306 C 312 302, 326 292, 330 280',
  thumb: 'M186 298 C 196 280, 214 270, 236 270 C 248 270, 252 278, 244 284',
  cuff: 'M40 312 C 50 336, 52 358, 46 376',
};

/** "The passing of a gift" — an abstract, line-drawn sequence: chosen, wrapped, given. */
export function BrandMoment() {
  const m = homepage.brandMoment;
  return (
    <section aria-labelledby="moment-heading" className="vl-moment bg-linen py-20 lg:py-32" data-inview-watch>
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-clay" aria-hidden />
            <span id="moment-heading">{m.eyebrow}</span>
          </p>
          <ol className="space-y-8">
            {m.steps.map((s) => (
              <li key={s.word} className="vl-step">
                <p className="vl-step-word font-display text-h2 text-espresso">{s.word}</p>
                <span className="vl-step-rule mt-2 block h-px w-24 bg-clay" aria-hidden />
                <p className="mt-3 max-w-sm text-taupe">{s.line}</p>
              </li>
            ))}
          </ol>
        </div>

        <figure className="lg:col-span-7">
          <svg viewBox="0 0 800 420" className="h-auto w-full text-espresso" role="img" aria-label="A wrapped gift passes from one pair of hands to another">
            <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              {[0, 1].map((side) => (
                <g key={side} transform={side ? 'translate(800 0) scale(-1 1)' : undefined}>
                  <path d={HAND.forearm} />
                  <path d={HAND.palm} />
                  <path d={HAND.fingers} />
                  <path d={HAND.thumb} />
                  <path d={HAND.cuff} strokeOpacity="0.5" />
                </g>
              ))}
            </g>
            <path d="M300 250 Q400 150 500 250" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeDasharray="1 7" strokeLinecap="round" />
            <g className="vl-anim vl-x" style={{ ['--travel' as string]: '392px' }}>
              <g className="vl-anim vl-y">
                <g className="vl-anim vl-box">
                  <rect x="146" y="206" width="124" height="88" fill={colors.olive} />
                  <rect x="140" y="194" width="136" height="18" fill={colors.espresso} />
                  <g fill="none" stroke={colors.brass} strokeWidth="2" strokeLinecap="round">
                    <path className="vl-anim vl-ribbon" pathLength={1} d="M208 194 V294" />
                    <path className="vl-anim vl-ribbon" pathLength={1} d="M146 250 H270" />
                    <path className="vl-anim vl-ribbon" pathLength={1} d="M208 194 C 192 172, 172 176, 180 188 C 185 196, 200 196, 208 194 C 224 172, 244 176, 236 188 C 231 196, 216 196, 208 194" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <figcaption className="mt-8 max-w-md font-display text-h3 italic text-taupe lg:ml-auto lg:text-right">{m.closing}</figcaption>
        </figure>
      </div>
    </section>
  );
}
