import {createSlice} from "@reduxjs/toolkit";

const initState = {
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

const slice = createSlice({
    name: 'task',
    initialState: {},
    reducers: {},
    extraReducers: (builder => {

    })
})

export const reducer = slice.reducer

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}