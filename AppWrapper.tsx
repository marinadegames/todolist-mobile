import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from "react";
import Header from "./components/Header";
import {rootReducerType, useAppDispatch} from "./redux/store";
import {initializedAppTC} from "./redux/appReducer";
import {addTodolistTC} from "./redux/toDoListsReducer";
import TodolistsList from "./components/TodolistsList";
import {useSelector} from "react-redux";
import {CircularLoading} from "./components/CircularLoading";
import {loginTC} from "./redux/authReducer";

export default function AppWrapper() {

    const isInitialized = useSelector<rootReducerType, boolean>(state => state.app.initialized)
    const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializedAppTC({}))
        dispatch(loginTC({data: {email: 'marinadegames@gmail.com', password: 'marina40', rememberMe: false}}))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC({newTitle: title}))
    }, [])

    if (!isInitialized) return <CircularLoading/>
    if (!isLoggedIn) return <Text style={{fontSize: 40, color: 'red'}}>YOU ARE NOT AUTHORIZED!</Text>

    return (
        <>
            <View style={styles.container}>
                <Header addTodolist={addTodolist}/>
                <TodolistsList/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#E3E9FF',
    },
});

