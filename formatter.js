import { ANSI_BASIC_COLOR } from "./constants.js";

const SEPARATOR_OF_1CELL_FOR_1DIGITS = "-----";
const SEPARATOR_OF_1CELL_FOR_2DIGITS = "------";

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
    return content.join("\n");
  }

  static formatCell(gridModel, rowIndex, colIndex) {
    const value = gridModel.grid[rowIndex + 1][colIndex + 1];
    const numString = value === null ? "" : value.toString();
    return numString.padStart(gridModel.maxDigits + 1, " ");
  }

  static formatResultGrid(gridModel) {
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

  static #rowSeparator(gridModel) {
    if (gridModel.maxDigits === 1) {
      return SEPARATOR_OF_1CELL_FOR_1DIGITS.repeat(gridModel.gridWidth + 1) + "-";
    } else if (gridModel.maxDigits === 2) {
      return SEPARATOR_OF_1CELL_FOR_2DIGITS.repeat(gridModel.gridWidth + 1) + "-";
    }
  }
}
