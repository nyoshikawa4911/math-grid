import KeyInput from "./key-input.js";

export default class MathGrid {
  #gridWidth;
  #maxDigits;
  #keyInput;

  constructor(gridWidth, maxDigits) {
    this.#gridWidth = gridWidth;
    this.#maxDigits = maxDigits;
    this.#keyInput = new KeyInput();
  }

  async start() {
    await this.#keyInput.waitKeyInput();
  }
}
