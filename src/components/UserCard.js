import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';

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
          buttonStyle={styles.button}
          fontSize={13}
          borderRadius={60}
          disabledStyle={styles.buttonDisabled}
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
        <View>
          <View style={{ flex: 1, }}>
            <Image
              source={coverImgSource}
              style={{ flex: 1, width: SCREEN_WIDTH }}
            />
            <View style={styles.overlay} />
          </View>
          <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', }}>
          </View>
        </View>
        <View style={styles.profileImgContainer}>
          <Image
            style={styles.profileImg}
            resizeMode="cover"
            source={{ uri: decodeURIComponent(user.profileImg) }}
          />
        </View>
        <View style={[styles.displayNameAndButtonContainer, { top } ]}>
          <Text style={styles.displayName}>{user.displayName}</Text>
          <View style={styles.buttonContainer}>
            <Button
              small
              raised
              buttonStyle={styles.button}
              fontSize={13}
              borderRadius={60}
              backgroundColor='#98250B'
              disabledStyle={styles.buttonDisabled}
              // buttonStyle={{ height: 45 }}
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
    borderRadius: 60,
    height: 120,
    width: 120,
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
  },
  buttonContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
    flex: 1,
    // elevation: 10,
    // zIndex: 99,
  },
  button: {
    width: 215,
    height: 45,
    marginBottom: 20,
    elevation: 1,
    zIndex: 99999,
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

export default UserCard;
