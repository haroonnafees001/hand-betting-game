import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import TileCard from "./TileCard";

export default function HandView({
  title,
  hand,
  mode = "current",
  uiPhase = "resolved",
  showTotal = true,
  centered = false,
  minTilesHeight = false,
  dealerSlots = false,
  slotCount = 5,
  tileSurface = "default",
  highlightTileKeys = [],
  highlightTileValues = {},
}) {
  const shouldReduceMotion = useReducedMotion();

  if (!hand) return null;

  const visibleSlots = dealerSlots ? Math.max(slotCount, hand.tiles.length) : hand.tiles.length;

  return (
    <section>
      {title ? (
        <div className="mb-4 gold-divider pb-2">
          <h2 className="text-title font-display text-ivory">{title}</h2>
          {showTotal && (
            <p className="mt-1 text-lg font-semibold text-gold">Total: {hand.total}</p>
          )}
        </div>
      ) : (
        showTotal && (
          <div className="mb-4 gold-divider pb-2">
            <p className="mt-1 text-xl font-semibold text-gold">Table Total: {hand.total}</p>
          </div>
        )
      )}

      <AnimatePresence mode="wait" initial={false}>
        <Motion.div
          key={hand.tiles.map((tile) => tile.id).join("-")}
          className={`flex ${dealerSlots ? "gap-2 sm:gap-3 lg:gap-4 xl:gap-5" : "gap-4"} ${centered ? "justify-center" : ""} ${
            minTilesHeight ? "min-h-[168px] sm:min-h-[192px] lg:min-h-[224px] xl:min-h-[244px]" : ""
          } ${dealerSlots ? "pb-1" : "flex-wrap pt-5"}`}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.22 } }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, transition: { duration: 0.16 } }}
        >
          {Array.from({ length: visibleSlots }).map((_, index) => {
            const tile = hand.tiles[index];

            if (!tile) {
              return null;
            }

            return (
              <TileCard
                key={tile.id}
                tile={tile}
                value={
                  Object.prototype.hasOwnProperty.call(
                    highlightTileValues,
                    tile.key
                  )
                    ? highlightTileValues[tile.key]
                    : tile.resolvedValue
                }
                index={index}
                uiPhase={uiPhase}
                mode={mode}
                surface={tileSurface}
                isDanger={highlightTileKeys.includes(tile.key)}
              />
            );
          })}
        </Motion.div>
      </AnimatePresence>
    </section>
  );
}
