//import libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert, Button, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import UserItem from '../components/UserItem';
import * as userActions from '../store/users-action'
import Colors from '../constants/Colors';


// create a component
const ListScreen = (props) => {
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch()

    const [showContent, setShowContent] = useState(false)


    useEffect(() => {
        dispatch(userActions.loadUsers())
    }, [dispatch])

    useEffect(() => {
        setTimeout(() => {
            setShowContent(true)
        }, 300)
    }, [setShowContent])

    const deleteItemHandler = (id, title) => {
        Alert.alert(`Delete ${title} Log?`, 'There is no way of recovering it.', [
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(userActions.deleteUsers(id))
                }
            },
            { text: 'No', style: 'default' }
        ])
    }

    return (
        // <FlatList
        //     data={users}
        //     keyExtractor={item => item.id}
        //     renderItem={itemData => (
        //         <UserItem
        //             image={itemData.item.imageUri}
        //             title={itemData.item.title}
        //             onSelect={() => {
        //                 props.navigation.navigate('UserDetail', {
        //                     userTitle: itemData.item.title,
        //                     userId: itemData.item.id,
        //                     userDocument: itemData.item.document
        //                 });
        //             }}
        //             onDeleteUser={() => dispatch(userActions.deleteUsers(itemData.item.id))}
        //         />
        //     )}
        // />
        <View style={styles.screen}>
            {showContent ?
                <FlatList
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={itemData => {
                        return (
                            <UserItem
                                title={itemData.item.title}
                                image={itemData.item.imageUri}
                                dateCreated={itemData.item.dateCreated}
                                onSelect={() => {
                                    props.navigation.navigate('UserSensor', {
                                        userDocument: itemData.item.document,
                                        dateCreated: itemData.item.dateCreated
                                        // userTitle: itemData.item.title,
                                        // userId: itemData.item.id,
                                    });
                                }}
                            >
                                <Button title='Delete' color={Colors.primary}
                                    onPress={() => { deleteItemHandler(itemData.item.id, itemData.item.title) }} />
                            </UserItem>
                        )
                    }}
                />
                : <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color={Colors.primary} />
                </View>
            }
        </View>
    );
};

ListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Health Log',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='List' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Add Log' iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('NewLog')
                }}
            />
        </HeaderButtons>
    }
}

// define your styles
const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    deleteButton: {
        overflow: 'hidden'
    },
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: Dimensions.get("window").height / 2,
    }
});

//make this component available to the app
export default ListScreen;
