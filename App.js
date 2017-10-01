import React, { Component } from 'react';
import { Alert } from 'react-native';
import Expo, { Notifications, Font } from 'expo';
import { Provider } from 'react-redux';

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
