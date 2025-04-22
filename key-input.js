import { KEY_CODE, ANSI_DIRECTION, KEY_EVENT } from "./constants.js";

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
          const result = this.#notify({ keyEvent: KEY_EVENT.EOT });
          if (result) {
            waitingForAnyKey = true;
          }
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
            this.#notify({ keyEvent: KEY_EVENT.CHANGE_VALUE, value: parseInt(this.#buffer) });
          }
          return;
        }

        if (keyCode === KEY_CODE.BS || keyCode === KEY_CODE.DEL) {
          if (this.#removeFromBuffer()) {
            this.#notify({
              keyEvent: KEY_EVENT.CHANGE_VALUE,
              value: this.#buffer === "" ? null : parseInt(this.#buffer),
            });
          }
          return;
        }

        if (keyCode === KEY_CODE.CR) {
          this.#clearBuffer();
          this.#notify({ keyEvent: KEY_EVENT.CR });
          return;
        }

        if (this.#isArrowKey(key)) {
          this.#clearBuffer();
          this.#notify({ keyEvent: this.#convertToKeyEvent(key) });
        }
      });
    });
  }

  #notify(eventData) {
    const results = [];
    for (const observer of this.#observers) {
      const result = observer.update(eventData);
      results.push(result);
    }

    return !results.includes(false);
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
      case ANSI_DIRECTION.UP:
      case ANSI_DIRECTION.DOWN:
      case ANSI_DIRECTION.LEFT:
      case ANSI_DIRECTION.RIGHT:
        return true;
      default:
        return false;
    }
  }

  #convertToKeyEvent(key) {
    switch (key) {
      case ANSI_DIRECTION.UP:
        return KEY_EVENT.UP;
      case ANSI_DIRECTION.DOWN:
        return KEY_EVENT.DOWN;
      case ANSI_DIRECTION.LEFT:
        return KEY_EVENT.LEFT;
      case ANSI_DIRECTION.RIGHT:
        return KEY_EVENT.RIGHT;
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
