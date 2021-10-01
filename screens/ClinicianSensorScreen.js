//import libraries
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

// create a component
const ClinicianSensorScreen = (props) => {
    Alert.alert("Disclaimer", "This Mode Is For Clinician Use ONLY", [{ text: 'I Am A Clinician' }, { text: 'Go Back', onPress: () => props.navigation.goBack() }])
    return <View style={styles.screen}>
        <Text>Clinician screen</Text>
    </View>
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
