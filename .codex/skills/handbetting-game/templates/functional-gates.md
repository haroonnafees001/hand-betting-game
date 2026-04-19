# Functional Gates Checklist

Use this before and after any functionality-impacting change.

## Engine Rules
- [ ] Number tile values unchanged (face value).
- [ ] Winds/dragons base value remains 5 unless game updates it.
- [ ] Dynamic update still affects non-number tiles only.
- [ ] Win/Lose dynamic scaling direction is correct.

## Round Resolution
- [ ] Bet resolution still returns only: `win | lose | draw`.
- [ ] Draw case does not incorrectly modify score/dynamic values.
- [ ] Score increment still happens only on win.
- [ ] `uiPhase` lifecycle remains `idle -> dealing -> resolved`.
- [ ] Controls remain locked only during `dealing`.

## Deck / Reshuffle
- [ ] Draw/discard transitions remain correct each round.
- [ ] Reshuffle logic runs when draw pile is insufficient.
- [ ] Reshuffle counter updates correctly.

## Game Over
- [ ] Game over when any special tile reaches `<=0` or `>=10`.
- [ ] Game over when reshuffle count reaches 3.
- [ ] Game over reason remains meaningful.
- [ ] Boundary tile value (`0/10`) is correctly visible in highlight path.

## Player Identity / Leaderboard
- [ ] Player name is saved when game starts from name popup.
- [ ] If saved name exists, game bypasses popup on entry.
- [ ] On exit, saved player name is cleared.
- [ ] Final score stores actual player name in leaderboard.
- [ ] Leaderboard popup keeps columns: Rank, Username, Points.

Roman Urdu note: koi bhi “small fix” in rules ko silently break na kare.
