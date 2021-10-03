//import libraries
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import Card from './Card';
import Icon from 'react-native-vector-icons/FontAwesome5';

// create a component
const SensorItem = (props) => {
    return (
        <Card style={styles.item}>
            <View style={styles.touchable}>
                <TouchableOpacity onPress={props.onSelect} style={styles.SensorItem} >
                    <View style={styles.infoContainer}>
                        <Icon name={props.name} size={30} color={Colors.primary} />
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Card>
    );
};

// define your styles
const styles = StyleSheet.create({
    item: {
        margin: 10,
        paddingVertical: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    SensorItem: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 10,
    },
    infoContainer: {
        width: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

//make this component available to the app
export default SensorItem;
