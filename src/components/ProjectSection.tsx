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
        {project.links?.length ? (
          <div className="r-button-group project-links">
            {project.links.map((l, i) =>
              l.icon ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="r-button project-icon-link"
                  aria-label={l.label}
                  title={l.label}
                >
                  <GitHubMark />
                </a>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={i === 0 ? 'r-button project-cta' : 'r-button'}
                >
                  {l.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ),
            )}
          </div>
        ) : null}
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
      </Cell>
    </Grid>
  );
}

/** GitHub's mark (Octicons, MIT) */
function GitHubMark() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  );
}
