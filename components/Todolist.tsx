import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect} from "react";
import {Checkbox,} from "native-base";
import UniversalInput from "./UniversalInput";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {useAppDispatch} from "../redux/store";
import {fetchTasksTC, updateTaskStatusTC} from "../redux/tasksReducer";

export type filterTasksType = 'ALL' | 'ACTIVE' | 'COMPLETED'

type TodolistPropsType = {
    toDoListId: string
    title: string
    filter: filterTasksType
    tasks: Array<TaskType>
    addTask: (title: string, toDoListId: string) => void
    removeTask: (id: string, toDoListId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: number) => void
    changeToDoListFilter: (toDoListId: string, filter: filterTasksType) => void
    removeToDoList: (toDoListsId: string) => void
    editTaskHandler: (ToDoListId: string, tId: string, title: string) => void
    editToDoListTitleHandler: (ToDoListId: string, newTitle: string) => void
}

export function Todolist(
    {
        tasks,
        title,
        toDoListId,
        changeToDoListFilter,
        addTask,
        removeTask,
        editToDoListTitleHandler,

    }: TodolistPropsType) {

    // get tasks
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(toDoListId))
    }, [dispatch, toDoListId])

    // functions
    const onClickSetAllFilter = () => changeToDoListFilter(toDoListId, 'ALL')
    const onClickSetActiveFilter = () => changeToDoListFilter(toDoListId, "ACTIVE")
    const onClickSetCompletedFilter = () => changeToDoListFilter(toDoListId, "COMPLETED")
    const addTaskHandler = (title: string) => addTask(title.trim(), toDoListId)
    const editToDoListHandlerForEditableLabel = (toDoId: string, newTitle: string) => {
        editToDoListTitleHandler(toDoListId, newTitle)
    }

    const deleteTask = (taskId:string) => {
        removeTask(taskId, toDoListId)
    }

    const changeIsDoneFoo = useCallback((taskId: string, todolistId: string, status: TaskStatuses) => {
        if (status === 0) {
            dispatch(updateTaskStatusTC({taskId, todolistId, status: 2}))
        }
        if (status === 2) {
            dispatch(updateTaskStatusTC({taskId, todolistId, status: 0}))
        }

    }, [])

    return (
        <View style={styles.todolist}>

            <View style={styles.todolistTitleBox}>
                <Text style={styles.todolistTitle}>{title}</Text>
            </View>

            {/*<FilterButtons changeFilterType={props.changeToDoListFilter} filterType={filterType}/>*/}

            <UniversalInput callback={addTaskHandler} placeholder={'add task'}/>

            <View style={styles.todolistBlock}>
                {tasks.map(t => {
                    return (
                        <View key={Math.random()} style={styles.taskBox}>
                            <View style={{width: '10%'}}>
                                <Checkbox
                                    isChecked={!!(t.status !== undefined && t.status)}
                                    accessibilityLabel={'123'}
                                    size={"lg"}
                                    colorScheme="purple"
                                    onChange={() => changeIsDoneFoo(t.id, toDoListId, t.status)}
                                    value={'purple'}/>
                            </View>
                            <View style={{width: '78%'}}>
                                <Text style={t.status ? styles.taskFontIsDone : styles.taskFont}>{t.title}</Text>
                            </View>
                            <View style={{width: '10%'}}>
                                <TouchableOpacity onPress={() => deleteTask(t.id)}
                                                  style={styles.deleteButton}>
                                    <Text style={{color: 'red'}}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    todolist: {
        shadowColor: "#000",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 2.30,
        elevation: 3,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
    },
    todolistTitleBox: {
        backgroundColor: '#A073D8',
        borderRadius: 5,
        marginBottom: 10,
        paddingVertical: 5,
        paddingLeft: 10,
    },
    todolistTitle: {
        fontSize: 28,
        color: '#fff',
    },
    todolistBlock: {
        width: '100%',
    },
    taskFont: {
        color: '#8992ac',
        fontSize: 21,
    },
    taskFontIsDone: {
        color: '#8992ac',
        fontSize: 21,
        textDecorationLine: 'line-through',
        opacity: 0.5,
    },
    taskBox: {
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    filtersTodolist: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deleteButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 1.5,
        borderRadius: 5,
        height: 27,
        width: 27
    }
});
