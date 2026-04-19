const LEADERBOARD_KEY = "hand-betting-game-leaderboard";
const PLAYER_NAME_KEY = "hand-betting-game-player-name";

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

export function getSavedPlayerName() {
  try {
    const value = localStorage.getItem(PLAYER_NAME_KEY);
    return value ? value.trim() : "";
  } catch {
    return "";
  }
}

export function savePlayerName(name) {
  try {
    const sanitized = String(name || "").trim();
    if (!sanitized) return;
    localStorage.setItem(PLAYER_NAME_KEY, sanitized);
  } catch (error) {
    console.error("Failed to save player name", error);
  }
}

export function clearPlayerName() {
  try {
    localStorage.removeItem(PLAYER_NAME_KEY);
  } catch (error) {
    console.error("Failed to clear player name", error);
  }
}
