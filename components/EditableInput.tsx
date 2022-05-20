import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "native-base";
import React, {memo, useCallback, useEffect, useState} from "react";
import {TaskStatuses} from "../api/todolist-api";

type PropsType = {
    callback: (taskId: string, title: string) => void
    valueTitle: string
    taskStatus: TaskStatuses
    taskId?: string
    todolistId?: string
}

export const EditableInput = memo(({callback, taskStatus, valueTitle, taskId}: PropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        setInputValue(valueTitle)
    }, [valueTitle])

    const changeInput = useCallback((title: string) => {
        setInputValue(title)
        setError(false)
    }, [inputValue])

    const callbackHandler = () => {
        if (inputValue === '') {
            setError(true)
        }
        if (inputValue !== '' && !error && taskId)
            callback(taskId, inputValue)
        setInputValue('')
    }

    const changeMode = () => {
        setEditMode(true)
    }

    return (
        <View>
            {!editMode
                ? <TouchableOpacity onPress={changeMode}>
                    <Text style={taskStatus ? styles.taskFontIsDone : styles.taskFont}>{valueTitle}</Text>
                </TouchableOpacity>
                :
                <View>
                    <View style={styles.inputAddTaskGroup}>
                        <Input
                            w={'85%'}
                            borderWidth={2}
                            outlineColor={error ? '#E37482' : '#A073D8'}
                            borderColor={error ? '#E37482' : '#A073D8'}
                            fontSize='15'
                            borderRadius={5}
                            borderRightWidth={0}
                            borderBottomRightRadius={0}
                            borderTopRightRadius={0}
                            value={inputValue}
                            onChangeText={changeInput}
                        />
                        <Button variant={'outline'}
                                w={'15%'}
                                colorScheme='purple'
                                borderWidth={2}
                                color={error ? '#E37482' : '#A073D8'}
                                borderRadius={5}
                                borderBottomLeftRadius={0}
                                borderTopLeftRadius={0}
                                borderColor={error ? '#E37482' : '#A073D8'}
                                onPress={callbackHandler}
                        >✔</Button>
                    </View>
                    {error && <View style={{marginBottom: 8}}>
                        <Text style={{color: 'red', fontSize: 17}}>Need a title!</Text>
                    </View>}
                </View>}
        </View>
    )
})

const styles = StyleSheet.create({
    inputAddTaskGroup: {
        paddingVertical: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
})

