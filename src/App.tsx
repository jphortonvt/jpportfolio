import { Cell, Grid } from '@ruled/design-system';
import { Hero } from './components/Hero';
import { ProjectSection } from './components/ProjectSection';
import { projects } from './projects';

export function App() {
  return (
    <div className="site">
      <Grid columns={1} framed className="site-frame">
        <Grid as="header">
          <Cell col={[1, 4]} tone="wash" layout="row" pad="sm" style={{ justifyContent: 'flex-start', gap: 10, paddingInline: 24 }}>
            <span className="r-mark" aria-hidden="true" />
            <a href="#top" className="site-name">J.P. Horton</a>
          </Cell>
          <Cell as="nav" aria-label="Projects" col={[4, 13]} layout="row" pad="sm" className="site-nav">
            {projects.map((p, i) => (
              <a key={p.id} href={`#${p.id}`} className="site-nav-link">
                <span className="site-nav-num">{String(i + 1).padStart(2, '0')}</span>
                {p.name}
              </a>
            ))}
          </Cell>
        </Grid>

        <Hero projects={projects} />

        {projects.map((p, i) => (
          <ProjectSection key={p.id} project={p} index={i} />
        ))}

        <Grid as="footer" columns={1}>
          <Cell tone="wash" layout="row" style={{ minHeight: 72 }}>
            <span className="site-name"><span className="r-mark" aria-hidden="true" style={{ marginRight: 10 }} />J.P. Horton</span>
            <span className="r-label">© {new Date().getFullYear()}</span>
          </Cell>
        </Grid>
      </Grid>
    </div>
  );
}
