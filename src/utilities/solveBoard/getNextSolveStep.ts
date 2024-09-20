import { getFinishSquareStep } from "./getFinishSquareStep"
import { getThreeNeighborStep } from "./getThreeNeighborStep"
import { getDeadEndStep } from "./getDeadEndStep"
import { getThreeCornerStep } from "./getThreeCornerStep"
import { getThreeCatacornerStep } from "./getThreeCatacornerStep"
import { getEarlyCloseStep } from "./getEarlyCloseStep"
import type { Line, Square, Step } from "../types"

const STEP_GETTERS = [
  getFinishSquareStep, 
  getDeadEndStep,
  getThreeCornerStep, 
  getThreeNeighborStep, 
  getThreeCatacornerStep,
  getEarlyCloseStep
]

export const getNextSolveStep = (
  lines: Line[],
  squares: Square[]
): Step | null => {
  // Find the next solve step that can be taken, checking simpler step getters first
  for (const getter of STEP_GETTERS) {
    for (const square of squares) {
      const step = getter(square, lines, squares)
      if (step) return step
    }
  }
  return null
}

// Tactics
// ✅ Finish squares
// ✅ Put lines and x's between 3's
// ✅ Mark x's on dead ends and lines on single exits (corners, straights, etc)
// ✅ 3's on cornersa
// ✅ Catacorner 3's
// ✅ Mark x's on closing lines that end the puzzle without satisfying all numbers
// 1 in a corner has to have x's

// Harder
// Mark slash 2's
// Mark half slash's? Allow single exit marking
// Can't create corner on edge of 3
// Can't create corner on edge of 2 with x on other side of corner
// Can't create corner on edge of 1 with 2 x's on other side of corner
// Counting ends in a region

// Jordan curve theorem? -> painting cells
