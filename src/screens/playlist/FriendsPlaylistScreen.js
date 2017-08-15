import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, ButtonGroup } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';

import { getSongsInFriendsPlaylist, deleteSong, sortFriendsPlaylist, previewSong, togglePreviewSongModal } from '../../actions';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import SongsInFriendsPlaylistList from '../../components/SongsInFriendsPlaylistList';
import PreviewSongModal from '../../components/PreviewSongModal';
import SortPlaylistModal from '../../components/SortPlaylistModal';

class FriendsPlaylistScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.playlist.title,
  });

  state = {
    isSortPlaylistModalVisible: false,
  };

  toggleSortPlaylistModal = () => this.setState({ isSortPlaylistModalVisible: !this.state.isSortPlaylistModalVisible });

  componentDidMount() {
    const { getSongsInFriendsPlaylist, user, authToken, navigation } = this.props;
    const { playlist } = navigation.state.params;

    getSongsInFriendsPlaylist(playlist._id, authToken);
  }

  sortData = data => {
    if (!data) {
      return data;
    }

    const sortedBy = this.props.friendsPlaylistSortedBy;
    switch (sortedBy) {
      case 0:
        return _.sortBy(data, 'dateAdded');
      case 1:
        return _.sortBy(data, 'dateAdded').reverse();
      case 2:
        return _.sortBy(data, 'title');
      case 3:
        return _.sortBy(data, 'title').reverse();
    }
  };

  renderButtons = (navigation, playlist) => {
    return (
      <Card>
        <View style={styles.buttonContainer}>
          <Button
            raised
            title='Add Songs'
            icon={{ name: 'add' }}
            onPress={() => navigation.navigate('addSongs', { playlist })}
            style={styles.button}
            disabledStyle={styles.buttonDisabled}
            fontSize={13}
            borderRadius={30}
            backgroundColor='#98250B'
          />
          <Button
            raised
            title='Sort Playlist'
            icon={{ name: 'swap-vert' }}
            onPress={() => this.toggleSortPlaylistModal()}
            style={styles.button}
            disabledStyle={styles.buttonDisabled}
            fontSize={13}
            borderRadius={30}
            backgroundColor='#D13310'
          />
        </View>
      </Card>
    );
  };

  renderMessageOrSongList = () => {
    const { navigation, songsInFriendsPlaylist } = this.props;

    if (songsInFriendsPlaylist && songsInFriendsPlaylist.length === 0) {
      return <Message color='#F26C4F'>The playlist is empty.</Message>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <SongsInFriendsPlaylistList
            data={this.sortData(songsInFriendsPlaylist)}
            navigation={navigation}
            onSongListItemPress={this.onSongListItemPress}
          />
        </View>
      );
    }
  };

  onSongListItemPress = videoId => {
    const { previewSong } = this.props;
    previewSong(videoId);
  };

  render() {
    const {
      awaitingSongsInFriendsPlaylist,
      navigation,
      friendsPlaylistSortedBy,
      sortFriendsPlaylist,
      isPreviewSongModalOpen,
      togglePreviewSongModal,
      songBeingPreviewed,
    } = this.props;
    const { playlist } = navigation.state.params;

    if (awaitingSongsInFriendsPlaylist) {
      return <Spinner size='large'/>;
    }

    return (
      <View style={{ flex: 1 }}>
        <SortPlaylistModal
          isVisible={this.state.isSortPlaylistModalVisible}
          sortedBy={friendsPlaylistSortedBy}
          onButtonGroupPress={sortFriendsPlaylist}
          onDoneButtonPress={() => this.toggleSortPlaylistModal()}
        />
        <PreviewSongModal
          isVisible={isPreviewSongModalOpen}
          onButtonPress={() => togglePreviewSongModal()}
          videoId={songBeingPreviewed}
        />
        {this.renderButtons(navigation, playlist)}
        {this.renderMessageOrSongList()}
      </View>
    );
  }
};

const styles = {
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: -40,
    height: 50,
  },
  button: {
    width: 140,
  },
  buttonDisabled: {
    backgroundColor: '#98250B',
  },
};

const mapStateToProps = ({
  auth: { authToken },
  playlist: { awaitingSongsInFriendsPlaylist, songsInFriendsPlaylist, songsInFriendsPlaylistError, friendsPlaylistSortedBy },
  player: { isPreviewSongModalOpen, songBeingPreviewed },
}) => {
  return {
    authToken,
    awaitingSongsInFriendsPlaylist,
    songsInFriendsPlaylist,
    songsInFriendsPlaylistError,
    friendsPlaylistSortedBy,
    isPreviewSongModalOpen,
    songBeingPreviewed,
  };
};

export default connect(mapStateToProps, {
  getSongsInFriendsPlaylist,
  deleteSong,
  sortFriendsPlaylist,
  togglePreviewSongModal,
  previewSong,
})(FriendsPlaylistScreen);
