import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import AuthScreen from './src/screens/AuthScreen';

console.log(Expo.Constants.linkingUri)
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Open up ddd.js to start working on your app!</Text> */}
        <AuthScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
