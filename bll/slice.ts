import {createAction, createSlice} from "@reduxjs/toolkit";

const initialState = {
    tasks: [
        {
            id: 1,
            title: 'HTML',
            isDone: true
        },
        {
            id: 2,
            title: 'React',
            isDone: true
        },
        {
            id: 3,
            title: 'React-native',
            isDone: false
        },
    ] as TaskType[]
}

export const addTask = createAction<{ title: string }>('task/addTask')
export const changeIsDone = createAction<{ id: number, isDone: boolean }>('task/changeIsDone')
export const deleteTask = createAction<{ id: number }>('task/deleteTask')

const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder
            .addCase(addTask, (state, action) => {
                const newTask: TaskType = {
                    id: state.tasks.length + 1,
                    title: action.payload.title,
                    isDone: false
                }
                state.tasks.push(newTask)
            })
            .addCase(changeIsDone, (state, action) => {
                const index = state.tasks.findIndex(t => t.id === action.payload.id)
                state.tasks[index].isDone = action.payload.isDone
            })
            .addCase(deleteTask, (state, action) => {
                const index = state.tasks.findIndex(t => t.id === action.payload.id)
                state.tasks.splice(index, 1)
            })
    })
})

export const reducer = slice.reducer

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}