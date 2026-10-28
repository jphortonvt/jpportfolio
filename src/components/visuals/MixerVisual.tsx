import type { CSSProperties } from 'react';

/**
 * A live sketch of the Web Mixer's channel strips: faders, M/S/T/B buttons and
 * meters that rise and fall like the real ones (gradient fixed, bar clipped).
 * Decorative, so it is hidden from assistive tech; the caption describes it.
 */
const STRIPS = [
  { n: '01', fader: 62, meter: '2.1s', delay: '0s' },
  { n: '02', fader: 70, meter: '1.7s', delay: '-0.6s' },
  { n: '03', fader: 55, meter: '2.6s', delay: '-1.2s', solo: true },
  { n: '04', fader: 66, meter: '1.9s', delay: '-0.3s' },
  { n: '05', fader: 40, meter: '2.3s', delay: '-1.6s', mute: true },
  { n: '06', fader: 74, meter: '1.5s', delay: '-0.9s', boost: '+6' },
];

export function MixerVisual() {
  return (
    <figure className="mixer-visual">
      <div className="mixer-visual-bar" aria-hidden="true">
        <span className="mixer-visual-play">▶ Play</span>
        <span className="mixer-visual-time">01:24 / 31:06</span>
        <span className="mixer-visual-seek"><span /></span>
      </div>
      <div className="mixer-visual-strips" aria-hidden="true">
        {STRIPS.map((s) => (
          <div
            key={s.n}
            className={`mv-strip${s.mute ? ' is-muted' : ''}`}
            style={{ '--fader': `${s.fader}%`, '--meter-dur': s.meter, '--meter-delay': s.delay } as CSSProperties}
          >
            <span className="mv-num">{s.n}</span>
            <span className="mv-name">TRACK{s.n}</span>
            <span className="mv-buttons">
              <span className={s.mute ? 'on-mute' : ''}>M</span>
              <span className={s.solo ? 'on-solo' : ''}>S</span>
              <span>T</span>
              <span className={s.boost ? 'on-boost' : ''}>{s.boost ?? 'B'}</span>
            </span>
            <span className="mv-fader">
              <span className="mv-line" />
              <span className="mv-cap" />
              <span className="mv-meter"><span /></span>
            </span>
          </div>
        ))}
      </div>
      <figcaption className="r-label mixer-visual-caption">
        Channel strips: per-track meters, mute, solo, trim and boost
      </figcaption>
    </figure>
  );
}
