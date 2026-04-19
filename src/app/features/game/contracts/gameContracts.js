export const GAME_STATUS = Object.freeze({
  IDLE: "idle",
  PLAYING: "playing",
  GAME_OVER: "game-over",
});

export const UI_PHASE = Object.freeze({
  IDLE: "idle",
  DEALING: "dealing",
  RESOLVED: "resolved",
});

export const ROUND_RESULT = Object.freeze({
  WIN: "win",
  LOSE: "lose",
  DRAW: "draw",
});

export const EMPTY_GAME_OVER_RESULT = Object.freeze({
  isGameOver: false,
  reason: null,
  tiles: [],
});

export function normalizeGameOverTiles(inputTiles) {
  if (!Array.isArray(inputTiles) || inputTiles.length === 0) {
    return [];
  }

  return inputTiles
    .filter((tile) => tile && typeof tile.key === "string")
    .map((tile) => ({
      key: tile.key,
      value: Number(tile.value),
    }));
}

export function createGameOverResult({
  isGameOver,
  reason = null,
  tiles = [],
}) {
  return {
    isGameOver: Boolean(isGameOver),
    reason: isGameOver ? reason : null,
    tiles: isGameOver ? normalizeGameOverTiles(tiles) : [],
  };
}
