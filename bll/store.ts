import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {tasksReducer} from "./sliceTasks";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {todolistsReducer} from "./sliceTodolists";


const rootReducer = combineReducers({
    tasksReducer,
    todolistsReducer: todolistsReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
