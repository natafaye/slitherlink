import { Direction } from "./types"

export const TOP = 0 as const
export const RIGHT = 1 as const
export const BOTTOM = 2 as const
export const LEFT = 3 as const

export const DIRECTIONS: Direction[] = [TOP, RIGHT, BOTTOM, LEFT]

export const OPPOSITE = {
  [TOP]: BOTTOM,
  [RIGHT]: LEFT,
  [BOTTOM]: TOP,
  [LEFT]: RIGHT,
} as const

export const CLOCKWISE = {
  [TOP]: RIGHT,
  [RIGHT]: BOTTOM,
  [BOTTOM]: LEFT,
  [LEFT]: TOP,
} as const

export const COUNTER = {
  [TOP]: LEFT,
  [RIGHT]: TOP,
  [BOTTOM]: RIGHT,
  [LEFT]: BOTTOM,
} as const

// clockwise then counter clockwise
export const NON_OPPOSITE = {
  [TOP]: [RIGHT, LEFT],
  [RIGHT]: [BOTTOM, TOP],
  [BOTTOM]: [LEFT, RIGHT],
  [LEFT]: [TOP, BOTTOM],
} as const
