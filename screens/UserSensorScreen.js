//import libraries
import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import SensorItem from '../components/SensorItem';
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../constants/Colors';
import * as userActions from '../store/users-action'
import { useDispatch } from 'react-redux'


// create a component
const UserSensorScreen = (props) => {
    //Get props passed from ListScreen
    const userDocument = props.navigation.getParam('userDocument')
    const dateCreated = props.navigation.getParam('dateCreated')
    const userId = props.navigation.getParam('userId')
    const userTitle = props.navigation.getParam('userTitle')

    const dispatch = useDispatch()

    //For deleting log
    const deleteItemHandler = useCallback(async (id, title) => {
        Alert.alert(`Delete ${title} Log?`, 'There is no way of recovering it.', [
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(userActions.deleteUsers(id))
                    props.navigation.goBack()
                }
            },
            { text: 'No', style: 'default' }
        ])
    }, [dispatch])

    useEffect(() => {
        props.navigation.setParams({ 'deleteItemHandler': () => deleteItemHandler(userId, userTitle) })
    }, [deleteItemHandler])

    //Available Sensors for users
    const sensors = ['AHI', 'Oximeter', 'ECG']

    return (
        <ScrollView>
            <SensorItem
                title={sensors[0]}
                name="head-side-mask"
                onSelect={() => {
                    props.navigation.navigate('UserSensorDetail', {
                        userDocument: userDocument,     //change this for each specific sensor file
                        sensorTitle: sensors[0],
                        dateCreated: dateCreated
                    });
                }}
            />
            <SensorItem
                title={sensors[1]}
                name="heart"
                onSelect={() => {
                    props.navigation.navigate('ClinicianSensorDetail', {
                        userDocument: userDocument,  //change this for each specific sensor file
                        sensorTitle: sensors[1],
                        dateCreated: dateCreated
                    });
                }}
            />
            <SensorItem
                title={sensors[2]}
                name="heartbeat"
                onSelect={() => {
                    props.navigation.navigate('ClinicianSensorDetail', {
                        userDocument: userDocument, //change this for each specific sensor file
                        sensorTitle: sensors[2],
                        dateCreated: dateCreated
                    });
                }}
            />
        </ScrollView>
    );
};


UserSensorScreen.navigationOptions = navData => {
    const deleteItemHandler = navData.navigation.getParam('deleteItemHandler')
    const userDocument = navData.navigation.getParam('userDocument')
    const dateCreated = navData.navigation.getParam('dateCreated')
    return {
        headerTitle: 'Sensors Log',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='back' iconName='arrow-back' onPress={() => {
                navData.navigation.goBack();
            }} />
        </HeaderButtons>,
        headerRight: () =>
            <View style={{ flexDirection: "row" }}>
                <Item title='delete' iconName={"trash-alt"} IconComponent={FontAwesome5} iconSize={23}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={deleteItemHandler}
                />
                <Item title='Clinician' iconName={"user-md"} IconComponent={FontAwesome5} iconSize={23}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={() => {
                        Alert.alert("Disclaimer...", "This is for Clinician Use ONLY", [{
                            text: 'I Am A Clinician',
                            onPress: () => navData.navigation.navigate('ClinicianSensor', {
                                userDocument: userDocument,
                                dateCreated: dateCreated
                            })
                        }, { text: 'Back' }])

                    }}
                />

            </View>
        ,
    }
}

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default UserSensorScreen;
