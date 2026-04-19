import test from "node:test";
import assert from "node:assert/strict";
import {
  buildGameOverTileValueMap,
  getGameOverModalDelayMs,
  isRevealPhase,
} from "../../src/app/pages/gamePageViewModel.js";

test("buildGameOverTileValueMap creates stable key-value map", () => {
  const result = buildGameOverTileValueMap([
    { key: "east-wind", value: 0 },
    { key: "red-dragon", value: 10 },
  ]);

  assert.deepEqual(result, {
    "east-wind": 0,
    "red-dragon": 10,
  });
});

test("getGameOverModalDelayMs delays modal when highlighted tiles exist", () => {
  assert.equal(getGameOverModalDelayMs(2, 900), 900);
  assert.equal(getGameOverModalDelayMs(0, 900), 220);
});

test("isRevealPhase only locks controls during dealing", () => {
  assert.equal(isRevealPhase("dealing"), true);
  assert.equal(isRevealPhase("resolved"), false);
  assert.equal(isRevealPhase("idle"), false);
});
