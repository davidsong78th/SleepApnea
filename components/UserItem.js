import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/Colors';
import Card from './Card';

const UserItem = props => {
  return (
    <Card style={styles.item}>
      <View style={styles.touchable}>
        <TouchableOpacity onPress={props.onSelect} style={styles.userItem} >
          <Image style={styles.image} source={require('../assets/folder.png')} />
          <View style={styles.infoContainer}>
            <Text style={styles.date}>Imported: {props.dateCreated}</Text>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <View>
            {/* Placing button */}
            {props.children}
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 10,
    padding: 10
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  userItem: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1,
    marginBottom: 15,
  },
  infoContainer: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  address: {
    color: '#666',
    fontSize: 16
  },
  date: {
    color: 'black',
    fontSize: 12,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },

  deleteButton: {
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    overflow: 'hidden'
  }
});

export default UserItem;
