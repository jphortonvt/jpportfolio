import type { ComponentType } from 'react';
import { MixerVisual } from './components/visuals/MixerVisual';
import { DiscogsVisual } from './components/visuals/DiscogsVisual';
import { HumanLLMVisual } from './components/visuals/HumanLLMVisual';
import { SpeakerVisual } from './components/visuals/SpeakerVisual';

/**
 * Each project gets a two-colour theme. The section derives its surfaces
 * from these five values:
 *   wash   — lightest tint, label column and quiet fills
 *   tint   — light version of colour A
 *   deep   — strong version of colour A (rules, numbers, large type)
 *   accent — colour B, the bright highlight (tags, "on" states)
 *   accentInk — text colour that sits on the accent
 */
export interface ProjectTheme {
  wash: string;
  tint: string;
  deep: string;
  accent: string;
  accentInk: string;
}

export interface Project {
  id: string;
  name: string;
  /** Short line for the index and under the title */
  tagline: string;
  theme: ProjectTheme;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Headline facts shown beside the visual; leave out and the visual spans the full width */
  facts?: { value: string; label: string }[];
  /** Optional live illustration shown in the section */
  Visual?: ComponentType;
  links?: { label: string; href: string }[];
}

// To add a project: append an entry. Order here is the order on the page.
export const projects: Project[] = [
  {
    id: 'web-mixer',
    name: 'Web Mixer',
    tagline: 'A multitrack rehearsal mixer for the band, in the browser.',
    theme: {
      wash: '#F4F0FD',
      tint: '#E2D8F8',
      deep: '#6D4FD1',
      accent: '#39FF14',
      accentInk: '#0A0A0A',
    },
    summary:
      'Rehearsals are recorded as separate tracks. The mixer streams every track of a session at once, so each band member can rebalance the mix, leave time-stamped comments, and export a mixdown to the shared playlist — on a laptop or a phone.',
    highlights: [
      'Volume, pan, mute, solo, trim and boost on every track, built on the Web Audio API with live level meters',
      'Threaded, time-stamped comments pinned to the seek bar',
      'Mixdown export with in and out points, rendered server-side with ffmpeg into the band playlist',
      'Session archive with search, #tags, stars and archiving',
      'Invite-only Google sign-in and an admin panel for uploading sessions',
      'Phone layout with tracks as rows and a pinned transport',
      'A second interface rebuilt on Ruled, with a purple dark mode — now the default',
    ],
    stack: ['Node.js', 'Express', 'Web Audio API', 'JavaScript', 'SQLite (sql.js)', 'Backblaze B2', 'ffmpeg', 'Passport + Google OAuth', 'Docker', 'Render', 'Ruled'],
    Visual: MixerVisual,
  },
  {
    id: 'discogs-sync',
    name: 'Discogs Sync',
    tagline: 'Sync a Discogs record collection into YouTube Music.',
    theme: {
      wash: '#FFF1F5',
      tint: '#FAD3E1',
      deep: '#B03366',
      accent: '#E3A21A',
      accentInk: '#0A0A0A',
    },
    summary:
      'A Python command-line tool with a local review UI. It pulls releases from a Discogs collection, looks for each album on YouTube Music, scores every candidate, and waits for you to approve the matches before anything is written to your library.',
    highlights: [
      'Fuzzy matcher (rapidfuzz) that weighs artist, title, year, track count and first track',
      'Results sorted into strong matches, needs review and no album match, with an opt-in full-album video playlist as a fallback',
      'FastAPI + HTMX review page with a sticky apply bar and live progress',
      'SQLite state, so each run picks up the next batch; a markdown and JSON report for every apply',
      'Discogs OAuth (PIN flow), YouTube Music through browser headers, and tokens kept in the OS keyring',
    ],
    stack: ['Python 3.11', 'Typer', 'FastAPI', 'HTMX', 'Jinja2', 'rapidfuzz', 'ytmusicapi', 'Discogs API', 'Pydantic', 'SQLite', 'pytest'],
    Visual: DiscogsVisual,
  },
  {
    id: 'human-llm',
    name: 'Human LLM',
    tagline: 'A gallery installation where a crowd performs next-word prediction.',
    theme: {
      wash: '#F4F4F4',
      tint: '#DADADA',
      deep: '#333333',
      accent: '#BDBDBD',
      accentInk: '#0A0A0A',
    },
    summary:
      'A prompt goes up on the gallery wall and the room writes the reply, one word at a time. Every word is a ballot: visitors vote from their phones, the wall shows the candidates fading in as the votes arrive, and the next word is sampled from the vote distribution — the way a language model picks its next token. Slowness is the point.',
    highlights: [
      'Every word of the response is its own ballot; visitors type a word or tap one someone else suggested',
      'Ballots close on the shape of the vote — a landslide or a confident lead — with optional timeouts as a safety net',
      'The winner is sampled at a temperature, not taken from the top: at T = 1 the leader can lose, and that upset is the heart of the piece',
      'A provisional next ballot opens as soon as a leader passes 50%',
      'The wall renders the distribution directly: each candidate word’s opacity is its share of the vote',
      'Password-gated curator console for the prompt queue, live tuning, moderation, archive, metrics and presets',
      'Live updates over server-sent events to the wall, the phones and the console',
    ],
    stack: ['TypeScript', 'Fastify', 'React', 'Vite', 'Framer Motion', 'Drizzle ORM', 'Postgres', 'PGlite', 'Server-Sent Events'],
    Visual: HumanLLMVisual,
  },
  {
    id: 'seas-a26',
    name: 'Seas A26 Speakers',
    tagline: 'Wide-baffle cabinets for the Seas A26 kit, designed in conversation with Claude.',
    theme: {
      wash: '#F8F3EA',
      tint: '#EADCC3',
      deep: '#8A5A2B',
      accent: '#5AA9FF',
      accentInk: '#0A0A0A',
    },
    summary:
      'A pair of standmount speakers built around the Madisound Seas A26 10-inch two-way kit, in a wider, Orangutan-style cabinet. The design came out of a back-and-forth with Claude: it modelled every candidate box in 00 Simulator through the simulator’s MCP server, compared the results, and wrote the plans — cut lists, scale drawings, a sheet layout and build steps — into a shared doc.',
    highlights: [
      'AI collaborative design: a plain-language brief, then Claude proposing variants, simulating them and explaining the trade-offs until one box was the clear pick',
      '00 Simulator over MCP: six cabinets simulated side by side for F10, baffle step, max SPL and cone excursion at 20 W',
      'Every candidate landed within 1 dB and 5 Hz on bass, so width decided it — the 17 1/4 in primary build is the narrowest box that gives up nothing measurable',
      'The wider baffle moves the baffle step down about 100 Hz versus the stock box, adding roughly 0.5–1 dB through 150–400 Hz',
      'The simulation showed excursion, not box size, is the real limit: every box passes the ±4 mm Xmax in the deep bass at 20 W, so the plans call for a 20–25 Hz subsonic filter',
      'Stock Seas driver spacing kept exactly; overlay baffle, window brace and a front port so wall distance doesn’t change the tuning',
      'All 14 parts for the pair fit on one 4 × 8 sheet with guillotine-only cuts',
    ],
    stack: ['Claude', '00 Simulator', 'MCP', 'Claude Docs', 'Seas A26RE4 woofer', 'Seas T35C-002 tweeter', 'Baltic birch'],
    Visual: SpeakerVisual,
  },
];
