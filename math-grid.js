import GridModel from "./grid-model.js";
import KeyInput from "./key-input.js";
import Formatter from "./formatter.js";
import Cursor from "./cursor.js";
import { KEY_EVENT } from "./constants.js";

export default class MathGrid {
  #gridModel;
  #keyInput;
  #cursor;

  constructor(gridWidth, maxDigits) {
    this.#gridModel = new GridModel(gridWidth, maxDigits);
    this.#keyInput = new KeyInput(maxDigits);
    this.#keyInput.addObserver(this);
    this.#cursor = new Cursor(gridWidth, maxDigits);
  }

  async start() {
    this.#gridModel.setup();
    this.#render(Formatter.format(this.#gridModel));
    this.#cursor.setup();
    await this.#keyInput.waitKeyInput();
  }

  updateFromKeyEvent(eventData) {
    switch (eventData.keyEvent) {
      case KEY_EVENT.CHANGE_VALUE:
        this.#gridModel.update(...this.#gridIndexFromCursorPosition(), eventData.value);
        this.#cellUpdate();
        break;
      case KEY_EVENT.EOT:
        if (!this.#gridModel.areAllCellsFilled()) return false;

        this.#gridModel.checkAnswers();
        this.#render(Formatter.formatResult(this.#gridModel));
        break;
      case KEY_EVENT.CR:
        this.#cursor.moveNext();
        this.#syncKeyInputBuffer();
        break;
      case KEY_EVENT.UP:
        this.#cursor.moveUp();
        this.#syncKeyInputBuffer();
        break;
      case KEY_EVENT.DOWN:
        this.#cursor.moveDown();
        this.#syncKeyInputBuffer();
        break;
      case KEY_EVENT.LEFT:
        this.#cursor.moveLeft();
        this.#syncKeyInputBuffer();
        break;
      case KEY_EVENT.RIGHT:
        this.#cursor.moveRight();
        this.#syncKeyInputBuffer();
        break;
    }

    return true;
  }

  #render(content) {
    console.clear();
    console.log(content);
  }

  #cellUpdate() {
    this.#cursor.moveCurrentCellHead();
    const [rowIndex, colIndex] = this.#gridIndexFromCursorPosition();
    process.stdout.write(Formatter.formatCell(this.#gridModel, rowIndex, colIndex));
    this.#cursor.moveCurrentCellTail();
  }

  #syncKeyInputBuffer() {
    const [rowIndex, colIndex] = this.#gridIndexFromCursorPosition();
    const value = this.#gridModel.getValue(rowIndex, colIndex);
    if (value !== null) {
      this.#keyInput.setBuffer(value.toString());
    }
  }

  #gridIndexFromCursorPosition() {
    const [cursorRowPosition, cursorColPosition] = this.#cursor.position();
    return [cursorRowPosition + 1, cursorColPosition + 1];
  }
}
