export function getTileValue(tile, dynamicValues) {
  if (tile.type === "number") {
    return tile.value;
  }

  return dynamicValues[tile.key] || 5;
}