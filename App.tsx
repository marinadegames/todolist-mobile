import React from "react";
import {NativeBaseProvider} from "native-base";
import {Provider} from 'react-redux';
import {store} from "./redux/store";
import AppWrapper from "./AppWrapper";


export default function App() {
    return (
        <NativeBaseProvider>
            <Provider store={store}>
                <AppWrapper/>
            </Provider>
        </NativeBaseProvider>
    );
}


