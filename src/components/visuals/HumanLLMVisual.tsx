import { useEffect, useState } from 'react';

/**
 * A miniature of Human LLM's gallery wall. Each ballot's candidate words sit
 * at an opacity equal to their vote share (the project's own rule: emphasis
 * through opacity only). The ballot closes, a winner is sampled — not always
 * the leader — and locks into the response. The prompt and votes are an
 * illustrative example; the mechanics are the project's.
 */
const PROMPT = 'what is the sea?';

interface Ballot {
  candidates: { word: string; share: number }[];
  winner: string;
  votes: number;
}

const BALLOTS: Ballot[] = [
  { votes: 9, winner: 'the', candidates: [{ word: 'the', share: 0.78 }, { word: 'a', share: 0.22 }] },
  { votes: 14, winner: 'sea', candidates: [{ word: 'sea', share: 0.64 }, { word: 'water', share: 0.21 }, { word: 'deep', share: 0.15 }] },
  { votes: 8, winner: 'is', candidates: [{ word: 'is', share: 0.75 }, { word: 'keeps', share: 0.25 }] },
  { votes: 13, winner: 'a', candidates: [{ word: 'a', share: 0.54 }, { word: 'where', share: 0.31 }, { word: 'never', share: 0.15 }] },
  // The upset: the leader loses the draw, as it can at temperature 1
  { votes: 15, winner: 'long', candidates: [{ word: 'slow', share: 0.47 }, { word: 'long', share: 0.33 }, { word: 'blue', share: 0.2 }] },
  { votes: 12, winner: 'breath', candidates: [{ word: 'breath', share: 0.58 }, { word: 'memory', share: 0.27 }, { word: 'mirror', share: 0.15 }] },
];

type Phase = 'voting' | 'sampling' | 'locked';
const DURATION: Record<Phase, number> = { voting: 2600, sampling: 1100, locked: 900 };

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function HumanLLMVisual() {
  const still = reducedMotion();
  const [ballot, setBallot] = useState(still ? 4 : 0);
  const [phase, setPhase] = useState<Phase>('voting');
  const [filled, setFilled] = useState(still);

  useEffect(() => {
    if (still) return;
    // Let the shares rise from nothing at the start of each ballot
    setFilled(false);
    const rise = window.setTimeout(() => setFilled(true), 60);
    return () => window.clearTimeout(rise);
  }, [ballot, still]);

  useEffect(() => {
    if (still) return;
    const t = window.setTimeout(() => {
      if (phase === 'voting') setPhase('sampling');
      else if (phase === 'sampling') setPhase('locked');
      else {
        setPhase('voting');
        setBallot((b) => (b + 1) % (BALLOTS.length + 1)); // one extra beat shows the finished line
      }
    }, ballot === BALLOTS.length ? 2600 : DURATION[phase]);
    return () => window.clearTimeout(t);
  }, [phase, ballot, still]);

  const finished = ballot === BALLOTS.length;
  const current = BALLOTS[Math.min(ballot, BALLOTS.length - 1)];
  const locked = BALLOTS.slice(0, finished ? BALLOTS.length : ballot + (phase === 'locked' ? 1 : 0)).map((b) => b.winner);
  const leader = current.candidates[0].word;
  const upset = phase !== 'voting' && current.winner !== leader;

  return (
    <figure className="hl-visual">
      <div className="hl-wall" aria-hidden="true">
        <p className="hl-prompt">{PROMPT}</p>
        <p className="hl-response">
          {locked.join(' ')}
          {!finished && <span className="hl-caret">_</span>}
        </p>

        <div className="hl-ballot">
          {finished ? (
            <p className="hl-meta">response complete · {BALLOTS.length} ballots</p>
          ) : (
            <>
              <p className="hl-meta">
                ballot {ballot + 1} · {current.votes} votes · {phase === 'voting' ? 'voting' : phase === 'sampling' ? 'sampling' : 'locked'}
                {upset && <span className="hl-upset"> · upset: the leader lost</span>}
              </p>
              <p className="hl-candidates">
                {current.candidates.map((c) => {
                  const isWinner = c.word === current.winner;
                  const opacity =
                    phase === 'voting' ? (filled ? 0.12 + c.share * 0.88 : 0.06)
                    : phase === 'sampling' ? 0.35 + c.share * 0.3
                    : isWinner ? 1 : 0.06;
                  return (
                    <span key={c.word} className={`hl-word${phase === 'sampling' ? ' is-drawing' : ''}`} style={{ opacity }}>
                      {c.word}
                      <span className="hl-share">{Math.round(c.share * 100)}%</span>
                    </span>
                  );
                })}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="hl-rules">
        <div>
          <span className="r-label">Closes when</span>
          <span className="hl-rule">landslide · ≥ 70% with 6 votes</span>
          <span className="hl-rule">confident · ≥ 45%, +15 pts, 12 votes</span>
        </div>
        <div>
          <span className="r-label">Then samples</span>
          <span className="hl-rule hl-formula">p′ = p<sup>1/T</sup> / Σ p<sup>1/T</sup> · T = 1</span>
        </div>
      </div>
      <figcaption className="r-label hl-caption">The wall, in miniature (example prompt): opacity is vote share</figcaption>
    </figure>
  );
}
