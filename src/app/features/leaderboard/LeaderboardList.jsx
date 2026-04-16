export default function LeaderboardList({ items = [] }) {
  if (!items.length) {
    return (
      <div className="rounded-card border border-dashed border-border bg-surface2 p-5 text-center">
        <p className="text-muted">No scores yet. Play your first game.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="group flex items-center justify-between rounded-card border border-border bg-surface2 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow"
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                index === 0
                  ? "bg-warning text-black"
                  : index === 1
                  ? "bg-primary text-black"
                  : index === 2
                  ? "bg-secondary text-white"
                  : "bg-surface text-text"
              }`}
            >
              {index + 1}
            </div>

            <div>
              <p className="font-semibold text-text">
                {item.name || `Player ${index + 1}`}
              </p>
              <p className="text-small text-muted">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-small text-muted">Score</p>
            <p className="text-xl font-bold text-primary">{item.score}</p>
          </div>
        </div>
      ))}
    </div>
  );
}