# HandBet — Casino Tile Betting Game

A casino-style prediction game where players bet whether the
next hand total will be Higher or Lower.

Built with React 19, Zustand, Framer Motion, and Tailwind CSS.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat&logo=vite)
![Zustand](https://img.shields.io/badge/State-Zustand-FF6B35?style=flat)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38BDF8?style=flat&logo=tailwindcss)

## What Makes This Interesting

Most game projects are simple — this one has a real engine.

- Round state machine: `idle → dealing → resolved`
- Dynamic tile values that mutate based on win/lose outcomes
- Rule-based game over conditions (not just a score limit)
- Persistent player identity + leaderboard across sessions
- Test coverage via Node test runner
- Extension-ready architecture with documented guides

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build | Vite |
| State Management | Zustand |
| Routing | React Router |
| Animations | Framer Motion |
| Styling | Tailwind CSS |
| Testing | Node test runner |
| Linting | ESLint |

## Quick Start

```bash
npm install
npm run dev
```

## All Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run preview    # preview production build
npm run lint       # run ESLint
npm run test       # run test suite
```

## How to Play

1. Enter your player name on first visit
2. Review the current hand total
3. Predict — **Higher** or **Lower**
4. Next hand is dealt and result resolves as `win / lose / draw`
5. Special tile values update dynamically each round
6. Game ends when any special tile hits `0` or `10`,
   or reshuffle limit reaches `3`
7. Final score is saved to the leaderboard

## Game Rules

- Number tiles = face value
- Winds and Dragons = dynamic values (change on win/lose)
- Game over triggers:
  - Any special tile reaches `0` or `10`
  - Reshuffle limit hits `3`

## Architecture
