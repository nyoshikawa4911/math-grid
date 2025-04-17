export default class KeyInput {
  async waitKeyInput() {
    return new Promise((resolve) => {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding("utf8");
      process.stdin.on("data", (key) => {
        if (key === "\u0003") {
          resolve();
        }

        // TODO
        // キー入力の後始末
        // 数値、矢印、backspace、deleteの入力
      });
    });
  }
}
