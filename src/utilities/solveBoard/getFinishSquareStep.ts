import { getLinesWithFillValue } from "../getLinesWithFillValue"
import type { StepGetter } from "../types"

export const getFinishSquareStep: StepGetter = (square, lines) => {
  if (square.number === null) return null

  const unmarkedLines = getLinesWithFillValue(null, square.lines, lines)
  if (unmarkedLines.length === 0) return null

  const fullLines = getLinesWithFillValue(true, square.lines, lines)
  const emptyLines = getLinesWithFillValue(false, square.lines, lines)

  if (fullLines.length === square.number) return [unmarkedLines, false]
  else if (emptyLines.length === square.lines.length - square.number)
    return [unmarkedLines, true]

  return null
}
