import { create } from "zustand";
import { createFreshDeck, createInitialDynamicValues } from "../engine/createDeck.js";
import { shuffle } from "../engine/shuffle.js";
import { drawHand } from "../engine/drawHand.js";
import { resolveBet } from "../engine/resolveBet.js";
import { updateDynamicValues } from "../engine/updateDynamicValues.js";
import { checkGameOver } from "../engine/checkGameOver.js";
import {
  EMPTY_GAME_OVER_RESULT,
  GAME_STATUS,
  UI_PHASE,
} from "../contracts/gameContracts.js";

const DEFAULT_DEAL_DURATION_MS = 340;

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

function createInitialState() {
  return {
    status: GAME_STATUS.IDLE,
    score: 0,
    round: 0,
    reshuffleCount: 0,
    drawPile: [],
    discardPile: [],
    currentHand: null,
    previousHand: null,
    history: [],
    dynamicValues: {},
    gameOverReason: EMPTY_GAME_OVER_RESULT.reason,
    gameOverTiles: EMPTY_GAME_OVER_RESULT.tiles,
    lastRoundResult: null,
    uiPhase: UI_PHASE.IDLE,
  };
}

export function createGameStore(options = {}) {
  const {
    dealDurationMs = DEFAULT_DEAL_DURATION_MS,
    setTimeoutImpl = globalThis.setTimeout,
  } = options;

  return create((set, get) => ({
    ...createInitialState(),

    startGame: () => {
      const dynamicValues = createInitialDynamicValues();
      const freshDeck = createFreshDeck();
      const shuffledDeck = shuffle(freshDeck);

      const { hand, remaining } = drawHand(shuffledDeck, 2);
      const firstHand = buildHand(hand, dynamicValues);

      set({
        status: GAME_STATUS.PLAYING,
        score: 0,
        round: 1,
        reshuffleCount: 0,
        drawPile: remaining,
        discardPile: [],
        currentHand: firstHand,
        previousHand: null,
        history: [],
        dynamicValues,
        gameOverReason: EMPTY_GAME_OVER_RESULT.reason,
        gameOverTiles: EMPTY_GAME_OVER_RESULT.tiles,
        lastRoundResult: null,
        uiPhase: UI_PHASE.RESOLVED,
      });
    },

    playRound: (bet) => {
      const state = get();

      if (
        state.status !== GAME_STATUS.PLAYING ||
        !state.currentHand ||
        state.uiPhase === UI_PHASE.DEALING
      ) {
        return;
      }

      set({ uiPhase: UI_PHASE.DEALING });

      const resolveRound = () => {
        const latest = get();

        if (
          latest.status !== GAME_STATUS.PLAYING ||
          !latest.currentHand ||
          latest.uiPhase !== UI_PHASE.DEALING
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
          status: gameOverCheck.isGameOver
            ? GAME_STATUS.GAME_OVER
            : GAME_STATUS.PLAYING,
          gameOverReason: gameOverCheck.reason,
          gameOverTiles: gameOverCheck.tiles,
          lastRoundResult: result,
          uiPhase: UI_PHASE.RESOLVED,
        });
      };

      if (typeof setTimeoutImpl !== "function" || dealDurationMs <= 0) {
        resolveRound();
        return;
      }

      setTimeoutImpl(resolveRound, dealDurationMs);
    },

    setUiPhase: (phase) => {
      set({ uiPhase: phase });
    },

    exitGame: () => {
      set(createInitialState());
    },

    resetGame: () => {
      set(createInitialState());
    },
  }));
}

export const useGameStore = createGameStore();
