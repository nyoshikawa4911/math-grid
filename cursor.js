import { CELL_HEIGHT, CELL_WIDTH, ANSI_ESC } from "./constants.js";

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
    const initialCoordinate = this.#initialCoordinate();
    this.#ansiCursorMoveAbs(initialCoordinate.x, initialCoordinate.y);
  }

  position() {
    return [this.#rowPosition, this.#colPosition];
  }

  moveUp() {
    if (this.#isFirstRow()) return;

    this.#ansiCursorMoveUp(CELL_HEIGHT);
    this.#rowPosition--;
  }

  moveDown() {
    if (this.#isLastRow()) return;

    this.#ansiCursorMoveDown(CELL_HEIGHT);
    this.#rowPosition++;
  }

  moveRight() {
    if (this.#isLastColumn()) return;

    const size = this.#maxDigits === 1 ? CELL_WIDTH.ONE_DIGIT : CELL_WIDTH.TWO_DIGITS;
    this.#ansiCursorMoveRight(size);
    this.#colPosition++;
  }

  moveLeft() {
    if (this.#isFirstColumn()) return;

    const size = this.#maxDigits === 1 ? CELL_WIDTH.ONE_DIGIT : CELL_WIDTH.TWO_DIGITS;
    this.#ansiCursorMoveLeft(size);
    this.#colPosition--;
  }

  moveNext() {
    if (this.#isLastRow() && this.#isLastColumn()) return;

    if (!this.#isLastColumn()) {
      this.moveRight();
      return;
    }

    this.#rowPosition++;
    this.#colPosition = 0;
    this.#moveCurrent();
  }

  moveCurrentCellHead() {
    this.#moveCurrent();
    this.#ansiCursorMoveLeft(this.#maxDigits);
  }

  moveCurrentCellTail() {
    this.#moveCurrent();
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

  #initialCoordinate() {
    if (this.#maxDigits === 1) {
      return { x: 9, y: 6 };
    } else {
      return { x: 11, y: 6 };
    }
  }

  #moveCurrent() {
    const initialCoordinate = this.#initialCoordinate();
    const cellWidth = this.#maxDigits === 1 ? CELL_WIDTH.ONE_DIGIT : CELL_WIDTH.TWO_DIGITS;
    const coordinateX = initialCoordinate.x + cellWidth * this.#colPosition;
    const coordinateY = initialCoordinate.y + CELL_HEIGHT * this.#rowPosition;
    this.#ansiCursorMoveAbs(coordinateX, coordinateY);
  }

  #ansiCursorMoveAbs(absX, absY) {
    process.stdout.write(`${ANSI_ESC}${absY};${absX}H`);
  }

  #ansiCursorMoveUp(size) {
    process.stdout.write(`${ANSI_ESC}${size}A`);
  }

  #ansiCursorMoveDown(size) {
    process.stdout.write(`${ANSI_ESC}${size}B`);
  }

  #ansiCursorMoveRight(size) {
    process.stdout.write(`${ANSI_ESC}${size}C`);
  }

  #ansiCursorMoveLeft(size) {
    process.stdout.write(`${ANSI_ESC}${size}D`);
  }
}
