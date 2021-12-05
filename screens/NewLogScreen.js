//import libraries
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as usersActions from '../store/users-action'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import GreyCard from '../components/GreyCard';

// create a component
const NewLogScreen = (props) => {
    const dispatch = useDispatch()

    //Get values from log and save into states for later use
    const [titleValue, setTitleValue] = useState('')
    const [selectedECGLog, setSelectedECGLog] = useState()
    const [selectedEEGLog, setSelectedEEGLog] = useState()
    const [selectedOxymeterLog, setSelectedOxymeterLog] = useState()
    const [selectedPressureLog, setSelectedPressureLog] = useState()
    const [selectedFlowLog, setSelectedFlowLog] = useState()
    const [selectedSnoreLog, setSelectedSnoreLog] = useState()

    //Get Current Date when creating the log
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const dateCreated = month + ' ' + day + ', ' + year;


    const titleChangeHandler = text => {
        setTitleValue(text)
    }

    const saveUserHandler = () => {
        if ((selectedOxymeterLog && selectedPressureLog) || (selectedECGLog || selectedEEGLog || selectedPressureLog || selectedFlowLog || selectedSnoreLog)) {
            dispatch(usersActions.addUser(titleValue, selectedECGLog, selectedEEGLog, selectedOxymeterLog, selectedPressureLog, selectedFlowLog, selectedSnoreLog, dateCreated))
            props.navigation.goBack()
        } else {
            Alert.alert('Data Log Attachment Needed', 'Add Oxymeter and Pressure at Minimum', [{ text: 'Okay' }])
            return
        }
    }

    //For import log JSON
    const pickECGLogHandler = async () => {
        if (Platform.OS === 'android') {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: false });
            if (result.type === 'success') {
                const documentName = result.name
                // console.log(result)
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.copyAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedECGLog(newDocumentPath)
            } else {
                return
            }
        } else { //For IOS
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*" })
            if (result.type === 'success') {
                const documentName = result.uri.split('/').pop()
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.moveAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedECGLog(newDocumentPath)
            } else {
                return
            }
        }
    }

    const pickEEGLogHandler = async () => {
        if (Platform.OS === 'android') {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: false, });
            if (result.type === 'success') {
                const documentName = result.name
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.copyAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedEEGLog(newDocumentPath)
            } else {
                return
            }
        } else { //For IOS
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*" })
            if (result.type === 'success') {
                const documentName = result.uri.split('/').pop()
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.moveAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedEEGLog(newDocumentPath)
            } else {
                return
            }
        }
    }

    const pickOxymeterLogHandler = async () => {
        if (Platform.OS === 'android') {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: false, });
            if (result.type === 'success') {
                const documentName = result.name
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.copyAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedOxymeterLog(newDocumentPath)
            } else {
                return
            }
        } else { //For IOS
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*" })
            if (result.type === 'success') {
                const documentName = result.uri.split('/').pop()
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.moveAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedOxymeterLog(newDocumentPath)
            } else {
                return
            }
        }
    }

    const pickPressureLogHandler = async () => {
        if (Platform.OS === 'android') {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: false, });
            if (result.type === 'success') {
                const documentName = result.name
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.copyAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedPressureLog(newDocumentPath)
            } else {
                return
            }
        } else { //For IOS
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*" })
            if (result.type === 'success') {
                const documentName = result.uri.split('/').pop()
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.moveAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedPressureLog(newDocumentPath)
            } else {
                return
            }
        }
    }

    const pickFlowLogHandler = async () => {
        if (Platform.OS === 'android') {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: false, });
            if (result.type === 'success') {
                const documentName = result.name
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.copyAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedFlowLog(newDocumentPath)
            } else {
                return
            }
        } else { //For IOS
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*" })
            if (result.type === 'success') {
                const documentName = result.uri.split('/').pop()
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.moveAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedFlowLog(newDocumentPath)
            } else {
                return
            }
        }
    }

    const pickSnoreLogHandler = async () => {
        if (Platform.OS === 'android') {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: false, });
            if (result.type === 'success') {
                const documentName = result.name
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.copyAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedSnoreLog(newDocumentPath)
            } else {
                return
            }
        } else { //For IOS
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*" })
            if (result.type === 'success') {
                const documentName = result.uri.split('/').pop()
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.moveAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedSnoreLog(newDocumentPath)
            } else {
                return
            }
        }
    }

    return (<ScrollView>
        <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <GreyCard>
                <TextInput style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                    placeholder={"Ex. Log1"}
                />
            </GreyCard>
            <Text style={styles.label}>Import Oxymeter Log</Text>
            <View style={styles.logSelector}>
                {selectedOxymeterLog ? <View style={styles.text} >
                    <Text style={{ color: 'green', fontSize: 14 }}>Oxymeter Log Selected!</Text>
                </View> : <View style={styles.text} >
                    <Text style={{ color: 'red', fontSize: 14 }}>No Oxymeter Log Selected. Attach a Log.</Text>
                </View>}
                <View style={[styles.button, { backgroundColor: Platform.OS == 'ios' ? "#4b88f2" : '' }]}>
                    <Button
                        title="Select Oxymeter Log"
                        onPress={pickOxymeterLogHandler}
                        color={Platform.OS == 'ios' ? "white" : ''}
                    />
                </View>
            </View>
            <Text style={styles.label}>Import Pressure Log</Text>
            <View style={styles.logSelector}>
                {selectedPressureLog ? <View style={styles.text} >
                    <Text style={{ color: 'green', fontSize: 14 }}>Pressure Log Selected!</Text>
                </View> : <View style={styles.text} >
                    <Text style={{ color: 'red', fontSize: 14 }}>No Pressure Log Selected. Attach a Log.</Text>
                </View>}
                <View style={[styles.button, { backgroundColor: Platform.OS == 'ios' ? "#4b88f2" : '' }]}>
                    <Button
                        title="Select Pressure Log"
                        onPress={pickPressureLogHandler}
                        color={Platform.OS == 'ios' ? "white" : ''}
                    />
                </View>
            </View>
            <Text style={styles.label}>Import ECG Log</Text>
            <View style={styles.logSelector}>
                {selectedECGLog ? <View style={styles.text} >
                    <Text style={{ color: 'green', fontSize: 14 }}>ECG Log Selected!</Text>
                </View> : <View style={styles.text} >
                    <Text style={{ color: 'red', fontSize: 14 }}>No ECG Log Selected. Attach a Log.</Text>
                </View>}
                <View style={[styles.button, { backgroundColor: Platform.OS == 'ios' ? "#4b88f2" : '' }]}>
                    <Button
                        title="Select ECG Log"
                        onPress={pickECGLogHandler}
                        color={Platform.OS == 'ios' ? "white" : ''}
                    />
                </View>
            </View>
            <Text style={styles.label}>Import EEG Log</Text>
            <View style={styles.logSelector}>
                {selectedEEGLog ? <View style={styles.text} >
                    <Text style={{ color: 'green', fontSize: 14 }}>EEG Log Selected!</Text>
                </View> : <View style={styles.text} >
                    <Text style={{ color: 'red', fontSize: 14 }}>No EEG Log Selected. Attach a Log.</Text>
                </View>}
                <View style={[styles.button, { backgroundColor: Platform.OS == 'ios' ? "#4b88f2" : '' }]}>
                    <Button
                        title="Select EEG Log"
                        onPress={pickEEGLogHandler}
                        color={Platform.OS == 'ios' ? "white" : ''}
                    />
                </View>
            </View>
            <Text style={styles.label}>Import Flow Log</Text>
            <View style={styles.logSelector}>
                {selectedFlowLog ? <View style={styles.text} >
                    <Text style={{ color: 'green', fontSize: 14 }}>Flow Log Selected!</Text>
                </View> : <View style={styles.text} >
                    <Text style={{ color: 'red', fontSize: 14 }}>No Flow Log Selected. Attach a Log.</Text>
                </View>}
                <View style={[styles.button, { backgroundColor: Platform.OS == 'ios' ? "#4b88f2" : '' }]}>
                    <Button
                        title="Select Flow Log"
                        onPress={pickFlowLogHandler}
                        color={Platform.OS == 'ios' ? "white" : ''}
                    />
                </View>
            </View>
            <Text style={styles.label}>Import Snore Log</Text>
            <View style={styles.logSelector}>
                {selectedSnoreLog ? <View style={styles.text} >
                    <Text style={{ color: 'green', fontSize: 14 }}>Snore Log Selected!</Text>
                </View> : <View style={styles.text} >
                    <Text style={{ color: 'red', fontSize: 14 }}>No Snore Log Selected. Attach a Log.</Text>
                </View>}
                <View style={[styles.button, { backgroundColor: Platform.OS == 'ios' ? "#4b88f2" : '' }]}>
                    <Button
                        title="Select Snore Log"
                        onPress={pickSnoreLogHandler}
                        color={Platform.OS == 'ios' ? "white" : ''}
                    />
                </View>
            </View>
            <View style={[styles.saveButton, { backgroundColor: Platform.OS == 'ios' ? Colors.primary : '' }]}>
                <Button
                    title='Save Log'
                    color={Platform.OS == 'ios' ? "white" : Colors.primary}
                    onPress={saveUserHandler} />
            </View>

        </View>
    </ScrollView >)
};

NewLogScreen.navigationOptions = {
    headerTitle: 'Add Log'
}

// define your styles
const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    logSelector: {
        marginBottom: 10,
    },
    label: {
        fontSize: 17,
        marginBottom: 10
    },
    textInput: {
        // margin: 5,
        paddingVertical: 5,
        paddingHorizontal: 2,
        fontSize: 15
    },
    button: {
        borderRadius: 25,
        // padding: 3,
        // marginTop: 10,
        // marginHorizontal: 80,
        // alignItems: 'center',
        paddingHorizontal: Platform.OS == "android" ? 70 : 0
    },
    saveButton: {
        borderRadius: 25,
        padding: 3,
        marginTop: 20,
    }
});

//make this component available to the app
export default NewLogScreen;
