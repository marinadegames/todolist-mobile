import {createAction, createSlice} from "@reduxjs/toolkit";
import {filterTasksType} from "../components/Todolist";

const initialState = [] as TodolistType[]


// export const addTask = createAction<{ title: string }>('task/addTask')
// export const changeIsDone = createAction<{ id: number, isDone: boolean }>('task/changeIsDone')
// export const deleteTask = createAction<{ id: number }>('task/deleteTask')

const sliceTodolists = createSlice({
    name: 'todolist',
    initialState,
    reducers: {},
    extraReducers: (builder => {

    })
})

export const todolistsReducer = sliceTodolists.reducer

export type TodolistType = {
    id: string
    title: string
    filter: filterTasksType
}