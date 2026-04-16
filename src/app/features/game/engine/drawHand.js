export function drawHand(drawPile, count = 2) {
  const hand = drawPile.slice(0, count);
  const remaining = drawPile.slice(count);

  return {
    hand,
    remaining,
  };
}