
// Condition 1

// Agar koi special tile value:
// 	•	0 ho jaye
// 	•	ya 10 ho jaye

// Condition 2

// Agar draw pile 3rd time empty ho chuki ho


export function checkGameOver(dynamicValues, reshuffleCount) {
  const hasLimitReached = Object.values(dynamicValues).some(
    (value) => value <= 0 || value >= 10
  );

  if (hasLimitReached) {
    return {
      isGameOver: true,
      reason: "A special tile reached value 0 or 10.",
    };
  }

  if (reshuffleCount >= 3) {
    return {
      isGameOver: true,
      reason: "The draw pile ran out for the 3rd time.",
    };
  }

  return {
    isGameOver: false,
    reason: null,
  };
}
