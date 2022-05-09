import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {toDoListsReducer} from "./toDoListsReducer";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import {tasksReducer} from "./tasksReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: toDoListsReducer,
    app: appReducer,
    auth: authReducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type rootReducerType = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<rootReducerType> = useSelector


