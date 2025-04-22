import GridModel from "./grid-model.js";
import KeyInput from "./key-input.js";
import Formatter from "./formatter.js";
import Cursor from "./cursor.js";
import { KEY_CODE, ANSI } from "./constants.js";

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
    console.clear();
    console.log(Formatter.format(this.#gridModel));
    this.#cursor.setup();
    await this.#keyInput.waitKeyInput();
  }

  update(eventData) {
    if (eventData.value !== null) {
      this.#gridModel.update(...this.#cursor.position(), eventData.value);
      this.#cellUpdate();
    }

    if (eventData.keyCode) {
      switch (eventData.keyCode) {
        case KEY_CODE.ETX:
          // todo : 終了
          break;
        case KEY_CODE.EOT:
          this.#gridModel.checkAnswers();
          console.clear();
          console.log(Formatter.formatResult(this.#gridModel));
          break;
        case KEY_CODE.CR:
          this.#cursor.moveNext();
          this.#syncBuffer();
          break;
      }
    }

    if (eventData.ansi) {
      switch (eventData.ansi) {
        case ANSI.UP:
          this.#cursor.moveUp();
          break;
        case ANSI.DOWN:
          this.#cursor.moveDown();
          break;
        case ANSI.LEFT:
          this.#cursor.moveLeft();
          break;
        case ANSI.RIGHT:
          this.#cursor.moveRight();
          break;
        default:
          return;
      }
      this.#syncBuffer();
    }
  }

  #cellUpdate() {
    this.#cursor.moveCellHead();
    process.stdout.write(Formatter.formatCell(this.#gridModel, ...this.#cursor.position()));
    this.#cursor.moveCurrent();
  }

  #syncBuffer() {
    const value = this.#gridModel.getValue(...this.#cursor.position());
    if (value !== null) {
      this.#keyInput.setBuffer(value.toString());
    }
  }
}
