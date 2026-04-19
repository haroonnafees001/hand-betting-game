import { motion as Motion } from "framer-motion";

const defaultHeaderClass =
  "mb-4 flex flex-wrap items-center justify-between gap-4 rounded-card border border-border/55 bg-surface/70 px-4 py-3 backdrop-blur";

export default function AppHeader({
  shouldReduceMotion = false,
  className = "",
  brandLabel = "HandBet Club",
  rightContent = null,
}) {
  return (
    <Motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      className={`${defaultHeaderClass} ${className}`.trim()}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-gold/45 bg-surface2 text-xl text-gold">
          ♠
        </div>
        <span className="font-display text-lg tracking-[0.08em] text-ivory">
          {brandLabel}
        </span>
      </div>

      {rightContent}
    </Motion.header>
  );
}

