//import libraries
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors';

// create a component
const HelpScreen = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.primary }}>Instructions before using App{"\n"}</Text>
            <Image style={styles.image} source={require('../assets/thumbup.png')} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ alignSelf: 'flex-start', paddingHorizontal: 30 }}>
                    <Text>1. Place the ECG and EEG sensors on the appropriate spots.{"\n"}</Text>
                    <Text>2. Place the cannula with the air valves inside the users nose and tubes wrapping around their ears.{"\n"}</Text>
                    <Text>3. Place the oximeter sensor on the users dominant hands index finger.{"\n"}</Text>
                    <Text>4. Wrap the belt around the chest and secure it by a attaching both ends together until you hear a loud click.{"\n"}</Text>
                </View>
            </View>
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.primary, paddingHorizontal: 30 }}>Now, connect the sleep apnea detection device to the included power bank and follow these steps.{"\n"}</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ alignSelf: 'flex-start', paddingHorizontal: 30 }}>
                    <Text>1. Hold down the red button for 3 seconds or until the LED turns on to green.{"\n"}</Text>
                    <Text>2. Sleep as you normally would, the device will do the rest.{"\n"}</Text>
                    <Text>3. When you wake up, hold down the red button once more until the green LED turns off.{"\n"}</Text>
                    <Text>4. Connect your Bluetooth compatible smartphone to the sleep apnea device through its Bluetooth settings.{"\n"}</Text>
                    <Text>5. Hold down the blue button for 3 seconds to transfer the nights sleeping data to your smartphone.{"\n"}</Text>
                    <Text>6. Accept the zipped file on your phone.{"\n"}</Text>
                    <Text>7. Open the sleep apnea detection device app, named Sleep Easy, and go to the sensors page.{"\n"}</Text>
                    <Text>8. Import the individual sensor data into their appropriate sections.{"\n"}</Text>
                    <Text>Your app is now ready to display the collected data!{"\n"}</Text>
                </View>
            </View>
        </ScrollView>
    )
};


HelpScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Help',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Help' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>
    }
}

// define your styles
const styles = StyleSheet.create({
    screen: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10
    },
    image: {
        width: 100,
        height: 100
    }
});

//make this component available to the app
export default HelpScreen;
