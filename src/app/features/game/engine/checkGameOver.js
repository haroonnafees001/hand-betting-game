import {
  createGameOverResult,
  EMPTY_GAME_OVER_RESULT,
} from "../contracts/gameContracts.js";

// Condition 1
// Agar koi special tile value:
// • 0 ho jaye
// • ya 10 ho jaye
//
// Condition 2
// Agar draw pile 3rd time empty ho chuki ho
export function checkGameOver(dynamicValues, reshuffleCount) {
  const limitTiles = Object.entries(dynamicValues)
    .filter(([, value]) => value <= 0 || value >= 10)
    .map(([key, value]) => ({ key, value }));

  const hasLimitReached = limitTiles.length > 0;

  if (hasLimitReached) {
    const firstLimitTile = limitTiles[0];
    return createGameOverResult({
      isGameOver: true,
      reason: `A special tile reached value ${firstLimitTile.value} (${firstLimitTile.key}).`,
      tiles: limitTiles,
    });
  }

  if (reshuffleCount >= 3) {
    return createGameOverResult({
      isGameOver: true,
      reason: "The draw pile ran out for the 3rd time.",
      tiles: [],
    });
  }

  return EMPTY_GAME_OVER_RESULT;
}
