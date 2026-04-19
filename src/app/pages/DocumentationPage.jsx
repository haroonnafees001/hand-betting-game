import { motion as Motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppHeader from "../shared/components/AppHeader";

const techStack = [
  "React 19",
  "Vite 7",
  "Zustand (state management)",
  "Tailwind CSS (casino design system)",
  "Framer Motion (animations)",
  "React Router",
  "ESLint",
];

const gameFlow = [
  "Game starts with an initial 2-tile hand.",
  "Player predicts next total using Higher or Lower.",
  "Next 2 tiles are drawn and total is compared.",
  "Result becomes win, lose, or draw.",
  "History, score, tile dynamic values, and piles are updated.",
  "Game-over checks run after each resolved round.",
];

const userRules = [
  "Number tiles use face value (1-9).",
  "Winds and Dragons start at value 5.",
  "Special tile values change based on outcomes.",
  "Win: special tiles in winning hand increase by +1.",
  "Lose: special tiles in losing hand decrease by -1.",
  "Draw: no value direction win/lose advantage.",
];

const gameOverRules = [
  "Any special tile reaches 0 or 10.",
  "Draw pile depletion reaches the 3rd reshuffle cycle.",
];

export default function DocumentationPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="felt-bg min-h-screen px-4 py-5 text-text md:px-6 md:py-7">
      <div className="mx-auto">
        <AppHeader
          shouldReduceMotion={shouldReduceMotion}
          className="mb-5 bg-surface/75"
          rightContent={
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => navigate("/")}
                className="cta-hover cta-hover-soft rounded-btn border border-ivory/30 bg-surface2 px-4 py-2 text-small font-semibold text-ivory"
              >
                Back to Lobby
              </button>
              <button
                onClick={() => navigate("/game")}
                className="cta-hover cta-hover-gold rounded-btn border border-gold/55 bg-gradient-to-b from-gold to-[#c4972f] px-4 py-2 font-semibold text-chip-black"
              >
                Enter Table
              </button>
            </div>
          }
        />

        <Motion.section
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
          className="table-panel p-5 md:p-6"
        >
          <p className="text-small uppercase tracking-[0.2em] text-gold">
            Product Guide
          </p>
          <h1 className="mt-2 text-title font-display text-ivory md:text-[2.6rem]">
            HandBet Game Documentation
          </h1>
          <p className="mt-3 max-w-4xl text-body text-muted">
            This page explains the real gameplay behavior, rules, and technical
            stack used in this project. It is written for both players and
            reviewers to understand how the game works.
          </p>
        </Motion.section>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.24, delay: 0.03 }}
            className="table-panel p-5"
          >
            <p className="text-small uppercase tracking-[0.18em] text-gold">
              Tech Stack
            </p>
            <ul className="mt-3 space-y-2 text-body text-muted">
              {techStack.map((item) => (
                <li key={item} className="rounded-card border border-border/55 bg-surface2/70 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </Motion.section>

          <Motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.24, delay: 0.05 }}
            className="table-panel p-5"
          >
            <p className="text-small uppercase tracking-[0.18em] text-gold">
              Gameplay Flow
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-body text-muted">
              {gameFlow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </Motion.section>

          <Motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.24, delay: 0.08 }}
            className="table-panel p-5"
          >
            <p className="text-small uppercase tracking-[0.18em] text-gold">
              Game Rules (User)
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-body text-muted">
              {userRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Motion.section>

          <Motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.24, delay: 0.1 }}
            className="table-panel p-5"
          >
            <p className="text-small uppercase tracking-[0.18em] text-gold">
              Deck and Piles
            </p>
            <div className="mt-3 space-y-2 text-body text-muted">
              <div className="rounded-card border border-border/55 bg-surface2/70 px-3 py-2">
                Deck model: 34 tiles total (27 numbers + 4 winds + 3 dragons).
              </div>
              <div className="rounded-card border border-border/55 bg-surface2/70 px-3 py-2">
                Draw pile and discard pile counts are visible in scoreboard.
              </div>
              <div className="rounded-card border border-border/55 bg-surface2/70 px-3 py-2">
                If draw pile cannot serve next hand, game reshuffles using
                remaining draw + discard + fresh deck.
              </div>
            </div>
          </Motion.section>
        </div>

        <Motion.section
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.12 }}
          className="mt-5 table-panel p-5"
        >
          <p className="text-small uppercase tracking-[0.18em] text-gold">
            Game Over Conditions
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-body text-muted">
            {gameOverRules.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="mt-5 text-small uppercase tracking-[0.18em] text-gold">
            Player Controls
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            <div className="rounded-card border border-border/55 bg-surface2/70 px-3 py-2 text-body text-muted">
              <span className="font-semibold text-ivory">Higher / Lower:</span>{" "}
              predict next hand total direction.
            </div>
            <div className="rounded-card border border-border/55 bg-surface2/70 px-3 py-2 text-body text-muted">
              <span className="font-semibold text-ivory">Recent Results:</span>{" "}
              opens round history log.
            </div>
            <div className="rounded-card border border-border/55 bg-surface2/70 px-3 py-2 text-body text-muted">
              <span className="font-semibold text-ivory">Rules:</span> quick
              in-game rules reference.
            </div>
            <div className="rounded-card border border-border/55 bg-surface2/70 px-3 py-2 text-body text-muted">
              <span className="font-semibold text-ivory">Exit Table:</span>{" "}
              resets current session and returns to lobby.
            </div>
          </div>
        </Motion.section>
      </div>
    </main>
  );
}

