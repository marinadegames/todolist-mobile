import {StyleSheet, View, Text} from 'react-native';
import {useState} from "react";
import {Checkbox} from "native-base";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}


export default function Todolist() {

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
        if (isDone){
            setTasks(tasks.map(t => t.id === id ? {...t, isDone: false} : t))
        }
        else {
            setTasks(tasks.map(t => t.id === id ? {...t, isDone: true} : t))
        }


    }



    return (
        <View style={styles.todolist}>

            <View style={styles.todolistTitleBox}>
                <Text style={styles.todolistTitle}>Study: </Text>
            </View>

            {/*TASKS*/}
            <View style={styles.todolistBlock}>
                {tasks.map(t => {
                    return (
                        <View key={t.id} style={styles.taskBox}>
                            <Text style={t.isDone ? styles.taskFontIsDone : styles.taskFont}>{t.title}</Text>
                            <Checkbox isChecked={t.isDone}
                                      accessibilityLabel={'123'}
                                      size={"lg"}
                                      colorScheme="purple"
                                      onChange={() => changeIsDone(t.id, t.isDone)}
                                      value={'purple'}/>
                        </View>
                    )
                })}
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    todolist: {
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
    },
    todolistTitleBox: {
        backgroundColor: '#A073D8',
        borderRadius: 5,

        marginBottom: 10,
        paddingVertical: 5,
        paddingLeft: 10,
    },
    todolistTitle: {
        fontSize: 28,
        color: '#fff',
    },
    todolistBlock: {
        width: '100%',
    },
    taskFont: {
        color: '#8992ac',
        fontSize: 25,
    },
    taskFontIsDone: {
        color: '#8992ac',
        fontSize: 25,
        textDecorationLine: 'line-through',
        opacity: 0.5,
    },
    taskBox: {
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
