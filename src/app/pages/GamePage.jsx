import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion as Motion,
  useReducedMotion,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import BetControls from "../features/game/components/BetControls";
import HandView from "../features/game/components/HandView";
import HistoryList from "../features/game/components/HistoryList";
import ScoreBoard from "../features/game/components/ScoreBoard";
import { useGameStore } from "../features/game/store/gameStore";
import { saveScore } from "../features/leaderboard/leaderboardStorage";
import { playSound, unlockAudio } from "../shared/audio/audioManager";
import { useAudioSettings } from "../shared/audio/useAudioSettings";

const TIMING = {
  CLICK_MS: 140,
  DEAL_REVEAL_MS: 340,
  RESULT_SETTLE_MS: 260,
};

const revealMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.28, ease: [0.22, 0.7, 0.2, 1] },
};

const modalOverlayClass =
  "fixed inset-0 flex items-end justify-center bg-black/70 p-4 md:items-center";
const modalCardClass = "table-panel w-full overflow-hidden border-gold/40";
const modalHeaderClass =
  "flex items-center justify-between border-b border-border/55 p-4 md:p-5";
const softButtonClass =
  "cta-hover cta-hover-soft rounded-btn border border-ivory/30 bg-surface2 px-4 py-2 text-small font-semibold text-ivory";
const goldButtonClass =
  "cta-hover cta-hover-gold rounded-btn border border-gold/55 bg-gradient-to-b from-gold to-[#c4972f] px-5 py-2 font-semibold uppercase tracking-[0.12em] text-chip-black";

const confettiPieces = Array.from({ length: 26 }, (_, index) => {
  const hue =
    index % 3 === 0 ? "#f7d46d" : index % 3 === 1 ? "#4ade80" : "#ffffff";
  return {
    id: `piece-${index}`,
    x: `${4 + ((index * 17) % 92)}%`,
    drift: `${-36 + ((index * 23) % 72)}px`,
    delay: `${((index * 5) % 30) / 100}s`,
    duration: `${1.2 + ((index * 7) % 8) / 10}s`,
    hue,
  };
});

const phaseProgressMap = {
  ready: 5,
  "bet-placed": 33,
  revealing: 66,
  settled: 100,
};

const phaseLabelMap = {
  ready: "READY",
  "bet-placed": "BET PLACED",
  revealing: "DEAL / REVEAL",
  settled: "RESULT SETTLE",
};

function getResultSound(result) {
  if (result === "win") return "win";
  if (result === "lose") return "lose";
  return "draw";
}

export default function GamePage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { audioMuted, toggleAudioMuted } = useAudioSettings();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [dismissedWinRound, setDismissedWinRound] = useState(0);
  const [isBetPlaced, setIsBetPlaced] = useState(false);

  const {
    status,
    score,
    round,
    drawPile,
    discardPile,
    reshuffleCount,
    currentHand,
    previousHand,
    history,
    gameOverReason,
    lastRoundResult,
    uiPhase,
    startGame,
    playRound,
    exitGame,
    resetGame,
  } = useGameStore();

  const previousStatusRef = useRef(status);
  const lastHandledResultRoundRef = useRef(0);
  const betPlacedTimerRef = useRef(null);

  const latestRoundNumber = history.length;
  const latestWinRound = lastRoundResult === "win" ? latestRoundNumber : 0;
  const isWinPopupOpen =
    latestWinRound > 0 && dismissedWinRound !== latestWinRound;

  const isRevealLocked = uiPhase === "dealing";
  const isHeaderLocked = isRevealLocked;
  const roundPhase =
    uiPhase === "dealing"
      ? "revealing"
      : isBetPlaced
        ? "bet-placed"
        : latestRoundNumber > 0
          ? "settled"
          : "ready";

  useEffect(() => {
    if (status === "idle") {
      startGame();
    }
  }, [status, startGame]);

  useEffect(() => {
    if (status === "game-over") {
      saveScore(score);
    }
  }, [status, score]);

  useEffect(() => {
    if (uiPhase === "dealing") {
      playSound("deal");
    }
  }, [uiPhase]);

  useEffect(() => {
    if (!lastRoundResult || latestRoundNumber === 0) {
      return;
    }

    if (lastHandledResultRoundRef.current === latestRoundNumber) {
      return;
    }

    playSound(getResultSound(lastRoundResult));
    if (lastRoundResult === "win") {
      playSound("clap");
    }

    lastHandledResultRoundRef.current = latestRoundNumber;
  }, [lastRoundResult, latestRoundNumber]);

  useEffect(() => {
    if (status === "game-over" && previousStatusRef.current !== "game-over") {
      playSound("game-over");
    }

    previousStatusRef.current = status;
  }, [status]);

  useEffect(() => {
    return () => {
      if (betPlacedTimerRef.current) {
        window.clearTimeout(betPlacedTimerRef.current);
      }
    };
  }, []);

  const handleExit = () => {
    exitGame();
    navigate("/");
  };

  const handleRestart = () => {
    resetGame();
    startGame();
  };

  const handleBet = (bet) => {
    if (status !== "playing" || isRevealLocked) {
      return;
    }

    setIsBetPlaced(true);
    if (betPlacedTimerRef.current) {
      window.clearTimeout(betPlacedTimerRef.current);
    }
    betPlacedTimerRef.current = window.setTimeout(() => {
      setIsBetPlaced(false);
      betPlacedTimerRef.current = null;
    }, TIMING.CLICK_MS);
    playRound(bet);
  };

  const handleBeforeBet = () => {
    unlockAudio();
    playSound("click");
  };

  const handleToggleSound = () => {
    unlockAudio();
    playSound("click");
    toggleAudioMuted();
  };

  const handleOpenHistory = () => {
    if (isHeaderLocked) return;
    unlockAudio();
    playSound("click");
    setIsHistoryOpen(true);
  };

  const handleCloseHistory = () => {
    playSound("click");
    setIsHistoryOpen(false);
  };

  const handleOpenRules = () => {
    if (isHeaderLocked) return;
    unlockAudio();
    playSound("click");
    setIsRulesOpen(true);
  };

  const handleCloseRules = () => {
    playSound("click");
    setIsRulesOpen(false);
  };

  const handleCloseWinPopup = () => {
    playSound("click");
    setDismissedWinRound(latestWinRound);
  };

  return (
    <main className="felt-bg min-h-screen px-3 py-3 text-text sm:px-4 sm:py-4 md:px-5 md:py-5 xl:h-[100dvh] xl:overflow-hidden">
      <div className="mx-auto flex h-full max-w-8xl flex-col">
        <Motion.header
          {...(shouldReduceMotion
            ? { initial: false, animate: { opacity: 1 } }
            : revealMotion)}
          className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-card border border-border/55 bg-surface/70 px-3 py-2.5 backdrop-blur sm:mb-4 sm:px-4 sm:py-3"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-gold/45 bg-surface2 text-xl text-gold">
              ♠
            </div>
            <span className="font-display text-lg tracking-[0.08em] text-ivory">
              HandBet Club
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-2 md:gap-3">
            <button
              onClick={handleOpenHistory}
              disabled={isHeaderLocked}
              className="cta-hover cta-hover-soft rounded-btn border border-transparent px-4 py-2 text-small font-semibold tracking-[0.14em] text-muted transition hover:border-gold/35 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-45"
            >
              RECENT RESULTS
            </button>
            <button
              onClick={handleOpenRules}
              disabled={isHeaderLocked}
              className="cta-hover cta-hover-soft rounded-btn border border-transparent px-4 py-2 text-small font-semibold tracking-[0.14em] text-muted transition hover:border-gold/35 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-45"
            >
              RULES
            </button>
            <button
              onClick={handleToggleSound}
              className="cta-hover cta-hover-soft rounded-btn border border-transparent px-4 py-2 text-small font-semibold tracking-[0.14em] text-muted transition hover:border-gold/35 hover:text-ivory"
            >
              {audioMuted ? "SOUND OFF" : "SOUND ON"}
            </button>
          </nav>

          <button
            onClick={handleExit}
            className="cta-hover cta-hover-danger rounded-btn border border-danger/60 bg-gradient-to-b from-danger to-[#8b202a] px-4 py-2 font-semibold text-ivory"
          >
            Exit Table
          </button>
        </Motion.header>

        <div className="grid gap-4 xl:min-h-0 xl:flex-1 xl:grid-cols-[1.45fr_0.9fr] xl:overflow-hidden">
          <section className="space-y-4 xl:min-h-0 xl:overflow-auto pr-1">
            <Motion.div
              {...(shouldReduceMotion
                ? { initial: false, animate: { opacity: 1 } }
                : revealMotion)}
              className="table-panel glow-gold p-4 sm:p-5 md:p-5 xl:flex xl:h-full xl:flex-col"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-small uppercase tracking-[0.22em] text-gold">
                    Live Hand
                  </p>
                  <h2 className="mt-1 text-section font-display text-ivory">
                    Dealer Table
                  </h2>
                </div>

                {lastRoundResult && (
                  <Motion.span
                    key={`${lastRoundResult}-${latestRoundNumber}`}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.92 }
                    }
                    animate={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 1,
                            scale: [0.92, 1.03, 1],
                            transition: { duration: 0.26 },
                          }
                    }
                    className={`chip-badge capitalize ${
                      lastRoundResult === "win"
                        ? "chip-badge-win"
                        : lastRoundResult === "lose"
                          ? "chip-badge-lose"
                          : "chip-badge-draw"
                    }`}
                  >
                    {lastRoundResult}
                  </Motion.span>
                )}
              </div>

              <div className="mb-4 rounded-card border border-border/60 bg-surface2/65 px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="mb-1.5 flex items-center justify-between text-small uppercase tracking-[0.14em] text-muted">
                  <span>Round Flow</span>
                  <span className="text-gold">{phaseLabelMap[roundPhase]}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#0a241b]">
                  <Motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold"
                    animate={{ width: `${phaseProgressMap[roundPhase]}%` }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : TIMING.CLICK_MS / 1000,
                    }}
                  />
                </div>
              </div>

              <div className="relative mt-3 w-full overflow-hidden rounded-[120px] border border-gold/35 bg-gradient-to-b from-[#0b2a20] to-[#071b14] px-3 py-4 shadow-[inset_0_0_35px_rgba(0,0,0,0.45)] sm:rounded-[140px] sm:px-4 sm:py-5 md:rounded-[170px] md:px-6 md:py-7 xl:flex-1">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(231,190,92,0.14),transparent_38%)]" />

                <div className="relative z-10 text-center">
                  <p className="text-title font-display text-ivory">Current Hand
                    <span className="ml-2 text-4xl font-bold text-gold sm:text-5xl md:text-6xl">
                    {currentHand?.total ?? "--"}
                  </span>
                  </p>
                  
                </div>

                <div className="relative z-10 mt-4 sm:mt-5">
                  <HandView
                    hand={currentHand}
                    mode="current"
                    uiPhase={uiPhase}
                    showTotal={false}
                    centered
                    minTilesHeight
                    dealerSlots
                    slotCount={5}
                    tileSurface="dealer"
                  />
                </div>
                <div className="relative z-10 mt-3 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent sm:mt-4" />
                <Motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: 0.05 }}
                  className="relative z-10 mt-3 rounded-btn border border-gold/45 bg-[#112d22]/90 px-3 py-2 text-center shadow-[0_0_20px_rgba(231,190,92,0.12)] sm:mt-4 sm:px-4"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-gold">
                    Your Next Move
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ivory sm:text-base">
                    Predict the next total and choose <span className="text-gold">Higher</span> or{" "}
                    <span className="text-gold">Lower</span>.
                  </p>
                </Motion.div>
                <div className="relative z-10 mt-4 flex items-center justify-center sm:mt-5">
                  <BetControls
                    onBet={handleBet}
                    onBeforeBet={handleBeforeBet}
                    disabled={status !== "playing" || isRevealLocked}
                    inline
                  />
                </div>
              </div>
            </Motion.div>
          </section>

          <aside className="space-y-6 xl:min-h-0 xl:overflow-auto pr-1">
            <Motion.div
              {...(shouldReduceMotion
                ? { initial: false, animate: { opacity: 1 } }
                : {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.05, duration: 0.24 },
                  })}
              className="table-panel p-5"
            >
              <ScoreBoard
                score={score}
                round={round}
                drawPileCount={drawPile.length}
                discardPileCount={discardPile.length}
                reshuffleCount={reshuffleCount}
              />
            </Motion.div>

            {previousHand && (
              <Motion.div
                {...(shouldReduceMotion
                  ? { initial: false, animate: { opacity: 1 } }
                  : {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.09, duration: 0.24 },
                    })}
                className="table-panel p-5"
              >
                <HandView
                  title="Previous Hand"
                  hand={previousHand}
                  mode="previous"
                  uiPhase={uiPhase}
                  tileSurface="dealer"
                />
              </Motion.div>
            )}
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {isHistoryOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${modalOverlayClass} z-50`}
            onClick={handleCloseHistory}
          >
            <Motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16, scale: 0.98 }
              }
              transition={{ duration: 0.24 }}
              className={`${modalCardClass} max-h-[82vh] max-w-2xl`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={modalHeaderClass}>
                <div>
                  <p className="text-small uppercase tracking-[0.2em] text-gold">
                    Round Log
                  </p>
                  <h2 className="mt-1 text-section font-display">
                    Recent Results
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleSound}
                    className={softButtonClass}
                  >
                    {audioMuted ? "Sound Off" : "Sound On"}
                  </button>
                  <button
                    onClick={handleCloseHistory}
                    className={softButtonClass}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="max-h-[58vh] overflow-y-auto p-4 md:p-5">
                <HistoryList items={history} />
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWinPopupOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${modalOverlayClass} z-[60]`}
            onClick={handleCloseWinPopup}
          >
            <Motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16, scale: 0.95 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12, scale: 0.97 }
              }
              transition={{ duration: TIMING.RESULT_SETTLE_MS / 1000 }}
              className="table-panel relative w-full max-w-2xl overflow-hidden border-green-300/65 bg-gradient-to-br from-[#1b5b39] to-[#103523] p-8 text-center md:p-10"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {confettiPieces.map((piece) => (
                  <span
                    key={piece.id}
                    className="confetti-piece"
                    style={{
                      "--x": piece.x,
                      "--drift": piece.drift,
                      "--delay": piece.delay,
                      "--duration": piece.duration,
                      "--hue": piece.hue,
                    }}
                  />
                ))}
              </div>

              <div
                className={`${modalHeaderClass} relative z-10 -mx-8 -mt-8 mb-6 border-white/20 md:-mx-10 md:-mt-10`}
              >
                <div>
                  <p className="text-small uppercase tracking-[0.22em] text-green-200">
                    Round Winner
                  </p>
                </div>
                <button
                  onClick={handleCloseWinPopup}
                  className={softButtonClass}
                >
                  Close
                </button>
              </div>

              <h3 className="relative z-10 mt-3 text-5xl font-display text-white md:text-6xl">
                WIN
              </h3>
              <p className="relative z-10 mt-3 text-lg text-green-100 md:text-xl">
                Great call. Dealer hand was in your favor.
              </p>

              <button
                onClick={handleCloseWinPopup}
                className={`${goldButtonClass} relative z-10 mt-6 px-6 py-3`}
              >
                Continue
              </button>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRulesOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${modalOverlayClass} z-[55]`}
            onClick={handleCloseRules}
          >
            <Motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16, scale: 0.98 }
              }
              transition={{ duration: 0.24 }}
              className={`${modalCardClass} max-w-2xl`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={modalHeaderClass}>
                <div>
                  <p className="text-small uppercase tracking-[0.2em] text-gold">
                    Rules
                  </p>
                  <h2 className="mt-1 text-section font-display text-ivory">
                    How It Works
                  </h2>
                </div>
                <button onClick={handleCloseRules} className={softButtonClass}>
                  Close
                </button>
              </div>

              <div className="space-y-3 p-4 text-body text-muted md:p-5">
                <div className="rounded-card border border-border/55 bg-surface2/80 p-3">
                  Number tiles use face value.
                </div>
                <div className="rounded-card border border-border/55 bg-surface2/80 p-3">
                  Winds and dragons start at 5.
                </div>
                <div className="rounded-card border border-border/55 bg-surface2/80 p-3">
                  Win/lose adjusts special tile values.
                </div>
                <div className="rounded-card border border-border/55 bg-surface2/80 p-3">
                  Game ends when a special tile hits 0/10 or on 3rd reshuffle.
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "game-over" && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4"
          >
            <Motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 18, scale: 0.95 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12, scale: 0.97 }
              }
              transition={{ duration: 0.26 }}
              className="table-panel w-full max-w-md overflow-hidden border-danger/60 bg-gradient-to-br from-[#451d20] to-[#2a1214]"
            >
              <div className={modalHeaderClass}>
                <div>
                  <p className="text-small uppercase tracking-[0.24em] text-danger/85">
                    Table Closed
                  </p>
                  <h3 className="mt-1 text-3xl font-display text-ivory">
                    Game Over
                  </h3>
                </div>
              </div>

              <div className="p-6 text-center">
                <p className="text-lg font-semibold text-gold">
                  Final Score: {score}
                </p>
                <p className="mt-2 text-muted">{gameOverReason}</p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button onClick={handleRestart} className={goldButtonClass}>
                    Start Again
                  </button>
                  <button
                    onClick={handleExit}
                    className="cta-hover cta-hover-soft rounded-btn border border-ivory/30 bg-surface2 px-5 py-2 font-semibold uppercase tracking-[0.12em] text-ivory"
                  >
                    Exit Game
                  </button>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
