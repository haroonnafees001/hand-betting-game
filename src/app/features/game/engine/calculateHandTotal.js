import { getTileValue } from "./getTileValue";

export function calculateHandTotal(hand, dynamicValues) {
  return hand.reduce((sum, tile) => {
    return sum + getTileValue(tile, dynamicValues);
  }, 0);
}