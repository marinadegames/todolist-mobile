import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from "react";
import UniversalInput from "./UniversalInput";

type PropsType = {
    addTodolist: (title: string) => void
}

export default function Header({addTodolist}: PropsType) {

    const addTodolistFoo = useCallback((title: string) => {
        addTodolist(title)
    },[])

    return (
        <View style={styles.headerBox}>
            <Text style={styles.textHeader}>Moon tasks</Text>
            <UniversalInput placeholder={'add todolist'} callback={addTodolistFoo}/>
        </View>
    );
}

const styles = StyleSheet.create({
    textHeader: {
        color: '#A073D8',
        fontSize: 30,
        fontWeight: 'bold'
    },
    headerBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 2.30,
        elevation: 3,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
    },
});
