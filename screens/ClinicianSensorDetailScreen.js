//import libraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert, Platform } from 'react-native';
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis, VictoryTooltip, VictoryGroup, VictoryScatter, VictoryLabel, createContainer, VictoryVoronoiContainer } from "victory-native";
import * as FileSystem from 'expo-file-system';
import Colors from '../constants/Colors';
import { Item } from 'react-navigation-header-buttons';
import { FontAwesome5 } from '@expo/vector-icons'


// create a component
const ClinicianSensorDetailScreen = (props) => {
    //Get data passed from parent
    const documentPath = props.navigation.getParam('userDocument')
    const sensorTitle = props.navigation.getParam('sensorTitle')
    const dateCreated = props.navigation.getParam('dateCreated')

    //Setup data and read inputs
    const [fileData, setFileData] = useState([])
    const [showContent, setShowContent] = useState(false)
    // const [startIndex, setStartIndex] = useState(0)
    // const [stopIndex, setStopIndex] = useState(0)

    const readFile = async () => {
        const fileString = await FileSystem.readAsStringAsync(documentPath)
        const dataObj = JSON.parse(fileString)

        const data = dataObj.data
        setFileData(data)
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
        const filtered = data
        if (filtered.length > maxPoints) {
            // limit k to powers of 2, e.g. 64, 128, 256
            // so that the same points will be chosen reliably, reducing flicker
            const k = Math.pow(2, Math.ceil(Math.log2(filtered.length / maxPoints)));
            return filtered.filter(
                (d, i) => ((i % k) === 0)
            );
        }
        return filtered;

    }
    const maxPoints = 100
    const renderedData = getData(fileData, maxPoints)

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
                    <Text>Date: {dateCreated} </Text>
                    <VictoryChart
                        width={screenWidth}
                        height={screenHeight / 1.5}
                        scale={{ x: "linear" }}
                        containerComponent={
                            <VictoryZoomContainer
                                zoomDimension="x"
                                zoomDomain={zoomDomain}
                                onZoomDomainChange={handleZoom}
                            // downsample={samplingData}
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

                            data={renderedData}
                            x="x"
                            y="y"
                            labels={showDataPoints ? ({ datum }) => `x: ${datum.x}\n y: ${datum.y}` : null}
                            labelComponent={<VictoryLabel renderInPortal dy={-20} />}

                        />
                    </VictoryChart>

                    <VictoryChart
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
                    </VictoryChart>
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
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
