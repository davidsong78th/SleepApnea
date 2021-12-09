//import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { LineChart, ProgressChart, BarChart } from "react-native-chart-kit";
import Colors from '../../constants/Colors';

// create a component
const UserSensorDetailScreen = (props) => {
    const documentPath = props.navigation.getParam('userDocument')

    const [isLoading, setIsLoading] = useState(true)
    const [yLabelData, setYLabelData] = useState([])
    const [xLabelData, setXLabelData] = useState([])
    const [showContent, setShowContent] = useState(false)

    const readFile = async () => {
        setIsLoading(true)
        const fileString = await FileSystem.readAsStringAsync(documentPath)
        const dataObj = JSON.parse(fileString)

        const yValues = dataObj.data.map(d => d.y)
        const xValues = dataObj.data.map(d => d.x)

        setYLabelData(yValues)
        setXLabelData(xValues)
        setIsLoading(false)
    }

    useEffect(() => {
        readFile()
    }, [documentPath])

    useEffect(() => {
        setTimeout(() => {
            setShowContent(true)
        }, 600)
    }, [setShowContent])

    const progressChartData = {
        labels: ["Oxygen", "SPO2", "Breath"], // optional
        data: [0.70, 0.98, 0.8]
    };

    const barChartData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    return (
        <ScrollView >
            {showContent ?
                <View style={styles.container}>
                    {/* <View style={styles.text}>
                        <Text>Heart Rate</Text>
                    </View> */}
                    {/* {isLoading ? null : <LineChart
                        data={{
                            labels: xLabelData,
                            datasets: [
                                {
                                    data: yLabelData
                                },
                                // {
                                //     data: [
                                //         Math.random() * 100,
                                //         Math.random() * 100,
                                //         Math.random() * 100,
                                //         Math.random() * 100,
                                //         Math.random() * 100,
                                //         Math.random() * 100,
                                //         Math.random() * 100,
                                //         Math.random() * 100,
                                //         Math.random() * 100,
                                //     ]
                                // }
                            ],
                            // legend: ["World Bank", 'Bank']
                        }}
                        width={Dimensions.get("window").width - 30}
                        height={250}
                        xLabelsOffset={0}
                        yAxisLabel=""
                        yAxisSuffix=" bpm"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#42a4f5",
                            backgroundGradientFrom: "#bd74fc",
                            backgroundGradientTo: "#748bfc",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "1",
                                strokeWidth: "3",
                                stroke: "#74cafc"
                            }
                        }}
                        // withHorizontalLines={false}
                        // withVerticalLines={false}
                        withInnerLines={false}
                        yLabelsOffset={10}
                        xLabelsOffset={10}

                        renderDotContent={({ x, y, index, indexData }) => {
                            return <Text key={x + y} style={{ position: 'absolute', paddingTop: y - 20, paddingLeft: x - 15 }}>
                                {indexData.toFixed(1)}
                            </Text>
                        }}

                        onDataPointClick={(data) => {
                            // console.log(data.dataset.data[data.index])
                            console.log(data)
                        }}

                        style={{
                            marginVertical: 10,
                            borderRadius: 16
                        }}
                    />} */}
                    <Text>Daily Exercise</Text>
                    <ProgressChart
                        style={{ marginVertical: 30 }}
                        data={progressChartData}
                        width={Dimensions.get("window").width - 30}
                        height={250}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={{
                            backgroundColor: "#42a4f5",
                            backgroundGradientFrom: "#bd74fc",
                            backgroundGradientTo: "#eb3d8e",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "1",
                                strokeWidth: "3",
                                stroke: "#74cafc"
                            }
                        }}
                        hideLegend={false}
                    />
                    <Text>Daily Report</Text>
                    <BarChart
                        style={{ margin: 20 }}
                        data={barChartData}
                        width={Dimensions.get("window").width - 30}
                        height={250}
                        yAxisLabel="$"
                        chartConfig={{
                            backgroundColor: "#42a4f5",
                            backgroundGradientFrom: "#4df0f0",
                            backgroundGradientTo: "#4599ed",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: "1",
                                strokeWidth: "3",
                                stroke: "#74cafc"
                            }
                        }}
                        verticalLabelRotation={30}
                        yLabelsOffset={30}
                        xLabelsOffset={-10}
                    />
                </View>
                : <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color={Colors.primary} />
                </View>
            }

        </ScrollView>


    )
};

UserSensorDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('sensorTitle')
    }
}

// define your styles
const styles = StyleSheet.create({
    text: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Dimensions.get("window").height / 2,
    }
});

//make this component available to the app
export default UserSensorDetailScreen;