#!/usr/bin/env node

import enquirer from "enquirer";
import MathGrid from "./math-grid.js";

const MENU_ID_GRID_5X5 = 1;
const MENU_ID_GRID_10X10 = 2;
const MENU_ID_QUIT = 3;

const DIGIT_ID_1 = 1;
const DIGIT_ID_2 = 2;

const menuQuestions = [
  {
    type: "select",
    name: "id",
    message: "Please select a menu.",
    choices: [
      { id: MENU_ID_GRID_5X5, name: "5 x 5 Grid", description: "Start the game with 25 cells." },
      {
        id: MENU_ID_GRID_10X10,
        name: "10 x 10 Grid",
        description: "Start the game with 100 cells.",
      },
      { id: MENU_ID_QUIT, name: "Quit", description: "Exit the game." },
    ],
    footer() {
      return this.selected.description;
    },
    result() {
      return this.selected.id;
    },
  },
];

const digitQuestions = [
  {
    type: "select",
    name: "id",
    message: "Choose the number of digits for calculations.",
    choices: [
      { id: DIGIT_ID_1, name: "1 Digits", description: "Calculate with single-digit numbers." },
      { id: DIGIT_ID_2, name: "2 Digits", description: "Calculate with two-digit numbers." },
    ],
    footer() {
      return this.selected.description;
    },
    result() {
      return this.selected.id;
    },
  },
];

const main = async () => {
  while (true) {
    console.clear();
    console.log("---------- Welcome to Math Grid ----------\n");
    const menuAnswer = await enquirer.prompt(menuQuestions);
    if (menuAnswer.id === MENU_ID_QUIT) {
      process.exit(0);
    }
    const digitsAnswer = await enquirer.prompt(digitQuestions);

    const mathGrid = new MathGrid(menuAnswer.id, digitsAnswer.id);
    await mathGrid.start();
  }
};

main();
