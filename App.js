import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo, { Notifications } from 'expo';
import AuthScreen from './src/screens/AuthScreen';
import { Provider } from 'react-redux'
import { Font } from 'expo';

import store from './src/store';
import MainNavWithNavigationState from './src/navigation/MainNav';

export default class App extends Component {
  componentDidMount() {
    Notifications.addListener(notification => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification', // title
          text,
          [{ test: 'OK' }] // button
        );
      }
    });

    Font.loadAsync({
      'lato-light': require('./assets/fonts/Lato-Light.ttf'),
    });
  }

  render() {
    return (
      <Provider store={store}>
        <MainNavWithNavigationState />
      </Provider>
    );
  }
}
