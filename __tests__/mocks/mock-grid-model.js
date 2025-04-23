import GridModel from "../../grid-model.js";

export default class MockGridModel extends GridModel {
  setup(rowNumbersForTest, colNumbersForTest) {
    super.setup();

    for (let index = 1; index <= this.gridWidth; index++) {
      this.grid[0][index] = rowNumbersForTest[index - 1];
      this.grid[index][0] = colNumbersForTest[index - 1];
    }
  }
}
