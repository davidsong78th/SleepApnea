//import libraries
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as usersActions from '../store/users-action'
import ImagePicker from '../components/ImagePicker'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';


// create a component
const NewLogScreen = (props) => {
    const dispatch = useDispatch()
    //Get values from log and save into states for later use
    const [titleValue, setTitleValue] = useState('')
    const [selectedImage, setSelectedImage] = useState()
    const [selectedDocument, setSelectedDocument] = useState()

    //Get Current Date when creating the log
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const dateCreated = month + ' ' + day + ', ' + year;
    console.log(dateCreated)


    const titleChangeHandler = text => {
        setTitleValue(text)
    }

    const saveUserHandler = () => {
        if (selectedImage && selectedDocument) {
            dispatch(usersActions.addUser(titleValue, selectedImage, selectedDocument, dateCreated))
            props.navigation.goBack()
        } else {
            Alert.alert('Image & Document needed', 'Add Image and Document', [{ text: 'Okay' }])
            return
        }
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath)
    }

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
            <Text style={styles.label}>Title:</Text>
            <TextInput style={styles.textInput}
                onChangeText={titleChangeHandler}
                value={titleValue}
            />

            <Text style={styles.label}>Add Image:</Text>
            <ImagePicker onImageTaken={imageTakenHandler} />
            <Text style={styles.label}>Import Log:</Text>
            <View style={{ marginBottom: 10 }}>
                {/* <View style={styles.text} >
                    <Text>Please Select the Right Log (JSON)</Text>
                </View> */}
                <Button
                    title="Select Log"
                    onPress={pickDocumentHandler}
                />
                {selectedDocument ? <View style={styles.text} >
                    <Text style={{ color: 'green' }}>Log Selected!</Text>
                </View> : <View style={styles.text} >
                    <Text style={{ color: 'red' }}>No Log Selected. Attach a Log.</Text>
                </View>}
            </View>
            <Button
                title='Save Log'
                color={Colors.primary}
                onPress={saveUserHandler} />
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
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

//make this component available to the app
export default NewLogScreen;
