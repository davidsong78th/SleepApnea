import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import ListScreen from '../screens/ListScreen'
import UserSensorDetailScreen from '../screens/UserSensorDetailScreen'
import NewLogScreen from '../screens/NewLogScreen'
import Colors from "../constants/Colors";
import HelpScreen from "../screens/HelpScreen";
import AboutScreen from "../screens/AboutScreen";
import UserSensorScreen from '../screens/UserSensorScreen';
import ClinicianSensorScreen from '../screens/ClinicianSensorScreen'
import ClinicianSensorDetail500SampleSecScreen from '../screens/ClinicianSensorDetail500SampleSecScreen';
import ClinicianSensorDetail1SampleSecScreen from '../screens/ClinicianSensorDetail1SampleSecScreen';
import ClinicianSensorDetail100SampleSecScreen from '../screens/ClinicianSensorDetail100SampleSecScreen';
import ClinicianSensorSp02DetailScreen from '../screens/ClinicianSensorSp02DetailScreen'
import ClinicianSensorPressureDetailScreen from '../screens/ClinicianSensorPressureDetailScreen'

const UsersNavigator = createStackNavigator({
    Users: ListScreen,
    UserSensorDetail: UserSensorDetailScreen,
    NewLog: NewLogScreen,
    UserSensor: UserSensorScreen,
    ClinicianSensor: ClinicianSensorScreen,
    ClinicianSensorDetail500SampleSec: ClinicianSensorDetail500SampleSecScreen,
    ClinicianSensorDetail1SampleSec: ClinicianSensorDetail1SampleSecScreen,
    ClinicianSensorDetail100SampleSec: ClinicianSensorDetail100SampleSecScreen,
    ClinicianSensorPressureDetail: ClinicianSensorSp02DetailScreen,
    ClinicianSensorPressureDetail: ClinicianSensorPressureDetailScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleAlign: 'center'
    },
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={'ios-home'}
            size={23}
            color={drawerConfig.tintColor}
        />
    }
})

const HelpNavigator = createStackNavigator({
    Help: HelpScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleAlign: 'center'
    },
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={'ios-help'}
            size={23}
            color={drawerConfig.tintColor}
        />
    }
})

const AboutNavigator = createStackNavigator({
    About: AboutScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleAlign: 'center'
    },
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={'ios-information-circle-outline'}
            size={23}
            color={drawerConfig.tintColor}
        />
    }
})



const MainNavigator = createDrawerNavigator({
    Home: {
        screen: UsersNavigator,
        navigationOptions: {
            drawerLabel: 'Home'
        }
    },
    Help: {
        screen: HelpNavigator,
        navigationOptions: {
            drawerLabel: 'Help'
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerLabel: 'About'
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.primary,
    }
})

export default createAppContainer(MainNavigator)