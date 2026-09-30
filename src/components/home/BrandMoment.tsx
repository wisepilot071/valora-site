import type { CSSProperties } from 'react';
import { homepage } from '@/data/homepage';
import { colors } from '@/config/design-tokens';
import { BrandMomentDriver } from './BrandMomentDriver';

/** Each animated piece runs between two points (0–1) of the scroll progress --p. */
const span = (a: number, b: number): CSSProperties => ({ ['--a' as string]: a, ['--b' as string]: b });

const STAR = 'M0 -10C0.9 -3.4 3.4 -0.9 10 0 3.4 0.9 0.9 3.4 0 10 -0.9 3.4 -3.4 0.9 -10 0 -3.4 -0.9 -0.9 -3.4 0 -10Z';

/**
 * "The passing of a gift" — a pinned, scroll-driven sequence.
 * 01 Chosen: pieces drop into the open box. 02 Wrapped: the lid closes, ribbon
 * and bow are tied, the wax seal is pressed. 03 Given: the tag swings in and the
 * box lifts, ready to hand over. Without JavaScript (or with reduced motion) it
 * rests on the finished gift.
 */
export function BrandMoment() {
  const m = homepage.brandMoment;
  const c = colors;
  return (
    <section id="brand-moment" aria-labelledby="moment-heading" className="vm bg-linen" data-step="3">
      <div className="vm-stage">
        <div className="container-site grid h-full items-center gap-6 py-10 lg:grid-cols-12 lg:gap-8 lg:py-0">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="eyebrow mb-6 flex items-center gap-3 lg:mb-10">
              <span className="h-px w-8 bg-clay" aria-hidden />
              <span id="moment-heading">{m.eyebrow}</span>
            </p>
            <ol className="vm-steps">
              {m.steps.map((s, i) => (
                <li key={s.word} className="vm-step" data-index={i + 1}>
                  <span className="vm-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="vm-word font-display">{s.word}</p>
                    <p className="vm-line">{s.line}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="vm-rail mt-8 hidden lg:block" aria-hidden>
              <span className="vm-rail-fill" />
            </div>
            <p style={span(0.84, 0.97)} className="vm-closing mt-8 font-display text-h3 italic text-taupe lg:mt-10">{m.closing}</p>
          </div>

          <figure className="order-1 lg:order-2 lg:col-span-7">
            <svg
              data-moment-art
              viewBox="60 90 480 425"
              className="vm-art mx-auto h-auto max-h-[44svh] w-full max-w-[640px] lg:max-h-[80svh]"
              role="img"
              aria-label="A VALORA gift box is filled, closed, tied with ribbon, sealed with wax and given with a tag that reads For you"
            >
              <defs>
                <radialGradient id="vm-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={c.paper} stopOpacity="1" />
                  <stop offset="100%" stopColor={c.paper} stopOpacity="0" />
                </radialGradient>
                <linearGradient id="vm-face" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#465140" />
                  <stop offset="100%" stopColor={c.olive} />
                </linearGradient>
                <linearGradient id="vm-lid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4B5645" />
                  <stop offset="100%" stopColor="#343D2D" />
                </linearGradient>
                <clipPath id="vm-inside">
                  <rect x="0" y="0" width="600" height="300" />
                </clipPath>
              </defs>

              {/* glow + ground */}
              <circle className="vm-fade" style={span(0.7, 0.95)} cx="300" cy="330" r="250" fill="url(#vm-glow)" />
              <ellipse className="vm-shadow" style={span(0.78, 0.92)} cx="300" cy="494" rx="200" ry="14" fill={c.espresso} opacity="0.12" />

              <g className="vm-lift" style={span(0.78, 0.92)}>
                {/* back rim of the open box */}
                <rect x="150" y="284" width="300" height="20" rx="2" fill="#2A3124" />

                {/* the pieces, dropping in one after another */}
                <g clipPath="url(#vm-inside)">
                  <g className="vm-drop" style={span(0, 0.08)}>
                    <path d="M150 300 L150 284 L172 270 L196 283 L222 268 L250 282 L276 266 L304 281 L330 267 L356 282 L384 268 L410 283 L432 270 L450 284 L450 300 Z" fill={c.paper} />
                    <path d="M172 270 L180 300 M222 268 L228 300 M276 266 L280 300 M330 267 L334 300 M384 268 L388 300 M432 270 L436 300" stroke={c.stone} strokeWidth="1" />
                  </g>
                  <g className="vm-drop" style={span(0.03, 0.13)}>
                    <path d="M186 300 C 188 285, 194 275, 202 262" stroke={c.sage} strokeWidth="3" fill="none" strokeLinecap="round" />
                    <ellipse cx="196" cy="276" rx="9" ry="4" transform="rotate(-40 196 276)" fill={c.sage} />
                    <ellipse cx="206" cy="268" rx="9" ry="4" transform="rotate(30 206 268)" fill={c.sage} />
                    <ellipse cx="190" cy="288" rx="8" ry="3.5" transform="rotate(35 190 288)" fill={c.sage} />
                  </g>
                  <g className="vm-drop" style={span(0.09, 0.19)}>
                    <rect x="214" y="266" width="70" height="80" rx="3" fill={c.mulberry} />
                    <rect x="214" y="266" width="8" height="80" fill="#4A1F29" />
                    <path d={STAR} transform="translate(254 290) scale(0.8)" fill={c.brass} />
                  </g>
                  <g className="vm-drop" style={span(0.15, 0.25)}>
                    <rect x="300" y="276" width="54" height="70" rx="9" fill="#B9803F" />
                    <rect x="296" y="266" width="62" height="16" rx="3" fill={c.brass} />
                    <rect x="308" y="292" width="38" height="22" rx="2" fill={c.paper} />
                  </g>
                  <g className="vm-drop" style={span(0.21, 0.31)}>
                    <rect x="372" y="280" width="58" height="66" rx="12" fill={c.paper} />
                    <path d="M430 292 q18 4 16 18 q-2 12 -16 12" stroke={c.paper} strokeWidth="7" fill="none" />
                    {[[385, 294], [400, 305], [414, 290], [392, 318], [418, 312]].map(([x, y]) => (
                      <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" fill={c.taupe} opacity="0.5" />
                    ))}
                  </g>
                </g>

                {/* front of the box */}
                <rect x="140" y="300" width="320" height="180" rx="4" fill="url(#vm-face)" />
                <rect x="140" y="300" width="320" height="3" fill="#56624E" />
                <path d={STAR} transform="translate(432 456) scale(0.9)" fill={c.brass} opacity="0.55" />

                {/* lid, closing */}
                <g className="vm-lid" style={span(0.36, 0.47)}>
                  <rect x="128" y="256" width="344" height="50" rx="5" fill="url(#vm-lid)" />
                  <rect x="128" y="256" width="344" height="3" rx="1.5" fill="#5E6A55" />
                </g>

                {/* ribbon */}
                <g fill="none" stroke={c.brass} strokeWidth="9" strokeLinecap="butt">
                  <path className="vm-draw" style={span(0.47, 0.55)} pathLength={1} d="M300 256 V480" />
                  <path className="vm-draw" style={span(0.52, 0.6)} pathLength={1} d="M140 392 H460" />
                </g>

                {/* bow */}
                <g className="vm-pop" style={span(0.57, 0.64)}>
                  <g transform="translate(300 256)">
                    <path d="M0 0 C -24 -30, -58 -22, -46 -4 C -38 8, -14 6, 0 0Z" fill={c.brass} />
                    <path d="M0 0 C 24 -30, 58 -22, 46 -4 C 38 8, 14 6, 0 0Z" fill={c.brass} />
                    <path d="M-2 2 L -22 34 L -12 32 L -8 40 Z M2 2 L 22 34 L 12 32 L 8 40 Z" fill="#B48E66" />
                    <circle r="7" fill="#B48E66" />
                  </g>
                </g>

                {/* wax seal */}
                <g className="vm-pop" style={span(0.62, 0.68)}>
                  <g transform="translate(300 392)">
                    <circle r="24" fill={c.mulberry} />
                    <circle r="18" fill="none" stroke="#7A3A47" strokeWidth="2" />
                    <path d={STAR} transform="scale(1.1)" fill={c.brass} />
                  </g>
                </g>

                {/* tag */}
                <g className="vm-swing" style={span(0.7, 0.82)}>
                  <path d="M312 262 C 340 250, 360 236, 392 226" stroke={c.taupe} strokeWidth="1.5" fill="none" />
                  <g transform="translate(386 206) rotate(-8)">
                    <path d="M0 10 L 12 0 H 104 V 46 H 12 L 0 36 Z" fill={c.paper} stroke={c.stone} strokeWidth="1.5" />
                    <circle cx="12" cy="23" r="3" fill={c.linen} stroke={c.taupe} strokeWidth="1" />
                    <text x="60" y="27" textAnchor="middle" className="vm-tagtext" fill={c.espresso} fontSize="17">
                      {m.tag}
                    </text>
                    <text x="60" y="39" textAnchor="middle" className="vm-mark" fill={c.clay} fontSize="6.5" letterSpacing="2.5">
                      VALORA
                    </text>
                  </g>
                </g>
              </g>

              {/* sparkles */}
              {[
                [118, 200, 1.5, 0],
                [492, 150, 1.2, 0.6],
                [512, 330, 0.9, 1.2],
                [96, 372, 1.1, 1.8],
                [214, 130, 0.8, 0.9],
              ].map(([x, y, s, d]) => (
                <g key={`${x}-${y}`} className="vm-spark" style={{ ...span(0.8, 0.9), ['--d' as string]: `${d}s` }}>
                  <path d={STAR} transform={`translate(${x} ${y}) scale(${s})`} fill={c.brass} />
                </g>
              ))}
            </svg>
          </figure>
        </div>
        <p className="vm-hint" aria-hidden>
          {m.scrollHint}
        </p>
      </div>
      <BrandMomentDriver targetId="brand-moment" />
    </section>
  );
}
