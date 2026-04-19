import { getTileValue } from "./getTileValue.js";

export function calculateHandTotal(hand, dynamicValues) {
  return hand.reduce((sum, tile) => {
    return sum + getTileValue(tile, dynamicValues);
  }, 0);
}
