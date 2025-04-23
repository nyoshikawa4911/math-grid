import { CELL_WIDTH, ANSI_BASIC_COLOR } from "./constants.js";

export default class Formatter {
  static format(gridModel, isResult) {
    const contents = [];

    contents.push(this.#formatHeader(gridModel));
    contents.push(this.#formatGrid(gridModel, isResult));
    contents.push("");
    contents.push(isResult ? this.#formatResult(gridModel) : this.#formatHelp());

    return contents.join("\n");
  }

  static formatCell(gridModel, rowIndex, colIndex) {
    const value = gridModel.getValue(rowIndex, colIndex);
    const numString = value === null ? "" : value.toString();
    return numString.padStart(gridModel.maxDigits + 1, " ");
  }

  static #formatGrid(gridModel, isResult) {
    const colSeparators = Array(gridModel.grid.length + 1).fill("|");
    const rowSeparators = Array(gridModel.grid.length + 1).fill(this.#rowSeparator(gridModel));
    const rowContents = [];

    gridModel.grid.forEach((rowNumbers, rowIndex) => {
      const paddedCells = this.#paddedCells(rowNumbers, gridModel.maxDigits + 1);
      const cells = isResult ? this.#coloredCells(paddedCells, rowIndex, gridModel) : paddedCells;
      rowContents.push(this.#interleaveArrays(colSeparators, cells).join(" "));
    });

    return this.#interleaveArrays(rowSeparators, rowContents).join("\n");
  }

  static #paddedCells(numbers, digits) {
    return numbers.map((num) => this.#padCellContent(num, digits));
  }

  static #coloredCells(paddedCells, rowIndex, gridModel) {
    return paddedCells.map((cell, colIndex) => {
      const isMistake = gridModel.mistakes.some(
        (mistake) => mistake.rowIndex === rowIndex && mistake.colIndex === colIndex,
      );
      return isMistake ? ANSI_BASIC_COLOR.BACK_RED + cell + ANSI_BASIC_COLOR.RESET : cell;
    });
  }

  static #formatHeader(gridModel) {
    const headerMessage = `----- Math Grid (${gridModel.gridWidth}x${gridModel.gridWidth}) - ${gridModel.maxDigits}-Digit Numbers -----\n`;
    return ANSI_BASIC_COLOR.FORE_CYAN + headerMessage + ANSI_BASIC_COLOR.RESET;
  }

  static #formatHelp() {
    return [
      "The following keys are available.",
      "  0-9   : Input numerical values.",
      " Enter  : Move the cursor to the next cell.",
      " Arrows : Move the cursor in the specified direction.",
      " BS/DEL : Erase one digit of the inputted number.",
      " Ctrl+D : Scoring (Only when all cells have been filled in).",
      " Ctrl+C : Quit the game.",
    ].join("\n");
  }

  static #formatResult(gridModel) {
    const messageForPerfect = gridModel.score === gridModel.perfectScore ? "(Perfect!!)" : "";
    return [
      `Correct : ${gridModel.score} / ${gridModel.perfectScore} ${messageForPerfect}`,
      "",
      "Press any key to return the menu.",
    ].join("\n");
  }

  static #padCellContent(num, digits) {
    return num === null ? " ".repeat(digits) : num.toString().padStart(digits, " ");
  }

  static #rowSeparator(gridModel) {
    const repeatCount = gridModel.maxDigits === 1 ? CELL_WIDTH.ONE_DIGIT : CELL_WIDTH.TWO_DIGITS;
    return "-".repeat(repeatCount * (gridModel.gridWidth + 1) + 1);
  }

  static #interleaveArrays(primaryArray, secondaryArray) {
    const maxLength = Math.max(primaryArray.length, secondaryArray.length);
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      if (i < primaryArray.length) result.push(primaryArray[i]);
      if (i < secondaryArray.length) result.push(secondaryArray[i]);
    }
    return result;
  }
}
