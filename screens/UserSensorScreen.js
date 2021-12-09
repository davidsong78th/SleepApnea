//import libraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Alert, Dimensions, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import { HeaderButtons, Item as ItemButton } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import SensorItem from '../components/SensorItem';
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../constants/Colors';
import * as userActions from '../store/users-action'
import { useDispatch } from 'react-redux'
import DropDownPicker from 'react-native-dropdown-picker';
import * as FileSystem from 'expo-file-system';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);


// create a component
const UserSensorScreen = (props) => {
    //Get props passed from ListScreen
    const userECGLog = props.navigation.getParam('userECGLog')
    const userEEGLog = props.navigation.getParam('userEEGLog')
    const userOxymeterLog = props.navigation.getParam('userOxymeterLog')
    const userStrainLog = props.navigation.getParam('userStrainLog')
    const userFlowLog = props.navigation.getParam('userFlowLog')
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

    // const sensorTitle = props.navigation.getParam('sensorTitle')

    const oneSecondSamplePoint = 1
    const oneMinuteSamplePoint = 60
    const oneHourSamplePoint = 3600

    const [showContent, setShowContent] = useState(false)

    //Sp02 contents
    const [min, setMin] = useState()
    const [max, setMax] = useState()
    const [desaturation, setDesaturation] = useState()
    const [Sp02, setSp02] = useState()
    const [timeLength, setTimeLength] = useState()
    const [event, setEvent] = useState([])
    const [timeStamp, setTimeStamp] = useState([])

    //Dropdown menu
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(92);
    const [items, setItems] = useState([
        { label: '88', value: 88 },
        { label: '89', value: 89 },
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

    const readOxymeterLogFile = async () => {
        const fileString = await FileSystem.readAsStringAsync(userOxymeterLog)
        const dataObj = JSON.parse(fileString)

        const data = dataObj.data

        //Find dip value for at least 10 seconds consecutively
        const limit = value                      //dip value limit
        var flag = 0, sum = 0, totalDip = 0, startIndex = 0, duration = 0, average = 0, limitFlag = 0
        var maxV = data[0].y, minV = data[0].y  //pick the first value as the min and max
        var occurenceTime = {}
        for (let x = 0; x < data.length; x++) {
            if (data[x].y < minV) {              //Find Min value
                minV = data[x].y
            }
            if (data[x].y > maxV) {              //Find Max value
                maxV = data[x].y
            }
            sum = sum + data[x].y               //Sum of all values
            if (data[x].y < limit) {            //if the y value is less than limit
                if (flag == 0) {                // check for first dip value
                    startIndex = data[x].x      //save start index
                    duration = duration + 1
                    flag = 1                    //set flag to 1
                } else {
                    duration = duration + 1
                }
            } else {
                if (duration >= 10) {           //if duration >= 10 secs, flag it
                    totalDip = totalDip + 1     //update totalAHI value
                    occurenceTime[startIndex] = duration
                }
                flag = duration = 0     //Reset
            }
        }
        average = (sum) / data.length

        setEvent(Object.values(occurenceTime))
        setTimeStamp(Object.keys(occurenceTime))

        setDesaturation(totalDip)
        setSp02(average)
        setMin(minV)
        setMax(maxV)
        setTimeLength(data.length)
    }

    const [avgAirFlow, setAvgAirFlow] = useState()
    const [minAirFlow, setMinAirFlow] = useState()
    const [maxAirFlow, setMaxAirFlow] = useState()

    const readFlowLogFile = async () => {
        const fileString = await FileSystem.readAsStringAsync(userFlowLog)
        const dataObj = JSON.parse(fileString)

        const data = dataObj.data

        var sum = 0, average = 0
        var maxV = data[0].y, minV = data[0].y  //pick the first value as the min and max
        for (let x = 0; x < data.length; x++) {
            if (parseFloat(data[x].y) <= minV) {              //Find Min value
                minV = parseFloat(data[x].y)
            }
            if (parseFloat(data[x].y) >= maxV) {              //Find Max value
                maxV = parseFloat(data[x].y)
            }
            sum = sum + parseFloat(data[x].y)              //Sum of all values
        }
        average = (sum) / data.length
        // console.log("SUM: " + sum)
        // console.log("max: " + maxV)
        // console.log("min: " + minV)
        // console.log("SUM: " + sum)
        // console.log("Average: " + average)
        setAvgAirFlow(average)
        setMinAirFlow(minV)
        setMaxAirFlow(maxV)
        setTimeLength(data.length)
    }

    useEffect(() => {
        readOxymeterLogFile()
    }, [userOxymeterLog, value])

    useEffect(() => {
        readFlowLogFile()
    }, [userFlowLog])

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
        return time
    })

    return (
        <SafeAreaView>
            {showContent ?
                <View>
                    <View>
                        <View style={styles.screen}>
                            <Text style={styles.text}>AirFlow</Text>
                            <View style={{ justifyContent: 'space-evenly', marginTop: 20 }}>
                                <Text style={styles.text2}>Max: {maxAirFlow.toFixed(2)} kPa          Min: {minAirFlow.toFixed(2)} kPa</Text>
                                <Text style={styles.text2}>Average/Hr:     {avgAirFlow.toFixed(2)} kPa</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.screen}>
                        <Text style={styles.text}>Sp02 Time & Event</Text>
                        <Text>Date Imported: {dateCreated} </Text>
                        <View style={styles.points}>
                            <Text>Limit</Text>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                style={{
                                    backgroundColor: "#e6cfff",
                                }}
                            />
                            <Text style={{ fontSize: 11 }}>*Note: Data based off of Oxymeter</Text>
                        </View>
                        <View style={{ justifyContent: 'space-evenly' }}>
                            <Text style={styles.text2}>                    Max: {max.toFixed(2)}           Min: {min.toFixed(2)}</Text>
                            <Text style={styles.text2}>Sp02 Desaturation: {desaturation}     Average/Hr: {Sp02.toFixed(2)}</Text>
                        </View>
                    </View>
                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.item}>
                            <Text style={{ ...styles.text, fontSize: 17 }}>Event (seconds)</Text>
                            <FlatList
                                data={event}
                                numColumns={1}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={itemData => {
                                    return (
                                        <Text>{itemData.item}</Text>
                                    )
                                }
                                }
                            />
                        </View>
                        <View style={styles.item}>
                            <Text style={{ ...styles.text, fontSize: 17 }}>Occur Time (H:M:S)</Text>
                            <FlatList
                                data={realTimeStamp}
                                numColumns={1}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={itemData => {
                                    return (
                                        <Text>{itemData.item}</Text>
                                    )
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
                : <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color={Colors.primary} />
                </View>
            }
        </SafeAreaView >
    );
};

UserSensorScreen.navigationOptions = navData => {
    const deleteItemHandler = navData.navigation.getParam('deleteItemHandler')
    const userECGLog = navData.navigation.getParam('userECGLog')
    const userEEGLog = navData.navigation.getParam('userEEGLog')
    const userOxymeterLog = navData.navigation.getParam('userOxymeterLog')
    const userStrainLog = navData.navigation.getParam('userStrainLog')
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
                        Alert.alert("Disclaimer...", "This is for Clinician ONLY", [{
                            text: 'Proceed',
                            onPress: () => navData.navigation.navigate('ClinicianSensor', {
                                userECGLog: userECGLog,
                                userEEGLog: userEEGLog,
                                userOxymeterLog: userOxymeterLog,
                                userStrainLog: userStrainLog,
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
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Dimensions.get("window").height / 2,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        marginVertical: 20,
        paddingBottom: 500,
    },
    points: {
        // flex: 1,
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
        fontSize: 20
    },
    text2: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: Colors.primary,
        fontSize: 16
    }
});

//make this component available to the app
export default UserSensorScreen;
