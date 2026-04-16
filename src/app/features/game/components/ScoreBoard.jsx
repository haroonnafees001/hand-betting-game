export default function ScoreBoard({
  score,
  round,
  drawPileCount,
  discardPileCount,
  reshuffleCount,
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
      
      <div className="bg-surface border border-border rounded-card p-3">
        Score: {score}
      </div>

      <div className="bg-surface border border-border rounded-card p-3">
        Round: {round}
      </div>

      <div className="bg-surface border border-border rounded-card p-3">
        Draw: {drawPileCount}
      </div>

      <div className="bg-surface border border-border rounded-card p-3">
        Discard: {discardPileCount}
      </div>

      <div className="bg-surface border border-border rounded-card p-3">
        Reshuffle: {reshuffleCount}
      </div>

    </div>
  );
}