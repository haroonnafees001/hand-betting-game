import test from "node:test";
import assert from "node:assert/strict";
import { updateDynamicValues } from "../../src/app/features/game/engine/updateDynamicValues.js";

const baseValues = {
  "east-wind": 5,
  "south-wind": 5,
  "west-wind": 5,
  "north-wind": 5,
  "red-dragon": 5,
  "green-dragon": 5,
  "white-dragon": 5,
};

test("updateDynamicValues increments winner special tiles and decrements loser special tiles", () => {
  const nextValues = updateDynamicValues(
    baseValues,
    [
      { type: "wind", key: "east-wind" },
      { type: "dragon", key: "red-dragon" },
      { type: "number", key: "bamboo-2", value: 2 },
    ],
    [
      { type: "wind", key: "south-wind" },
      { type: "number", key: "dots-8", value: 8 },
    ]
  );

  assert.equal(nextValues["east-wind"], 6);
  assert.equal(nextValues["red-dragon"], 6);
  assert.equal(nextValues["south-wind"], 4);
  assert.equal(nextValues["north-wind"], 5);
});
