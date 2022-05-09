import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from "react";
import {Checkbox,} from "native-base";
import {addTask, changeIsDone, deleteTask} from '../bll/sliceTasks';
import {useAppDispatch, useAppSelector} from "../bll/store";
import FilterButtons from './FilterButtons';
import UniversalInput from "./UniversalInput";

export type filterTasksType = 'ALL' | 'ACTIVE' | 'COMPLETED'

export default function Todolist() {

    const tasks_ = useAppSelector(state => state.tasksReducer.tasks)
    const dispatch = useAppDispatch()

    const [filterType, setFilterType] = useState<filterTasksType>('ALL')

    const changeIsDoneFoo = (id: number, isDone: boolean) => {
        dispatch(changeIsDone({id, isDone}))
    }

    const addTaskFoo = (value: string) => {
        dispatch(addTask({title: value}))
    }

    const deleteTaskFoo = (id: number) => {
        dispatch(deleteTask({id}))
    }

    const changeFilterType = useCallback((value: filterTasksType) => {
        setFilterType(value)
    }, [filterType])

    return (
        <View style={styles.todolist}>

            <View style={styles.todolistTitleBox}>
                <Text style={styles.todolistTitle}>Study: </Text>
            </View>

            <FilterButtons changeFilterType={changeFilterType} filterType={filterType}/>

            <UniversalInput callback={addTaskFoo} placeholder={'add task'}/>

            <View style={styles.todolistBlock}>
                {tasks_.map(t => {
                    return (
                        <View key={Math.random()} style={styles.taskBox}>
                            <View style={{width: '10%'}}>
                                <Checkbox isChecked={t.isDone}
                                          accessibilityLabel={'123'}
                                          size={"lg"}
                                          colorScheme="purple"
                                          onChange={() => changeIsDoneFoo(t.id, !t.isDone)}
                                          value={'purple'}/>
                            </View>
                            <View style={{width: '78%'}}>
                                <Text style={t.isDone ? styles.taskFontIsDone : styles.taskFont}>{t.title}</Text>
                            </View>
                            <View style={{width: '10%'}}>
                                <TouchableOpacity onPress={() => deleteTaskFoo(t.id)} style={styles.deleteButton}>
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
        marginTop: 20,
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
