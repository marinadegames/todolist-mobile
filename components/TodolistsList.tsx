import {useSelector} from "react-redux";
import {filterTasksType, Todolist} from "./Todolist";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {ScrollView, StyleSheet, View} from "react-native";
import {rootReducerType, useAppDispatch} from "../redux/store";
import {addTasksTC, changeTaskTitleTC, deleteTaskTC, TaskStateType, updateTaskStatusTC} from "../redux/tasksReducer";
import React, {useCallback, useEffect} from "react";
import {changeTodolistTitleTC, EditToDoListFilterAC, fetchTodolistsTC, removeTodolistTC, ToDoListType} from "../redux/toDoListsReducer";


export default function TodolistsList() {

    const tasks = useSelector<rootReducerType, TaskStateType>(state => state.tasks)
    const todolists = useSelector<rootReducerType, Array<ToDoListType>>(state => state.todolist)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC({}))
    }, [dispatch])

    // functional
    const removeTask = useCallback((id: string, toDoListId: string) => {
        dispatch(deleteTaskTC({todolistId: toDoListId, taskId: id}))
    }, [dispatch])

    const addTask = useCallback((newTitle: string, toDoListId: string) => {
        dispatch(addTasksTC({todolistId: toDoListId, newTitle: newTitle}))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, toDoListID: string, status: number) => {
        dispatch(updateTaskStatusTC({taskId: taskId, todolistId: toDoListID, status: status}))
    }, [dispatch])

    const changeToDoListFilter = useCallback((id: string, filter: filterTasksType) => {
        dispatch(EditToDoListFilterAC({id, filter}))
    }, [dispatch])


    const removeToDoList = useCallback((id: string) => {
        dispatch(removeTodolistTC({todolistId: id}))
    }, [dispatch])

    const editTaskHandler = useCallback((ToDoListId: string, tId: string, title: string) => {
        dispatch(changeTaskTitleTC({todolistId: ToDoListId, taskId: tId, newTitle: title}))
    }, [dispatch])

    const editToDoListTitleHandler = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC({todolistId: id, newTitle: title}))
    }, [dispatch])

    const getTasksForRender = useCallback((filter: filterTasksType, tasks: Array<TaskType>): Array<TaskType> => {
        switch (filter) {
            case "COMPLETED":
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            case "ACTIVE":
                return tasks.filter(t => t.status === TaskStatuses.New)
            default:
                return tasks
        }
    }, [])

    // if (!isLoggedIn) return <Navigate to={'/login'}/>

    return (
        <View style={styles.scrollView}>
            {todolists.map((tl) => {
                return (
                    <Todolist key={tl.id}
                              toDoListId={tl.id}
                              title={tl.title}
                              filter={tl.filter}
                              tasks={getTasksForRender(tl.filter, tasks[tl.id])}
                              addTask={addTask}
                              removeTask={removeTask}
                              changeTaskStatus={changeTaskStatus}
                              changeToDoListFilter={changeToDoListFilter}
                              removeToDoList={removeToDoList}
                              editTaskHandler={editTaskHandler}
                              editToDoListTitleHandler={editToDoListTitleHandler}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        marginTop: 15,
        width: '100%',
    },
});