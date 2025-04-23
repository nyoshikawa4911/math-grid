import { describe, it, expect } from "vitest";
import GridModel from "../grid-model.js";
import MockGridModel from "./mocks/mock-grid-model.js";

describe("setup", () => {
  it("grid の行数・列数が gridWidth + 1 であること", () => {
    const gridModel = new GridModel(10, 1);
    gridModel.setup();

    expect(gridModel.grid.length).toBe(11);
    expect(gridModel.grid[0].length).toBe(11);
  });

  it("ユーザーが入力するセルが全て null であること", () => {
    const gridModel = new GridModel(10, 1);
    gridModel.setup();

    const inputCells = [];
    for (let rowIndex = 1; rowIndex <= gridModel.gridWidth; rowIndex++) {
      for (let colIndex = 1; colIndex <= gridModel.gridWidth; colIndex++) {
        inputCells.push(gridModel.getValue(rowIndex, colIndex));
      }
    }

    expect(inputCells.every((cell) => cell === null)).toBe(true);
  });

  it("ヘッダー行・ヘッダー列に1以上、かつ maxDigits 桁以下の数値が入っていること", () => {
    const gridModel = new GridModel(10, 2);
    gridModel.setup();

    const headerCells = [];
    for (let rowIndex = 0; rowIndex <= gridModel.gridWidth; rowIndex++) {
      if (rowIndex === 0) {
        headerCells.push(...gridModel.grid[rowIndex].slice(1));
      } else {
        headerCells.push(gridModel.grid[rowIndex][0]);
      }
    }

    expect(headerCells.every((cell) => 1 <= cell && cell <= 99)).toBe(true);
  });
});

describe("areAllCellsFilled", () => {
  it("ユーザーが入力するセルが１つでも null であれば、false を返すこと", () => {
    const gridModel = new GridModel(10, 1);
    gridModel.setup();

    const [unfilledRowIndex, unfilledColIndex] = [5, 8];
    for (let rowIndex = 1; rowIndex <= gridModel.gridWidth; rowIndex++) {
      for (let colIndex = 1; colIndex <= gridModel.gridWidth; colIndex++) {
        if (rowIndex === unfilledRowIndex && colIndex === unfilledColIndex) continue;
        gridModel.update(rowIndex, colIndex, 1);
      }
    }

    expect(gridModel.areAllCellsFilled()).toBe(false);
  });

  it("ユーザーが入力するセルが全て入力されていれば（ null でなければ） true を返すこと", () => {
    const gridModel = new GridModel(10, 1);
    gridModel.setup();

    for (let rowIndex = 1; rowIndex <= gridModel.gridWidth; rowIndex++) {
      for (let colIndex = 1; colIndex <= gridModel.gridWidth; colIndex++) {
        gridModel.update(rowIndex, colIndex, 1);
      }
    }

    expect(gridModel.areAllCellsFilled()).toBe(true);
  });
});

describe("checkAnswers", () => {
  it("perfectScoreは、ユーザーが入力するセル数（gridWidthの2乗）であること", () => {
    const gridWidth = 10;
    const gridModel = new GridModel(gridWidth, 1);
    gridModel.setup();
    gridModel.checkAnswers();

    expect(gridModel.perfectScore).toBe(gridWidth ** 2);
  });

  it("解答が誤っているセルの { rowIndex:, colIndex: } が mistakes と一致すること", () => {
    const mockGridModel = new MockGridModel(5, 1);
    const testData = [
      ["+", 1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 99], // 「99」は誤った解答
      [2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8],
      [4, 99, 6, 7, 8, 9], // 「99」は誤った解答
      [5, 6, 7, 99, 9, 10], // 「99」は誤った解答
    ];
    const rowNumbersForTest = testData[0].slice(1); // [1,2,3,4,5]
    const colNumbersForTest = testData.map((row) => row[0]).slice(1); // [1,2,3,4,5]
    mockGridModel.setup(rowNumbersForTest, colNumbersForTest);
    for (let rowIndex = 1; rowIndex <= mockGridModel.gridWidth; rowIndex++) {
      for (let colIndex = 1; colIndex <= mockGridModel.gridWidth; colIndex++) {
        mockGridModel.update(rowIndex, colIndex, testData[rowIndex][colIndex]);
      }
    }
    mockGridModel.checkAnswers();

    const expectedMistakes = [
      { rowIndex: 1, colIndex: 5 },
      { rowIndex: 4, colIndex: 1 },
      { rowIndex: 5, colIndex: 3 },
    ];

    expect(mockGridModel.mistakes).toEqual(expectedMistakes);
  });

  it("解答が正しいセルの数と、score が一致すること", () => {
    const mockGridModel = new MockGridModel(5, 1);
    const testData = [
      ["+", 1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 99], // 「99」は誤った解答
      [2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8],
      [4, 99, 6, 7, 8, 9], // 「99」は誤った解答
      [5, 6, 7, 99, 9, 10], // 「99」は誤った解答
    ];
    const rowNumbersForTest = testData[0].slice(1); // [1,2,3,4,5]
    const colNumbersForTest = testData.map((row) => row[0]).slice(1); // [1,2,3,4,5]
    mockGridModel.setup(rowNumbersForTest, colNumbersForTest);
    for (let rowIndex = 1; rowIndex <= mockGridModel.gridWidth; rowIndex++) {
      for (let colIndex = 1; colIndex <= mockGridModel.gridWidth; colIndex++) {
        mockGridModel.update(rowIndex, colIndex, testData[rowIndex][colIndex]);
      }
    }
    mockGridModel.checkAnswers();

    expect(mockGridModel.score).toBe(22);
  });
});
