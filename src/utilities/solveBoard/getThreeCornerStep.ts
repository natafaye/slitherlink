import { CLOCKWISE, COUNTER, DIRECTIONS } from "../directions"
import { tryGetById } from "../getById"
import { getLinesWithFillValue } from "../getLinesWithFillValue"
import { StepGetter } from "../types"

export const getThreeCornerStep: StepGetter = (square, lines, squares) => {
  // Only applies to 3 squares
  if (square.number !== 3) return null

  // For each direction, check the clockwise corner intersection
  for (const direction of DIRECTIONS) {
    // Get the 3 other squares in this intersection
    const counterSquare = tryGetById(square.squares[direction], squares)
    const clockwiseSquare = tryGetById(square.squares[CLOCKWISE[direction]], squares)
    const middleSquare = tryGetById(
      counterSquare?.squares[CLOCKWISE[direction]] || clockwiseSquare?.squares[direction],
      squares
    )

    // Get the 2 lines in this intersection that aren't touching this square
    const line1 = tryGetById(
      counterSquare?.lines[CLOCKWISE[direction]] || middleSquare?.lines[COUNTER[direction]],
      lines
    )
    const line2 = tryGetById(
      middleSquare?.lines[CLOCKWISE[direction]] || clockwiseSquare?.lines[COUNTER[direction]],
      lines
    )

    // If the two lines don't exist or can't have lines, then the 3 has to have a corner here
    if ((!line1 || line1.filled === false) && (!line2 || line2.filled === false)) {
        const cornerLines = [square.lines[direction], square.lines[CLOCKWISE[direction]]]
        const unmarkedCornerLines = getLinesWithFillValue(null, cornerLines, lines)
        if(unmarkedCornerLines.length) return [unmarkedCornerLines, true]
    }
  }

  return null
}
