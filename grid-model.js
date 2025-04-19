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
    this.#grid = new Array(this.#gridWidth).fill().map(() => new Array(this.#gridWidth).fill(null));
    this.#targetRows = new Array(this.#gridWidth).fill().map(() => this.#randomInt());
    this.#targetCols = new Array(this.#gridWidth).fill().map(() => this.#randomInt());
  }

  #randomInt() {
    return Math.floor(Math.random() * (this.#maxDigits === 1 ? 9 : 99)) + 1;
  }
}
