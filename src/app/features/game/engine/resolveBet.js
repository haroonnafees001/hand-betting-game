export function resolveBet(currentTotal, nextTotal, bet) {
  if (currentTotal === nextTotal) {
    return "draw";
  }

  if (bet === "higher" && nextTotal > currentTotal) {
    return "win";
  }

  if (bet === "lower" && nextTotal < currentTotal) {
    return "win";
  }

  return "lose";
}