import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Button} from "native-base";
import {filterTasksType} from "./Todolist";

type PropsType = {
    filterType: filterTasksType
    changeFilterType: (filter: filterTasksType) => void
}

export default function FilterButtons({filterType, changeFilterType}: PropsType) {

    const changeFilterFoo = (value: filterTasksType) => {
        changeFilterType(value)
    }

    return (
        <View style={styles.filtersTodolist}>
            <Button style={filterType === 'ALL' ? {backgroundColor: '#A073D8'} : {backgroundColor: '#fff'}}
                    w={'30%'}
                    size={"xs"}
                    variant={'outline'}
                    borderWidth={2}
                    borderRadius={8}
                    borderColor={'#A073D8'}
                    onPress={() => changeFilterFoo('ALL')}>
                <Text style={
                    filterType === 'ALL'
                        ? {color: '#fff', fontWeight: 'bold'}
                        : {color: '#A073D8', fontWeight: 'bold'}
                }>ALL</Text>
            </Button>
            <Button style={filterType === 'ACTIVE' ? {backgroundColor: '#E37482'} : {backgroundColor: '#fff'}}
                    w={'30%'}
                    size={"xs"}
                    variant={'outline'}
                    borderWidth={2}
                    borderRadius={8}
                    borderColor={'#E37482'}
                    onPress={() => changeFilterFoo('ACTIVE')}>
                <Text style={
                    filterType === 'ACTIVE'
                        ? {color: '#fff', fontWeight: 'bold'}
                        : {color: '#E37482', fontWeight: 'bold'}
                }>ACTIVE</Text>
            </Button>
            <Button style={filterType === 'COMPLETED' ? {backgroundColor: '#2EAC64'} : {backgroundColor: '#fff'}}
                    w={'30%'}
                    size={"xs"}
                    variant={'outline'}
                    borderWidth={2}
                    borderRadius={8}
                    borderColor={'#2EAC64'}
                    onPress={() => changeFilterFoo('COMPLETED')}>
                <Text style={
                    filterType === 'COMPLETED'
                        ? {color: '#fff', fontWeight: 'bold'}
                        : {color: '#2EAC64', fontWeight: 'bold'}
                }>COMPL</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    filtersTodolist: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
