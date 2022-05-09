import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from "react";
import {Button, Checkbox, FormControl, Input, WarningOutlineIcon,} from "native-base";
import {addTask, changeIsDone, deleteTask} from '../bll/slice';
import {useAppDispatch, useAppSelector} from "../bll/store";


export default function Todolist() {

    const tasks_ = useAppSelector(state => state.reducer.tasks)
    const dispatch = useAppDispatch()

    const [inputValue, setInputValue] = useState<string>('')
    const [errorAddTask, setErrorAddTask] = useState<boolean>(false)

    const changeIsDoneFoo = (id: number, isDone: boolean) => {
        dispatch(changeIsDone({id, isDone}))
    }

    const addTaskFoo = () => {
        if (inputValue !== '' && !errorAddTask) {
            dispatch(addTask({title: inputValue}))
            setInputValue('')
        }
        if (inputValue === '') setErrorAddTask(true)
    }

    const changeInputAddTask = useCallback((title: string) => {
        setInputValue(title)
        setErrorAddTask(false)
    }, [])

    const deleteTaskFoo = (id: number) => {
        dispatch(deleteTask({id}))
    }

    return (
        <View style={styles.todolist}>

            <View style={styles.todolistTitleBox}>
                <Text style={styles.todolistTitle}>Study: </Text>
            </View>

            <View style={styles.filtersTodolist}>
                <Button w={'30%'} size={"xs"} variant={'outline'} borderWidth={2} borderRadius={8} borderColor={'#A073D8'}>
                    <Text style={{color: '#A073D8', fontWeight: 'bold'}}>ALL</Text>
                </Button>
                <Button w={'30%'} size={"xs"} variant={'outline'} borderWidth={2} borderRadius={8} borderColor={'#E37482'}>
                    <Text style={{color: '#E37482', fontWeight: 'bold'}}>ACTIVE</Text>
                </Button>
                <Button w={'30%'} size={"xs"} variant={'outline'} borderWidth={2} borderRadius={8} borderColor={'#2EAC64'}>
                    <Text style={{color: '#2EAC64', fontWeight: 'bold'}}>COMPL</Text>
                </Button>
            </View>

            <View style={styles.inputAddTaskGroup}>
                <Input
                    w={'85%'}
                    placeholder={'add task'}
                    borderWidth={2}
                    outlineColor={errorAddTask ? '#E37482' : '#A073D8'}
                    borderColor={errorAddTask ? '#E37482' : '#A073D8'}
                    fontSize='20'
                    borderRadius={5}
                    borderRightWidth={0}
                    borderBottomRightRadius={0}
                    borderTopRightRadius={0}
                    value={inputValue}
                    onChangeText={changeInputAddTask}
                />
                <Button variant={'outline'}
                        w={'15%'}
                        colorScheme='purple'
                        borderWidth={2}
                        color={errorAddTask ? '#E37482' : '#A073D8'}
                        borderRadius={5}
                        borderBottomLeftRadius={0}
                        borderTopLeftRadius={0}
                        borderColor={errorAddTask ? '#E37482' : '#A073D8'}
                        onPress={addTaskFoo}
                >+</Button>

            </View>
            {errorAddTask && (
                <View style={{marginBottom: 8}}>
                    <Text style={{color: 'red', fontSize: 17}}>Need a title!</Text>
                </View>
            )}
            {/*TASKS*/
            }
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
        ;
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
    inputAddTaskGroup: {
        paddingVertical: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
