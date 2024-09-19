import { CLOCKWISE, COUNTER, DIRECTIONS } from "../directions"
import { tryGetById } from "../getById"
import type { Line, Square } from "../types"

/**
 * Add the two-way connections between every line and every other line
 * in the entire board
 * 
 * All the squares need to be connected to each other and to the lines
 * for this function to work properly
 * 
 * @param lines All the lines in the board
 * @param squares All the squares in the board
 */
export const connectAllLinesTogether = (lines: Line[], squares: Square[]) => {
  for (const line of lines) {
    // Get the directions for the line that don't have squares (and thus point to intersections)
    const directionsToAdd = DIRECTIONS.filter((d) => !line.squares[d])

    // For the two directions left, add the line connections
    directionsToAdd.forEach((direction) => {
      const lineConnections = []

      // Grab the square in the counter-clockwise direction and add the line that turns that way
      const counterSquare = tryGetById(line.squares[COUNTER[direction]], squares)
      if (counterSquare) {
        lineConnections.push(counterSquare.lines[direction])
      }

      // Grab the square in the clockwise direction and add the line that turns that way
      const clockwiseSquare = tryGetById(line.squares[CLOCKWISE[direction]], squares)
      if (clockwiseSquare) {
        lineConnections.push(clockwiseSquare.lines[direction])
      }

      // Try to grab the straight line off the two middle squares
      const counterMiddleSquare = tryGetById(counterSquare?.squares[direction], squares)
      const clockwiseMiddleSquare = tryGetById(clockwiseSquare?.squares[direction], squares)
      if (counterMiddleSquare) {
        lineConnections.push(counterMiddleSquare.lines[CLOCKWISE[direction]])
      } else if (clockwiseMiddleSquare) {
        lineConnections.push(clockwiseMiddleSquare.lines[COUNTER[direction]])
      }

      line.lines[direction] = lineConnections
    })
  }
}
