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
    const numString = gridModel.grid[rowIndex + 1][colIndex + 1].toString();
    return numString.padStart(gridModel.maxDigits + 1, " ");
  }

  static #rowSeparator(gridModel) {
    if (gridModel.maxDigits === 1) {
      return SEPARATOR_OF_1CELL_FOR_1DIGITS.repeat(gridModel.gridWidth + 1) + "-";
    } else if (gridModel.maxDigits === 2) {
      return SEPARATOR_OF_1CELL_FOR_2DIGITS.repeat(gridModel.gridWidth + 1) + "-";
    }
  }
}
