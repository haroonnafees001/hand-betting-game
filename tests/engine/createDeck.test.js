import test from "node:test";
import assert from "node:assert/strict";
import {
  createFreshDeck,
  createInitialDynamicValues,
} from "../../src/app/features/game/engine/createDeck.js";

test("createFreshDeck returns expected tile count and composition", () => {
  const deck = createFreshDeck();

  assert.equal(deck.length, 34);
  assert.equal(deck.filter((tile) => tile.type === "number").length, 27);
  assert.equal(deck.filter((tile) => tile.type === "wind").length, 4);
  assert.equal(deck.filter((tile) => tile.type === "dragon").length, 3);
});

test("createInitialDynamicValues starts all special tiles at 5", () => {
  const values = createInitialDynamicValues();

  assert.deepEqual(values, {
    "east-wind": 5,
    "south-wind": 5,
    "west-wind": 5,
    "north-wind": 5,
    "red-dragon": 5,
    "green-dragon": 5,
    "white-dragon": 5,
  });
});
