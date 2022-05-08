import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from "react";
import {Button, Checkbox, Input,} from "native-base";
import { TaskType } from '../bll/slice';



export default function Todolist() {

    const [tasks, setTasks] = useState<TaskType[]>([
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
    ])

    const [inputValue, setInputValue] = useState<string>('')


    const changeIsDone = useCallback((id: number, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: !isDone} : t))
    }, [])

    const addTask = () => {
        const newTask: TaskType = {
            id: 4,
            title: inputValue,
            isDone: false
        }
        setTasks([...tasks, newTask])
        setInputValue('')
    }

    const changeInputAddTask = (title: string) => {
        setInputValue(title)
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
                <Input w={'85%'}
                       placeholder={'add task'}
                       borderWidth={2}
                       outlineColor={'#A073D8'}
                       borderColor={'#A073D8'}
                       fontSize='20'
                       borderRightWidth={0}
                       borderBottomRightRadius={0}
                       borderTopRightRadius={0}
                       value={inputValue}
                       onChangeText={changeInputAddTask}
                />
                <Button variant={'outline'}
                        w={'15%'}
                        colorScheme='purple'
                        fontSize='20'
                        borderWidth={2}
                        color={'#A073D8'}
                        borderBottomLeftRadius={0}
                        borderTopLeftRadius={0}
                        borderColor={'#A073D8'}
                        onPress={addTask}
                >+</Button>
            </View>

            {/*TASKS*/
            }
            <View style={styles.todolistBlock}>
                {tasks.map(t => {
                    return (
                        <View key={t.id} style={styles.taskBox}>
                            <Text style={t.isDone ? styles.taskFontIsDone : styles.taskFont}>{t.title}</Text>
                            <Checkbox isChecked={t.isDone}
                                      accessibilityLabel={'123'}
                                      size={"lg"}
                                      colorScheme="purple"
                                      onChange={() => changeIsDone(t.id, t.isDone)}
                                      value={'purple'}/>
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
        fontSize: 25,
    },
    taskFontIsDone: {
        color: '#8992ac',
        fontSize: 25,
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

});
