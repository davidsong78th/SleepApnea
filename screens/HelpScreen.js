//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'

// create a component
const HelpScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Help Screen</Text>
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
        alignItems: 'center'
    }
});

//make this component available to the app
export default HelpScreen;
