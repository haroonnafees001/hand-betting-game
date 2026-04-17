import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion as Motion,
  useReducedMotion,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getLeaderboard } from "../features/leaderboard/leaderboardStorage";

function shortenWallet(value, index) {
  const seed = value || `player-${index}`;
  const normalized = seed.replace(/[^a-zA-Z0-9]/g, "").padEnd(8, "0");
  return `0x${normalized.slice(0, 4)}...${normalized.slice(-4)}`;
}

function MahjongIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M64 30.8v-8.4h-5.7v3L40.4 11c-.9-.8-2.5-.8-3.4 0L5.7 36v-2.8H0v8.5c.1.4.3.8.7 1.2l22.9 18.4c.9.8 2.5.8 3.4 0l36.2-29.1c.5-.4.8-.9.8-1.4"
        fill="#b69467"
      />
      <path
        d="M27.1 53c-.9.8-2.5.8-3.4 0L.7 34.6c-.9-.8-.9-2 0-2.8L36.9 2.7c.9-.8 2.5-.8 3.4 0l22.9 18.4c.9.8.9 2 0 2.8L27.1 53"
        fill="#efdec2"
      />
      <path
        d="M46.5 13.5c.8 2.1.3 4.2.3 6.3c-1.8 2.1-3.7 0-5.5 2.5c3.8 2 9.1 6.4 6.6 10.5c-4.1-.6-8.3-1.6-12.3.6c0-1.2-2-2.4-3.5-3.7C25.7 31.8 22.6 40 15.8 41c.3-4.6 11.3-9 13.4-13.6c-1.6-2-3-1.1-4.6-2.8C28.8 21 21.5 17 28 13.5c2.1 1.6.1 3 1.3 4.5c2.5 1.5 4.9 1.9 7.4 3.3c3.8-2.6 3.2-5.3 5.3-7.9c1.5-.3 3.1.6 4.5.1M38 24c-1.6 1.3-3.2 2.6-4.9 3.9c3.6 2.2 7.1 1.5 10.6-.2c-.2-2.1-3.8-3-5.7-3.7m-7.9-3.8c-.9 1.9-2.3 3.8.8 5.9c1.5-1.5 4.8-2.9 3.2-4.4c-1.4.2-2.7-.9-4-1.5"
        fill="#b70000"
      />
    </svg>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const leaderboard = useMemo(() => getLeaderboard(), []);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const ambientParticles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: `ambient-${index}`,
        left: `${6 + ((index * 13) % 88)}%`,
        top: `${12 + ((index * 17) % 72)}%`,
        size: `${6 + ((index * 5) % 10)}px`,
        duration: 6 + (index % 5) * 1.3,
        delay: (index % 4) * 0.6,
      })),
    [],
  );

  const rows = leaderboard.slice(0, 5);

  return (
    <main className="felt-bg h-screen overflow-hidden px-4 py-4 text-text md:px-6 md:py-6">
      <div className="mx-auto flex h-full max-w-9xl flex-col">
        <Motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26 }}
          className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-card border border-border/55 bg-surface/70 px-4 py-3 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-gold/45 bg-surface2 text-xl text-gold">
              ♠
            </div>
            <span className="font-display text-lg tracking-[0.08em] text-ivory">
              HandBet Club
            </span>
          </div>

          <nav className="hidden items-center gap-2 md:flex md:gap-3">
            {["ABOUT", "DOCUMENTATION", "REWARDS", "TELEGRAM"].map((item) => (
              <button
                key={item}
                type="button"
                className="cta-hover cta-hover-soft rounded-btn border border-transparent px-4 py-2 text-small tracking-[0.14em] text-muted transition hover:border-gold/35 hover:text-ivory"
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            onClick={() => navigate("/game")}
            className="cta-hover cta-hover-gold rounded-btn border border-gold/55 bg-gradient-to-b from-gold to-[#c4972f] px-5 py-2.5 font-semibold uppercase tracking-[0.12em] text-chip-black"
          >
            Enter Table
          </button>
        </Motion.header>

        <Motion.section
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="table-panel relative flex-1 overflow-hidden p-5 md:p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f5a43]/25 via-transparent to-[#0b2b20]/30" />
          <Motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[12%] opacity-50 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at 22% 18%, rgba(241, 213, 136, 0.2), transparent 44%), radial-gradient(circle at 78% 72%, rgba(109, 201, 255, 0.15), transparent 42%)",
            }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.35 }
                : { x: ["-2%", "2%", "-2%"], y: ["-1%", "1.5%", "-1%"] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.2) 0.55px, transparent 0.7px)",
              backgroundSize: "3px 3px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {ambientParticles.map((particle) => (
              <Motion.span
                key={particle.id}
                className="absolute rounded-full bg-ivory/25 blur-[0.5px]"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 0.2 }
                    : {
                        y: [0, -14, 0],
                        x: [0, 5, 0],
                        opacity: [0.12, 0.28, 0.12],
                      }
                }
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 grid h-full gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <Motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.25 }}
                className="text-small uppercase tracking-[0.25em] text-gold"
              >
                Game Lobby
              </Motion.p>

              <h1 className="mt-4 max-w-3xl text-title font-display leading-tight text-ivory md:text-[3.7rem]">
                Every Tile is a Move.
                <br />
                Every Bet is a Decision.
              </h1>

              <Motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.25 }}
                className="mt-4 max-w-xl text-body text-muted"
              >
                Step into the lobby, read the table, and outplay your opponents
                with every move.
              </Motion.p>

              <Motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.25 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Motion.button
                  whileHover={
                    shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  onClick={() => navigate("/game")}
                  className="cta-hover cta-hover-gold rounded-btn border border-gold/55 bg-gradient-to-b from-gold to-[#c4972f] px-7 py-3 font-semibold text-chip-black"
                >
                  Play Your Hand
                </Motion.button>

                <button
                  onClick={() => setIsLeaderboardOpen(true)}
                  className="cta-hover cta-hover-soft rounded-btn border border-ivory/35 bg-surface2 px-7 py-3 font-semibold text-ivory"
                >
                  View Leaderboard
                </button>
              </Motion.div>
            </div>

            <Motion.div
              animate={
                shouldReduceMotion
                  ? { y: 0 }
                  : {
                      y: [0, -5, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <MahjongIcon className="h-auto w-auto" />
            </Motion.div>
          </div>
        </Motion.section>
      </div>

      <AnimatePresence>
        {isLeaderboardOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-4 md:items-center"
            onClick={() => setIsLeaderboardOpen(false)}
          >
            <Motion.aside
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16, scale: 0.98 }
              }
              transition={{ duration: 0.24 }}
              className="table-panel w-full max-w-5xl overflow-hidden p-6 md:p-7"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-title font-display text-ivory md:text-[2.4rem]">
                  LEADERBOARD
                </h2>
                <button
                  onClick={() => setIsLeaderboardOpen(false)}
                  className="cta-hover cta-hover-soft rounded-btn border border-ivory/30 bg-surface2 px-4 py-2 text-small font-semibold text-ivory"
                >
                  Close
                </button>
              </div>

              <div className="rounded-card border border-border/55 bg-surface2/35 p-3">
                <div className="grid grid-cols-[70px_1.2fr_1fr_0.8fr] gap-3 px-3 pb-3 text-small uppercase tracking-[0.14em] text-muted">
                  <p>Rank</p>
                  <p>Username</p>
                  <p>Address</p>
                  <p className="text-right">Points</p>
                </div>

                <div className="max-h-[52vh] space-y-2 overflow-y-auto pr-1">
                  {rows.length === 0 ? (
                    <div className="rounded-card border border-dashed border-border/70 bg-surface/60 p-5 text-center text-muted">
                      No scores yet. Play your first game.
                    </div>
                  ) : (
                    rows.map((item, index) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[70px_1.2fr_1fr_0.8fr] items-center gap-3 rounded-card border border-border/45 bg-surface/55 px-3 py-3"
                      >
                        <div className="flex items-center gap-2">
                          <div className="grid h-9 w-9 place-items-center rounded-full border border-gold/45 bg-surface2 font-semibold text-gold">
                            {index + 1}
                          </div>
                        </div>

                        <p className="truncate text-body font-semibold text-ivory">
                          {item.name || `Player ${index + 1}`}
                        </p>

                        <p className="truncate text-body text-muted">
                          {shortenWallet(item.id, index)}
                        </p>

                        <p className="text-right text-body font-semibold text-gold">
                          {item.score.toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Motion.aside>
          </Motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
