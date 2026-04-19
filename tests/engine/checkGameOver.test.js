import test from "node:test";
import assert from "node:assert/strict";
import { checkGameOver } from "../../src/app/features/game/engine/checkGameOver.js";

test("checkGameOver ends game when special tile reaches 10", () => {
  const result = checkGameOver(
    {
      "east-wind": 10,
      "south-wind": 5,
    },
    0
  );

  assert.equal(result.isGameOver, true);
  assert.match(result.reason, /value 10/i);
  assert.deepEqual(result.tiles, [{ key: "east-wind", value: 10 }]);
});

test("checkGameOver ends game on third reshuffle", () => {
  const result = checkGameOver(
    {
      "east-wind": 5,
      "south-wind": 5,
    },
    3
  );

  assert.equal(result.isGameOver, true);
  assert.match(result.reason, /3rd time/i);
  assert.deepEqual(result.tiles, []);
});

test("checkGameOver keeps game active when no rule is triggered", () => {
  const result = checkGameOver(
    {
      "east-wind": 6,
      "south-wind": 4,
      "red-dragon": 5,
    },
    1
  );

  assert.equal(result.isGameOver, false);
  assert.equal(result.reason, null);
  assert.deepEqual(result.tiles, []);
});
