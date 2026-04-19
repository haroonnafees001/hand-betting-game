# HandBet Game

HandBet is a casino-style tile betting game inspired by Mahjong themes.

Player predicts whether the **next hand total** will be **Higher** or **Lower** than the current hand total.  
Special tiles (Winds + Dragons) use dynamic values, and game ends on rule-based conditions.

---

## Game Overview

- Start game from lobby
- Enter player name (first time)
- Review current hand total
- Choose `Higher` or `Lower`
- Next hand is dealt and result is resolved (`win / lose / draw`)
- Score, history, and tile values update every round
- Game over when:
  - any special tile reaches `0` or `10`, or
  - reshuffle limit reaches 3

---

## Tech Stack

- **React 19**
- **Vite**
- **Zustand** (state management)
- **React Router**
- **Framer Motion** (UI animations)
- **Tailwind CSS**
- **ESLint**
- **Node Test Runner** (`node --test`)

---

## Run Locally

### 1) Install dependencies
```bash
npm install
