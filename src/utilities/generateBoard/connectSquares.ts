import { OPPOSITE } from "../directions"
import { getById } from "../getById"
import type { Direction, Line, Square } from "../types"

export const connectSquares = (
  direction: Direction,
  square1: Square,
  square2: Square,
  lines: Line[]
) => {
  square1.squares[direction] = square2.id
  square2.squares[OPPOSITE[direction]] = square1.id
  const line = getById(square2.lines[OPPOSITE[direction]], lines)
  square1.lines[direction] = line.id
  line.squares[OPPOSITE[direction]] = square1.id
}
