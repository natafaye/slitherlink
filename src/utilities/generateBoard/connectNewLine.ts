import { v4 as uuid } from "uuid"
import { OPPOSITE } from "../directions"
import type { Direction, Line, Square } from "../types"

/**
 * Creates a line and connects that line to a particular square
 * and that particular square to the line
 * 
 * @param direction The direction this line is to the square
 * @param square The square this line needs to be connected to
 * @param start The start location of the line
 * @param end The end location of the line
 * @param lines All the lines in the board that have been created so far
 */
export const connectNewLine = (
  direction: Direction,
  square: Square,
  start: [number, number],
  end: [number, number],
  lines: Line[],
) => {
  // Make line
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
  // NON_OPPOSITE[direction].forEach((checkDirection) => {
  //   line.lines[checkDirection] = []
  //   // id of line to add, and back direction to connect original line to line to add
  //   const linesToAdd: [string | null, Direction][] = [
  //     [square.lines[checkDirection], direction],
  //     [
  //       line.squares[direction] &&
  //         getById(line.squares[direction], squares).lines[checkDirection],
  //       OPPOSITE[direction],
  //     ],
  //     [
  //       square.squares[checkDirection] &&
  //         getById(square.squares[checkDirection], squares).lines[direction],
  //       OPPOSITE[checkDirection],
  //     ],
  //   ]
  //   // Go through each one and connect in both directions
  //   linesToAdd.forEach(([lineToAddId, backDirection]) => {
  //     if (!lineToAddId) return
  //     line.lines[checkDirection].push(lineToAddId)
  //     getById(lineToAddId, lines).lines[backDirection].push(line.id)
  //   })
  //})
}
