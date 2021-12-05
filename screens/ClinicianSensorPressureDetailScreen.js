//import libraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert, SafeAreaView, FlatList, ScrollView, SectionList } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Colors from '../constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker';
import { Item as ItemButton } from 'react-navigation-header-buttons';

// create a component
const UserSensorPressureDetailScreen = (props) => {
    //Get data passed from parent (Oxymeter Log)
    const documentPath = props.navigation.getParam('userDocument')
    if (!documentPath) {
        Alert.alert("Data Not Imported", `Import the Data Properly`,
            [{ text: 'Go Back', onPress: () => props.navigation.goBack() }])
        return false
    }
    const sensorTitle = props.navigation.getParam('sensorTitle')
    const dateCreated = props.navigation.getParam('dateCreated')
    // console.log(sensorTitle)

    const oneSecondSamplePoint = 1
    const oneMinuteSamplePoint = 60
    const oneHourSamplePoint = 3600

    //Setup data and read inputs
    const [showContent, setShowContent] = useState(false)

    const [min, setMin] = useState()
    const [max, setMax] = useState()
    const [desaturation, setHypopnea] = useState()
    const [Pressure, setPressure] = useState()
    const [timeLength, setTimeLength] = useState()
    const [event, setEvent] = useState([])
    const [timeStamp, setTimeStamp] = useState([])

    //Dropdown menu
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(92);
    const [items, setItems] = useState([
        { label: '90', value: 90 },
        { label: '91', value: 91 },
        { label: '92', value: 92 },
        { label: '93', value: 93 },
        { label: '94', value: 94 },
        { label: '95', value: 95 },
        { label: '96', value: 96 },
        { label: '97', value: 97 },
        { label: '98', value: 98 },
        { label: '99', value: 99 }
    ]);

    const readFile = async () => {
        const fileString = await FileSystem.readAsStringAsync(documentPath)
        const dataObj = JSON.parse(fileString)

        const data = dataObj.data

        //Find dip value for at least 10 seconds consecutively
        const limit = value                      //dip value limit
        var flag = 0, sum = 0, totalDip = 0, startIndex = 0, duration = 0, average = 0
        var maxV = data[0].y, minV = data[0].y   //pick the first value as the min and max
        var occurenceTime = {}
        for (let x = 0; x < data.length; x++) {
            if (data[x].y < minV) {              //Find Min value
                minV = data[x].y
            }
            if (data[x].y > maxV) {              //Find Max value
                maxV = data[x].y
            }
            sum = sum + data[x].y               //Sum of all values for averaging
            if (data[x].y < limit) {            //if the y value is less than limit
                if (flag == 0) {                // check for first dip value
                    startIndex = data[x].x      //save start index
                    duration = duration + 1
                    //sum = sum + data[x].y       //sum up the y values
                    flag = 1                    //set flag to 1
                } else {
                    duration = duration + 1
                    //sum = sum + data[x].y
                }
            } else {
                if (duration >= 10) {           //if duration >= 10 secs, flag it
                    totalDip = totalDip + 1     //update totalAHI value
                    occurenceTime[startIndex] = duration
                }
                flag = duration = 0             //Reset
            }
        }
        average = (sum) / data.length
        // console.log(occurenceTime)
        // console.log("Sum: " + sum)
        // console.log("Hypopnea: " + totalDip)
        // console.log("SpO2 average: " + average)
        // console.log("Max: " + maxV + ", Min: " + minV)

        setEvent(Object.values(occurenceTime))
        setTimeStamp(Object.keys(occurenceTime))

        setHypopnea(totalDip)
        setPressure(average)
        setMin(minV)
        setMax(maxV)
        setTimeLength(data.length)
    }

    useEffect(() => {
        readFile()
    }, [documentPath, value])

    useEffect(() => {
        setTimeout(() => {
            setShowContent(true)
        }, 600)
    }, [setShowContent])

    const realTimeStamp = timeStamp.map(element => {
        var elaspedHour = parseInt(element / oneHourSamplePoint)
        var modHour = element % oneHourSamplePoint
        var elapsedMinute = parseInt(modHour / oneMinuteSamplePoint)
        var modMinute = modHour % oneMinuteSamplePoint
        var elaspedSecond = parseInt(modMinute / oneSecondSamplePoint)
        if (elaspedHour < 10) {
            elaspedHour = "0" + elaspedHour
        }
        if (elapsedMinute < 10) {
            elapsedMinute = "0" + elapsedMinute
        }
        if (elaspedSecond < 10) {
            elaspedSecond = "0" + elaspedSecond
        }

        const time = `${elaspedHour}:${elapsedMinute}:${elaspedSecond}`
        // return Number(time)
        return time
    })
    // console.log(realTimeStamp)      //Convert timeStamp from string array of objects to int

    return (
        <SafeAreaView>
            {showContent ?
                <View>
                    <View style={styles.screen}>
                        <Text style={styles.text}>{sensorTitle} Log</Text>
                        <Text>Date Imported: {dateCreated} </Text>
                        <View style={{ justifyContent: 'space-evenly', marginTop: 20 }}>
                            <Text style={styles.text2}>Max: {max}           Min: {min}</Text>
                            <Text style={styles.text2}>Average/Hr: {Pressure}</Text>
                        </View>
                    </View>
                </View>
                : <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color={Colors.primary} />
                </View>
            }
        </SafeAreaView >
    )
};

UserSensorPressureDetailScreen.navigationOptions = navData => {
    const sensorTitle = navData.navigation.getParam('sensorTitle')
    return {
        headerTitle: sensorTitle,
    }
}

// define your styles
const styles = StyleSheet.create({
    screen: {
        // flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Dimensions.get("window").height / 2,
    },
    container: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        // padding: 10,
        marginVertical: 10,
        paddingBottom: 500
    },
    points: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        width: '50%', // is 50% of container width
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,

    },
    text2: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: Colors.primary,
        fontSize: 16
    }
});

//make this component available to the app
export default UserSensorPressureDetailScreen;
