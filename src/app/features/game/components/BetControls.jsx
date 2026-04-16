export default function BetControls({ onBet, disabled }) {
  return (
    <div className="flex gap-4 my-6">
      
      <button
        onClick={() => onBet("higher")}
        disabled={disabled}
        className="px-5 py-2 rounded-btn bg-primary text-black font-semibold shadow-glow hover:scale-105 transition disabled:opacity-50"
      >
        Higher
      </button>

      <button
        onClick={() => onBet("lower")}
        disabled={disabled}
        className="px-5 py-2 rounded-btn bg-secondary text-white font-semibold hover:scale-105 transition disabled:opacity-50"
      >
        Lower
      </button>
    </div>
  );
}