//import libraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';

// create a component
const ImgPicker = (props) => {
    const [pickedImage, setPickedImage] = useState()

    const takeImageHandler = async () => {
        const result = await ImagePicker.requestCameraPermissionsAsync()

        if (result.granted) {
            const image = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            })
            setPickedImage(image.uri)
            props.onImageTaken(image.uri)
        } else {
            return
        }
    }

    const selectImageHandler = async () => {
        const result = await ImagePicker.requestCameraPermissionsAsync()

        if (result.granted) {
            const image = await ImagePicker.launchImageLibraryAsync({})
            setPickedImage(image.uri)
            props.onImageTaken(image.uri)
        } else {
            return
        }

    }

    return <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage ? <Text>No Image Attached. Add one.</Text> :
                <Image style={styles.image} source={{ uri: pickedImage }} />}
        </View>
        <View style={styles.button}>
            <Button title='Take Image' onPress={takeImageHandler} />
        </View>
        <View style={styles.button}>
            <Button title='Select Image From Library' onPress={selectImageHandler} />
        </View>
    </View>
};

// define your styles
const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 3,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        margin: 5
    }
});

//make this component available to the app
export default ImgPicker;
