# QA Scenario Matrix

Run relevant scenarios for each implemented task.

## Core Gameplay
1. Start game and verify first hand appears correctly.
2. Bet `Higher` and confirm round resolves exactly once.
3. Bet `Lower` and confirm round resolves exactly once.
4. Force equal totals scenario and confirm `draw` behavior.

## Dynamic Tile Values
1. Win with special tile involvement and verify `+1`.
2. Lose with special tile involvement and verify `-1`.
3. Confirm number tiles never dynamic-scale.

## Deck Lifecycle
1. Play until draw pile depletion and confirm reshuffle.
2. Verify discard integration into reshuffle path.
3. Verify game-over at 3rd depletion cycle.

## End Conditions
1. Force special tile boundary and verify game-over at `<=0` or `>=10`.
2. Confirm score/history snapshot is accurate at game-over.

## UX
1. During `dealing`, verify controls are locked.
2. Verify result feedback aligns with outcome.
3. Verify instruction text near `Higher/Lower` remains visible.

## Player Name Flow
1. First open with no saved name -> popup must appear.
2. Enter name and start -> game begins and name appears on dealer table.
3. Exit game -> saved name is removed from localStorage.
4. Re-open after exit -> popup must appear again.

## Leaderboard
1. Finish game-over round and verify score saved with entered player name.
2. Verify popup shows only `Rank`, `Username`, `Points`.
