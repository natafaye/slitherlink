import { DIRECTIONS, OPPOSITE } from "../directions"
import { findEndOfLine } from "../findEndOfLine"
import { getById } from "../getById"
import { getLinesWithFillValue } from "../getLinesWithFillValue"
import { StepGetter } from "../types"
import { isEverySquareSatisfied } from "./isSolved"

export const getEarlyCloseStep: StepGetter = (square, lines, squares) => {
  const unmarkedSquareLines = getLinesWithFillValue(null, square.lines, lines)

  for (const lineId of unmarkedSquareLines) {
    const line = getById(lineId, lines)
    const [direction1, direction2] = DIRECTIONS.filter((d) => line.lines[d]?.length)

    // Get the filled lines on either side of this unmarked line
    const direction1Lines = getLinesWithFillValue(true, line.lines[direction1], lines)
    const direction2Lines = getLinesWithFillValue(true, line.lines[direction2], lines)
    // If there's not exactly one line on either side, then move on, this doesn't apply
    if (direction1Lines.length !== 1) continue
    if (direction2Lines.length !== 1) continue
    // Get the lines that could be connected by filling this unmarked line
    const [line1] = direction1Lines
    const [line2] = direction2Lines

    // If line2 is connected to line1 and adding a line between them will close a loop
    const line1Direction = OPPOSITE[DIRECTIONS.find((d) => getById(line1, lines).lines[d]?.includes(lineId))!]
    const [endOfLine1, length] = findEndOfLine(line1, line1Direction, lines)
    if (endOfLine1 === line2) {
        const allFilledLines = lines.filter(l => l.filled)
        // If this would end the game correctly
        if(length === allFilledLines.length && isEverySquareSatisfied(lines, squares)) {
            // Finish the puzzle
            return [[lineId], true]
        } else {
            // Else don't finish the puzzle early
            return [[lineId], false]
        }
    } 
  }

  return null
}

