export function buildGameOverTileValueMap(gameOverTiles) {
  return gameOverTiles.reduce((acc, tile) => {
    acc[tile.key] = tile.value;
    return acc;
  }, {});
}

export function getGameOverModalDelayMs(gameOverTilesLength, delayMs) {
  return gameOverTilesLength > 0 ? delayMs : 220;
}

export function isRevealPhase(uiPhase) {
  return uiPhase === "dealing";
}
