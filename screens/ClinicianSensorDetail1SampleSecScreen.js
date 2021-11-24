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
const ClinicianSensorDetailScreen = (props) => {
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

    const oneSecondSamplePoint = 500
    const oneMinuteSamplePoint = 30000
    const oneHourSamplePoint = 1800000

    //Setup data and read inputs
    const [fileData, setFileData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [showContent, setShowContent] = useState(false)
    // const [startIndex, setStartIndex] = useState(0)
    // const [stopIndex, setStopIndex] = useState(0)

    //Dropdown menu
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1000);
    const [items, setItems] = useState([
        { label: '1000 points', value: 1000 },
        { label: '2500 points', value: 2500 },
        { label: '5000 points', value: 5000 }
    ]);
    // console.log(value)

    const readFile = async () => {
        const fileString = await FileSystem.readAsStringAsync(documentPath)
        const dataObj = JSON.parse(fileString)

        const data = dataObj.data
        setFileData(data)

        //Show total elasped time from the file
        const totalTime = data.length
        // console.log(totalTime)
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
            Alert.alert("Data Out of Bound", `\nTotal Elasped Time: \n${elaspedHour} hours, ${elapsedMinute} minutes, ${elaspedSecond} seconds\n\nPick Sample Time Last Than Total Elapsed Time by 10 seconds`,
                [{ text: 'Go Back', onPress: () => props.navigation.goBack() }])
        }
        else {
            // selectedTime + 5000 data points = 10 sec data
            setFilteredData(data.slice(selectedTimeAsXValues, selectedTimeAsXValues + 5000))
        }
        // setStartIndex(data[0].x)
        // setStopIndex(data[data.length - 1].x)
    }

    useEffect(() => {
        readFile()
    }, [documentPath])

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
        // const filtered = data
        const filtered = filteredData

        // const startIndex = data.findIndex((d) => d.x >= zoomDomain.x[0]);
        // const endIndex = data.findIndex((d) => d.x > zoomDomain.x[1]);
        // const filtered = data.slice(startIndex, endIndex);

        if (filtered.length > maxPoints) {
            // limit k to powers of 2, e.g. 64, 128, 256
            // so that the same points will be chosen reliably, reducing flicker
            // const k = Math.pow(2, Math.ceil(Math.log2(filtered.length / maxPoints)));
            const k = Math.ceil(filtered.length / maxPoints);
            return filtered.filter(
                (d, i) => ((i % k) === 0)
            );
        }
        return filtered;
    }
    const sampledPoints = value //from dropdown menu
    const sampledData = getData(fileData, sampledPoints)

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
                        <Text>Sample Points</Text>
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
                    </VictoryChart>

                    {/* <VictoryChart
                        padding={{ top: 0, left: 50, right: 50, bottom: 50 }}
                        margin={{ bottom: 50 }}
                        width={screenWidth}
                        height={screenHeight / 5}
                        scale={{ x: "linear" }}
                        containerComponent={
                            <VictoryBrushContainer
                                responsive={false}
                                brushDimension="x"
                                brushDomain={selectedDomain}
                                onBrushDomainChange={handleBrush}
                            />
                        }
                    // domainPadding={{ x: [0, 0], y: [10, 10] }}
                    >
                        <VictoryAxis
                            // tickFormat={(x) => new Date(x).getHours() + ' AM'}
                            tickFormat={(x) => x}
                        // label="Today is ..."
                        />
                        <VictoryLine
                            style={{
                                data: { stroke: "#b674f7" }
                            }}
                            data={renderedData}
                            x="x"
                            y="y"

                        />
                    </VictoryChart> */}
                </View>
                : <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color={Colors.primary} />
                </View>
            }
        </View>
    )
};

ClinicianSensorDetailScreen.navigationOptions = navData => {
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
        alignItems: 'center'
    },
    points: {
        paddingVertical: 20,
        paddingHorizontal: 20,
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
export default ClinicianSensorDetailScreen;
