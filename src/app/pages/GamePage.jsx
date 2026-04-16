

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BetControls from "../features/game/components/BetControls";
import GameOverPanel from "../features/game/components/GameOverPanel";
import HandView from "../features/game/components/HandView";
import HistoryList from "../features/game/components/HistoryList";
import ScoreBoard from "../features/game/components/ScoreBoard";
import { useGameStore } from "../features/game/store/gameStore";
import { saveScore } from "../features/leaderboard/leaderboardStorage";
export default function GamePage() {
  const navigate = useNavigate();

  const {
    status,
    score,
    round,
    drawPile,
    discardPile,
    reshuffleCount,
    currentHand,
    previousHand,
    dynamicValues,
    history,
    gameOverReason,
    startGame,
    playRound,
    exitGame,
    resetGame,
  } = useGameStore();

  useEffect(() => {
    if (status === "idle") {
      startGame();
    }
    if (status === "game-over") {
    saveScore(score);
  }
  if (status === "playing") {
  confirm("Game progress will not be saved. Continue?");
}

  }, [status, startGame]);

  const handleExit = () => {
    exitGame();
    navigate("/");
  };

  const handleRestart = () => {
    resetGame();
    startGame();
  };

  const latestResult = history.length ? history[history.length - 1].result : null;


  return (
    <main className="min-h-screen bg-bg text-text px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-card border border-border bg-surface/70 p-5 shadow-card backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-small uppercase tracking-[0.24em] text-primary">
              Strategy Tile Game
            </p>
            <h1 className="text-title font-display md:text-hero">Hand Betting Game</h1>
            <p className="mt-2 max-w-2xl text-muted">
              Predict whether the next hand total will be higher or lower. Special
              tiles evolve as the game progresses, so every round changes the odds.
            </p>
          </div>

          <button
            onClick={handleExit}
            className="rounded-btn border border-border bg-surface2 px-4 py-2 font-medium text-text transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
          >
            Exit Game
          </button>
        </div>

        <ScoreBoard
          score={score}
          round={round}
          drawPileCount={drawPile.length}
          discardPileCount={discardPile.length}
          reshuffleCount={reshuffleCount}
        />

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-card border border-primary/30 bg-surface p-5 shadow-card shadow-glow transition duration-300">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-small uppercase tracking-[0.2em] text-primary">
                    Live Round
                  </p>
                  <h2 className="mt-1 text-section font-display">Current Hand</h2>
                </div>

                {latestResult && (
                  <span
                    className={`rounded-full border px-3 py-1 text-small font-semibold capitalize ${
                      latestResult === "win"
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : latestResult === "lose"
                        ? "border-danger/40 bg-danger/10 text-danger"
                        : "border-warning/40 bg-warning/10 text-warning"
                    }`}
                  >
                    {latestResult}
                  </span>
                )}
              </div>

              <HandView
                title=""
                hand={currentHand}
                dynamicValues={dynamicValues}
              />

              <div className="mt-6 rounded-card border border-border bg-surface2 p-4">
                <p className="text-small uppercase tracking-[0.2em] text-muted">
                  Make your move
                </p>
                <p className="mt-2 text-body text-muted">
                  Choose whether the next hand total will be higher or lower than the
                  current hand.
                </p>

                <div className="mt-4">
                  <BetControls onBet={playRound} disabled={status !== "playing"} />
                </div>
              </div>
            </div>

            <div className="rounded-card border border-border bg-surface p-5 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-small uppercase tracking-[0.2em] text-secondary">
                    Round History
                  </p>
                  <h2 className="mt-1 text-section font-display">Recent Results</h2>
                </div>
              </div>

              <HistoryList items={history} />
            </div>
          </section>

          <aside className="space-y-6">
            {previousHand && (
              <div className="rounded-card border border-border bg-surface p-5 shadow-card transition duration-200 hover:border-secondary/40">
                <HandView
                  title="Previous Hand"
                  hand={previousHand}
                  dynamicValues={dynamicValues}
                />
              </div>
            )}

            <div className="rounded-card border border-border bg-surface p-5 shadow-card">
              <p className="text-small uppercase tracking-[0.2em] text-warning">
                Quick Rules
              </p>
              <h2 className="mt-1 text-section font-display">How It Works</h2>

              <div className="mt-4 space-y-3 text-body text-muted">
                <div className="rounded-card border border-border bg-surface2 p-3 transition duration-200 hover:border-primary/40">
                  Number tiles use their face value.
                </div>
                <div className="rounded-card border border-border bg-surface2 p-3 transition duration-200 hover:border-secondary/40">
                  Winds and Dragons start at value 5.
                </div>
                <div className="rounded-card border border-border bg-surface2 p-3 transition duration-200 hover:border-accent/40">
                  Winning and losing hands change special tile values.
                </div>
                <div className="rounded-card border border-border bg-surface2 p-3 transition duration-200 hover:border-warning/40">
                  The game ends if a special tile reaches 0 or 10, or the deck runs out for the 3rd time.
                </div>
              </div>
            </div>

            {status === "game-over" && (
              <GameOverPanel
                score={score}
                reason={gameOverReason}
                onRestart={handleRestart}
                onExit={handleExit}
              />
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}