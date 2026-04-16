import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LeaderboardList from "../features/leaderboard/LeaderboardList";
import { getLeaderboard } from "../features/leaderboard/leaderboardStorage";

export default function LandingPage() {
  const navigate = useNavigate();
  const leaderboard = useMemo(() => getLeaderboard(), []);

  return (
    <main className="min-h-screen bg-bg px-4 py-8 text-text md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-card border border-border bg-surface/80 p-6 shadow-card backdrop-blur md:p-8">
            <p className="mb-3 text-small uppercase tracking-[0.28em] text-primary">
              Premium Assessment Build
            </p>

            <h1 className="max-w-3xl text-title font-display leading-tight md:text-hero">
              Hand Betting Game
            </h1>

            <p className="mt-4 max-w-2xl text-body text-muted">
              Predict whether the next hand total will be higher or lower. Number
              tiles use face value, while Winds and Dragons evolve as the game
              progresses.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/game")}
                className="rounded-btn bg-primary px-5 py-3 font-semibold text-black shadow-glow transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                Start New Game
              </button>

              <button
                onClick={() => {
                  const section = document.getElementById("leaderboard");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-btn border border-border bg-surface2 px-5 py-3 font-semibold text-text transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                View Leaderboard
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-card border border-border bg-surface2 p-4 transition duration-200 hover:border-primary/50 hover:shadow-glow">
                <p className="text-small uppercase tracking-[0.2em] text-primary">
                  Rule 1
                </p>
                <p className="mt-2 text-body text-muted">
                  Number tiles use their own face value.
                </p>
              </div>

              <div className="rounded-card border border-border bg-surface2 p-4 transition duration-200 hover:border-secondary/50">
                <p className="text-small uppercase tracking-[0.2em] text-secondary">
                  Rule 2
                </p>
                <p className="mt-2 text-body text-muted">
                  Winds and Dragons start from value 5.
                </p>
              </div>

              <div className="rounded-card border border-border bg-surface2 p-4 transition duration-200 hover:border-accent/50">
                <p className="text-small uppercase tracking-[0.2em] text-accent">
                  Rule 3
                </p>
                <p className="mt-2 text-body text-muted">
                  Winning and losing hands change special tile values.
                </p>
              </div>
            </div>
          </section>

          <aside
            id="leaderboard"
            className="rounded-card border border-border bg-surface/80 p-6 shadow-card backdrop-blur md:p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-small uppercase tracking-[0.2em] text-warning">
                  Top Players
                </p>
                <h2 className="mt-1 text-section font-display">Leaderboard</h2>
              </div>

              <div className="rounded-full border border-border bg-surface2 px-3 py-1 text-small text-muted">
                Top 5
              </div>
            </div>

            <LeaderboardList items={leaderboard} />
          </aside>
        </div>
      </div>
    </main>
  );
}