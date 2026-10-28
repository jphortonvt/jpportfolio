# Portfolio

Project portfolio built on [Ruled](../design-system), my hairline bento-grid
design system. Each project gets its own section and its own two-colour theme.

```bash
npm install
npm run dev        # http://localhost:5190
npm run build      # static site in dist/
npm run deploy     # build for GitHub Pages and push to the gh-pages branch
```

Ruled is linked from `../design-system`, so building needs that folder next to
this one. That is also why deploys run locally rather than in GitHub Actions.

## Adding a project

Append an entry to `src/projects.ts`. Order there is the order on the page;
the header nav, the index under the hero and the section numbers update
themselves.

```ts
{
  id: 'my-project',               // anchor: /#my-project
  name: 'My Project',
  tagline: 'One line on what it is.',
  theme: {
    wash: '#…',      // lightest tint: label column, visual background
    tint: '#…',      // light version of colour A
    deep: '#…',      // strong version of colour A: numbers, big figures
    accent: '#…',    // colour B: tags and "on" states
    accentInk: '#0A0A0A',  // text on the accent
  },
  summary: '…',
  highlights: ['…'],
  stack: ['…'],
  facts: [{ value: '3', label: '…' }],  // optional; without it the visual spans the full width
  Visual: MyProjectVisual,              // optional, in src/components/visuals/
  links: [{ label: 'GitHub', href: '…' }],  // optional
}
```

## Layout

| Path | What it is |
| --- | --- |
| `src/projects.ts` | All project content and themes |
| `src/components/Hero.tsx` | Title card (animated gradient) and project index |
| `src/components/ProjectSection.tsx` | The section template every project uses |
| `src/components/visuals/` | Per-project live illustrations |
| `src/styles/site.css` | Portfolio styles on top of Ruled |

Ruled is linked from `../design-system` (`file:` dependency), so changes there
show up here on the next dev-server reload.
