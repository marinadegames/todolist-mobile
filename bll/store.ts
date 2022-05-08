import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {reducer} from "./slice";


const rootReducer = combineReducers({
    reducer: reducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>