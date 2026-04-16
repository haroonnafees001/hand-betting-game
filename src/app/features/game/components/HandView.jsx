import TileCard from "./TileCard";

export default function HandView({ title, hand }) {
  if (!hand) return null;

  return (
    <section className="mb-8">
      {title ? (
        <div className="mb-4">
          <h2 className="text-title font-display">{title}</h2>
          <p className="mt-1 text-lg font-semibold text-primary">Total: {hand.total}</p>
        </div>
      ) : (
        <div className="mb-4">
          <p className="mt-1 text-lg font-semibold text-primary">Total: {hand.total}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {hand.tiles.map((tile) => (
          <TileCard
            key={tile.id}
            tile={tile}
            value={tile.resolvedValue}
          />
        ))}
      </div>
    </section>
  );
}