import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Colors from '../constants/Colors';

const UserItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.userItem}>
      <Image style={styles.image} source={{ uri: props.image }} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.deleteButton}>
        <Button title='Delete' color={Colors.primary} onPress={props.deleteUser} />
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    // flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1,
    marginBottom: 15
  },
  infoContainer: {
    // marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  address: {
    color: '#666',
    fontSize: 16
  },
  deleteButton: {

  }
});

export default UserItem;
