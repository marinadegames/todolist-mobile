import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect} from "react";
import {Checkbox,} from "native-base";
import UniversalInput from "./UniversalInput";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {useAppDispatch} from "../redux/store";
import {fetchTasksTC, updateTaskStatusTC} from "../redux/tasksReducer";
import {EditableInput} from "./EditableInput";

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

export function Todolist(props: TodolistPropsType) {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.toDoListId))
    }, [dispatch, props.toDoListId])

    const onClickSetAllFilter = useCallback(() => {
        props.changeToDoListFilter(props.toDoListId, 'ALL')
    }, [props.toDoListId])

    const onClickSetActiveFilter = useCallback(() => {
        props.changeToDoListFilter(props.toDoListId, "ACTIVE")
    }, [props.toDoListId])

    const onClickSetCompletedFilter = useCallback(() => {
        props.changeToDoListFilter(props.toDoListId, "COMPLETED")
    }, [props.toDoListId])

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(title.trim(), props.toDoListId)
    }, [props.toDoListId])

    const editToDoListHandlerForEditableLabel = useCallback((toDoId: string, newTitle: string) => {
        props.editToDoListTitleHandler(props.toDoListId, newTitle)
    }, [props.toDoListId])

    const deleteTask = useCallback((taskId: string) => {
        props.removeTask(taskId, props.toDoListId)
    }, [props.toDoListId])

    const deleteTodolist = useCallback((todolistId: string) => {
        props.removeToDoList(todolistId)
    }, [props.toDoListId])

    const changeIsDoneFoo = useCallback((taskId: string, todolistId: string, status: TaskStatuses) => {
        if (status === 0) {
            dispatch(updateTaskStatusTC({taskId, todolistId, status: 2}))
        }
        if (status === 2) {
            dispatch(updateTaskStatusTC({taskId, todolistId, status: 0}))
        }
    }, [])

    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        props.editTaskHandler(props.toDoListId, taskId, title)
    }, [])

    return (
        <View style={styles.todolist}>

            <View style={styles.todolistTitleBox}>
                <Text style={styles.todolistTitle}>{props.title}</Text>
                <View>
                    <TouchableOpacity onPress={() => deleteTodolist(props.toDoListId)}
                                      style={styles.deleteButton}>
                        <Text style={{color: 'red'}}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/*<FilterButtons changeFilterType={props.changeToDoListFilter} filterType={filterType}/>*/}

            <UniversalInput callback={addTaskHandler} placeholder={'add task'}/>

            <View style={styles.todolistBlock}>
                <FlatList data={props.tasks}
                    // scrollEnabled={true}
                          nestedScrollEnabled={true}
                          showsVerticalScrollIndicator={false}
                          keyExtractor={t => t.id}
                          renderItem={({item}) => {
                              return (
                                  <View key={Math.random()} style={styles.taskBox}>
                                      <View style={{width: '10%'}}>
                                          <Checkbox
                                              isChecked={!(undefined === item.status || !item.status)}
                                              accessibilityLabel={'123'}
                                              size={"lg"}
                                              colorScheme="purple"
                                              onChange={() => changeIsDoneFoo(item.id, props.toDoListId, item.status)}
                                              value={'purple'}/>
                                      </View>
                                      <View style={{width: '78%'}}>
                                          <EditableInput taskStatus={item.status}
                                                         valueTitle={item.title}
                                                         taskId={item.id}
                                                         todolistId={props.toDoListId}
                                                         callback={changeTaskTitle}/>
                                      </View>
                                      <View style={{width: '10%'}}>
                                          <TouchableOpacity onPress={() => deleteTask(item.id)}
                                                            style={styles.deleteButton}>
                                              <Text style={{color: 'red'}}>X</Text>
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              )
                          }}/>
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
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#A073D8',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 5,
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
