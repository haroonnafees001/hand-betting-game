# HandBet Repo Guide

This file is the root operating manual for Codex agents working in this repo.

Use it together with `.codex/skills/handbetting-game/SKILL.md`:
- `AGENT.md` = repo truth, boundaries, invariants, and validation defaults
- `SKILL.md` = task workflow, gates, and delivery structure

## Project Summary
- HandBet is a casino-style tile betting game built with React, Vite, Zustand, React Router, Framer Motion, and Tailwind CSS.
- The player predicts whether the next hand total will be higher or lower than the current hand.
- The project is extension-ready and already has engine, store, and UI separation plus automated tests.

## Architecture Map
- `src/app/features/game/engine/`
  - Pure gameplay logic.
  - No UI concerns.
  - Main anchors: `createDeck`, `drawHand`, `resolveBet`, `updateDynamicValues`, `checkGameOver`.
- `src/app/features/game/store/`
  - Canonical game orchestration and round lifecycle.
  - Main anchor: `gameStore.js`.
- `src/app/features/game/contracts/`
  - Stable enums and canonical result helpers.
- `src/app/features/game/components/`
  - Game-specific rendering.
- `src/app/pages/`
  - Page-level composition and interaction flow.
  - `GamePage.jsx` owns modal timing and top-level gameplay interactions.
- `src/app/features/leaderboard/`
  - Player identity persistence and leaderboard storage behavior.
- `tests/`
  - Split by concern: `engine`, `store`, `ui`.

## Canonical Contracts
### Engine Contract
- Number tile value = face value.
- Winds and dragons start at `5`.
- Dynamic value scaling applies only to non-number tiles.
- Winning hand non-number tiles increment by `+1`.
- Losing hand non-number tiles decrement by `-1`.
- `resolveBet` must stay deterministic and only return `win`, `lose`, or `draw`.
- `checkGameOver(dynamicValues, reshuffleCount)` must return:
  - `isGameOver: boolean`
  - `reason: string | null`
  - `tiles: Array<{ key: string; value: number }>`
- Game ends when:
  - any special tile reaches `<= 0` or `>= 10`, or
  - reshuffle count reaches `3`.

### State Contract
- `uiPhase` lifecycle stays `idle -> dealing -> resolved`.
- `playRound` only runs when `status === "playing"` and `uiPhase !== "dealing"`.
- During round resolution, store remains the canonical owner of:
  - score
  - round
  - draw/discard piles
  - current/previous hand
  - history
  - dynamic values
  - game-over fields
  - `lastRoundResult`
- Controls must remain locked while `uiPhase === "dealing"`.

### UI Contract
- Dealer table remains the primary action focus.
- Current hand, next action prompt, and betting controls remain visually central.
- Reusable CTA, badge, and modal patterns stay consistent.
- Reduced-motion behavior must remain respected.
- UI-only work must not silently change engine or store behavior.

### Player Identity / Leaderboard Contract
- Player name prompt appears only when no saved player name exists.
- Saved player name bypasses the prompt on entry.
- Exit clears saved player identity.
- Final score is stored with the actual player name.
- Leaderboard behavior stays deterministic and top-5 oriented.
- Leaderboard popup columns remain `Rank`, `Username`, `Points`.

## Safe Change Rules
- Do not change gameplay rules unless the user explicitly requests a rule change.
- Prefer the existing layer boundaries over convenience edits:
  - rules in `engine`
  - orchestration in `store`
  - rendering in `pages/components`
- Keep behavior-only and visual-only changes isolated when practical.
- Reuse existing styling tokens and interaction patterns before introducing new abstractions.
- If a task touches multiple contracts, validate at the broader scope.

## Default Validation
Use the smallest sufficient validation set, but do not skip required checks.

- UI-only changes:
  - `npm run lint`
  - `npm run build`
- Engine or store changes:
  - `npm run test`
  - `npm run lint`
- Leaderboard or identity flow changes:
  - `npm run test`
  - `npm run lint`
  - `npm run build` when user-facing UI changed
- Broad or risky changes:
  - `npm run lint`
  - `npm run test`
  - `npm run build`

## Important File Anchors
- `src/app/features/game/store/gameStore.js`
- `src/app/features/game/contracts/gameContracts.js`
- `src/app/features/game/engine/checkGameOver.js`
- `src/app/features/game/engine/resolveBet.js`
- `src/app/pages/GamePage.jsx`
- `src/app/pages/gamePageViewModel.js`
- `src/app/features/leaderboard/leaderboardStorage.js`
- `docs/ARCHITECTURE_NOTES.md`
- `.codex/skills/handbetting-game/SKILL.md`

## Common Task Routing
- Gameplay rule or end-condition change:
  - inspect `engine/`, `contracts/`, `store/`, then relevant tests
- Store lifecycle or round-flow change:
  - inspect `gameStore.js`, `gameContracts.js`, `gamePageViewModel.js`, and store tests
- UI polish:
  - inspect `GamePage.jsx`, feature components, and UI helpers
- Player name or leaderboard change:
  - inspect `leaderboardStorage.js`, `GamePage.jsx`, and related tests
- Assessment/readiness pass:
  - inspect `docs/`, tests, `README.md`, and the skill templates

## Task Output Expectation
When delivering work, prefer this structure:
1. Goal
2. Touched Contracts
3. Changes Implemented
4. Validation Run
5. Assumptions / Risks
