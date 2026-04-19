# Assessment Checklist

## Build and Test Gates
- `npm run build` passes.
- `npm run test` passes.

## Functional Scenarios
- Start game initializes with 2-tile current hand.
- Higher/Lower is locked during dealing phase only.
- Round resolves once per bet and appends history.
- Restart and Exit flows reset session safely.

## Rule Scenarios
- Game ends when any special tile reaches `0` or `10`.
- Game ends when reshuffle count reaches 3.
- Game-over reason is visible in modal.
- Boundary tile is highlighted with exact boundary value.

## Readability and Demo
- Scoreboard uses user-friendly labels:
  - `Remaining Tiles`
  - `Used Tiles`
- Documentation route explains rules, flow, and tech stack.
- Architecture docs clearly show engine/store/ui boundaries.
