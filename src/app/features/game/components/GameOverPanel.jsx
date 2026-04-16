export default function GameOverPanel({ score, reason, onRestart, onExit }) {
  return (
    <div className="mt-6 bg-red-500/10 border border-danger rounded-card p-5">
      
      <h2 className="text-xl font-bold text-danger">Game Over</h2>

      <p className="mt-2">Final Score: {score}</p>
      <p className="text-muted">{reason}</p>

      <div className="flex gap-3 mt-4">
        
        <button
          onClick={onRestart}
          className="px-4 py-2 rounded-btn bg-primary text-black font-semibold"
        >
          Restart
        </button>

        <button
          onClick={onExit}
          className="px-4 py-2 rounded-btn border border-border bg-surface"
        >
          Exit
        </button>

      </div>
    </div>
  );
}