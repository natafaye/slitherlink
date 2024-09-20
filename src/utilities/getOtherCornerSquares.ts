import { tryGetById } from "./getById"
import { Direction, Square } from "./types"

// Get the 3 other squares in this corner of the given square
// Direction 2 should be clockwise from direction 1
// Returns the squares in clockwise order
export const getOtherCornerSquares = (
  square: Square,
  direction1: Direction,
  direction2: Direction,
  squares: Square[]
) => {
  const counterSquare = tryGetById(square.squares[direction1], squares)
  const clockwiseSquare = tryGetById(square.squares[direction2], squares)
  const middleSquare = tryGetById(
    counterSquare?.squares[direction2] || clockwiseSquare?.squares[direction1],
    squares
  )
  return [counterSquare, middleSquare, clockwiseSquare]
}
