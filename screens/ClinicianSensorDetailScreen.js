//import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryAxis } from "victory-native";
import * as FileSystem from 'expo-file-system';
import Colors from '../constants/Colors';

// create a component
const ClinicianSensorDetailScreen = (props) => {
    //Get data passed from parent
    const documentPath = props.navigation.getParam('userDocument')
    const sensorTitle = props.navigation.getParam('sensorTitle')
    const dateCreated = props.navigation.getParam('dateCreated')
    //Setup data and read inputs
    // const [isLoading, setIsLoading] = useState(true)
    // const [yData, setYData] = useState([])
    // const [xData, setXData] = useState([])
    const [fileData, setFileData] = useState([])
    const [showContent, setShowContent] = useState(false)

    const readFile = async () => {
        const fileString = await FileSystem.readAsStringAsync(documentPath)
        const dataObj = JSON.parse(fileString)

        const data = dataObj.data
        setFileData(data)
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
    const [selectedDomain, setSelectedDomain] = useState({});
    const [zoomDomain, setZoomDomain] = useState({});

    const handleZoom = (domain) => {
        setSelectedDomain(domain);
    };

    const handleBrush = (domain) => {
        setZoomDomain(domain);
    };

    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    return (
        <View>
            {showContent ?
                <View style={styles.screen}>
                    <Text style={styles.text}>{sensorTitle} Chart</Text>
                    <Text>Date: {dateCreated} </Text>
                    <VictoryChart width={screenWidth} height={screenHeight / 1.5} scale={{ x: "linear" }}
                        containerComponent={
                            <VictoryZoomContainer
                                responsive={false}
                                zoomDimension="x"
                                zoomDomain={zoomDomain}
                                onZoomDomainChange={handleZoom}
                            />
                        }
                    // domainPadding={{ x: [20, 0], y: [10, 10] }}
                    >
                        <VictoryLine
                            style={{
                                data: {
                                    stroke: "orange",
                                }
                            }}
                            // data={[
                            //     { x: 100, y: 190, label: "190" },
                            //     { x: 200, y: 257, label: "257" },
                            //     { x: 300, y: 345, label: "345" },
                            //     { x: 400, y: 515, label: "515" },
                            //     { x: 500, y: 132, label: "132" },
                            //     { x: 600, y: 305 },
                            //     { x: 700, y: 270 },
                            //     { x: 800, y: 470 },
                            //     { x: 900, y: 350 }
                            // ]}
                            data={fileData}
                            x="x"
                            y="y"
                        />

                    </VictoryChart>

                    <VictoryChart
                        padding={{ top: 0, left: 50, right: 50, bottom: 50 }}
                        margin={{ bottom: 50 }}
                        width={screenWidth} height={screenHeight / 5} scale={{ x: "linear" }}
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
                                data: { stroke: "orange" }
                            }}
                            data={fileData}
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
    return {
        headerTitle: sensorTitle
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
