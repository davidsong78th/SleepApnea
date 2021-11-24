//import libraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item as ItemButton } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import SensorItem from '../components/SensorItem';
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../constants/Colors';
import * as userActions from '../store/users-action'
import { useDispatch } from 'react-redux'


const hours = new Array(11).fill('').map((item, index) => {
    return index;
})
const minutes = new Array(60).fill('').map((item, index) => {
    return index;
})
const seconds = [0, 10, 20, 30, 40, 50].map((item, index) => {
    return item;
})

const Item = ({ text, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.item, isSelected && styles.itemIsSelected]}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

// create a component
const UserSensorScreen = (props) => {
    //Get props passed from ListScreen
    const userECGLog = props.navigation.getParam('userECGLog')
    const userEEGLog = props.navigation.getParam('userEEGLog')
    const userOxymeterLog = props.navigation.getParam('userOxymeterLog')
    const userPressureLog = props.navigation.getParam('userPressureLog')
    const userFlowLog = props.navigation.getParam('userFlowLog')
    console.log(userFlowLog)
    console.log(userPressureLog)
    const userSnoreLog = props.navigation.getParam('userSnoreLog')
    const dateCreated = props.navigation.getParam('dateCreated')
    const userId = props.navigation.getParam('userId')
    const userTitle = props.navigation.getParam('userTitle')

    const dispatch = useDispatch()

    //For deleting log
    const deleteItemHandler = useCallback(async (id, title) => {
        Alert.alert(`Delete ${title} Log?`, 'There is no way of recovering it.', [
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(userActions.deleteUsers(id))
                    props.navigation.goBack()
                }
            },
            { text: 'No', style: 'default' }
        ])
    }, [dispatch])

    useEffect(() => {
        props.navigation.setParams({ 'deleteItemHandler': () => deleteItemHandler(userId, userTitle) })
    }, [deleteItemHandler])

    //Available Sensors for users
    const sensors = ['Flow', 'Pressure', 'Oximeter', 'EEG']

    //Date Time Picker
    const [selectedHour, setSelectedHour] = useState(0);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedSeconds, setSelectedSeconds] = useState(0);

    return (
        <View style={styles.screen}>
            <View style={styles.bar}>
                <Text style={styles.timestamp}>Elapsed Time</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.heading}>Hours</Text>
                    <ScrollView >
                        {
                            hours.map((item, index) => {
                                return <Item
                                    onPress={() => setSelectedHour(item)}
                                    text={item}
                                    key={item}
                                    isSelected={selectedHour === index}
                                />
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.row}>
                    <Text style={styles.heading}>Minutes</Text>
                    <ScrollView>
                        {
                            minutes.map((item, index) => {
                                return <Item
                                    onPress={() => setSelectedMinute(item)}
                                    text={item}
                                    key={item}
                                    isSelected={selectedMinute === index}
                                />
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.row}>
                    <Text style={styles.heading}>Seconds</Text>
                    <ScrollView >
                        {
                            seconds.map((item, index) => {
                                return <Item
                                    onPress={() => setSelectedSeconds(item)}
                                    text={item}
                                    key={item}
                                    isSelected={selectedSeconds === item}
                                />
                            })
                        }
                    </ScrollView>
                </View>
            </View>

            <ScrollView>
                <SensorItem
                    title={sensors[0]}
                    name="head-side-mask"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorDetail500SampleSecScreen', {
                            userDocument: userFlowLog,     //change this for each specific sensor file
                            sensorTitle: sensors[0],
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
                <SensorItem
                    title={sensors[1]}
                    name="heart"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorDetail500SampleSecScreen', {
                            userDocument: userPressureLog,  //change this for each specific sensor file
                            sensorTitle: sensors[1],
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
                <SensorItem
                    title={sensors[2]}
                    name="heartbeat"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorDetail500SampleSecScreen', {
                            userDocument: userOxymeterLog, //change this for each specific sensor file
                            sensorTitle: sensors[2],
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
                <SensorItem
                    title={sensors[3]}
                    name="heartbeat"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorDetail500SampleSecScreen', {
                            // userDocument: userDocument, //change this for each specific sensor file
                            userDocument: userEEGLog,
                            sensorTitle: sensors[2],
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
            </ScrollView>
        </View>
    );
};

UserSensorScreen.navigationOptions = navData => {
    const deleteItemHandler = navData.navigation.getParam('deleteItemHandler')
    const userECGLog = navData.navigation.getParam('userECGLog')
    const userEEGLog = navData.navigation.getParam('userEEGLog')
    const userOxymeterLog = navData.navigation.getParam('userOxymeterLog')
    const userPressureLog = navData.navigation.getParam('userPressureLog')
    const userFlowLog = navData.navigation.getParam('userFlowLog')
    const userSnoreLog = navData.navigation.getParam('userSnoreLog')
    const dateCreated = navData.navigation.getParam('dateCreated')

    return {
        headerTitle: 'Sensors Log',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <ItemButton title='back' iconName='arrow-back' onPress={() => {
                navData.navigation.goBack();
            }} />
        </HeaderButtons>,
        headerRight: () =>
            <View style={{ flexDirection: "row" }}>
                <ItemButton title='delete' iconName={"trash-alt"} IconComponent={FontAwesome5} iconSize={23}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={deleteItemHandler}
                />
                <ItemButton title='Clinician' iconName={"user-md"} IconComponent={FontAwesome5} iconSize={23}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={() => {
                        Alert.alert("Disclaimer...", "This is for Clinician Use ONLY", [{
                            text: 'I Am A Clinician',
                            onPress: () => navData.navigation.navigate('ClinicianSensor', {
                                userECGLog: userECGLog,
                                userEEGLog: userEEGLog,
                                userOxymeterLog: userOxymeterLog,
                                userPressureLog: userPressureLog,
                                userFlowLog: userFlowLog,
                                userSnoreLog: userSnoreLog,
                                dateCreated: dateCreated,
                            })
                        }, { text: 'Back' }])

                    }}
                />

            </View>
    }
}

// define your styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    timestamp: {
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 17
    },
    container: {
        flexDirection: 'row',
        height: 135,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flex: 1,
        height: 100,
    },
    heading: {
        fontSize: 13,
        // fontWeight: 'bold',
        textAlign: 'center'
    },
    item: {
        margin: 1,
        padding: 10,
        backgroundColor: '#f2e6ff',
        borderColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemIsSelected: {
        backgroundColor: 'gold'
    },
    loadButton: {
        borderRadius: 25,
        padding: 3,
        marginTop: 10,
        paddingHorizontal: 70
    }
});

//make this component available to the app
export default UserSensorScreen;
