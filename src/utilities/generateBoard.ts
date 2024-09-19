import {v4 as uuid} from "uuid"
import { BOTTOM, Direction, LEFT, Line, OPPOSITE, RIGHT, Square, TOP } from "./shared"

export const generateBoard = (rows: number, columns: number) => {
  // Data
  const squares: Square[] = []
  const lines: Line[] = []

  // Getter functions
  const getLine = (id: string) => lines.find(l => l.id === id)
  const getSquare = (id: string) => squares.find(s => s.id === id)

  // Connect squares
  const connectSquares = (direction: Direction, square1: Square, square2: Square) => {
    square1.squares[direction] = square2
    square2.squares[OPPOSITE[direction]] = square1
    const line = square1.squares[direction].lines[OPPOSITE[direction]]
    square1.lines[direction] = line
    line.squares[OPPOSITE[direction]] = square1
  }

  // Connect new line
  const connectNewLine = (direction: Direction, square: Square, start: [number, number], end: [number, number]) => {
    const line = {
      id: uuid(),
      filled: null,
      squares: [null, null, null, null],
      lines: [],
      startLocation: start,
      endLocation: end,
    }
    lines.push(line)
    square.lines[direction] = line
    square.lines[direction].squares[OPPOSITE[direction]] = square
  }

  // Generate every square
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const square: Square = {
        id: uuid(),
        number: board1[i][j],
        lines: [],
        squares: [null, null, null, null],
        centerLocation: [j + 0.5, i + 0.5],
      }

      // Connect two-way linking of squares and lines
      connectNewLine(RIGHT, square, [j + 1, i], [j + 1, i + 1])
      connectNewLine(BOTTOM, square, [j, i + 1], [j + 1, i + 1])
      i > 0 ?
        connectSquares(TOP, square, squares[(i - 1) * columns + j]) :
        connectNewLine(TOP, square, [j, i], [j + 1, i])
      j > 0 ?
        connectSquares(LEFT, square, squares[squares.length - 1]) :
        connectNewLine(LEFT, square, [j, i], [j, i + 1])

      squares.push(square)
    }
  }
  return { squares, lines }
}

const board1 = [
  [3, null, 3, 1, null],
  [null, null, 3, null, null],
  [null, 1, 2, 0, 3],
  [3, null, null, 2, 3],
  [3, 2, 2, 2, null],
]
