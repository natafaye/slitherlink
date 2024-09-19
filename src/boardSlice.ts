import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';
import { generateBoard } from './utilities/generateBoard';

const initialState = {
    ...generateBoard(5, 5),
    rows: 5,
    columns: 5
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    toggleLine: (state, action: PayloadAction<string>) => {
      const line = state.lines.find(l => l.id === action.payload)
      if(!line) return
      line.filled = line.filled ? false : line.filled === false ? null : true
    },
    finishSquare: (state, action: PayloadAction<string>) => {
      debugger
      const square = state.squares.find(s => s.id === action.payload)
      if(!square || !square.number) return
      const unmarkedLines = square.lines.filter(l => l.filled === null)
      if(unmarkedLines.length === 0) return
      const fullLines = square.lines.filter(l => l.filled)
      const emptyLines = square.lines.filter(l => l.filled === false)
      if(fullLines.length === square.number)
        unmarkedLines.forEach(l => l.filled = false)
      if(emptyLines.length === square.lines.length - square.number)
        unmarkedLines.forEach(l => l.filled = true)
    }
  }
});

export const { toggleLine, finishSquare } = boardSlice.actions

export const boardReducer = boardSlice.reducer

export const selectBoard = (state: RootState) => state.board