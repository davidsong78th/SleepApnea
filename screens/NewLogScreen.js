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
    const [selectedDocument, setSelectedDocument] = useState()

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
        if (selectedDocument) {
            dispatch(usersActions.addUser(titleValue, selectedDocument, dateCreated))
            props.navigation.goBack()
        } else {
            Alert.alert('Data Log Attachment Needed', 'Add Data Log', [{ text: 'Okay' }])
            return
        }
    }

    //For import log JSON
    const pickDocumentHandler = async () => {
        if (Platform.OS === 'android') {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: false, });
            if (result.type === 'success') {
                const documentName = result.name
                const newDocumentPath = FileSystem.documentDirectory + documentName
                await FileSystem.copyAsync({
                    from: result.uri,
                    to: newDocumentPath
                })

                setSelectedDocument(newDocumentPath)
            } else {
                return
            }
        } else {
            const result = await DocumentPicker.getDocumentAsync({ type: "*/*" })
            if (result.type === 'success') {
                const documentName = result.uri.split('/').pop()
                const newDocumentPath = FileSystem.documentDirectory + documentName
                console.log(newDocumentPath)
                await FileSystem.moveAsync({
                    from: result.uri,
                    to: newDocumentPath
                })
                setSelectedDocument(newDocumentPath)
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
                    placeholder={"ex. log1"}
                />
            </GreyCard>
            <Text style={styles.label}>Import Log</Text>
            <View style={styles.logSelector}>
                {selectedDocument ? <View style={styles.text} >
                    <Text style={{ color: 'green', fontSize: 15 }}>Log Selected!</Text>
                </View> : <View style={styles.text} >
                    <Text style={{ color: 'red', fontSize: 15 }}>No Log Selected. Attach a Log.</Text>
                </View>}
                <View style={[styles.button, { backgroundColor: Platform.OS == 'ios' ? "#4b88f2" : '' }]}>
                    <Button
                        title="Select Log"
                        onPress={pickDocumentHandler}
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
        margin: 30
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
        marginBottom: 15
    },
    textInput: {
        margin: 5,
        paddingVertical: 5,
        paddingHorizontal: 2,
        fontSize: 15
    },
    button: {
        borderRadius: 25,
        padding: 3,
        marginTop: 10,
        // marginHorizontal: 80,
        // alignItems: 'center',
        paddingHorizontal: 70
    },
    saveButton: {
        borderRadius: 25,
        padding: 3,
        marginTop: 20
    }
});

//make this component available to the app
export default NewLogScreen;
