//import libraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert, Platform } from 'react-native';
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis, VictoryTooltip, VictoryGroup, VictoryScatter, VictoryLabel, createContainer, VictoryVoronoiContainer } from "victory-native";
import * as FileSystem from 'expo-file-system';
import Colors from '../constants/Colors';
import { Item } from 'react-navigation-header-buttons';
import { FontAwesome5 } from '@expo/vector-icons'
import DropDownPicker from 'react-native-dropdown-picker';


// create a component
const ClinicianSensorDetail100SampleScreen = (props) => {
    //Get data passed from parent
    const documentPath = props.navigation.getParam('userDocument')
    if (!documentPath) {
        Alert.alert("Data Not Imported", `Import the Data Properly`,
            [{ text: 'Go Back', onPress: () => props.navigation.goBack() }])
        return false
    }
    const sensorTitle = props.navigation.getParam('sensorTitle')
    const dateCreated = props.navigation.getParam('dateCreated')

    const selectedHour = props.navigation.getParam('selectedHour')
    const selectedMinute = props.navigation.getParam('selectedMinute')
    const selectedSeconds = props.navigation.getParam('selectedSeconds')

    const oneSecondSamplePoint = 100
    const oneMinuteSamplePoint = 6000
    const oneHourSamplePoint = 360000

    //Setup data and read inputs
    const [fileData, setFileData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [showContent, setShowContent] = useState(false)

    // //Dropdown menu
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(100);
    const [items, setItems] = useState([
        { label: 'Low', value: 100 },
        { label: 'Medium', value: 500 },
        { label: 'High', value: 1000 }
    ]);
    // // console.log(value)

    const readFile = async () => {
        const fileString = await FileSystem.readAsStringAsync(documentPath)
        const dataObj = JSON.parse(fileString)

        var data = dataObj.data
        data = data.map((item, index) => {
            item.x = item.x / 100
            item.y = (item.y * 3.3) / 4096
            var obj = {}
            obj["x"] = item.x
            obj["y"] = item.y
            return obj;
        })
        setFileData(data)

        //Show total elasped time from the file
        const totalTime = data.length
        const elaspedHour = parseInt(totalTime / oneHourSamplePoint)
        const modHour = totalTime % oneHourSamplePoint
        const elapsedMinute = parseInt(modHour / oneMinuteSamplePoint)
        const modMinute = modHour % oneMinuteSamplePoint
        const elaspedSecond = parseInt(modMinute / oneSecondSamplePoint)

        //Get the user selected elapsed time
        const selectedTimeAsXValues = selectedHour * oneHourSamplePoint + selectedMinute * oneMinuteSamplePoint + selectedSeconds * oneSecondSamplePoint

        //Check if selectedTime is out of bound of array
        const maxPoints = totalTime - oneSecondSamplePoint * 10

        //If it is, go pick another time
        if (selectedTimeAsXValues > maxPoints) {
            Alert.alert("Data Out of Bound", `\nElasped Time: \n${elaspedHour} hours: ${elapsedMinute} minutes: ${elaspedSecond} seconds\n\nPick Sample Time Last Than Total Elapsed Time by 10 seconds`,
                [{ text: 'Go Back', onPress: () => props.navigation.goBack() }])
        }
        else {
            // selectedTime + 5000 data points = 10 sec data
            setFilteredData(data.slice(selectedTimeAsXValues, selectedTimeAsXValues + oneSecondSamplePoint * 10))
        }
    }

    useEffect(() => {
        readFile()
    }, [documentPath, value])

    useEffect(() => {
        setTimeout(() => {
            setShowContent(true)
        }, 600)
    }, [setShowContent])

    //Chart Configurations
    const [zoomDomain, setZoomDomain] = useState();
    const [selectedDomain, setSelectedDomain] = useState();

    const handleZoom = (domain) => {
        setSelectedDomain(domain);
    };

    const handleBrush = (domain) => {
        setZoomDomain(domain);
    };

    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    //Filter large data set to speedup chart performance
    const getData = (data, maxPoints) => {
        const filtered = filteredData

        if (filtered.length > maxPoints) {
            // limit k to powers of 2, e.g. 64, 128, 256
            // so that the same points will be chosen reliably, reducing flicker
            const k = Math.ceil(filtered.length / maxPoints);
            return filtered.filter(
                (d, i) => ((i % k) === 0)
            );
        }
        return filtered;
    }
    const sampledPoints = value //from dropdown menu
    const sampledData = getData(fileData, sampledPoints)
    // console.log(sampledData)

    //Show Data points handler
    const [showDataPoints, setShowDataPoints] = useState(false)

    const dataPointsHandler = useCallback(async () => {
        setShowDataPoints(prevState => !prevState)
    }, [showDataPoints])

    useEffect(() => {
        props.navigation.setParams({ 'dataPointsHandler': () => dataPointsHandler() })
    }, [dataPointsHandler])

    return (
        <View>
            {showContent ?
                <View style={styles.screen}>
                    <Text style={styles.text}>{sensorTitle} Chart</Text>
                    <Text>Date Imported: {dateCreated} </Text>
                    <View style={styles.points}>
                        <Text>{sensorTitle == "Snore" || "Respiratory Movement" ? "Resolution" : "Sample Points"}</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={{
                                backgroundColor: "#e6cfff"
                            }}
                        />
                        <Text style={{ fontSize: 11 }}>*Note: Increase Sample Points reduces Performance</Text>
                    </View>
                    <View>
                        <Text>Selected Elasped Time: {selectedHour} hours, {selectedMinute} minutes, {selectedSeconds} seconds</Text>
                    </View>
                    <VictoryChart
                        width={screenWidth}
                        height={screenHeight / 1.5}
                        scale={{ x: "linear" }}
                        containerComponent={
                            <VictoryZoomContainer
                                zoomDimension="x"
                                zoomDomain={zoomDomain}
                                onZoomDomainChange={handleZoom}
                            />
                        }
                    >
                        <VictoryAxis
                            label="Voltage (V)"
                            dependentAxis
                            style={{ axisLabel: { paddingLeft: 30 } }}
                        />
                        <VictoryLine
                            style={{
                                data: {
                                    stroke: "#b674f7",
                                },
                                labels: { fontSize: ({ text }) => text.length > 10 ? 8 : 12 },
                            }}

                            data={sampledData}
                            x="x"
                            y="y"
                            labels={showDataPoints ? ({ datum }) => `x: ${datum.x}\n y: ${datum.y}` : null}
                            labelComponent={<VictoryLabel renderInPortal dy={-20} />}

                        />
                        <VictoryAxis
                            label="Time (s)"
                        />
                    </VictoryChart>

                </View>
                : <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color={Colors.primary} />
                </View>
            }
        </View>
    )
};

ClinicianSensorDetail100SampleScreen.navigationOptions = navData => {
    const sensorTitle = navData.navigation.getParam('sensorTitle')
    const dataPointsHandler = navData.navigation.getParam('dataPointsHandler')
    return {
        headerTitle: sensorTitle,
        headerRight: () =>
            <View style={{ flexDirection: "row" }}>
                <Item title='data points' iconName={"chart-bar"} IconComponent={FontAwesome5} iconSize={23}
                    color={Platform.OS === 'android' ? 'white' : Colors.primary}
                    onPress={() => {
                        Alert.alert("Plot Detail Mode", "This shows data points but will slow down performance. Turn this off to get back full performance.", [{
                            text: 'Turn ON/OFF Data points',
                            onPress: () => dataPointsHandler()
                        }, { text: 'Go Back' }])
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
    points: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Dimensions.get("window").height / 2,
    }
});

//make this component available to the app
export default ClinicianSensorDetail100SampleScreen;
