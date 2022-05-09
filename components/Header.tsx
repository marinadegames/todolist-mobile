import {StyleSheet, Text, View} from 'react-native';
import React from "react";
import UniversalInput from "./UniversalInput";


export default function Header() {

    return (
        <View style={styles.headerBox}>
            <Text style={styles.textHeader}>Moon tasks</Text>
            <UniversalInput placeholder={'add todolist'} callback={() => {}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    textHeader: {
        marginBottom: 10,
        color: '#A073D8',
        fontSize: 30,
        fontWeight: 'bold'
    },
    headerBox: {
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
    },
});
