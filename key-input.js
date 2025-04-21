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

  async waitKeyInput() {
    return new Promise((resolve) => {
      this.#startRawInput();
      process.stdin.on("data", (key) => {
        const keyCode = key.charCodeAt(0);

        if (keyCode === KEY_CODE.ETX || keyCode === KEY_CODE.EOT) {
          this.#stopRawInput();
          this.#notify({ keyCode: keyCode });
          resolve();
          return;
        }

        if (KEY_CODE.ZERO <= keyCode && keyCode <= KEY_CODE.NINE) {
          this.#appendToBuffer(key);
          this.#notify({ value: this.#buffer });
          return;
        }

        if (keyCode === KEY_CODE.BS || keyCode === KEY_CODE.DEL) {
          this.#removeFromBuffer();
          this.#notify({ keyCode: keyCode });
          return;
        }

        if (keyCode === KEY_CODE.CR) {
          this.#notify({ keyCode: keyCode });
          this.#clearBuffer();
          return;
        }

        if (this.#isArrowKey(key)) {
          this.#notify({ ansi: key });
          this.#clearBuffer();
        }
      });
    });
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
    if (this.#buffer.length < this.#maxDigits) {
      this.#buffer += key;
    }
  }

  #removeFromBuffer() {
    this.#buffer = this.#buffer.slice(0, -1);
  }

  #clearBuffer() {
    this.#buffer = "";
  }
}
