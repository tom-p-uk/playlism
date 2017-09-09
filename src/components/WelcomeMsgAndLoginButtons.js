import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const WelcomeMsgAndLoginButtons = ({ onFacebookButtonPress, onGoogleButtonPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeMsg}>
        <Image
          source={require('../../assets/img/playlism-logo.png')}
          style={styles.logoImg}
          resizeMode='contain'
        />
        <Text style={styles.header}>
          Welcome to Playlism.
        </Text>
        <Text style={styles.text}>
          Log in using your Facebook{'\n'}
          or Google account to continue.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          raised
          fontSize={15}
          title='Log In With Facebook'
          icon={{ name: 'facebook-square', type: 'font-awesome' }}
          backgroundColor='#3b5998'
          onPress={onFacebookButtonPress}
          borderRadius={6}
        />
        <Button
          buttonStyle={styles.button}
          raised
          fontSize={15}
          title='Log In With Google'
          icon={{ name: 'google', type: 'font-awesome' }}
          onPress={onGoogleButtonPress}
          borderRadius={6}
          backgroundColor='#DD4B39'
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 60,
  },
  welcomeMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
    marginBottom: -40,
  },
  logoImg: {
    width: SCREEN_WIDTH,
    height: 140,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    margin: 40,
    color: '#FFFFFF'
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
    fontSize: 14,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    width: 260,
    marginBottom: 40,
    // opacity: 0.7,
    height: 45,
  },
};

export default WelcomeMsgAndLoginButtons;
