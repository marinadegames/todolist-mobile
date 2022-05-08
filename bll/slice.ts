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
    })
})

export const reducer = slice.reducer

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}