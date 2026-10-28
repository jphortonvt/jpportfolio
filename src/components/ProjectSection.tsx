import type { CSSProperties } from 'react';
import { Cell, Grid } from '@ruled/design-system';
import type { Project } from '../projects';

/** One project: title row, live visual with facts, then highlights and stack. */
export function ProjectSection({ project, index }: { project: Project; index: number }) {
  const { theme, Visual } = project;
  const facts = project.facts ?? [];
  const num = String(index + 1).padStart(2, '0');
  const themeVars = {
    '--p-wash': theme.wash,
    '--p-tint': theme.tint,
    '--p-deep': theme.deep,
    '--p-accent': theme.accent,
    '--p-accent-ink': theme.accentInk,
  } as CSSProperties;

  return (
    <Grid as="section" id={project.id} aria-labelledby={`${project.id}-title`} className="project" style={themeVars}>
      {/* Title row */}
      <Cell col={[1, 4]} className="project-label" layout="split">
        <span className="r-label project-kicker">
          <span className="project-tag">{num}</span>Project
        </span>
        <span className="project-swatches" aria-hidden="true">
          <span style={{ background: theme.tint }} />
          <span style={{ background: theme.deep }} />
          <span style={{ background: theme.accent }} />
        </span>
      </Cell>
      <Cell col={[4, 13]} pad="lg" layout="stack" style={{ gap: 18 }}>
        <h2 id={`${project.id}-title`} className="project-title">{project.name}</h2>
        <p className="r-body-lg" style={{ maxWidth: 640 }}>{project.tagline}</p>
      </Cell>

      {/* Visual + facts (no facts: the visual takes the whole row) */}
      <Cell col={facts.length ? [1, 9] : [1, 13]} rowSpan={facts.length || undefined} pad="none" className="project-visual">
        {Visual ? <Visual /> : null}
      </Cell>
      {facts.map((f) => (
        <Cell key={f.label} col={[9, 13]} layout="split" className="project-fact">
          <span className="project-fact-value">{f.value}</span>
          <span className="r-label">{f.label}</span>
        </Cell>
      ))}

      {/* Story */}
      <Cell col={[1, 4]} className="project-label" layout="stack">
        <span className="r-label">About</span>
      </Cell>
      <Cell col={[4, 13]} layout="stack" style={{ gap: 24 }}>
        <p className="r-body-lg" style={{ maxWidth: 760, color: 'var(--r-color-ink)' }}>{project.summary}</p>
      </Cell>

      <Cell col={[1, 4]} className="project-label" layout="stack">
        <span className="r-label">What it does</span>
      </Cell>
      <Cell col={[4, 9]} pad="none">
        <ol className="project-highlights">
          {project.highlights.map((h, i) => (
            <li key={h}>
              <span className="project-highlight-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="r-body" style={{ color: 'var(--r-color-ink)' }}>{h}</span>
            </li>
          ))}
        </ol>
      </Cell>
      <Cell col={[9, 13]} layout="stack" style={{ gap: 16 }}>
        <span className="r-label">Built with</span>
        <ul className="project-stack">
          {project.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        {project.links?.length ? (
          <div className="project-links">
            {project.links.map((l) => (
              <a key={l.href} href={l.href} className="r-link r-body">{l.label}</a>
            ))}
          </div>
        ) : null}
      </Cell>
    </Grid>
  );
}
