import GridModel from "./grid-model.js";
import KeyInput from "./key-input.js";

export default class MathGrid {
  #gridWidth;
  #maxDigits;
  #gridModel;
  #keyInput;

  constructor(gridWidth, maxDigits) {
    this.#gridWidth = gridWidth;
    this.#maxDigits = maxDigits;
    this.#gridModel = new GridModel(gridWidth, maxDigits);
    this.#keyInput = new KeyInput();
  }

  async start() {
    this.#gridModel.setup();
    await this.#keyInput.waitKeyInput();
  }
}
