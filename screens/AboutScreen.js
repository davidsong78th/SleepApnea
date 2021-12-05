//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import Icon from 'react-native-vector-icons/Ionicons';


// create a component
const AboutScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Designed with React Native</Text>
            <Text>Team 1307, Senior Design Fall 2021</Text>
            <Icon name="ios-logo-react" size={100} color="#61DBFB" />
            <Text>David Song, Ivan Pantoja</Text>
            <Text>Jignesh Mangarolia, Adam Gruszecki, Tanner Doidge</Text>
        </View>
    )
};

AboutScreen.navigationOptions = navData => {
    return {
        headerTitle: 'About',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='About' iconName='ios-menu' onPress={() => {
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
export default AboutScreen;
