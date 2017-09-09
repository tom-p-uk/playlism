import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';

import { logout, setCurrentlyPlayingSong, setPlaybackObject, togglePlayPause } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class CustomDrawerMenu extends Component {
  onPressLogoutButton = () => {
    const { navigation, logout, setCurrentlyPlayingSong, setPlaybackObject, playbackObject } = this.props;
    logout();
    if (playbackObject) playbackObject.unloadAsync();
    setCurrentlyPlayingSong(null);
    setPlaybackObject(null);
    navigation.navigate('DrawerClose');
    navigation.navigate('auth');
  };

  renderProfileImg = user => {
    if (!user) return <View />

    return (
      <View style={styles.profileImgContainer}>
        <View>
          <Image source={{ uri: decodeURIComponent(user.profileImg) }} style={styles.profileImg} />
        </View>
        <Text style={styles.displayName}>
          {user.displayName}
        </Text>
      </View>
    );
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        {this.renderProfileImg(user)}
        <Divider style={styles.divider} />
        <DrawerItems style={styles.items} {...this.props} />
        <Divider style={[styles.divider, { marginTop: 0 }]} />
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => this.onPressLogoutButton()}
        >
          <Icon name='power-settings-new' color='rgba(0, 0, 0, .87)' style={styles.icon} />
          <Text style={styles.label}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = {
  container: {
    // flex: 1,
    justifyContent: 'center',
    marginTop: -12,
    // backgroundColor: '#F26C4F'
  },
  profileImgContainer: {
    // backgroundColor: '#E9F2F9',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 90,
    marginBottom: 30,
    // flex: 1
  },
  profileImg: {
    borderRadius: 40,
    height: 80,
    width: 80,
  },
  displayName: {
    color: '#000000',
    fontSize: 17,
    marginTop: 10
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  items: {
    paddingTop: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    margin: 15,
    fontWeight: 'bold',
  },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.62,
  },
};

const mapStateToProps = ({
  auth: { user },
  player: { playbackObject }
}) => {
  return { user, playbackObject };
};

export default connect(mapStateToProps, {
  logout,
  setCurrentlyPlayingSong,
  setPlaybackObject,
  togglePlayPause,
})(CustomDrawerMenu);
