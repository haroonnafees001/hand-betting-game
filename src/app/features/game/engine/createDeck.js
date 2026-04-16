import { generateId } from "../../../shared/utils/generateId";

const suits = ["bamboo", "characters", "dots"];

const winds = [
  "east-wind",
  "south-wind",
  "west-wind",
  "north-wind",
];

const dragons = [
  "red-dragon",
  "green-dragon",
  "white-dragon",
];

export function createFreshDeck() {
  const deck = [];

  // Number tiles
  for (let suit of suits) {
    for (let i = 1; i <= 9; i++) {
      deck.push({
        id: generateId("tile"),
        key: `${suit}-${i}`,
        label: `${suit} ${i}`,
        type: "number",
        value: i,
      });
    }
  }

  // Winds
  for (let wind of winds) {
    deck.push({
      id: generateId("tile"),
      key: wind,
      label: wind.replace("-", " "),
      type: "wind",
    });
  }

  // Dragons
  for (let dragon of dragons) {
    deck.push({
      id: generateId("tile"),
      key: dragon,
      label: dragon.replace("-", " "),
      type: "dragon",
    });
  }

  return deck;
}

// Dynamic values initial
export function createInitialDynamicValues() {
  return {
    "east-wind": 5,
    "south-wind": 5,
    "west-wind": 5,
    "north-wind": 5,
    "red-dragon": 5,
    "green-dragon": 5,
    "white-dragon": 5,
  };
}