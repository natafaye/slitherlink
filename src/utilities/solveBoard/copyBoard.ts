import type { Board } from "../types";

export const copyBoard = ({ squares, lines }: Board) => {
    return {
        squares: squares.map(s => ({...s})),
        lines: lines.map(l => ({...l}))
    }
}