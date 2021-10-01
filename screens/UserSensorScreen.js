//import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import SensorItem from '../components/SensorItem';
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../constants/Colors';


// create a component
const UserSensorScreen = (props) => {
    const userDocument = props.navigation.getParam('userDocument')
    const dateCreated = props.navigation.getParam('dateCreated')

    const sensors = ['EEG', 'EOG', 'ECG']

    return (
        <ScrollView>
            <SensorItem
                title={sensors[0]}
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
    return {
        headerTitle: 'Sensors Log',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='back' iconName='arrow-back' onPress={() => {
                navData.navigation.goBack();
            }} />
        </HeaderButtons>,
        headerRight: () =>
            <Item title='Clinician' iconName={"user-md"} IconComponent={FontAwesome5} iconSize={26}
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                onPress={() => {
                    navData.navigation.navigate('ClinicianSensor')
                }}
            />
        ,
    }
}

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default UserSensorScreen;
