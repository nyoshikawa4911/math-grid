import { CELL_WIDTH, ANSI_BASIC_COLOR } from "./constants.js";

export default class Formatter {
  static format(gridModel) {
    const rowSeparator = this.#rowSeparator(gridModel);
    const colSeparator = "|";

    const content = [rowSeparator];
    for (const row of gridModel.grid) {
      const rowContent = [colSeparator];
      for (const num of row) {
        rowContent.push(
          num === null
            ? " ".repeat(gridModel.maxDigits + 1)
            : num.toString().padStart(gridModel.maxDigits + 1, " "),
        );
        rowContent.push(colSeparator);
      }
      content.push(rowContent.join(" "));
      content.push(rowSeparator);
    }
    return [this.#formatHeader(gridModel), ...content, "", this.#formatHelpMessage()].join("\n");
  }

  static formatCell(gridModel, rowIndex, colIndex) {
    const value = gridModel.grid[rowIndex + 1][colIndex + 1];
    const numString = value === null ? "" : value.toString();
    return numString.padStart(gridModel.maxDigits + 1, " ");
  }

  static formatResult(gridModel) {
    return [
      this.#formatHeader(gridModel),
      this.#formatResultGrid(gridModel),
      "",
      this.#formatResultMessage(gridModel),
    ].join("\n");
  }

  static #formatHeader(gridModel) {
    const headerMessage = `----- Math Grid (${gridModel.gridWidth}x${gridModel.gridWidth}) - ${gridModel.maxDigits}-Digit Numbers -----\n`;
    return ANSI_BASIC_COLOR.FORE_CYAN + headerMessage + ANSI_BASIC_COLOR.RESET;
  }

  static #formatHelpMessage() {
    return (
      "The following keys are available.\n" +
      "  0-9   : Input numerical values.\n" +
      " Enter  : Move the cursor to the next cell.\n" +
      " Arrows : Move the cursor in the specified direction.\n" +
      " BS/DEL : Erase one digit of the inputted number.\n" +
      " Ctrl+D : Scoring (Only when all cells have been filled in).\n" +
      " Ctrl+C : Quit the game."
    );
  }

  static #formatResultGrid(gridModel) {
    const gridWidth = gridModel.gridWidth;
    const maxDigits = gridModel.maxDigits;
    const rowSeparator = this.#rowSeparator(gridModel);
    const colSeparator = "|";

    const content = [rowSeparator];
    for (let rowIndex = 0; rowIndex < gridWidth + 1; rowIndex++) {
      const rowContent = [colSeparator];
      for (let colIndex = 0; colIndex < gridWidth + 1; colIndex++) {
        const num = gridModel.grid[rowIndex][colIndex];
        const cellContent =
          num === null ? " ".repeat(maxDigits + 1) : num.toString().padStart(maxDigits + 1, " ");
        const isMistake = gridModel.mistakes.some(
          (mistake) => mistake.rowIndex === rowIndex && mistake.colIndex === colIndex,
        );
        if (isMistake) {
          rowContent.push(ANSI_BASIC_COLOR.BACK_RED + cellContent + ANSI_BASIC_COLOR.RESET);
        } else {
          rowContent.push(cellContent);
        }
        rowContent.push(colSeparator);
      }
      content.push(rowContent.join(" "));
      content.push(rowSeparator);
    }

    return content.join("\n");
  }

  static #formatResultMessage(gridModel) {
    const messageForPerfect = gridModel.score === gridModel.perfectScore ? "(Perfect!!)" : "";
    return [
      `Correct : ${gridModel.score} / ${gridModel.perfectScore} ${messageForPerfect}`,
      "",
      "Press any key to return the menu.",
    ].join("\n");
  }

  static #rowSeparator(gridModel) {
    if (gridModel.maxDigits === 1) {
      return "-".repeat(CELL_WIDTH.ONE_DIGIT * (gridModel.gridWidth + 1) + 1);
    } else if (gridModel.maxDigits === 2) {
      return "-".repeat(CELL_WIDTH.TWO_DIGITS * (gridModel.gridWidth + 1) + 1);
    }
  }
}
