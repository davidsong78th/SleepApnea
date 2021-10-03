//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const GreyCard = (props) => {
    return <View style={{ ...styles.card, ...props.style }}>
        {props.children}
    </View>
};

// define your styles
const styles = StyleSheet.create({
    card: {
        borderRadius: 25,
        backgroundColor: '#ebebeb',
        marginBottom: 10,
        padding: 5
    }
});

//make this component available to the app
export default GreyCard;
