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

        if (waitingForAnyKey || keyCode === KEY_CODE.ETX) {
          this.#stopRawInput();
          resolve();
          return;
        }

        if (keyCode === KEY_CODE.EOT) {
          return this.#handleEOTKey(
            function () {
              waitingForAnyKey = true;
            }.bind(this),
          );
        }

        if (KEY_CODE.ZERO <= keyCode && keyCode <= KEY_CODE.NINE) {
          return this.#handleNumberKey(key, keyCode);
        }

        if (keyCode === KEY_CODE.BS || keyCode === KEY_CODE.DEL) {
          return this.#handleBackspaceKey();
        }

        if (keyCode === KEY_CODE.CR) {
          return this.#handleEnterKey();
        }

        if (this.#isArrowKey(key)) {
          return this.#handleArrowKey(key);
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

  #handleEOTKey(setWaitingFlagCallback) {
    if (this.#notify({ keyEvent: KEY_EVENT.EOT })) {
      setWaitingFlagCallback();
    }
  }

  #handleNumberKey(key, keyCode) {
    if (this.#buffer === "" && keyCode === KEY_CODE.ZERO) return;

    if (this.#appendToBuffer(key)) {
      this.#notify({ keyEvent: KEY_EVENT.CHANGE_VALUE, value: parseInt(this.#buffer) });
    }
  }

  #handleBackspaceKey() {
    if (!this.#removeFromBuffer()) return;

    this.#notify({
      keyEvent: KEY_EVENT.CHANGE_VALUE,
      value: this.#buffer === "" ? null : parseInt(this.#buffer),
    });
  }

  #handleEnterKey() {
    this.#clearBuffer();
    this.#notify({ keyEvent: KEY_EVENT.CR });
  }

  #handleArrowKey(key) {
    this.#clearBuffer();
    this.#notify({ keyEvent: this.#convertToKeyEvent(key) });
  }

  #notify(eventData) {
    const results = [];
    for (const observer of this.#observers) {
      const result = observer.updateFromKeyEvent(eventData);
      results.push(result);
    }

    return !results.includes(false);
  }

  #isArrowKey(key) {
    const arrowKeys = [
      ANSI_DIRECTION.UP,
      ANSI_DIRECTION.DOWN,
      ANSI_DIRECTION.LEFT,
      ANSI_DIRECTION.RIGHT,
    ];
    return arrowKeys.includes(key);
  }

  #convertToKeyEvent(key) {
    const keyMap = {
      [ANSI_DIRECTION.UP]: KEY_EVENT.UP,
      [ANSI_DIRECTION.DOWN]: KEY_EVENT.DOWN,
      [ANSI_DIRECTION.LEFT]: KEY_EVENT.LEFT,
      [ANSI_DIRECTION.RIGHT]: KEY_EVENT.RIGHT,
    };
    return keyMap[key];
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
