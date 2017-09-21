import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import BackgroundImage from './BackgroundImage';

import Spinner from './Spinner';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class UserCard extends Component {
  renderSecondButton() {
    const { showSecondButton, secondButtonProps } = this.props;

    if (showSecondButton) {
      return (
        <Button
          small
          raised
          buttonStyle={[styles.button, { marginBottom: 20 }]}
          fontSize={13}
          borderRadius={60}
          disabledStyle={{ backgroundColor: '#D13310' }}
          {...secondButtonProps}
        />
      );
    }
  }

  render() {
    const { user, coverImgSource, buttonProps, showSecondButton, secondButtonProps } = this.props;
    const top = showSecondButton ? SCREEN_HEIGHT * 0.75 - 210 : SCREEN_HEIGHT * 0.75 - 240;

    return (
      <Card  style={styles.container}>
        <View style={{ flex: 1, width: 400 }}>
          <BackgroundImage
            source={require('../../assets/img/vinyl-records.png')}
            extraStyle={{ backgroundColor: 'rgba(242,108,79, 0.2)' }}
          />
        </View>
        <View style={styles.profileImgContainer}>
          <Image
            style={styles.profileImg}
            resizeMode="cover"
            source={{ uri: decodeURIComponent(user.profileImg) }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 3, justifyContent: 'flex-end'}}>
            <Text style={styles.displayName}>{user.displayName}</Text>
          </View>
          <View style={{ flex: 4, justifyContent: showSecondButton ? 'space-around' : 'flex-start' }}>

            <Button
              small
              raised
              buttonStyle={styles.button}
              fontSize={13}
              borderRadius={60}
              backgroundColor='#98250B'
              disabledStyle={{ backgroundColor: '#98250B' }}
              buttonStyle={styles.button}
              {...buttonProps}
            />
            {this.renderSecondButton()}
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
  overlay: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   backgroundColor: 'rgba(242,108,79, 0.4)'
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
  profileImg: {
    borderRadius: 65,
    height: 130,
    width: 130,
  },
  displayNameAndButtonContainer: {
    flex: 1,
  },
  displayNameContainer: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: 8,
  },
  displayName: {
    fontSize: 19,
    marginBottom: 15,
    alignSelf: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    width: 215,
    height: 44,
  },
  displayNameAndButtonContainer: {
    height: 300,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default UserCard;
