# Assessment Acceptance Checklist (From PDF)

## Landing
- [ ] Clear new game entry point.
- [ ] Leaderboard shows top 5 scores.
- [ ] Leaderboard popup columns: `Rank`, `Username`, `Points`.

## Mechanics
- [ ] Mahjong tile set includes number, winds, dragons.
- [ ] Number tile value = face value.
- [ ] Non-number tiles start at 5 and scale dynamically by outcome.
- [ ] Remaining Tiles and Used Tiles counts are visible in game UI.
- [ ] Reshuffle behavior works when draw pile cannot serve next hand.

## Game Over
- [ ] End when any special tile reaches 0 or 10 boundary.
- [ ] End when draw pile depletion cycle reaches 3rd occurrence.

## Interface
- [ ] Exit game action exists.
- [ ] Betting actions: higher / lower.
- [ ] Current hand visuals + total visible.
- [ ] Previous/history hand view visible.
- [ ] End-of-game score summary visible.
- [ ] Name popup appears when no saved player name exists.
- [ ] Player name visible in dealer-table section after start.

## Quality
- [ ] UI polish and transitions are coherent.
- [ ] Architecture remains extension-ready.
- [ ] Code remains modular and understandable.
