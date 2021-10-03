import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import UsersNavigator from './navigation/UsersNavigator';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import usersReducer from './store/users-reducer';
import { init } from './helpers/db'

//Start local database
init()
  .then(() => {
    console.log('Initialized db')
  }).catch(err => {
    console.log('Initializing db failed')
    console.log(err)
  })
//Start Redux states
const rootReducer = combineReducers({
  users: usersReducer
})
//Connect Redux to Redux Thunk
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <View style={{
        flex: 1, //marginTop: StatusBar.currentHeight
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        height: 56 + Platform.select({ 'android': StatusBar.currentHeight, 'ios': 0 }),
      }}>
        <UsersNavigator />
      </View>
    </Provider>
  );
}
