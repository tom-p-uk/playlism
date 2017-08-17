import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {
  render() {
    const { navigation: { navigate } } = this.props;
    return (
      <Card  style={styles.container}>
        <View>
          <View style={{ flex: 1, }}>
            <Image
              source={require('../../assets/img/stack-vinyl.jpg')}
              style={{ flex: 1, width: SCREEN_WIDTH }}
            />
            <View style={styles.overlay} />
            <View style={styles.logoContainer}>
              <Text style={[styles.logo, { color: '#FFFFFF' }]}>PLAY</Text>
              <Text style={[styles.logo, { color: '#F26C4F' }]}>LISM</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                small
                raised
                style={styles.button}
                fontSize={13}
                borderRadius={60}
                backgroundColor='#98250B'
                disabledStyle={styles.buttonDisabled}
                buttonStyle={{ height: 45 }}
                icon={{ name: 'music', type: 'font-awesome' }}
                title='Songs'
                onPress={() => navigate('allSongs')}
              />
              <Button
                small
                raised
                style={styles.button}
                fontSize={13}
                borderRadius={60}
                backgroundColor='#D13310'
                disabledStyle={styles.buttonDisabled}
                buttonStyle={{ height: 45 }}
                icon={{ name: 'playlist-play', type: 'material-community' }}
                title='Playlists'
                onPress={() => navigate('playlistsStack')}
              />
              <Button
                small
                raised
                style={styles.button}
                fontSize={13}
                borderRadius={60}
                backgroundColor='#F26C4F'
                disabledStyle={styles.buttonDisabled}
                buttonStyle={{ height: 45 }}
                icon={{ name: 'account-multiple', type: 'material-community' }}
                title='Friends'
                onPress={() => navigate('friends')}
              />
            </View>
          </View>
        </View>
      </Card>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    flexDirection: 'row',
    // width: 250,
    top: 150,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  logo: {
    fontFamily: 'lato-light',
    fontSize: 50,
  },
  overlay: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   backgroundColor: 'rgba(40,40,40, 0.6)'
  },
  profileImgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 250,
    marginBottom: 40,
    opacity: 0.7,
  },
  buttonDisabled: {
    backgroundColor: '#98250B',
  },
  displayNameAndButtonContainer: {
    height: 300,
    position: 'absolute',
    // top: SCREEN_HEIGHT * 0.75 - 150,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default HomeScreen;
