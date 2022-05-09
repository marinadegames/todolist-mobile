import {Animated, Easing, StyleSheet, View} from "react-native";
import React, {useEffect, useRef} from "react";

export const CircularLoading = () => {
    return (
        <View style={styles.container}>
            <Animated.View>
                <FadeInView>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View>
                            <View style={styles.circularLoading}/>
                            <View style={styles.circularLoading}/>
                        </View>
                        <View>
                            <View style={styles.circularLoading}/>
                            <View style={styles.circularLoading}/>
                        </View>
                    </View>
                </FadeInView>
            </Animated.View>
        </View>
    )
}


const FadeInView = (props: any) => {
    const rotateValue = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    useEffect(() => {
        Animated.loop(
            Animated.timing(
                rotateValue,
                {
                    toValue: 2,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ).start();
    }, [rotateValue])

    return (
        <Animated.View
            style={{
                ...props.style,
                transform: [{rotate}]

            }}
        >
            {props.children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E3E9FF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    circularLoading: {
        margin: 10,
        borderRadius: 100,
        backgroundColor: '#A073D8',
        height: 50,
        width: 50,
    }
});