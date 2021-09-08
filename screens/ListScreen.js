//import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import UserItem from '../components/UserItem';
import * as userActions from '../store/users-action'

// create a component
const ListScreen = (props) => {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.loadUsers())
    }, [dispatch])

    return (
        <FlatList
            data={users}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <UserItem
                    image={itemData.item.imageUri}
                    title={itemData.item.title}
                    onSelect={() => {
                        props.navigation.navigate('UserDetail', {
                            userTitle: itemData.item.title,
                            userId: itemData.item.id,
                            userDocument: itemData.item.document
                        });
                    }}
                    deleteUser={() => dispatch(userActions.deleteUsers(itemData.item.id))}
                />
            )}
        />
    );
};

ListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Data',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Add Data' iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => {
                    navData.navigation.navigate('NewUser')
                }}
            />
        </HeaderButtons>,
    }
}

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default ListScreen;
