/**
 * Discogs Sync, drawn as the journey of one record: a release leaves the
 * Discogs collection (spinning record), is scored against YouTube Music
 * candidates, and lands in the library once approved. Signal weights and
 * bucket thresholds are the project's real defaults (matcher.py,
 * config.toml); the album is an illustrative example.
 */
const SIGNALS = [
  { label: 'Artist', weight: 35 },
  { label: 'Title', weight: 35 },
  { label: 'Year', weight: 10 },
  { label: 'Track count', weight: 10 },
  { label: 'First track', weight: 10 },
];

const BUCKETS = [
  { name: 'Strong', rule: '≥ 0.90, clear of the runner-up', action: 'Pre-checked' },
  { name: 'Needs review', rule: '0.70 – 0.89', action: 'Pick a candidate' },
  { name: 'No album match', rule: 'Video fallback ≥ 0.60', action: 'Opt-in playlist' },
];

export function DiscogsVisual() {
  return (
    <figure className="discogs-visual">
      <div className="dv-flow">
        <div className="dv-stage">
          <span className="r-label"><span className="dv-step-num">01</span>Discogs</span>
          <div className="dv-record" aria-hidden="true">
            <span className="dv-record-label" />
          </div>
          <span className="dv-note">Releases from a collection folder</span>
        </div>

        <span className="dv-arrow" aria-hidden="true" />

        <div className="dv-stage dv-stage--match">
          <span className="r-label"><span className="dv-step-num">02</span>Match</span>
          <div className="dv-card">
            <div className="dv-card-head">
              <span className="dv-cover" aria-hidden="true" />
              <span className="dv-card-title">
                <span className="dv-album">Romance</span>
                <span className="dv-artist">Fontaines D.C. · example</span>
              </span>
            </div>
            <ul className="dv-signals" aria-label="Score weights">
              {SIGNALS.map((s, i) => (
                <li key={s.label} style={{ ['--w' as string]: `${s.weight * 2.4}%`, ['--i' as string]: i }}>
                  <span className="dv-signal-label">{s.label}</span>
                  <span className="dv-signal-bar" aria-hidden="true"><span /></span>
                  <span className="dv-signal-weight">{s.weight}%</span>
                </li>
              ))}
            </ul>
            <div className="dv-verdict">
              <span className="dv-verdict-rule">Score ≥ 0.90</span>
              <span className="dv-badge">Strong match</span>
            </div>
          </div>
        </div>

        <span className="dv-arrow" aria-hidden="true" />

        <div className="dv-stage">
          <span className="r-label"><span className="dv-step-num">03</span>YouTube Music</span>
          <div className="dv-library" aria-hidden="true">
            <span /><span /><span /><span /><span /><span /><span /><span />
            <span className="dv-new" />
          </div>
          <span className="dv-note">Added once you approve</span>
        </div>
      </div>

      <ul className="dv-buckets" aria-label="Where a release can land">
        {BUCKETS.map((b, i) => (
          <li key={b.name} className={`dv-bucket dv-bucket--${i}`}>
            <span className="dv-bucket-name">{b.name}</span>
            <span className="dv-bucket-rule">{b.rule}</span>
            <span className="r-label">{b.action}</span>
          </li>
        ))}
      </ul>
      <figcaption className="r-label dv-caption">One record's journey: pulled, scored, sorted, added</figcaption>
    </figure>
  );
}
