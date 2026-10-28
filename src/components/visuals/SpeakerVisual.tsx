import type { CSSProperties } from 'react';

/**
 * Seas A26 wide-baffle speakers. Three parts: how the design was made (a
 * conversation with Claude, which drove 00 Simulator over MCP), the primary
 * cabinet drawn to scale in inches, and the simulator's comparison of every
 * candidate box. All numbers come from the build doc.
 */
const STEPS = [
  { tag: 'Brief', text: 'Wider, Orangutan-style cabinet; stock A26 drivers and crossover' },
  { tag: 'Claude ⇄ 00 Simulator', text: 'Candidate boxes modelled and simulated over MCP, trade-offs explained' },
  { tag: 'Build doc', text: 'Cut lists, scale drawings, sheet layout and build steps' },
];

// Box, baffle step (Hz), F10 (Hz) — "Simulated comparison vs the stock kit"
const RUNS = [
  { box: 'Stock kit', size: '12.2 × 20.1', step: 353, f10: 44.2 },
  { box: 'Compact C', size: '16.5 × 20', step: 261, f10: 42.6 },
  { box: '16.5 wide', size: '16.5 × 22', step: 261, f10: 40.7 },
  { box: 'Primary', size: '17.25 × 22', step: 249, f10: 40.5, primary: true },
  { box: 'C', size: '18 × 22', step: 239, f10: 40.3 },
];
const MAX_STEP = 360;

export function SpeakerVisual() {
  return (
    <figure className="sp-visual">
      <div className="sp-top">
        {/* Callout 1: AI collaborative design */}
        <section className="sp-panel sp-collab" aria-labelledby="sp-collab-title">
          <span className="r-label sp-kicker" id="sp-collab-title">
            <span className="sp-num">A</span>AI collaborative design
          </span>
          <ol className="sp-steps">
            {STEPS.map((s, i) => (
              <li key={s.tag} style={{ '--i': i } as CSSProperties} className={i === 1 ? 'is-loop' : ''}>
                <span className="sp-step-tag">{s.tag}</span>
                <span className="sp-step-text">{s.text}</span>
              </li>
            ))}
          </ol>
          <span className="sp-mcp" aria-hidden="true">
            <span>MCP</span>
            <span className="sp-mcp-dots"><i /><i /><i /></span>
            <span>00 Simulator</span>
          </span>
        </section>

        {/* The primary build, to scale (units are inches) */}
        <section className="sp-panel sp-drawing" aria-label="Primary build front elevation, drawn to scale">
          <svg viewBox="-2.2 -1.6 21.6 25.6" role="img" aria-label="Front baffle 17 1/4 by 22 inches with tweeter, woofer and port">
            <rect x="0" y="0" width="17.25" height="22" className="sp-baffle" />
            {/* woofer: Ø9 5/8 cutout, centre 10 5/8 down */}
            <circle cx="8.625" cy="10.625" r="5.3" className="sp-woofer-frame" />
            <circle cx="8.625" cy="10.625" r="4.81" className="sp-woofer-cone" />
            <circle cx="8.625" cy="10.625" r="1.6" className="sp-woofer-cap" />
            {/* tweeter: centre 2 7/8 down, 1 15/32 right of centre */}
            <circle cx="10.094" cy="2.875" r="2.19" className="sp-tweeter-frame" />
            <circle cx="10.094" cy="2.875" r="0.75" className="sp-tweeter-dome" />
            {/* aperiodic port: 8 3/4 × 3/8 slot, bottom edge 1 3/16 up */}
            <rect x="4.25" y="20.44" width="8.75" height="0.375" className="sp-port" />
            {/* dimensions */}
            <line x1="0" y1="-0.8" x2="17.25" y2="-0.8" className="sp-dim" />
            <line x1="-0.8" y1="0" x2="-0.8" y2="22" className="sp-dim" />
            <text x="8.625" y="-1.05" className="sp-dim-text" textAnchor="middle">17 1/4 in</text>
            <text x="-1.15" y="11" className="sp-dim-text" textAnchor="middle" transform="rotate(-90 -1.15 11)">22 in</text>
            <line x1="18.1" y1="2.875" x2="18.1" y2="10.625" className="sp-dim sp-dim--accent" />
            <text x="18.5" y="7" className="sp-dim-text sp-dim-text--small">7 3/4</text>
          </svg>
          <span className="r-label">Primary build · 43 L · aperiodic</span>
        </section>
      </div>

      {/* Callout 2: the speaker simulator over MCP */}
      <section className="sp-panel sp-sim" aria-labelledby="sp-sim-title">
        <div className="sp-sim-head">
          <span className="r-label sp-kicker" id="sp-sim-title">
            <span className="sp-num">B</span>Simulated in 00 Simulator via MCP
          </span>
          <span className="sp-legend" aria-hidden="true">
            <span><i className="sp-swatch sp-swatch--step" />Baffle step (lower = fuller lower mids)</span>
            <span>F10</span>
          </span>
        </div>
        <ul className="sp-runs">
          {RUNS.map((r, i) => (
            <li key={r.box} className={r.primary ? 'is-primary' : ''} style={{ '--w': `${(r.step / MAX_STEP) * 100}%`, '--i': i } as CSSProperties}>
              <span className="sp-run-box">
                {r.box}
                <span className="sp-run-size">{r.size} in</span>
              </span>
              <span className="sp-run-bar"><span><b>{r.step} Hz</b></span></span>
              <span className="sp-run-f10">{r.f10} Hz</span>
            </li>
          ))}
        </ul>
      </section>
      <figcaption className="r-label sp-caption">
        Every box landed within 1 dB and 5 Hz on bass, so width decided it: the narrowest that gives up nothing
      </figcaption>
    </figure>
  );
}
