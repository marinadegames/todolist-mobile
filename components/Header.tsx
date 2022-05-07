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
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
    },
    textHeader: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});
