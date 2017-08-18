import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Button, ButtonGroup } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';

import { getSongsInMyPlaylist, sortMyPlaylist, previewSong, togglePreviewSongModal, downloadSong } from '../../actions';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import SongsInMyPlaylistList from '../../components/SongsInMyPlaylistList';
import PreviewSongModal from '../../components/PreviewSongModal';
import SortPlaylistModal from '../../components/SortPlaylistModal';
import BackgroundImage from '../../components/BackgroundImage';

class MyPlaylistScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.playlist.title,
  });

  state = {
    isSortPlaylistModalVisible: false,
  };

  toggleSortPlaylistModal = () => this.setState({ isSortPlaylistModalVisible: !this.state.isSortPlaylistModalVisible });

  componentDidMount() {
    const { getSongsInMyPlaylist, user, authToken, navigation } = this.props;
    const { playlist } = navigation.state.params;

    getSongsInMyPlaylist(playlist._id, authToken);
  }

  sortData = data => {
    if (!data) {
      return data;
    }

    const sortedBy = this.props.myPlaylistSortedBy;
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

  onDownloadAllPress = () => {
    const { songsInMyPlaylist, downloadSong, downloadedSongs, currentlyDownloading } = this.props;
    const songs = this.sortData(songsInMyPlaylist);

    // If song in array isn't currently downloading or hasn't been downloaded, start downloading it
    songs.forEach(song => {
      const currentlyDownloadingIndex = currentlyDownloading.indexOf(song._id);
      const downloadedSongsIndex = _.findIndex(downloadedSongs, { _id: song._id });

      if (currentlyDownloadingIndex === -1 && downloadedSongsIndex === -1) {
        downloadSong(song);
      }
    });
  };

  renderButtons = (navigation, playlist) => {
    return (
      <Card containerStyle={styles.buttonCard}>
        <View style={styles.buttonContainer}>
          <Button
            raised
            small
            title='Download All'
            icon={{ name: 'file-download', style: styles.buttonIcon }}
            onPress={() => this.onDownloadAllPress()}
            style={styles.button}
            disabledStyle={styles.buttonDisabled}
            fontSize={13}
            borderRadius={30}
            backgroundColor='#98250B'
          />
          <Button
            raised
            small
            title='Sort Playlist'
            icon={{ name: 'swap-vert', style: styles.buttonIcon }}
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

  renderMessageOrSongList = (navigation, songsInMyPlaylist) => {
    if (songsInMyPlaylist && songsInMyPlaylist.length === 0) {
      return <Message color='#F26C4F'>The playlist is empty.</Message>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <SongsInMyPlaylistList
            data={this.sortData(songsInMyPlaylist)}
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

  renderContent = () => {
    const {
      songsInMyPlaylist,
      navigation,
      myPlaylistSortedBy,
      sortMyPlaylist,
      isPreviewSongModalOpen,
      togglePreviewSongModal,
      songBeingPreviewed,
    } = this.props;
    const { playlist } = navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <SortPlaylistModal
          isVisible={this.state.isSortPlaylistModalVisible}
          sortedBy={myPlaylistSortedBy}
          onButtonGroupPress={sortMyPlaylist}
          onDoneButtonPress={() => this.toggleSortPlaylistModal()}
        />
        <PreviewSongModal
          isVisible={isPreviewSongModalOpen}
          onButtonPress={() => togglePreviewSongModal()}
          videoId={songBeingPreviewed}
        />
        {this.renderButtons(navigation, playlist)}
        {this.renderMessageOrSongList(navigation, songsInMyPlaylist)}
      </View>
    );
  };

  render() {
    const { awaitingSongsInMyPlaylist } = this.props;
    return (
      <BackgroundImage>
        {
          awaitingSongsInMyPlaylist
            ?
              <Spinner size='large'/>
            :
              this.renderContent()
        }
      </BackgroundImage>
    );
  }
};

const styles = {
  buttonCard: {
    opacity: 0.8,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  buttonIcon: {
    marginRight: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: -40,
    height: 50,
    opacity: 0.9,
  },
  button: {
    // width: 115,
  },
  buttonDisabled: {
    backgroundColor: '#98250B',
  },
};

const mapStateToProps = ({
  auth: { authToken },
  playlist: { awaitingSongsInMyPlaylist, songsInMyPlaylist, songsInMyPlaylistError, myPlaylistSortedBy },
  player: { isPreviewSongModalOpen, songBeingPreviewed },
  downloads: { downloadedSongs, currentlyDownloading }
}) => {
  return {
    authToken,
    awaitingSongsInMyPlaylist,
    songsInMyPlaylist,
    songsInMyPlaylistError,
    myPlaylistSortedBy,
    isPreviewSongModalOpen,
    songBeingPreviewed,
    downloadedSongs,
    currentlyDownloading
  };
};

export default connect(mapStateToProps, {
  getSongsInMyPlaylist,
  sortMyPlaylist,
  togglePreviewSongModal,
  previewSong,
  downloadSong,
})(MyPlaylistScreen);
