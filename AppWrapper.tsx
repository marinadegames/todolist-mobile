import {StatusBar} from 'expo-status-bar';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from "react";
import Header from "./components/Header";
import {useAppDispatch} from "./redux/store";


export default function AppWrapper() {

    // const error = useSelector<RootState<any, any, any>, string | null>(state => state.app.error)
    // const notification = useSelector<rootReducerType, string | null>(state => state.app.notification)
    // const isInitialized = useSelector<rootReducerType, boolean>(state => state.app.initialized)
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(initializedAppTC({}))
    // }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        // dispatch(addTodolistTC({newTitle: title}))
    }, [])

    // if (!isInitialized) return <CircularLoading/>

    const [show, setShow] = useState<boolean>(true)
    const animatedValue = React.useRef(new Animated.Value(0)).current
    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -200],
    })
    const startAnimate = (show: boolean) => {
        if (show) {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start()
        }
    }

    return (
        <>
            <View style={styles.container}>
                <StatusBar style={'auto'} backgroundColor={'#E3E9FF'}/>
                <Header addTodolist={addTodolist}/>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    {/*<TodolistsList/>*/}
                </ScrollView>
            </View>
            <Animated.View style={{...styles.containerAbsolute, transform: [{translateY}]}}>
                <View style={{height: 40}}>
                    <Text style={styles.separator} onPress={() => {
                        setShow(!show)
                        startAnimate(show)
                    }}/>
                </View>
                <View style={{height: 200}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: '#8992ac',}}>SETTINGS</Text>
                </View>
            </Animated.View>
        </>
    )
        ;
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#E3E9FF',
    },
    scrollView: {
        marginTop: 30,
        width: '100%',
    },
    containerAbsolute: {
        position: 'absolute',
        bottom: -200,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
    },
    separator: {
        width: 100,
        height: 12,
        backgroundColor: '#A073D8',
        borderRadius: 14 / 2,
        marginTop: 12
    }
});
