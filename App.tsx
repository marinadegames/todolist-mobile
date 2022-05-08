import {StatusBar} from 'expo-status-bar';
import {ScrollView, StyleSheet, View, Text, Alert, Animated} from 'react-native';
import React, {useState} from "react";
import {NativeBaseProvider} from "native-base";
import Header from "./components/Header";
import Todolist from "./components/Todolist";


export default function App() {

    const [show, setShow] = useState<boolean>(true)
    const animatedValue = React.useRef(new Animated.Value(0)).current

    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -80],
    })

    const startAnimate = (show: boolean) => {
        if (show) {
            Animated.timing(animatedValue, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(animatedValue, {
                toValue: 0,
                useNativeDriver: true
            }).start()
        }
    }

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <StatusBar style={'auto'} backgroundColor={'#E3E9FF'}/>
                <Header/>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <Todolist/>
                </ScrollView>
            </View>

            <Animated.View style={{...styles.containerAbsolute, transform: [{translateY}]}}>
                <View style={{height: 40}}>
                    <Text style={styles.separator} onPress={() => {
                        setShow(!show)
                        startAnimate(show)
                    }}/>
                </View>
                <View style={{height: 80, backgroundColor: 'green'}}>
                    <Text>Input</Text>
                </View>
            </Animated.View>

        </NativeBaseProvider>
    );
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
        bottom: -80,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
    },
    separator: {
        width: 100,
        height: 10,
        backgroundColor: '#A073D8',
        borderRadius: 10 / 2,
        marginTop: 15
    }
});

