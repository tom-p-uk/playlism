import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {
  render() {
    const { navigation: { navigate } } = this.props;
    return (
      <View style={{ flex: 1, }}>
        <Image
          source={require('../../assets/img/stack-vinyl.jpg')}
          style={{ flex: 1, width: SCREEN_WIDTH }}
        />
        <View style={styles.overlay} />
        <Image
          source={require('../../assets/img/playlism-logo.png')}
          style={styles.img}
          resizeMode='contain'
        />
        <View style={styles.buttonContainer}>
          <Button
            small
            raised
            buttonStyle={styles.button}
            fontSize={13}
            borderRadius={60}
            backgroundColor='rgba(152, 37, 11, 0.7)'
            disabledStyle={styles.buttonDisabled}
            icon={{ name: 'file-download' }}
            title='Downloads'
            onPress={() => navigate('downloads')}
          />
          <Button
            small
            raised
            buttonStyle={styles.button}
            fontSize={13}
            borderRadius={60}
            backgroundColor='rgba(209, 51, 16, 0.7)'
            disabledStyle={styles.buttonDisabled}
            icon={{ name: 'playlist-play', type: 'material-community' }}
            title='Playlists'
            onPress={() => navigate('playlists')}
          />
          <Button
            small
            raised
            buttonStyle={styles.button}
            fontSize={13}
            borderRadius={60}
            backgroundColor='rgba(242,108,79, 0.7)'
            disabledStyle={styles.buttonDisabled}
            icon={{ name: 'account-multiple', type: 'material-community' }}
            title='Friends'
            onPress={() => navigate('friends')}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   backgroundColor: 'rgba(40,40,40, 0.6)'
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 60,
    // opacity: 0.7,
  },
  button: {
    width: 250,
    marginBottom: 40,
    // opacity: 0.7,
    height: 45,
  },
  img: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: 140,
  },


};

export default HomeScreen;
