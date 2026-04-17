export default function HistoryList({ items }) {
  if (items.length === 0) {
    return <p className="text-muted">No rounds yet</p>;
  }

  return (
    <div className="grid gap-3">
      {items
        .slice()
        .reverse()
        .map((item, index) => (
          <div
            key={`${item.round}-${index}`}
            className="rounded-card border border-border/60 bg-surface2/80 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-small uppercase tracking-[0.18em] text-muted">Round {item.round}</p>
              <span
                className={`chip-badge ${
                  item.result === "win"
                    ? "chip-badge-win"
                    : item.result === "lose"
                    ? "chip-badge-lose"
                    : "chip-badge-draw"
                }`}
              >
                {item.result}
              </span>
            </div>

            <p className="mt-3 text-body text-ivory/90">
              Bet <span className="font-semibold uppercase text-gold">{item.bet}</span>
            </p>
            <p className="mt-1 text-body text-muted">
              {item.previousHand.total} → {item.nextHand.total}
            </p>
          </div>
        ))}
    </div>
  );
}
