# HandBetting Game Skill

Purpose: Future-proof workflow for this repo with hard gates for functionality, UI consistency, and QA.

Language style: English + Roman Urdu hints.

## 1) When To Use
Use this skill for tasks touching:

- gameplay logic (`engine`, `gameStore`)
- `GamePage` / `LandingPage`
- leaderboard behavior
- player-name onboarding flow
- assessment/readiness checks

Roman Urdu note: chota task ho ya bara, critical gates skip nahi honge.

## 2) Hard Gates (Non-Negotiable)
Every task must pass applicable gates:

1. Functional Gate
- Core rules unchanged unless user explicitly asks for rule change.
- Round outcome logic remains deterministic (`win/lose/draw`).

2. State Gate
- Input lock remains while `uiPhase === "dealing"`.
- Valid phase flow stays intact (`idle -> dealing -> resolved`).

3. UI Gate
- Dealer table remains primary action focus.
- Next-action instruction near `Higher/Lower` stays visible.
- Reusable CTA/badge/modal style consistency maintained.
- If saved player name exists, name popup must not block game start.

4. QA Gate
- Lint + tests + behavior checks included in task validation.

If any gate fails, task is incomplete.

## 3) Project Contracts
### Engine Contract
- Number tile value = face value.
- Winds/Dragons start at `5`.
- Dynamic scaling:
  - non-number tiles in winning hand `+1`
  - non-number tiles in losing hand `-1`
- Game over:
  - any special tile reaches `<=0` or `>=10`
  - reshuffle count reaches 3

### State Contract
- `playRound` only when `status=playing` and not dealing.
- On resolve: update score/history/current/previous/discard + game-over check + `lastRoundResult`.
- `uiPhase` flow remains: `idle -> dealing -> resolved`.
- Player-name popup appears only when no saved player name is available.

### UI Contract
- Keep casino token language and hierarchy.
- Dealer table order remains:
  - header/result
  - flow bar
  - current hand
  - instruction + actions

### Leaderboard Contract
- Top-5 behavior stable.
- Save/load ordering deterministic.
- Save score with actual player name.
- Popup columns remain: `Rank`, `Username`, `Points` (no Address).

## 4) Required Task Sequence
1. Requirement Lock
- Clarify goal + out-of-scope.

2. Contract Mapping
- Mark touched contracts: `engine`, `state`, `ui`, `leaderboard`.

3. Plan
- Small decision-complete patch plan.

4. Implement
- Reuse existing patterns first.

5. Validate
- Run lint + tests + behavior checks.

6. Deliver
- Report changed files + gate status.

## 5) Required Output Structure
Every task response should include:

1. Goal
2. Touched Contracts
3. Changes Implemented
4. Validation Run
5. Assumptions/Risks

## 6) Quick Recipes
### A) GamePage polish without logic change
- Touch: `ui`
- Must confirm: no `engine/state` regression.

### B) Functional update with safety
- Touch: `engine`, `state` (+ optional `ui`)
- Must include: win/lose/draw + reshuffle + game-over checks.

### C) Assessment compliance pass
- Touch: all contracts
- Run all checklists in `templates/`.

### D) Player identity + leaderboard flow
- Touch: `state`, `ui`, `leaderboard`
- Must confirm:
  - name prompt gating logic
  - localStorage save/remove behavior on start/exit
  - leaderboard stores actual name

## 7) Reference Anchors
- `src/app/features/game/store/gameStore.js`
- `src/app/features/game/engine/*`
- `src/app/pages/GamePage.jsx`
- `src/app/pages/LandingPage.jsx`
- `src/app/features/leaderboard/leaderboardStorage.js`
- `src/app/styles/globals.css`
- `docs/ARCHITECTURE_NOTES.md`
- `docs/ASSESSMENT_CHECKLIST.md`
