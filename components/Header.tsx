import {StyleSheet, View, Text} from 'react-native';


export default function Header() {

    return (
        <View style={styles.headerBox}>
            <Text style={styles.textHeader}>Moon tasks</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBox: {
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
    },
    textHeader: {
        color: '#A073D8',
        fontSize: 30,
        fontWeight: 'bold'
    }
});
