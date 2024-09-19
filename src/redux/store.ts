import { configureStore } from "@reduxjs/toolkit";
import { boardReducer } from "./boardSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({ 
    reducer: {
        board: boardReducer
    }
})

export type AppStore = typeof store

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch