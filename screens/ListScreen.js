//import libraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert, Button, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import UserItem from '../components/UserItem';
import * as userActions from '../store/users-action'
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesome5 } from '@expo/vector-icons'

// create a component
const ListScreen = (props) => {
    //Get data from Redux
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch()

    //Use this for loading indicator
    const [showContent, setShowContent] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setShowContent(true)
        }, 300)
    }, [setShowContent])

    //Load users data from DB
    const [isRefreshing, setIsRefreshing] = useState(false)

    const loadUsers = useCallback(async () => {
        setIsRefreshing(true)
        try {
            await dispatch(userActions.loadUsers())
        } catch (err) {
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [dispatch])

    //Setting up navigation listener to listen for new changes to users DB
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', () => {
            loadUsers()
        })
        return () => {
            willFocusSub.remove()
        }
    }, [loadUsers])

    useEffect(() => {
        loadUsers()
    }, [dispatch, loadUsers])

    if (users.length === 0 || !users) {
        return <View style={styles.content}>
            <Text>No Data Log Found. Create Log at  <Icon name="user-plus" size={20} color={Colors.primary} />.</Text>
        </View>
    }

    return (
        <View style={styles.screen}>
            {showContent ?
                <FlatList
                    onRefresh={loadUsers}
                    refreshing={isRefreshing}
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={itemData => {
                        return (
                            <UserItem
                                title={itemData.item.title}
                                dateCreated={itemData.item.dateCreated}
                                onSelect={() => {
                                    props.navigation.navigate('UserSensor', {
                                        userECGLog: itemData.item.ECGLog,
                                        userEEGLog: itemData.item.EEGLog,
                                        userOxymeterLog: itemData.item.OxymeterLog,
                                        userStrainLog: itemData.item.StrainLog,
                                        userFlowLog: itemData.item.FlowLog,
                                        userSnoreLog: itemData.item.SnoreLog,
                                        dateCreated: itemData.item.dateCreated,
                                        userTitle: itemData.item.title,
                                        userId: itemData.item.id,
                                    });
                                }}
                            >
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
        headerRight: () =>
            <Item title='Add Log' iconName={Platform.OS === 'android' ? 'user-plus' : 'user-plus'} IconComponent={FontAwesome5} iconSize={20}
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                onPress={() => {
                    navData.navigation.navigate('NewLog')
                }}
            />
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
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

//make this component available to the app
export default ListScreen;
