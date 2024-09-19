export const TOP = 0 as const
export const RIGHT = 1 as const
export const BOTTOM = 2 as const
export const LEFT = 3 as const

// opposite side
export const OPPOSITE = {
  [TOP]: BOTTOM,
  [RIGHT]: LEFT,
  [BOTTOM]: TOP,
  [LEFT]: RIGHT,
} as const

// clockwise then counter clockwise
export const NON_OPPOSITE = {
  [TOP]: [RIGHT, LEFT],
  [RIGHT]: [BOTTOM, TOP],
  [BOTTOM]: [LEFT, RIGHT],
  [LEFT]: [TOP, BOTTOM],
} as const
