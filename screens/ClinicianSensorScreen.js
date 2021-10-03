//import libraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import SensorItem from '../components/SensorItem';


// create a component
const ClinicianSensorScreen = (props) => {

    const sensors = ['AHI', 'Oximeter', 'Pressure', 'EEG', 'EOG', 'ECG']

    //Pass props from parent
    const userDocument = props.navigation.getParam('userDocument')
    const dateCreated = props.navigation.getParam('dateCreated')

    return (
        <ScrollView>
            <SensorItem
                title={sensors[0]}
                name="heartbeat"
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
                name="heartbeat"
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
            <SensorItem
                title={sensors[3]}
                name="heartbeat"
                onSelect={() => {
                    props.navigation.navigate('ClinicianSensorDetail', {
                        userDocument: userDocument,     //change this for each specific sensor file
                        sensorTitle: sensors[3],
                        dateCreated: dateCreated
                    });
                }}
            />
            <SensorItem
                title={sensors[4]}
                name="heartbeat"
                onSelect={() => {
                    props.navigation.navigate('ClinicianSensorDetail', {
                        userDocument: userDocument,     //change this for each specific sensor file
                        sensorTitle: sensors[4],
                        dateCreated: dateCreated
                    });
                }}
            />
            <SensorItem
                title={sensors[5]}
                name="heartbeat"
                onSelect={() => {
                    props.navigation.navigate('ClinicianSensorDetail', {
                        userDocument: userDocument,     //change this for each specific sensor file
                        sensorTitle: sensors[5],
                        dateCreated: dateCreated
                    });
                }}
            />
        </ScrollView>
    )
};

ClinicianSensorScreen.navigationOptions = {
    headerTitle: 'Clinician Mode'
}

// define your styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

//make this component available to the app
export default ClinicianSensorScreen;
