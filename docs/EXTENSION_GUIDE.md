# Extension Guide

## Add a New Game-Over Rule
1. Implement rule logic in `engine/checkGameOver.js`.
2. Return the same contract shape:
   - `isGameOver`
   - `reason`
   - `tiles`
3. Do not move rule logic into components or pages.
4. Add/adjust tests in `tests/engine/checkGameOver.test.js`.

## Add a New Tile Type
1. Add tile creation in `engine/createDeck.js`.
2. If dynamic, initialize baseline value in `createInitialDynamicValues`.
3. Update `updateDynamicValues` behavior only if this tile should change on win/lose.
4. Add icon/visual rendering in `components/TileCard.jsx`.
5. Add tests for deck composition and value updates.

## Add a New UI Feedback Behavior
1. Keep round state source in store (`uiPhase`, `lastRoundResult`).
2. Add pure helper in `pages/gamePageViewModel.js` if behavior needs derivation.
3. Keep component props deterministic and test helper behavior in `tests/ui`.

## Safe Extension Checklist
- Rules changed only in engine.
- Store still controls lifecycle (`idle -> dealing -> resolved`).
- Boundary value (`0/10`) is visible on highlighted tile before game-over modal.
- Existing tests pass.
