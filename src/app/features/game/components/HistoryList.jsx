export default function HistoryList({ items }) {
  return (
    <section className="mt-8">
      <h3 className="text-section font-display mb-4">History</h3>

      {items.length === 0 ? (
        <p className="text-muted">No rounds yet</p>
      ) : (
        <div className="grid gap-3">
          {items.slice().reverse().map((item, index) => (
            <div
              key={index}
              className="bg-surface2 border border-border rounded-card p-4"
            >
              <div>Round: {item.round}</div>
              <div>Bet: {item.bet}</div>
              <div
                className={
                  item.result === "win"
                    ? "text-accent"
                    : item.result === "lose"
                    ? "text-danger"
                    : "text-warning"
                }
              >
                Result: {item.result}
              </div>

              <div>
                {item.previousHand.total} → {item.nextHand.total}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}