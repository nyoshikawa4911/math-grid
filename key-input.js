import { KEY_CODE, ANSI } from "./constants.js";

export default class KeyInput {
  #observers;
  #maxDigits;
  #buffer;

  constructor(maxDigits) {
    this.#observers = [];
    this.#maxDigits = maxDigits;
    this.#buffer = "";
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  setBuffer(numStr) {
    this.#buffer = numStr;
  }

  async waitKeyInput() {
    return new Promise((resolve) => {
      let waitingForAnyKey = false;
      this.#startRawInput();
      process.stdin.on("data", (key) => {
        const keyCode = key.charCodeAt(0);

        if (waitingForAnyKey) {
          this.#stopRawInput();
          resolve();
          return;
        }

        if (keyCode === KEY_CODE.EOT) {
          this.#notify({ keyCode: keyCode });
          waitingForAnyKey = true;
          return;
        }

        if (keyCode === KEY_CODE.ETX) {
          this.#stopRawInput();
          resolve();
          return;
        }

        if (KEY_CODE.ZERO <= keyCode && keyCode <= KEY_CODE.NINE) {
          if (this.#buffer === "" && keyCode === KEY_CODE.ZERO) return;

          if (this.#appendToBuffer(key)) {
            this.#notify({ value: parseInt(this.#buffer) });
          }
          return;
        }

        if (keyCode === KEY_CODE.BS || keyCode === KEY_CODE.DEL) {
          if (this.#removeFromBuffer()) {
            this.#notify({ value: this.#buffer === "" ? NaN : parseInt(this.#buffer) });
          }
          return;
        }

        if (keyCode === KEY_CODE.CR) {
          this.#clearBuffer();
          this.#notify({ keyCode: keyCode });
          return;
        }

        if (this.#isArrowKey(key)) {
          this.#clearBuffer();
          this.#notify({ ansi: key });
        }
      });
    });
  }

  #notify(rawData) {
    const eventData = {
      keyCode: rawData.keyCode ?? null,
      ansi: rawData.ansi ?? null,
      value: rawData.value ?? null,
    };

    for (const observer of this.#observers) {
      observer.update(eventData);
    }
  }

  #startRawInput() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
  }

  #stopRawInput() {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdin.removeAllListeners("data");
  }

  #isArrowKey(key) {
    switch (key) {
      case ANSI.UP:
      case ANSI.DOWN:
      case ANSI.LEFT:
      case ANSI.RIGHT:
        return true;
      default:
        return false;
    }
  }

  #appendToBuffer(key) {
    if (this.#buffer.length > this.#maxDigits) return false;

    this.#buffer += key;
    return true;
  }

  #removeFromBuffer() {
    if (this.#buffer === "") return false;

    this.#buffer = this.#buffer.slice(0, -1);
    return true;
  }

  #clearBuffer() {
    this.#buffer = "";
  }
}
