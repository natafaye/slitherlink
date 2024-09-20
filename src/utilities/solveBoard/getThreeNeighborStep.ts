import { DIRECTIONS, OPPOSITE } from "../directions"
import { getById } from "../getById"
import type { StepGetter } from "../types"

// TODO: add x's on edges
export const getThreeNeighborStep: StepGetter = (square, lines, squares) => {
  // Only applies to 3 squares
  if (square.number !== 3) return null

  // Checks all directions - this will duplicate work if run on every square
  for (const direction of DIRECTIONS) {
    
    // If there isn't a square in the direction, check the next direction
    if (!square.squares[direction]) continue

    // Get the neighbor in the direction
    const neighbor = getById(square.squares[direction], squares)

    // If the neighbor isn't a 3, check the next direction
    if (neighbor.number !== 3) continue

    // Get the lines that should be filled
    const lineIdsToMark = [
      square.lines[OPPOSITE[direction]],
      square.lines[direction],
      neighbor.lines[direction],
    ]

    // Filter for ones that aren't yet marked as filled
    const unmarked = lineIdsToMark.filter(
      (id) => getById(id, lines).filled === null
    )

    // If there are some needing to be filled, return this step
    if (unmarked.length) return [unmarked, true]
  }
  
  return null
}
