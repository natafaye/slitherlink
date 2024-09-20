import { DIRECTIONS } from "../directions";
import { findEndOfLine } from "../findEndOfLine";
import { getLinesWithFillValue } from "../getLinesWithFillValue";
import { Line, Square } from "../types";

export const isSolved = (lines: Line[], squares: Square[]) => {
    // If there's a square that's not satisfied, the puzzle isn't solved
    if(!isEverySquareSatisfied(lines, squares)) return false

    // If there's a line outside of the one complete loop, the puzzle isn't solved
    const allFilledLines = lines.filter(l => l.filled)
    // Start with some filled line, the first one for convenience
    const startLine = allFilledLines[0]
    // Pick a direction, just take the first direction you find with lines
    const startDirection = DIRECTIONS.find(d => startLine.lines[d]?.length)!
    // Find the end of the start line
    const [endLineId, length] = findEndOfLine(startLine.id, startDirection, lines)
    // If it's not a loop that includes every filled line, the puzzle isn't solved
    if(endLineId !== startLine.id || length !== allFilledLines.length) return false

    // If the squares are satisfied and there's one loop then the puzzle is solved
    return true
}

export const isEverySquareSatisfied = (lines: Line[], squares: Square[]) => {
    for(const square of squares) {
        const filledLines = getLinesWithFillValue(true, square.lines, lines)
        if(filledLines.length !== square.number) 
            return false
    }
    return true
}