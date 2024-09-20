import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';
import { getById, generateBoard } from '../utilities';
import { getFinishSquareStep, getNextSolveStep } from '../utilities';

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
      const square = getById(action.payload, state.squares)
      const nextStep = getFinishSquareStep(square, state.lines, state.squares)

      if(!nextStep) return // TODO: message
      const [lineIds, newFilledValue] = nextStep
      lineIds.forEach(id => getById(id, state.lines).filled = newFilledValue)
    },
    solveNextStep: (state) => {
      const nextStep = getNextSolveStep(state.lines, state.squares)
      if(!nextStep) return // TODO: message
      const [lineIds, newFilledValue] = nextStep
      lineIds.forEach(id => getById(id, state.lines).filled = newFilledValue)
    }
  }
});

export const { toggleLine, finishSquare, solveNextStep } = boardSlice.actions

export const boardReducer = boardSlice.reducer

export const selectBoard = (state: RootState) => state.board