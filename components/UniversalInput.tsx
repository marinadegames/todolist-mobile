import {StyleSheet, Text, View} from "react-native";
import {Button, Input} from "native-base";
import React, {useCallback, useState} from "react";


type PropsType = {
    placeholder?: string
    callback: (value: string) => void
    height?: number
    valueTitle?: string

}

export default function UniversalInput({placeholder, callback, valueTitle, height, }: PropsType) {

    const [inputValue, setInputValue] = useState<string>('')
    const [errorAddTask, setErrorAddTask] = useState<boolean>(false)

    const changeInputAddTask = useCallback((title: string) => {
        setInputValue(title)
        setErrorAddTask(false)
    }, [inputValue, setInputValue])

    const buttonHandler = () => {
        if (inputValue === '') {
            setErrorAddTask(true)
        }
        if (inputValue !== '' && !errorAddTask)
            callback(inputValue)
            setInputValue('')

    }

    return (
        <View>

            <View style={styles.inputAddTaskGroup}>
                <Input
                    w={'85%'}
                    placeholder={placeholder}
                    borderWidth={2}
                    outlineColor={errorAddTask ? '#E37482' : '#A073D8'}
                    borderColor={errorAddTask ? '#E37482' : '#A073D8'}
                    fontSize='20'
                    borderRadius={5}
                    borderRightWidth={0}
                    borderBottomRightRadius={0}
                    borderTopRightRadius={0}
                    value={valueTitle ? valueTitle : inputValue}
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
                        onPress={buttonHandler}
                >+</Button>

            </View>
            {errorAddTask && (
                <View style={{marginBottom: 8}}>
                    <Text style={{color: 'red', fontSize: 17}}>Need a title!</Text>
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    inputAddTaskGroup: {
        paddingVertical: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})