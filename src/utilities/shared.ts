export type Square = {
  id: string
  number: number | null
  lines: Line[]
  squares: (Square | null)[]
  centerLocation: [number, number]
}

export type Line = {
  id: string
  filled: boolean | null
  lines: Line[]
  squares: (Square | null)[]
  startLocation: [number, number]
  endLocation: [number, number]
}

export const TOP = 0 as const
export const RIGHT = 1 as const
export const BOTTOM = 2 as const
export const LEFT = 3 as const

export const OPPOSITE = {
  [TOP]: BOTTOM,
  [RIGHT]: LEFT,
  [BOTTOM]: TOP,
  [LEFT]: RIGHT,
} as const

export type Direction = typeof TOP | typeof RIGHT | typeof BOTTOM | typeof LEFT
