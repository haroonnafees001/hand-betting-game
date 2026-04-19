# Task Plan Example (Real)

## Goal
Add player-name onboarding flow: show name popup only when needed, save player name, reuse it for leaderboard score entry, and clear it on Exit.

## Touched Contracts
- [ ] engine
- [x] state
- [x] ui
- [x] leaderboard

## Implementation Plan
1. Add player-name storage helpers in leaderboard module:
   - `getSavedPlayerName()`
   - `savePlayerName(name)`
   - `clearPlayerName()`
2. Update `GamePage` startup behavior:
   - if `status === idle` and saved name exists -> auto `startGame()`
   - if no saved name -> show name popup
3. Update name popup behavior:
   - validate non-empty name
   - save to localStorage
   - set local state + start game
4. Update leaderboard save behavior:
   - on game-over, call `saveScore(score, playerName)`
5. Update exit behavior:
   - clear saved player name from localStorage
   - reset local name state
   - keep existing exit navigation flow intact

## Validation Commands
- `npx eslint src/app/pages/GamePage.jsx src/app/features/leaderboard/leaderboardStorage.js`
- `npm run test`
- `npm run build`

## Scenario Checks
- Functional checks:
  - First open without saved name -> popup appears.
  - Enter name + start -> game begins and player name visible in dealer table.
  - Game over saves score with actual player name.
  - Exit removes saved player name.
- UX checks:
  - Popup CTA disabled until valid name is entered.
  - Returning to game with saved name skips popup and starts directly.

## Risks / Assumptions
- Assumption: core game rules remain unchanged.
- Risk: if name persistence is not cleared on all exit paths, stale identity can remain.

## Done Summary
- Changed files:
  - `src/app/features/leaderboard/leaderboardStorage.js`
  - `src/app/pages/GamePage.jsx`
- Gate status:
  - Functional Gate: Pass (no game rule change)
  - State Gate: Pass (`uiPhase` flow and dealing lock unaffected)
  - UI Gate: Pass (name prompt gating and player label visibility)
  - QA Gate: Pass (lint + test + build)
