import KeyInput from "./key-input.js";

export default class MathGrid {
  #mode;
  #maxDigits;
  #keyInput;

  constructor(mode, maxDigits) {
    this.#mode = mode;
    this.#maxDigits = maxDigits;
    this.#keyInput = new KeyInput();
  }

  async start() {
    await this.#keyInput.waitKeyInput();
  }
}
