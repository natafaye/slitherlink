import { v4 as uuid } from "uuid"
import { getById } from "../getById"
import { NON_OPPOSITE, OPPOSITE } from "../directions"
import type { Direction, Line, Square } from "../types"

export const connectNewLine = (
  direction: Direction,
  square: Square,
  start: [number, number],
  end: [number, number],
  lines: Line[],
  squares: Square[]
) => {
  const line: Line = {
    id: uuid(),
    filled: null,
    squares: [null, null, null, null],
    lines: [],
    startLocation: start,
    endLocation: end,
  }
  lines.push(line)

  // Connect with square
  square.lines[direction] = line.id
  line.squares[OPPOSITE[direction]] = square.id

  // Connect with other lines on both ends
  NON_OPPOSITE[direction].forEach((checkDirection) => {
    line.lines[checkDirection] = []
    // id of line to add, and back direction to connect original line to line to add
    const linesToAdd: [string | null, Direction][] = [
      [square.lines[checkDirection], direction],
      [
        line.squares[direction] &&
          getById(line.squares[direction], squares).lines[checkDirection],
        OPPOSITE[direction],
      ],
      [
        square.squares[checkDirection] &&
          getById(square.squares[checkDirection], squares).lines[direction],
        checkDirection,
      ],
    ]
    // Go through each one and connect in both directions
    linesToAdd.forEach(([lineToAddId, backDirection]) => {
      if (!lineToAddId) return
      line.lines[checkDirection].push(lineToAddId)
      getById(lineToAddId, lines).lines[backDirection].push(line.id)
    })
  })
}
