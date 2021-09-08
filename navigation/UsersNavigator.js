import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import ListScreen from '../screens/ListScreen'
import UserDetailScreen from '../screens/UserDetailScreen'
import NewUserScreen from '../screens/NewUserScreen'
import Colors from "../constants/Colors";

const UsersNavigator = createStackNavigator({
    Users: ListScreen,
    UserDetail: UserDetailScreen,
    NewUser: NewUserScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default createAppContainer(UsersNavigator)