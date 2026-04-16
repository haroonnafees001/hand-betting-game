export function updateDynamicValues(currentValues, winningHand, losingHand) {
  const nextValues = { ...currentValues };

  for (const tile of winningHand) {
    if (tile.type !== "number") {
      nextValues[tile.key] = (nextValues[tile.key] || 5) + 1;
    }
  }

  for (const tile of losingHand) {
    if (tile.type !== "number") {
      nextValues[tile.key] = (nextValues[tile.key] || 5) - 1;
    }
  }

  return nextValues;
}