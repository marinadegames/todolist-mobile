import React from "react";
import {NativeBaseProvider} from "native-base";
import {Provider} from 'react-redux';
import {store} from "./redux/store";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {Button, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {DetailsProps, NavigationUseType, RootStackParamList, RootTabParamList, UsersProps} from "./src/navigation/types";
import {FontAwesome} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AppWrapper from "./AppWrapper";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const useAppNavigation = () => useNavigation<NavigationUseType>();

// const Stack = createDrawerNavigator<RootStackParamList>()


function HomeScreen() {
    const navigation = useAppNavigation()

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#9fffc6'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Home Screen</Text>
            <Button title={'Jump to User Screen'} onPress={() => {
                navigation.navigate('UsersScreen', {screen: 'Stack2'})
            }}/>
        </View>
    );
}

function UsersScreen({route,}: UsersProps) {

    const params = route.params
    const navigation = useAppNavigation()
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffb5b5'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Users Screen</Text>
            {/*{params &&*/}
            {/*    <>*/}
            {/*        <Text style={{fontSize: 20, fontWeight: 'bold'}}>ID: {params.id}</Text>*/}
            {/*        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Name: {params.name}</Text>*/}
            {/*        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Age: {params.age}</Text>*/}
            {/*    </>*/}
            {/*}*/}
            <Button title={'Jump to Details Screen'} onPress={() => navigation.navigate('Details')}/>
        </View>
    );
}

function Details({route,}: DetailsProps) {
    const params = route.params
    const navigation = useAppNavigation()
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff3a3'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Details Screen</Text>
            <Button title={'Jump to Home Screen'} onPress={() => navigation.navigate('Home')}/>
        </View>
    );
}

const Stack1 = () => {
    const navigation = useAppNavigation()
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffb5b5'}}>
            <Text>Stack1</Text>
            <Button title={'Jump to Home Screen'} onPress={() => navigation.navigate('UsersScreen', {screen: 'Stack2'})}/>
        </View>
    )
}
const Stack2 = () => {
    const navigation = useAppNavigation()
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#9ac9f1'}}>
            <Text>Stack2</Text>
            <Button title={'Jump to Home Screen'} onPress={() => navigation.navigate('UsersScreen', {screen: 'Stack3'})}/>
        </View>
    )
}
const Stack3 = () => {
    const navigation = useAppNavigation()
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff3a3'}}>
            <Text>Stack3</Text>
            <Button title={'Jump to Home Screen'} onPress={() => navigation.navigate('Details')}/>
        </View>
    )
}

const RootStackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Stack1'} component={Stack1}/>
            <Stack.Screen name={'Stack2'} component={Stack2}/>
            <Stack.Screen name={'Stack3'} component={Stack3}/>
        </Stack.Navigator>
    )
}


export default function App() {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <StatusBar style={'auto'} backgroundColor={'#E3E9FF'}/>
                <NavigationContainer>
                    <Tab.Navigator screenOptions={({route, navigation}) => {
                        console.log()
                        let iconName: string
                        if (route.name === 'Home') {
                            iconName = 'home'
                        }
                        if (route.name === 'UsersScreen') {
                            iconName = 'user'
                        }
                        if (route.name === 'Details') {
                            iconName = 'settings'
                        }
                        if (route.name == 'Todolists') {
                            iconName = 'list'
                        }
                        return {
                            tabBarIcon: ({focused}) => {
                                return <FontAwesome name={iconName as any} size={24} color={focused ? 'blue' : "black"}/>
                            }
                        }
                    }}>
                        <Tab.Screen name="Home" component={HomeScreen}/>
                        <Tab.Screen name="UsersScreen" component={RootStackNavigation}/>
                        <Tab.Screen name="Todolists" component={AppWrapper}/>
                        <Tab.Screen name="Details" component={Details}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </Provider>
        </NativeBaseProvider>
    );
}

// <NavigationContainer>
//     <Stack.Navigator screenOptions={({route, navigation}) => {
//         console.log()
//         let iconName: string
//         if (route.name === 'Home'){
//             iconName = 'home'
//         }
//         if (route.name === 'UsersScreen'){
//             iconName = 'user'
//         }
//         if (route.name === 'Details'){
//             iconName = 'settings'
//         }
//         return {
//             tabBarIcon: ({focused}) => {
//                 return <FontAwesome name={iconName as any} size={24} color={focused ? 'blue' : "black" } />
//             }
//         }
//     }}>
//         <Stack.Screen name="Home" component={HomeScreen}/>
//         <Stack.Screen name="UsersScreen" component={UsersScreen}/>
//         {/*<Stack.Screen name="Todolists" component={AppWrapper} />*/}
//         <Stack.Screen name="Details" component={Details}/>
//     </Stack.Navigator>
// </NavigationContainer>