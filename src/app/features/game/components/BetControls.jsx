import { motion as Motion, useReducedMotion } from "framer-motion";

const buttonMotion = {
  whileHover: { y: -2, scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export default function BetControls({ onBet, disabled, onBeforeBet, inline = false }) {
  const shouldReduceMotion = useReducedMotion();

  const handleBet = (bet) => {
    onBeforeBet?.();
    onBet(bet);
  };

  return (
    <div
      className={
        inline
          ? "flex flex-wrap gap-3"
          : "sticky bottom-3 z-30 flex flex-wrap gap-3 rounded-card border border-border/60 bg-surface2/95 p-3 shadow-card backdrop-blur md:static md:bg-transparent md:p-0 md:shadow-none"
      }
    >
      <Motion.button
        onClick={() => handleBet("higher")}
        disabled={disabled}
        {...(shouldReduceMotion ? {} : buttonMotion)}
        transition={{ duration: 0.14 }}
        className="cta-hover cta-hover-gold flex-1 rounded-btn border border-gold/50 bg-gradient-to-b from-gold to-[#c4972f] px-5 py-3 font-semibold uppercase tracking-[0.14em] text-chip-black disabled:cursor-not-allowed disabled:opacity-45 md:flex-none"
      >
        Higher
      </Motion.button>

      <Motion.button
        onClick={() => handleBet("lower")}
        disabled={disabled}
        {...(shouldReduceMotion ? {} : buttonMotion)}
        transition={{ duration: 0.14 }}
        className="cta-hover cta-hover-danger flex-1 rounded-btn border border-chip-red/50 bg-gradient-to-b from-chip-red to-[#891826] px-5 py-3 font-semibold uppercase tracking-[0.14em] text-ivory disabled:cursor-not-allowed disabled:opacity-45 md:flex-none"
      >
        Lower
      </Motion.button>
    </div>
  );
}
