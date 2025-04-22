import { CELL_WIDTH, ANSI_BASIC_COLOR } from "./constants.js";

export default class Formatter {
  static format(gridModel) {
    const rowSeparator = this.#rowSeparator(gridModel);
    const colSeparator = "|";

    const content = [rowSeparator];
    for (const row of gridModel.grid) {
      const rowContent = [colSeparator];
      for (const num of row) {
        rowContent.push(this.#padCellContent(num, gridModel));
        rowContent.push(colSeparator);
      }
      content.push(rowContent.join(" "));
      content.push(rowSeparator);
    }
    return [this.#formatHeader(gridModel), ...content, "", this.#formatHelpMessage()].join("\n");
  }

  static formatCell(gridModel, rowIndex, colIndex) {
    const value = gridModel.getValue(rowIndex, colIndex);
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

  static #formatResultGrid(gridModel) {
    const rowSeparator = this.#rowSeparator(gridModel);
    const colSeparator = "|";

    const content = [rowSeparator];
    for (let rowIndex = 0; rowIndex < gridModel.gridWidth + 1; rowIndex++) {
      const rowContent = [colSeparator];
      for (let colIndex = 0; colIndex < gridModel.gridWidth + 1; colIndex++) {
        const num = gridModel.getValue(rowIndex, colIndex);
        let cellContent = this.#padCellContent(num, gridModel);
        const isMistake = gridModel.mistakes.some(
          (mistake) => mistake.rowIndex === rowIndex && mistake.colIndex === colIndex,
        );
        if (isMistake) {
          cellContent = ANSI_BASIC_COLOR.BACK_RED + cellContent + ANSI_BASIC_COLOR.RESET;
        }
        rowContent.push(cellContent);
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

  static #padCellContent(num, gridModel) {
    return num === null
      ? " ".repeat(gridModel.maxDigits + 1)
      : num.toString().padStart(gridModel.maxDigits + 1, " ");
  }

  static #rowSeparator(gridModel) {
    const repeatCount = gridModel.maxDigits === 1 ? CELL_WIDTH.ONE_DIGIT : CELL_WIDTH.TWO_DIGITS;
    return "-".repeat(repeatCount * (gridModel.gridWidth + 1) + 1);
  }
}
