import { v4 as uuid } from "uuid"
import { connectNewLine } from "./connectNewLine"
import { connectSquares } from "./connectSquares"
import { BOTTOM, LEFT, RIGHT, TOP } from "../directions"
import type { Line, Square } from "../types"

// temporary board hack
const board1 = [
  [3, null, 3, 1, null],
  [null, null, 3, null, null],
  [null, 1, 2, 0, 3],
  [3, null, null, 2, 3],
  [3, 2, 2, 2, null],
]

export const generateBoard = (rows: number, columns: number) => {
  const squares: Square[] = []
  const lines: Line[] = []

  // Generate every square by row and column
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const square: Square = {
        id: uuid(),
        number: board1[i][j],
        lines: [],
        squares: [null, null, null, null],
        centerLocation: [j + 0.5, i + 0.5],
      }

      // Connect squares and lines with two-way linking by id
      i > 0
        ? connectSquares(TOP, square, squares[(i - 1) * columns + j], lines)
        : connectNewLine(TOP, square, [j, i], [j + 1, i], lines, squares)
      j > 0
        ? connectSquares(LEFT, square, squares[squares.length - 1], lines)
        : connectNewLine(LEFT, square, [j, i], [j, i + 1], lines, squares)
      connectNewLine(RIGHT, square, [j + 1, i], [j + 1, i + 1], lines, squares)
      connectNewLine(BOTTOM, square, [j, i + 1], [j + 1, i + 1], lines, squares)

      squares.push(square)
    }
  }

  return { squares, lines }
}
