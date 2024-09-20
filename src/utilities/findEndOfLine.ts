import { DIRECTIONS, OPPOSITE } from "./directions"
import { getById } from "./getById"
import { getLinesWithFillValue } from "./getLinesWithFillValue"
import { Direction, Line } from "./types"

/**
 * Finds the end of this line (looking only at filled lines)
 * and the length of this line
 *
 * If it's a complete loop, it will return the original line and the length of the loop
 *
 * You can tell the difference between a loop and a one-long line by checking the length of the line
 *
 * @param lineId The line to find the end of
 * @param direction The direction to look for the end in
 * @param lines All the lines on the board
 * @returns [endOfLineId, lengthOfLine] - the end of the line (or lineId if it's a loop) and the length;
 * lengthOfLine will be -1 if there is a split in the line (which is invalid line placement)
 */
export const findEndOfLine = (lineId: string, direction: Direction, lines: Line[]) =>
  findEndOfLineRecursive({ lineId, direction, lines, startingLineId: lineId, lengthSoFar: 1 })


type RecursiveParameter = {
  /** The line to look for the end of */
  lineId: string
  /** The direction to look */
  direction: Direction
  /** All the lines on the board */
  lines: Line[]
  /** Where the checking started, to prevent recursing forever */
  startingLineId: string
  /** A running count of the length of the line */
  lengthSoFar: number
}

/**
 * Inner recursive function for finding the end and length of a line
 *
 * @returns [endOfLineId, lengthOfLine]
 */
const findEndOfLineRecursive = ({
  lineId,
  direction,
  lines,
  startingLineId,
  lengthSoFar,
}: RecursiveParameter): [string, number] => {
  // If we've come back where we started, this is a complete loop
  if (lineId === startingLineId && lengthSoFar > 1) return [lineId, lengthSoFar]
  // Get the line
  const line = getById(lineId, lines)
  // Get the filled lines after this line
  const filledLines = getLinesWithFillValue(true, line.lines[direction], lines)
  // If there's more than one, then they've made a mistake, return -1 length to show that
  if(filledLines.length > 1) return [lineId, -1]
  // Get the first filled line (there will now be max one)
  const [nextLineId] = filledLines
  // If there isn't one, then this line is the end
  if (!nextLineId) return [lineId, lengthSoFar]
  // If there is another filled line, get the end of that line
  const nextLine = getById(nextLineId, lines)
  const nextDirection = OPPOSITE[DIRECTIONS.find((d) => nextLine.lines[d]?.includes(lineId))!]
  return findEndOfLineRecursive({
    lineId: nextLineId,
    direction: nextDirection,
    lines,
    startingLineId,
    lengthSoFar: lengthSoFar + 1,
  })
}
