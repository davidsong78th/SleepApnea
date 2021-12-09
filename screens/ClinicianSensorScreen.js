//import libraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SensorItem from '../components/SensorItem';

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
const ClinicianSensorScreen = (props) => {

    const sensors = ['ECG', 'EEG', 'Oxymeter', 'Respiratory Movement', 'AirFlow', 'Snore']

    //Pass props from parent
    const userECGLog = props.navigation.getParam('userECGLog')
    const userEEGLog = props.navigation.getParam('userEEGLog')
    const userOxymeterLog = props.navigation.getParam('userOxymeterLog')
    const userStrainLog = props.navigation.getParam('userStrainLog')
    const userFlowLog = props.navigation.getParam('userFlowLog')
    const userSnoreLog = props.navigation.getParam('userSnoreLog')
    const dateCreated = props.navigation.getParam('dateCreated')

    //Date Time Picker
    const [selectedHour, setSelectedHour] = useState(0);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedSeconds, setSelectedSeconds] = useState(0);

    return (
        <View style={styles.screen}>
            <View style={styles.time}>
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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 11 }}>*Note: Sp02 is NOT affected by Elasped Time</Text>
            </View>
            <ScrollView>
                <SensorItem
                    title="Sp02 Event"
                    name="head-side-mask"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorSp02Detail', {
                            userDocument: userOxymeterLog,     //use Oxymeter to caluclate AHI
                            sensorTitle: "Sp02",
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
                <SensorItem
                    title="Respiratory Movement (Strain)"
                    name="prescription-bottle-alt"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorDetail100SampleSec', {
                            userDocument: userStrainLog,     //change this for each specific sensor file
                            sensorTitle: "Respiratory Movement",
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
                <SensorItem
                    title="ECG"
                    name="heart"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorDetail400SampleSec', {
                            userDocument: userECGLog,     //change this for each specific sensor file
                            sensorTitle: "ECG",
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
                <SensorItem
                    title="EEG"
                    name="heartbeat"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorDetail400SampleSec', {
                            userDocument: userEEGLog,  //change this for each specific sensor file
                            sensorTitle: "EEG",
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
                <SensorItem
                    title="Oxymeter"
                    name="head-side-cough"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorDetail10SampleSec', {
                            userDocument: userOxymeterLog, //change this for each specific sensor file
                            sensorTitle: "Oxymeter",
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
                <SensorItem
                    title="AirFlow"
                    name="medrt"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorDetail25SampleSec', {
                            userDocument: userFlowLog,     //change this for each specific sensor file
                            sensorTitle: "AirFlow",
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
                <SensorItem
                    title="Snore"
                    name="bed"
                    onSelect={() => {
                        props.navigation.navigate('ClinicianSensorDetail100SampleSec', {
                            userDocument: userSnoreLog,     //change this for each specific sensor file
                            sensorTitle: "Snore",
                            dateCreated: dateCreated,
                            selectedHour: selectedHour,
                            selectedMinute: selectedMinute,
                            selectedSeconds: selectedSeconds
                        });
                    }}
                />
            </ScrollView>
        </View >
    )
};

ClinicianSensorScreen.navigationOptions = {
    headerTitle: 'Clinician Mode'
}

// define your styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    time: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 10
    },
    timestamp: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 17,
    },
    container: {
        flexDirection: 'row',
        height: 135,
        padding: 10,
        // marginTop: 10,
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
export default ClinicianSensorScreen;
