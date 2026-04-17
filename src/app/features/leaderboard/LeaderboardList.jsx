export default function LeaderboardList({ items = [] }) {
  if (!items.length) {
    return (
      <div className="rounded-card border border-dashed border-border/70 bg-surface2/75 p-5 text-center">
        <p className="text-muted">No scores yet. Play your first game.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-card border border-border/60 bg-surface2/80 p-4"
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-ivory/35 font-bold ${
                index === 0
                  ? "bg-gold text-chip-black"
                  : index === 1
                  ? "bg-ivory text-chip-black"
                  : index === 2
                  ? "bg-[#b08b57] text-chip-black"
                  : "bg-chip-black text-ivory"
              }`}
            >
              {index + 1}
            </div>

            <div>
              <p className="font-semibold text-ivory">{item.name || `Player ${index + 1}`}</p>
              <p className="text-small text-muted">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-small uppercase tracking-[0.15em] text-muted">Score</p>
            <p className="text-xl font-bold text-gold">{item.score}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
