import test from "node:test";
import assert from "node:assert/strict";
import { createGameStore } from "../../src/app/features/game/store/gameStore.js";

test("store starts game and initializes canonical state", () => {
  const store = createGameStore({ dealDurationMs: 0 });

  store.getState().startGame();
  const state = store.getState();

  assert.equal(state.status, "playing");
  assert.equal(state.uiPhase, "resolved");
  assert.equal(state.round, 1);
  assert.equal(state.history.length, 0);
  assert.ok(state.currentHand);
  assert.equal(state.gameOverReason, null);
  assert.deepEqual(state.gameOverTiles, []);
});

test("playRound enforces dealing lock and resolves once", () => {
  let resolveLater = null;
  const store = createGameStore({
    setTimeoutImpl: (cb) => {
      resolveLater = cb;
      return 1;
    },
  });

  store.getState().startGame();
  store.getState().playRound("higher");
  const duringDeal = store.getState();

  assert.equal(duringDeal.uiPhase, "dealing");
  assert.equal(duringDeal.round, 1);

  // Should be ignored while dealing.
  store.getState().playRound("lower");
  assert.equal(store.getState().round, 1);

  resolveLater();
  const resolved = store.getState();
  assert.equal(resolved.uiPhase, "resolved");
  assert.equal(resolved.round, 2);
  assert.equal(resolved.history.length, 1);
});
