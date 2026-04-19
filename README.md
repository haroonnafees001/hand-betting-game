# HandBet Game

A casino-style tile betting game where the player predicts whether the next hand total will be **Higher** or **Lower**.

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

## Game Rules (Core)

- Number tiles use face value.
- Winds and Dragons start from dynamic baseline values.
- Win/Lose updates special tile values.
- Game ends when:
  - any special tile reaches `0` or `10`, or
  - reshuffle limit reaches 3.

## Architecture

- `engine/` -> pure gameplay logic
- `store/` -> game state + round orchestration
- `pages/components/` -> UI and interaction layer
- `docs/` -> architecture notes, extension guide, checklist, demo script

## Status

Production-build ready, linted, and test-backed.
