import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import UsersNavigator from './navigation/UsersNavigator';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import usersReducer from './store/users-reducer';
import { init } from './helpers/db'

init()
  .then(() => {
    console.log('Initialized db')
  }).catch(err => {
    console.log('Initializing db failed')
    console.log(err)
  })

const rootReducer = combineReducers({
  users: usersReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <UsersNavigator />
      </View>
    </Provider>
  );
}
