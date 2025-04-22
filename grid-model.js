export default class GridModel {
  #gridWidth;
  #maxDigits;
  #grid;
  #mistakes;
  #perfectScore;
  #score;

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

  get mistakes() {
    return this.#mistakes;
  }

  get perfectScore() {
    return this.#perfectScore;
  }

  get score() {
    return this.#score;
  }

  areAllCellsFilled() {
    for (let rowIndex = 1; rowIndex <= this.#gridWidth; rowIndex++) {
      for (let colIndex = 1; colIndex <= this.#gridWidth; colIndex++) {
        if (this.#grid[rowIndex][colIndex] === null) {
          return false;
        }
      }
    }
    return true;
  }

  checkAnswers() {
    this.#mistakes = [];

    for (let rowIndex = 1; rowIndex <= this.gridWidth; rowIndex++) {
      for (let colIndex = 1; colIndex <= this.gridWidth; colIndex++) {
        const answer = this.grid[0][colIndex] + this.grid[rowIndex][0];
        const userAnswer = this.grid[rowIndex][colIndex];

        if (answer !== userAnswer) {
          this.#mistakes.push({
            rowIndex: rowIndex,
            colIndex: colIndex,
          });
        }
      }
    }

    this.#perfectScore = this.gridWidth ** 2;
    this.#score = this.#perfectScore - this.mistakes.length;
  }

  #randomInt() {
    return Math.floor(Math.random() * (this.#maxDigits === 1 ? 9 : 99)) + 1;
  }
}
