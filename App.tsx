import React from "react";
import {NativeBaseProvider} from "native-base";
import {Provider} from 'react-redux';
import {store} from "./redux/store";
import {StatusBar} from "expo-status-bar";
import AppWrapper from "./AppWrapper";

export default function App() {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <StatusBar style={'auto'} backgroundColor={'#E3E9FF'}/>
                <AppWrapper/>
            </Provider>
        </NativeBaseProvider>
    );
}
