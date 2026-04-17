import { motion as Motion, useReducedMotion } from "framer-motion";

export default function GameOverPanel({ score, reason, onRestart, onExit }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.24 } }}
      className="table-panel border-danger/60 bg-[#3a1c1f]/85 p-5"
    >
      <h2 className="text-xl font-bold text-danger">Game Over</h2>
      <p className="mt-2 text-ivory">Final Score: {score}</p>
      <p className="mt-1 text-muted">{reason}</p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onRestart}
          className="cta-hover cta-hover-gold rounded-btn border border-gold/50 bg-gradient-to-b from-gold to-[#c4972f] px-4 py-2 font-semibold text-chip-black"
        >
          Restart
        </button>

        <button
          onClick={onExit}
          className="cta-hover cta-hover-soft rounded-btn border border-ivory/25 bg-surface2 px-4 py-2 font-semibold text-ivory"
        >
          Exit
        </button>
      </div>
    </Motion.div>
  );
}
