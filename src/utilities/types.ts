import { BOTTOM, LEFT, RIGHT, TOP } from "./directions"

export type Square = {
  id: string
  number: number | null
  squares: (string | null)[]
  lines: string[]
  centerLocation: [number, number]
}

export type Line = {
  id: string
  filled: boolean | null
  squares: (string | null)[]
  lines: {
    [index: number]: string[]
  }
  startLocation: [number, number]
  endLocation: [number, number]
}

export type Board = {
  squares: Square[]
  lines: Line[]
}

export type Direction = typeof TOP | typeof RIGHT | typeof BOTTOM | typeof LEFT

// Solver Types

export type Step = [string[], boolean | null]

export type StepGetter = (
  square: Square,
  lines: Line[],
  squares: Square[]
) => Step | null
