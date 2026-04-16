export default function TileCard({ tile, value }) {
  const valueColor =
    tile.type === "number"
      ? "text-primary"
      : tile.type === "wind"
      ? "text-secondary"
      : "text-accent";

  return (
    <div className="min-w-[120px] rounded-card border border-border bg-surface p-4 shadow-card transition-all duration-200 hover:shadow-glow">
      <div className="text-small text-muted capitalize">{tile.type}</div>

      <div className="mt-2 text-section font-semibold capitalize">
        {tile.label}
      </div>

      <div className={`mt-3 text-3xl font-bold ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}