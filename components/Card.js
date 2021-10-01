//import libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Card = (props) => {
    return <View style={{ ...styles.card, ...props.style }}>
        {props.children}
    </View>
};

// define your styles
const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    }
});

//make this component available to the app
export default Card;
