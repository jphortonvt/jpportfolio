import type { CSSProperties } from 'react';
import { Cell, Grid } from '@ruled/design-system';
import type { Project } from '../projects';

/** Title card: an undulating green-and-purple field, then an index of projects. */
export function Hero({ projects }: { projects: Project[] }) {
  // One cell per project, up to four per row (empty cells fill a short last
  // row), then a slim full-width "more" bar.
  const perRow = Math.min(projects.length, 4);
  const filler = (perRow - (projects.length % perRow)) % perRow;

  return (
    <Grid as="section" id="top" aria-labelledby="hero-title" columns={1}>
      <Cell pad="lg" className="hero" layout="split">
        <div className="hero-field" aria-hidden="true">
          <span className="hero-blob hero-blob--1" />
          <span className="hero-blob hero-blob--2" />
          <span className="hero-blob hero-blob--3" />
          <span className="hero-blob hero-blob--4" />
          <span className="hero-blob hero-blob--5" />
        </div>
        <span className="r-label hero-label">
          <span className="r-tag">00</span>Projects
        </span>
        <div className="hero-copy">
          <h1 id="hero-title" className="r-display-xl">Things<br />I've built.</h1>
          <p className="r-body-lg hero-intro">
            A running index of my personal projects.
          </p>
        </div>
      </Cell>

      <Grid columns={perRow}>
        {projects.map((p, i) => (
          <Cell
            key={p.id}
            href={`#${p.id}`}
            layout="split"
            className="index-cell"
            style={{ '--p-accent': p.theme.accent, '--p-deep': p.theme.deep, '--p-tint': p.theme.tint } as CSSProperties}
          >
            <span className="index-top">
              <span className="r-label">{String(i + 1).padStart(2, '0')}</span>
              <span className="index-swatches" aria-hidden="true">
                <span style={{ background: p.theme.tint }} />
                <span style={{ background: p.theme.accent }} />
              </span>
            </span>
            <span className="index-text">
              <span className="r-title index-name">{p.name}</span>
              <span className="r-body">{p.tagline}</span>
            </span>
          </Cell>
        ))}
        {Array.from({ length: filler }, (_, i) => (
          <Cell key={`fill-${i}`} aria-hidden="true" />
        ))}
        <Cell span={perRow} layout="row" className="index-more" style={{ justifyContent: 'flex-start', gap: 16 }}>
          <span className="r-label">{String(projects.length + 1).padStart(2, '0')}</span>
          <span className="r-body">More on the way.</span>
        </Cell>
      </Grid>
    </Grid>
  );
}
