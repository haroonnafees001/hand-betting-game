const LEADERBOARD_KEY = "hand-betting-game-leaderboard";

export function getLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveScore(score, name = "Player") {
  try {
    const current = getLeaderboard();

    const next = [
      ...current,
      {
        id: crypto.randomUUID(),
        name,
        score,
        createdAt: new Date().toISOString(),
      },
    ]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(next));
  } catch (error) {
    console.error("Failed to save score", error);
  }
}