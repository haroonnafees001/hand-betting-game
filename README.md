# HandBet Game

HandBet is a casino-style tile betting game where the player predicts whether the next hand total will be **Higher** or **Lower**.

## Highlights

- Real-time round flow: `idle -> dealing -> resolved`
- Dynamic special tile values (Winds + Dragons)
- Rule-based game over conditions
- Casino-themed responsive UI
- Persistent player identity + leaderboard
- Extension-ready architecture with test coverage

## Tech Stack

- React 19
- Vite
- Zustand
- React Router
- Framer Motion
- Tailwind CSS
- ESLint
- Node test runner (`node --test`)

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
```

## How to Play

1. Open the game and enter player name (first time).
2. Review current hand total.
3. Choose **Higher** or **Lower**.
4. Next hand is dealt and result is resolved (`win / lose / draw`).
5. Score, history, and tile values update every round.
6. Final score is saved to leaderboard.

## Core Rules

- Number tiles use face value.
- Winds and Dragons use dynamic values.
- Win/Lose updates special tile values.
- Game ends when:
  - any special tile reaches `0` or `10`, or
  - reshuffle limit reaches `3`.

## Architecture

- `src/app/features/game/engine` -> pure gameplay logic
- `src/app/features/game/store` -> game state + round orchestration
- `src/app/pages` and `src/app/features/game/components` -> UI and interactions
- `docs/` -> architecture notes, extension guide, checklist, demo script

## Documentation

- `docs/ARCHITECTURE_NOTES.md`
- `docs/EXTENSION_GUIDE.md`
- `docs/ASSESSMENT_CHECKLIST.md`

## Status

Production-build ready, linted, and test-backed.
