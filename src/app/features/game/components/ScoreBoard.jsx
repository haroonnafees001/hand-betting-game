export default function ScoreBoard({
  score,
  round,
  drawPileCount,
  discardPileCount,
  reshuffleCount,
}) {
  const stats = [
    { label: "Score", value: score },
    { label: "Round", value: round },
    { label: "Draw", value: drawPileCount },
    { label: "Discard", value: discardPileCount },
    { label: "Reshuffle", value: reshuffleCount },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {stats.map((item) => (
        <div
          key={item.label}
          className="table-panel rounded-card border border-border/70 bg-surface2/85 p-3 text-center"
        >
          <p className="text-small uppercase tracking-[0.1em] text-muted">{item.label}</p>
          <p className="mt-1 text-xl font-semibold text-gold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
