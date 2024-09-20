import { DIRECTIONS, NON_OPPOSITE } from "../directions"
import { getById } from "../getById"
import { getLinesWithFillValue } from "../getLinesWithFillValue"
import type { StepGetter } from "../types"

export const getDeadEndStep: StepGetter = (square, lines) => {
  for (const direction of DIRECTIONS) {
    const line = getById(square.lines[direction], lines)
    // check one intersection per line, to check each intersection for this square once
    // this will duplicate checks if run on every square
    const checkDirection = NON_OPPOSITE[direction][0]
    const linesToCheck = [...line.lines[checkDirection], line.id]

    const unmarked = getLinesWithFillValue(null, linesToCheck, lines)
    
    // if there's nothing unmarked in this intersection, check the next intersection
    if (!unmarked.length) continue

    const full = getLinesWithFillValue(true, linesToCheck, lines)
    
    // If there's no way out of this intersection, block the way in
    if (full.length === 0 && unmarked.length === 1) return [unmarked, false]

    // If there's only one spot for the line to go, mark that way
    if (full.length === 1 && unmarked.length === 1) return [unmarked, true]

    // If a line enters and exits this intersection, block the other ways
    if (full.length === 2) return [unmarked, false]
  }

  return null
}
