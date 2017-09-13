import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { DrawerItems, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { logout, setCurrentlyPlayingSong, setPlaybackObject, togglePlayPause, deleteDownloadedSong } from '../actions';
import ConfirmationModal from '../components/ConfirmationModal';

const SCREEN_WIDTH = Dimensions.get('window').width;

class CustomDrawerMenu extends Component {
  state = {
    isConfirmationModalVisible: false,
  };

  onPressLogoutButton = () => {
    this.props.navigation.navigate('DrawerClose');
    this.toggleConfirmationModal();
  };

  onConfirmPress = () => {
    const {
      navigation,
      logout,
      setCurrentlyPlayingSong,
      setPlaybackObject,
      playbackObject,
      downloadedSongs,
      deleteDownloadedSong,
    } = this.props;

    if (downloadedSongs) downloadedSongs.forEach(song => deleteDownloadedSong(song));
    this.toggleConfirmationModal();
    logout();
    if (playbackObject) playbackObject.unloadAsync();
    setCurrentlyPlayingSong(null);
    setPlaybackObject(null);
    // this.resetNavigation();
    // navigation.navigate('auth');
  };

  toggleConfirmationModal = () => this.setState({ isConfirmationModalVisible: !this.state.isConfirmationModalVisible });

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
        <Divider style={[styles.divider, { marginBottom: 0 }]} />
        <DrawerItems {...this.props} />
        <Divider style={[styles.divider, { marginTop: 0 }]} />
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={this.onPressLogoutButton}
        >
          <Icon name='power-settings-new' color='rgba(0, 0, 0, .87)' style={styles.icon} />
          <Text style={styles.label}>Log Out</Text>
        </TouchableOpacity>
        <ConfirmationModal
          isVisible={this.state.isConfirmationModalVisible}
          onConfirmPress={this.onConfirmPress}
          onCancelPress={this.toggleConfirmationModal}
          text={'Logging out will remove all downloaded songs from your device.\n\nAre you sure you want to continue?'}
        />
      </View>
    );
  }
};

const styles = {
  container: {
    // flex: 1,
    justifyContent: 'center',
    marginTop: 20,
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
    color: 'rgba(0, 0, 0, .87)',
    fontSize: 17,
    marginTop: 10
  },
  divider: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
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
  player: { playbackObject },
  downloads: { downloadedSongs },
}) => {
  return {
    user,
    playbackObject,
    downloadedSongs,
  };
};

export default connect(mapStateToProps, {
  logout,
  setCurrentlyPlayingSong,
  setPlaybackObject,
  togglePlayPause,
  deleteDownloadedSong,
})(CustomDrawerMenu);
