import { create } from "zustand";
import { createFreshDeck, createInitialDynamicValues } from "../engine/createDeck";
import { shuffle } from "../engine/shuffle";
import { drawHand } from "../engine/drawHand";
import { resolveBet } from "../engine/resolveBet";
import { updateDynamicValues } from "../engine/updateDynamicValues";
import { checkGameOver } from "../engine/checkGameOver";

const DEAL_DURATION_MS = 340;

function buildHand(tiles, dynamicValues) {
  const resolvedTiles = tiles.map((tile) => {
    const resolvedValue =
      tile.type === "number" ? tile.value : dynamicValues[tile.key] || 5;

    return {
      ...tile,
      resolvedValue,
    };
  });

  const total = resolvedTiles.reduce((sum, tile) => {
    return sum + tile.resolvedValue;
  }, 0);

  return {
    tiles: resolvedTiles,
    total,
  };
}

const initialState = {
  status: "idle",
  score: 0,
  round: 0,
  reshuffleCount: 0,
  drawPile: [],
  discardPile: [],
  currentHand: null,
  previousHand: null,
  history: [],
  dynamicValues: {},
  gameOverReason: null,
  gameOverTiles: [],
  lastRoundResult: null,
  uiPhase: "idle",
};

export const useGameStore = create((set, get) => ({
  ...initialState,

  startGame: () => {
    const dynamicValues = createInitialDynamicValues();
    const freshDeck = createFreshDeck();
    const shuffledDeck = shuffle(freshDeck);

    const { hand, remaining } = drawHand(shuffledDeck, 2);
    const firstHand = buildHand(hand, dynamicValues);

    set({
      status: "playing",
      score: 0,
      round: 1,
      reshuffleCount: 0,
      drawPile: remaining,
      discardPile: [],
      currentHand: firstHand,
      previousHand: null,
      history: [],
      dynamicValues,
      gameOverReason: null,
      gameOverTiles: [],
      lastRoundResult: null,
      uiPhase: "resolved",
    });
  },

  playRound: (bet) => {
    const state = get();

    if (
      state.status !== "playing" ||
      !state.currentHand ||
      state.uiPhase === "dealing"
    ) {
      return;
    }

    set({ uiPhase: "dealing" });

    const resolveRound = () => {
      const latest = get();

      if (
        latest.status !== "playing" ||
        !latest.currentHand ||
        latest.uiPhase !== "dealing"
      ) {
        return;
      }

      let drawPile = [...latest.drawPile];
      let discardPile = [...latest.discardPile];
      let reshuffleCount = latest.reshuffleCount;

      if (drawPile.length < 2) {
        const freshDeck = createFreshDeck();
        drawPile = shuffle([...drawPile, ...discardPile, ...freshDeck]);
        discardPile = [];
        reshuffleCount += 1;
      }

      const { hand: nextHandTiles, remaining } = drawHand(drawPile, 2);
      const nextHand = buildHand(nextHandTiles, latest.dynamicValues);

      const result = resolveBet(latest.currentHand.total, nextHand.total, bet);

      let nextScore = latest.score;
      let nextDynamicValues = latest.dynamicValues;

      if (result === "win") {
        nextScore += 1;
        nextDynamicValues = updateDynamicValues(
          latest.dynamicValues,
          nextHand.tiles,
          latest.currentHand.tiles
        );
      }

      if (result === "lose") {
        nextDynamicValues = updateDynamicValues(
          latest.dynamicValues,
          latest.currentHand.tiles,
          nextHand.tiles
        );
      }

      const gameOverCheck = checkGameOver(nextDynamicValues, reshuffleCount);

      const newHistoryItem = {
        round: latest.round,
        bet,
        previousHand: latest.currentHand,
        nextHand,
        result,
        scoreAfterRound: nextScore,
      };

      set({
        score: nextScore,
        round: latest.round + 1,
        reshuffleCount,
        drawPile: remaining,
        discardPile: [...discardPile, ...latest.currentHand.tiles],
        previousHand: latest.currentHand,
        currentHand: nextHand,
        history: [...latest.history, newHistoryItem],
        dynamicValues: nextDynamicValues,
        status: gameOverCheck.isGameOver ? "game-over" : "playing",
        gameOverReason: gameOverCheck.reason,
        gameOverTiles: gameOverCheck.tiles,
        lastRoundResult: result,
        uiPhase: "resolved",
      });
    };

    if (typeof window === "undefined") {
      resolveRound();
      return;
    }

    window.setTimeout(resolveRound, DEAL_DURATION_MS);
  },

  setUiPhase: (phase) => {
    set({ uiPhase: phase });
  },

  exitGame: () => {
    set({ ...initialState });
  },

  resetGame: () => {
    set({ ...initialState });
  },
}));
