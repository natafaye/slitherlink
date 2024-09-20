import { CLOCKWISE, COUNTER, DIRECTIONS, OPPOSITE } from "../directions"
import { getLinesWithFillValue } from "../getLinesWithFillValue"
import { StepGetter } from "../types"
import { getOtherCornerSquares } from "../getOtherCornerSquares"

export const getThreeCatacornerStep: StepGetter = (square, lines, squares) => {
  // Only applies to 3 squares
  if (square.number !== 3) return null

  for (const direction of DIRECTIONS) {
    // Get the 3 other squares in this intersection
    const [_, middleSquare] = getOtherCornerSquares(
      square,
      direction,
      CLOCKWISE[direction],
      squares
    )
    // If there's a 3 catacorner
    if (middleSquare && middleSquare.number === 3) {
      const oppositeCorner = [
        square.lines[OPPOSITE[direction]],
        square.lines[COUNTER[direction]],
        middleSquare.lines[direction],
        middleSquare.lines[CLOCKWISE[direction]],
      ]
      // Check if there are unmarked lines for the outer corners
      const unmarkedLines = getLinesWithFillValue(null, oppositeCorner, lines)
      // If there are, return a step to fill them
      if (unmarkedLines.length) return [unmarkedLines, true]
    }
  }
  
  return null
}
