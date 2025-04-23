import { describe, it, expect } from "vitest";
//import GridModel from "../grid-model.js";
import Formatter from "../formatter.js";
import MockGridModel from "./mocks/mock-grid-model.js";

describe("format", () => {
  describe("初期表示（5 x 5 Grid 1-Digit）", () => {
    it("gridWidth, maxDigits に合わせた大きさの表が出力されること", () => {
      const mockGridModel = new MockGridModel(5, 1);
      mockGridModel.setup([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]);

      const expected = [
        "\x1b[36m----- Math Grid (5x5) - 1-Digit Numbers -----\x1b[0m",
        "",
        "-------------------------------",
        "|  + |  1 |  2 |  3 |  4 |  5 |",
        "-------------------------------",
        "|  1 |    |    |    |    |    |",
        "-------------------------------",
        "|  2 |    |    |    |    |    |",
        "-------------------------------",
        "|  3 |    |    |    |    |    |",
        "-------------------------------",
        "|  4 |    |    |    |    |    |",
        "-------------------------------",
        "|  5 |    |    |    |    |    |",
        "-------------------------------",
        "",
        "The following keys are available.",
        "  0-9   : Input numerical values.",
        " Enter  : Move the cursor to the next cell.",
        " Arrows : Move the cursor in the specified direction.",
        " BS/DEL : Erase one digit of the inputted number.",
        " Ctrl+D : Scoring (Only when all cells have been filled in).",
        " Ctrl+C : Quit the game.",
      ].join("\n");

      expect(Formatter.format(mockGridModel)).toBe(expected);
    });
  });

  describe("初期表示（5 x 5 Grid 2-Digit）", () => {
    it("gridWidth, maxDigits に合わせた大きさの表が出力されること", () => {
      const mockGridModel = new MockGridModel(5, 2);
      mockGridModel.setup([10, 20, 30, 40, 50], [10, 20, 30, 40, 50]);

      const expected = [
        "\x1b[36m----- Math Grid (5x5) - 2-Digit Numbers -----\x1b[0m",
        "",
        "-------------------------------------",
        "|   + |  10 |  20 |  30 |  40 |  50 |",
        "-------------------------------------",
        "|  10 |     |     |     |     |     |",
        "-------------------------------------",
        "|  20 |     |     |     |     |     |",
        "-------------------------------------",
        "|  30 |     |     |     |     |     |",
        "-------------------------------------",
        "|  40 |     |     |     |     |     |",
        "-------------------------------------",
        "|  50 |     |     |     |     |     |",
        "-------------------------------------",
        "",
        "The following keys are available.",
        "  0-9   : Input numerical values.",
        " Enter  : Move the cursor to the next cell.",
        " Arrows : Move the cursor in the specified direction.",
        " BS/DEL : Erase one digit of the inputted number.",
        " Ctrl+D : Scoring (Only when all cells have been filled in).",
        " Ctrl+C : Quit the game.",
      ].join("\n");

      expect(Formatter.format(mockGridModel)).toBe(expected);
    });
  });

  describe("初期表示（10 x 10 Grid 1-Digit）", () => {
    it("gridWidth, maxDigits に合わせた大きさの表が出力されること", () => {
      const mockGridModel = new MockGridModel(10, 1);
      mockGridModel.setup([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      const expected = [
        "\x1b[36m----- Math Grid (10x10) - 1-Digit Numbers -----\x1b[0m",
        "",
        "--------------------------------------------------------",
        "|  + |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 |",
        "--------------------------------------------------------",
        "|  1 |    |    |    |    |    |    |    |    |    |    |",
        "--------------------------------------------------------",
        "|  2 |    |    |    |    |    |    |    |    |    |    |",
        "--------------------------------------------------------",
        "|  3 |    |    |    |    |    |    |    |    |    |    |",
        "--------------------------------------------------------",
        "|  4 |    |    |    |    |    |    |    |    |    |    |",
        "--------------------------------------------------------",
        "|  5 |    |    |    |    |    |    |    |    |    |    |",
        "--------------------------------------------------------",
        "|  6 |    |    |    |    |    |    |    |    |    |    |",
        "--------------------------------------------------------",
        "|  7 |    |    |    |    |    |    |    |    |    |    |",
        "--------------------------------------------------------",
        "|  8 |    |    |    |    |    |    |    |    |    |    |",
        "--------------------------------------------------------",
        "|  9 |    |    |    |    |    |    |    |    |    |    |",
        "--------------------------------------------------------",
        "| 10 |    |    |    |    |    |    |    |    |    |    |",
        "--------------------------------------------------------",
        "",
        "The following keys are available.",
        "  0-9   : Input numerical values.",
        " Enter  : Move the cursor to the next cell.",
        " Arrows : Move the cursor in the specified direction.",
        " BS/DEL : Erase one digit of the inputted number.",
        " Ctrl+D : Scoring (Only when all cells have been filled in).",
        " Ctrl+C : Quit the game.",
      ].join("\n");

      expect(Formatter.format(mockGridModel)).toBe(expected);
    });
  });

  describe("初期表示（10 x 10 Grid 2-Digit）", () => {
    it("gridWidth, maxDigits に合わせた大きさの表が出力されること", () => {
      const mockGridModel = new MockGridModel(10, 2);
      mockGridModel.setup(
        [10, 20, 30, 40, 50, 60, 70, 80, 90, 99],
        [10, 20, 30, 40, 50, 60, 70, 80, 90, 99],
      );

      const expected = [
        "\x1b[36m----- Math Grid (10x10) - 2-Digit Numbers -----\x1b[0m",
        "",
        "-------------------------------------------------------------------",
        "|   + |  10 |  20 |  30 |  40 |  50 |  60 |  70 |  80 |  90 |  99 |",
        "-------------------------------------------------------------------",
        "|  10 |     |     |     |     |     |     |     |     |     |     |",
        "-------------------------------------------------------------------",
        "|  20 |     |     |     |     |     |     |     |     |     |     |",
        "-------------------------------------------------------------------",
        "|  30 |     |     |     |     |     |     |     |     |     |     |",
        "-------------------------------------------------------------------",
        "|  40 |     |     |     |     |     |     |     |     |     |     |",
        "-------------------------------------------------------------------",
        "|  50 |     |     |     |     |     |     |     |     |     |     |",
        "-------------------------------------------------------------------",
        "|  60 |     |     |     |     |     |     |     |     |     |     |",
        "-------------------------------------------------------------------",
        "|  70 |     |     |     |     |     |     |     |     |     |     |",
        "-------------------------------------------------------------------",
        "|  80 |     |     |     |     |     |     |     |     |     |     |",
        "-------------------------------------------------------------------",
        "|  90 |     |     |     |     |     |     |     |     |     |     |",
        "-------------------------------------------------------------------",
        "|  99 |     |     |     |     |     |     |     |     |     |     |",
        "-------------------------------------------------------------------",
        "",
        "The following keys are available.",
        "  0-9   : Input numerical values.",
        " Enter  : Move the cursor to the next cell.",
        " Arrows : Move the cursor in the specified direction.",
        " BS/DEL : Erase one digit of the inputted number.",
        " Ctrl+D : Scoring (Only when all cells have been filled in).",
        " Ctrl+C : Quit the game.",
      ].join("\n");

      expect(Formatter.format(mockGridModel)).toBe(expected);
    });
  });

  describe("結果表示（不正解のセルあり）", () => {
    it("不正解のセルが色付きで出力されること", () => {
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

      const expected = [
        "\x1b[36m----- Math Grid (5x5) - 1-Digit Numbers -----\x1b[0m",
        "",
        "-------------------------------",
        "|  + |  1 |  2 |  3 |  4 |  5 |",
        "-------------------------------",
        "|  1 |  2 |  3 |  4 |  5 | \x1b[41m99\x1b[0m |",
        "-------------------------------",
        "|  2 |  3 |  4 |  5 |  6 |  7 |",
        "-------------------------------",
        "|  3 |  4 |  5 |  6 |  7 |  8 |",
        "-------------------------------",
        "|  4 | \x1b[41m99\x1b[0m |  6 |  7 |  8 |  9 |",
        "-------------------------------",
        "|  5 |  6 |  7 | \x1b[41m99\x1b[0m |  9 | 10 |",
        "-------------------------------",
        "",
        "Correct : 22 / 25",
        "",
        "Press any key to return the menu.",
      ].join("\n");

      expect(Formatter.format(mockGridModel, true)).toBe(expected);
    });
  });

  describe("結果表示（全てのセルで正解）", () => {
    it("スコアの隣に(Perfect!!!)が追加で出力されること", () => {
      const mockGridModel = new MockGridModel(10, 1);
      const testData = [
        ["+", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      ];
      const rowNumbersForTest = testData[0].slice(1); // [1,2,3,4,5,6,7,8,9,10]
      const colNumbersForTest = testData.map((row) => row[0]).slice(1); // [1,2,3,4,5,6,7,8,9,10]
      mockGridModel.setup(rowNumbersForTest, colNumbersForTest);
      for (let rowIndex = 1; rowIndex <= mockGridModel.gridWidth; rowIndex++) {
        for (let colIndex = 1; colIndex <= mockGridModel.gridWidth; colIndex++) {
          mockGridModel.update(rowIndex, colIndex, testData[rowIndex][colIndex]);
        }
      }
      mockGridModel.checkAnswers();

      const expected = [
        "\x1b[36m----- Math Grid (10x10) - 1-Digit Numbers -----\x1b[0m",
        "",
        "--------------------------------------------------------",
        "|  + |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 |",
        "--------------------------------------------------------",
        "|  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 |",
        "--------------------------------------------------------",
        "|  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 |",
        "--------------------------------------------------------",
        "|  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 | 13 |",
        "--------------------------------------------------------",
        "|  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 | 13 | 14 |",
        "--------------------------------------------------------",
        "|  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15 |",
        "--------------------------------------------------------",
        "|  6 |  7 |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |",
        "--------------------------------------------------------",
        "|  7 |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |",
        "--------------------------------------------------------",
        "|  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 |",
        "--------------------------------------------------------",
        "|  9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 |",
        "--------------------------------------------------------",
        "| 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |",
        "--------------------------------------------------------",
        "",
        "Correct : 100 / 100 (Perfect!!)",
        "",
        "Press any key to return the menu.",
      ].join("\n");

      expect(Formatter.format(mockGridModel, true)).toBe(expected);
    });
  });
});
