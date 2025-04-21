import { ANSI_ESC } from "./constants.js";

export default class Cursor {
  #rowPosition;
  #colPosition;
  #maxDigits;
  #gridWidth;

  constructor(gridWidth, maxDigits) {
    this.#rowPosition = 0;
    this.#colPosition = 0;
    this.#maxDigits = maxDigits;
    this.#gridWidth = gridWidth;
  }

  setup() {
    if (this.#maxDigits === 1) {
      this.#moveCursor(9, 4);
      return;
    }
    this.#moveCursor(11, 4);
  }

  position() {
    return [this.#rowPosition, this.#colPosition];
  }

  moveUp() {
    if (this.#isFirstRow()) return;

    process.stdout.write(`${ANSI_ESC}2A`);
    this.#rowPosition--;
  }

  moveDown() {
    if (this.#isLastRow()) return;

    process.stdout.write(`${ANSI_ESC}2B`);
    this.#rowPosition++;
  }

  moveRight() {
    if (this.#isLastColumn()) return;

    if (this.#maxDigits === 1) {
      process.stdout.write(`${ANSI_ESC}5C`);
    } else {
      process.stdout.write(`${ANSI_ESC}6C`);
    }
    this.#colPosition++;
  }

  moveLeft() {
    if (this.#isFirstColumn()) return;

    if (this.#maxDigits === 1) {
      process.stdout.write(`${ANSI_ESC}5D`);
    } else {
      process.stdout.write(`${ANSI_ESC}6D`);
    }
    this.#colPosition--;
  }

  moveNext() {
    if (this.#isLastRow() && this.#isLastColumn()) return;

    if (this.#isLastColumn()) {
      this.moveDown();
      for (let i = 0; i < this.#gridWidth; i++) {
        this.moveLeft();
      }
      return;
    }

    this.moveRight();
  }

  moveCurrent() {
    this.setup();
    const rightAmount = this.#colPosition * (this.#maxDigits === 1 ? 5 : 6);
    const downAmount = this.#rowPosition * 2;
    if (rightAmount !== 0) {
      process.stdout.write(`${ANSI_ESC}${rightAmount}C`);
    }
    if (downAmount !== 0) {
      process.stdout.write(`${ANSI_ESC}${downAmount}B`);
    }
  }

  #moveCursor(absX, absY) {
    process.stdout.write(`${ANSI_ESC}${absY};${absX}H`);
  }

  #isFirstRow() {
    return this.#rowPosition === 0;
  }

  #isLastRow() {
    return this.#rowPosition === this.#gridWidth - 1;
  }

  #isFirstColumn() {
    return this.#colPosition === 0;
  }

  #isLastColumn() {
    return this.#colPosition === this.#gridWidth - 1;
  }
}
