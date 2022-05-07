import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import React from "react";
import {NativeBaseProvider} from "native-base";
import Header from "./components/Header";
import Todolist from "./components/Todolist";


export default function App() {

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <StatusBar style={'auto'} backgroundColor={'#E3E9FF'}/>

                <Header/>
                <Todolist/>

            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#E3E9FF',
    },

});
