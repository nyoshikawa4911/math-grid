#!/usr/bin/env node

import enquirer from "enquirer";
import MathGrid from "./math-grid.js";
import { REQUIRED_TERMINAL_SIZE, MENU_ID, DIGIT_ID } from "./constants.js";

const checkTerminalSize = () => {
  const terminalHeight = process.stdout.rows;
  const terminalWidth = process.stdout.columns;
  if (
    terminalHeight < REQUIRED_TERMINAL_SIZE.HEIGHT ||
    terminalWidth < REQUIRED_TERMINAL_SIZE.WIDTH
  ) {
    console.log(warningMessage(terminalHeight, terminalWidth));
    return false;
  }
  return true;
};

const warningMessage = (terminalHeight, terminalWidth) => {
  return (
    "The terminal's width and height are insufficient. \n" +
    "Please enlarge the terminal and run again.\n" +
    `The required width and height are ${REQUIRED_TERMINAL_SIZE.WIDTH} and ${REQUIRED_TERMINAL_SIZE.HEIGHT}, respectively.\n` +
    `(Current width:${terminalWidth}, Current height:${terminalHeight})`
  );
};

const menuQuestions = [
  {
    type: "select",
    name: "id",
    message: "Please select a menu.",
    choices: [
      { id: MENU_ID.GRID_5X5, name: "5 x 5 Grid", description: "Start the game with 25 cells." },
      {
        id: MENU_ID.GRID_10X10,
        name: "10 x 10 Grid",
        description: "Start the game with 100 cells.",
      },
      { id: MENU_ID.QUIT, name: "Quit", description: "Exit the game." },
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
      { id: DIGIT_ID.ONE, name: "1 Digits", description: "Calculate with single-digit numbers." },
      { id: DIGIT_ID.TWO, name: "2 Digits", description: "Calculate with two-digit numbers." },
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
    if (!checkTerminalSize()) return;

    console.clear();
    console.log("---------- Welcome to Math Grid ----------\n");
    const menuAnswer = await enquirer.prompt(menuQuestions);
    if (menuAnswer.id === MENU_ID.QUIT) {
      process.exit(0);
    }
    const digitsAnswer = await enquirer.prompt(digitQuestions);

    const gridWidth = menuAnswer.id === MENU_ID.GRID_5X5 ? 5 : 10;
    const maxDigits = digitsAnswer.id === DIGIT_ID.ONE ? 1 : 2;

    const mathGrid = new MathGrid(gridWidth, maxDigits);
    await mathGrid.start();
  }
};

main();
