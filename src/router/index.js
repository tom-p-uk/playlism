import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Platform } from 'react-native';
import AuthScreen from '../screens/AuthScreen';
// import WelcomeScreen from './screens/WelcomeScreen';

const Router = TabNavigator({
  // welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
}, {
  navigationOptions: { tabBarVisible: true },
  lazy: true,
});

export default Router;
