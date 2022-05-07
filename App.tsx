import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {useState} from "react";
import {NativeBaseProvider, Checkbox} from "native-base";
import Header from "./components/Header";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export default function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {
            id: 1,
            title: 'HTML',
            isDone: true
        },
        {
            id: 2,
            title: 'React',
            isDone: true
        },
        {
            id: 3,
            title: 'React-native',
            isDone: false
        },
    ])


    const changeIsDone = (id: number, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: !isDone} : t))
    }

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <StatusBar style={'auto'} backgroundColor={'#E3E9FF'}/>

                <Header/>

                <View style={styles.todolistBlock}>
                    {tasks.map(t => {
                        return (
                            <View key={t.id} style={styles.box}>
                                <Text style={styles.taskFont}>{t.title}</Text>
                                <Checkbox isChecked={t.isDone}
                                          style={styles.checkBox}
                                          accessibilityLabel={'123'}
                                          onChange={() => changeIsDone(t.id, t.isDone)}
                                          value={'test'}/>
                            </View>
                        )
                    })}
                </View>
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
    todolistBlock: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'red',
    },
    taskFont: {
        fontSize: 25,
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkBox: {}
});
