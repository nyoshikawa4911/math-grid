export default class GridModel {
  #gridWidth;
  #maxDigits;
  #grid;
  #targetRows;
  #targetCols;

  constructor(gridWidth, maxDigits) {
    this.#gridWidth = gridWidth;
    this.#maxDigits = maxDigits;
  }

  setup() {
    this.#grid = new Array(this.#gridWidth + 1)
      .fill()
      .map(() => new Array(this.#gridWidth + 1).fill(null));
    const rowNumbers = new Array(this.#gridWidth).fill().map(() => this.#randomInt());
    const colNumbers = new Array(this.#gridWidth).fill().map(() => this.#randomInt());

    this.#grid[0][0] = "+";
    for (let index = 1; index <= this.gridWidth; index++) {
      this.#grid[0][index] = rowNumbers[index - 1];
      this.#grid[index][0] = colNumbers[index - 1];
    }
  }

  update(rowIndex, colIndex, value) {
    this.#grid[rowIndex + 1][colIndex + 1] = isNaN(value) ? null : value;
  }

  getValue(rowIndex, colIndex) {
    return this.#grid[rowIndex + 1][colIndex + 1];
  }

  get gridWidth() {
    return this.#gridWidth;
  }

  get maxDigits() {
    return this.#maxDigits;
  }

  get grid() {
    return this.#grid;
  }

  get targetRows() {
    return this.#targetRows;
  }

  get targetCols() {
    return this.#targetCols;
  }

  #randomInt() {
    return Math.floor(Math.random() * (this.#maxDigits === 1 ? 9 : 99)) + 1;
  }
}
