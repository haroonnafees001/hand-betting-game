# Task Plan Example (Real)

## Goal
Improve GamePage action clarity by making the “next move” instruction highly visible above betting CTAs, without changing gameplay logic.

## Touched Contracts
- [ ] engine
- [ ] state
- [x] ui
- [ ] leaderboard

## Implementation Plan
1. Inspect current Dealer Table section in `GamePage.jsx` and identify where instruction text is currently placed.
2. Remove low-visibility instruction from header area to avoid duplicate/conflicting guidance.
3. Add a highlighted instruction capsule directly above `Higher / Lower` controls in dealer table.
4. Keep CTA order and behavior unchanged; only improve visibility and hierarchy.
5. Verify mobile spacing so instruction + actions remain visible in first interaction zone.

## Validation Commands
- `npm run lint -- src/app/pages/GamePage.jsx`

## Scenario Checks
- Functional checks:
  - Betting still works for both actions.
  - Round resolve still updates status/history/score normally.
- UX checks:
  - User can immediately understand next action on first glance.
  - Instruction remains readable on desktop and mobile.

## Risks / Assumptions
- Assumption: gameplay rules and state transitions remain untouched.
- Risk: tighter spacing could reduce readability on very small screens if typography is too large.

## Done Summary
- Changed files:
  - `src/app/pages/GamePage.jsx`
- Gate status:
  - Functional Gate: Pass (no game rule change)
  - State Gate: Pass (no state-flow change)
  - UI Gate: Pass (instruction visibility improved)
  - QA Gate: Pass (lint + manual visual verification)

