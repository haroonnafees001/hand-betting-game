# HandBet Architecture Notes

## 1) Layer Boundaries
- `engine/`: pure game logic and rules (`createDeck`, `resolveBet`, `updateDynamicValues`, `checkGameOver`).
- `store/`: game state orchestration (`useGameStore`), round lifecycle, and canonical UI flags.
- `pages/components/`: rendering and interaction only; no direct rule computation.

## 2) Canonical Contracts
- `uiPhase`: `idle | dealing | resolved`
- `checkGameOver` return shape:
  - `isGameOver: boolean`
  - `reason: string | null`
  - `tiles: Array<{ key: string; value: number }>`
- Canonical store fields for resolved feedback:
  - `lastRoundResult`
  - `gameOverReason`
  - `gameOverTiles`

## 3) Round Lifecycle
1. Player triggers `playRound(bet)`.
2. Store moves `uiPhase` to `dealing`.
3. Round resolves:
   - new hand is drawn
   - bet result is computed
   - dynamic values are updated
   - game-over rules are evaluated
4. Store commits state and moves `uiPhase` to `resolved`.

## 4) UI Responsibilities
- `GamePage` coordinates modal timing and highlight behavior.
- `HandView`/`TileCard` render values passed from page/store (including boundary overrides).
- `BetControls` consumes a single `disabled` lock state (dealing phase).
