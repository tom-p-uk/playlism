import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo, { Notifications } from 'expo';
import AuthScreen from './src/screens/AuthScreen';
import { Provider } from 'react-redux'
import store from './src/store';
import Router from './src/router';

export default class App extends Component {
  componentDidMount() {
    Notifications.addListener(notification => {
      const { data: { text }, origin } = notification; // const text, origin = notification.data.text

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification', // title
          text,
          [{ test: 'OK' }] // button
        );
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
