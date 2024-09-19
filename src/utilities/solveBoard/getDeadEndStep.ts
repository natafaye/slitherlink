import { DIRECTIONS, NON_OPPOSITE } from "../directions"
import { getById } from "../getById"
import { getLinesWithFillValue } from "../getLinesWithFillValue"
import type { StepGetter } from "../types"

export const getDeadEndStep: StepGetter = (square, lines) => {
  for (const direction of DIRECTIONS) {
    const line = getById(square.lines[direction], lines)
    // check one intersection per line, to check each intersection for this square once
    const checkDirection = NON_OPPOSITE[direction][0]
    const linesToCheck = [...line.lines[checkDirection], line.id]

    const unmarked = getLinesWithFillValue(null, linesToCheck, lines)
    if (!unmarked.length) continue

    const full = getLinesWithFillValue(true, linesToCheck, lines)
    //const empty = getLinesWithFillValue(false, linesToCheck, lines)

    if (full.length === 1 && unmarked.length === 1) return [unmarked, true]
  }

  return null
}
