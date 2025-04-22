export const REQUIRED_TERMINAL_SIZE = {
  HEIGHT: 34,
  WIDTH: 67,
};

export const MENU_ID = {
  GRID_5X5: 1,
  GRID_10X10: 2,
  QUIT: 3,
};

export const DIGIT_ID = {
  ONE: 1,
  TWO: 2,
};

export const CELL_HEIGHT = 2;

export const CELL_WIDTH = {
  ONE_DIGIT: 5,
  TWO_DIGITS: 6,
};

export const KEY_CODE = {
  ETX: 0x03,
  EOT: 0x04,
  BS: 0x08,
  CR: 0x0d,
  ZERO: 0x30,
  NINE: 0x39,
  DEL: 0x7f,
};

export const ANSI_ESC = "\x1b[";

export const ANSI_DIRECTION = {
  UP: `${ANSI_ESC}A`,
  DOWN: `${ANSI_ESC}B`,
  RIGHT: `${ANSI_ESC}C`,
  LEFT: `${ANSI_ESC}D`,
};

export const ANSI_BASIC_COLOR = {
  FORE_CYAN: `${ANSI_ESC}36m`,
  BACK_RED: `${ANSI_ESC}41m`,
  RESET: `${ANSI_ESC}0m`,
};
