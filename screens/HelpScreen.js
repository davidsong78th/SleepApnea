//import libraries
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'

// create a component
const HelpScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Coming Soon...</Text>
            <Image style={styles.image} source={require('../assets/thumbup.png')} />
            <Text></Text>
        </View>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image: {
        width: 300,
        height: 300
    }
});

//make this component available to the app
export default HelpScreen;
