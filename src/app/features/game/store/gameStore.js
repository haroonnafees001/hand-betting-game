import { create } from "zustand";
import { createFreshDeck, createInitialDynamicValues } from "../engine/createDeck";
import { shuffle } from "../engine/shuffle";
import { drawHand } from "../engine/drawHand";
import { resolveBet } from "../engine/resolveBet";
import { updateDynamicValues } from "../engine/updateDynamicValues";
import { checkGameOver } from "../engine/checkGameOver";

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
    });
  },

  playRound: (bet) => {
    const state = get();

    if (state.status !== "playing" || !state.currentHand) {
      return;
    }

    let drawPile = [...state.drawPile];
    let discardPile = [...state.discardPile];
    let reshuffleCount = state.reshuffleCount;

    // Agar next hand draw karne ke liye enough tiles nahi hain
    if (drawPile.length < 2) {
      const freshDeck = createFreshDeck();
      drawPile = shuffle([...drawPile, ...discardPile, ...freshDeck]);
      discardPile = [];
      reshuffleCount += 1;
    }

    const { hand: nextHandTiles, remaining } = drawHand(drawPile, 2);
    const nextHand = buildHand(nextHandTiles, state.dynamicValues);

    const result = resolveBet(state.currentHand.total, nextHand.total, bet);

    let nextScore = state.score;
    let nextDynamicValues = state.dynamicValues;

    if (result === "win") {
      nextScore += 1;
      nextDynamicValues = updateDynamicValues(
        state.dynamicValues,
        nextHand.tiles,
        state.currentHand.tiles
      );
    }

    if (result === "lose") {
      nextDynamicValues = updateDynamicValues(
        state.dynamicValues,
        state.currentHand.tiles,
        nextHand.tiles
      );
    }

    // draw case me koi dynamic update nahi
    const gameOverCheck = checkGameOver(nextDynamicValues, reshuffleCount);

    const newHistoryItem = {
      round: state.round,
      bet,
      previousHand: state.currentHand,
      nextHand,
      result,
      scoreAfterRound: nextScore,
    };

    set({
      score: nextScore,
      round: state.round + 1,
      reshuffleCount,
      drawPile: remaining,
      discardPile: [...discardPile, ...state.currentHand.tiles],
      previousHand: state.currentHand,
      currentHand: nextHand,
      history: [...state.history, newHistoryItem],
      dynamicValues: nextDynamicValues,
      status: gameOverCheck.isGameOver ? "game-over" : "playing",
      gameOverReason: gameOverCheck.reason,
    });
  },

  exitGame: () => {
    set({ ...initialState });
  },

  resetGame: () => {
    set({ ...initialState });
  },
}));