import { BOTTOM, OPPOSITE, RIGHT } from "../directions"
import { getById } from "../getById"
import type { StepGetter } from "../types"

// TODO: add x's on edges
export const getThreeNeighborStep: StepGetter = (square, lines, squares) => {
  if (square.number !== 3) return null
  for (const direction of [RIGHT, BOTTOM]) {
    if (!square.squares[direction]) continue
    const neighbor = getById(square.squares[direction], squares)
    if (neighbor.number !== 3) continue
    const lineIdsToMark = [
      square.lines[OPPOSITE[direction]],
      square.lines[direction],
      neighbor.lines[direction],
    ]
    const unmarked = lineIdsToMark.filter(
      (id) => getById(id, lines).filled === null
    )
    if (unmarked.length) return [unmarked, true]
  }
  return null
}
