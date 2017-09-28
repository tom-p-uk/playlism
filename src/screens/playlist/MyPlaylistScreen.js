import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Platform } from 'react-native';
import { Card, Button, ButtonGroup } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import { Circle, Bar } from 'react-native-progress';
import DropdownAlert from 'react-native-dropdownalert';

import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import SongsList from '../../components/SongsList';
import PreviewSongModal from '../../components/PreviewSongModal';
import SortPlaylistModal from '../../components/SortPlaylistModal';
import BackgroundImage from '../../components/BackgroundImage';
import PlaylistControls from '../../components/PlaylistControls';
import {
  getSongsInMyPlaylist,
  sortMyPlaylist,
  previewSong,
  togglePreviewSongModal,
  downloadSong,
  deleteDownloadedSong
} from '../../actions';

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

  componentWillReceiveProps(nextProps) {
    const { currentlyDownloading } = this.props;

    if (currentlyDownloading.length !== nextProps.currentlyDownloading.length) {
      console.log(nextProps.currentlyDownloading);
    }

    if (!this.props.downloadSongError && nextProps.downloadSongError) {
      this.dropdown.alertWithType('error', 'Error', nextProps.downloadSongError);
    } else if (!this.props.songsInMyPlaylistError && nextProps.songsInMyPlaylistError) {
      this.dropdown.alertWithType('error', 'Error', nextProps.songsInMyPlaylistError);
    } else if (!this.props.deleteDownloadedSongError && nextProps.deleteDownloadedSongError) {
      this.dropdown.alertWithType('error', 'Error', nextProps.deleteDownloadedSongError);
    }
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

  renderSubtitle = item => {
    return `Added ${moment(item.dateAdded).fromNow()}`;
  };

  onDeleteAllPress = () => {
    const { songsInMyPlaylist, deleteDownloadedSong, downloadedSongs, currentlyDownloading } = this.props;
    const songs = this.sortData(songsInMyPlaylist);

    // // If song in array isn't currently downloading or hasn't been downloaded, start downloading it
    // songs.forEach(song => {
    //   const currentlyDownloadingIndex = currentlyDownloading.indexOf(song._id);
    //   const downloadedSongsIndex = _.findIndex(downloadedSongs, { _id: song._id });
    //
    //   if (currentlyDownloadingIndex === -1 && downloadedSongsIndex === -1) {
    //     downloadSong(song);
    //   }
    // });
    downloadedSongs.forEach(song => deleteDownloadedSong(song));
  };

  handleOnPressRightIcon = song => {
    const { downloadSong, deleteDownloadedSong, downloadedSongs, pendingDownloads, currentlyDownloading } = this.props;

    const pendingDownloadsIndex = pendingDownloads.indexOf(song._id);
    const currentlyDownloadingIndex = _.findIndex(currentlyDownloading, { songId: song._id });
    const downloadedSongsIndex = _.findIndex(downloadedSongs, { _id: song._id });

    if (pendingDownloadsIndex !== -1) {
      return console.log('Awaiting results of downloadSong/deleteDownloadedSong functions. Button disabled.');
    }

    if (downloadedSongsIndex === -1) {
      downloadSong(song, 1);
    } else {
      deleteDownloadedSong(downloadedSongs[downloadedSongsIndex]);
    }
  };

  renderRightIcon = (song) => {
    const { downloadSong, deleteDownloadedSong, downloadedSongs, pendingDownloads, currentlyDownloading } = this.props;

    const pendingDownloadsIndex = pendingDownloads.indexOf(song._id);
    const currentlyDownloadingIndex = _.findIndex(currentlyDownloading, { songId: song._id });
    const downloadedSongsIndex = _.findIndex(downloadedSongs, { _id: song._id });
    // const currentDownload = _.find(currentlyDownloading, { _id: song._id });

    if (pendingDownloadsIndex !== -1) {
      return <ActivityIndicator size='small' />;
    }

    if (currentlyDownloadingIndex !== -1) {
      const { totalBytesWritten, totalBytesExpectedToWrite } = currentlyDownloading[currentlyDownloadingIndex];
      const progress = totalBytesWritten / totalBytesExpectedToWrite;

      return (
        <Circle
          color='#F26C4F'
          progress={progress}
          size={35}
          thickness={2}
          showsText
          // formatText={progress => `${Math.round(progress * 100)}%`}
          textStyle={{ fontSize: 10 }}
        />
      );
    }

    if (currentlyDownloading.length > 0 || pendingDownloads.length > 0) {
      return <View />
    }  else if (downloadedSongsIndex === -1) {
      return { name: 'file-download' };
    } else {
      return { name: 'delete-forever' }
    }
  };

  renderMessageOrSongList = (navigation, songsInMyPlaylist) => {
    const { downloadedSongs, currentlyDownloading, pendingDownloads } = this.props;
    if (songsInMyPlaylist && songsInMyPlaylist.length === 0) {
      return <Message color='#F26C4F'>The playlist is empty.</Message>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <SongsList
            data={this.sortData(songsInMyPlaylist)}
            extraData={[downloadedSongs, currentlyDownloading, pendingDownloads]}
            navigation={navigation}
            onSongListItemPress={this.onSongListItemPress}
            handleOnPressRightIcon={this.handleOnPressRightIcon}
            renderRightIcon={this.renderRightIcon}
            renderSubtitle={this.renderSubtitle}
          />
        </View>
      );
    }
  };

  onSongListItemPress = song => {
    const { previewSong } = this.props;
    previewSong(song.videoId);
  };

  renderDropdownAlert = () => {
    return (
      <DropdownAlert
        ref={ref => this.dropdown = ref}
        errorColor='#F26C4F'
        closeInterval={2000}
        titleStyle={{ marginTop: Platform.OS === 'android' ? 0 : -20, fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}
      />
    );
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
          onDoneButtonPress={this.toggleSortPlaylistModal}
        />
        <PreviewSongModal
          isVisible={isPreviewSongModalOpen}
          onButtonPress={togglePreviewSongModal}
          videoId={songBeingPreviewed}
        />
        <PlaylistControls
          firstButtonProps={{ title: 'Delete Downloads', iconName: 'delete-forever', onPress: this.onDeleteAllPress }}
          secondButtonProps={{ title: 'Sort Playlist', iconName: 'swap-vert', onPress: this.toggleSortPlaylistModal }}
        />
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
        {this.renderDropdownAlert()}
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
    height: 50,
    opacity: 0.9,
  },
  button: {
    // width: 115,
    height: 44,
  },
  buttonDisabled: {
    backgroundColor: '#98250B',
  },
};

const mapStateToProps = ({
  auth: { authToken },
  playlist: { awaitingSongsInMyPlaylist, songsInMyPlaylist, songsInMyPlaylistError, myPlaylistSortedBy },
  player: { isPreviewSongModalOpen, songBeingPreviewed },
  downloads: { downloadedSongs, currentlyDownloading, pendingDownloads, downloadSongError, deleteDownloadedSongError }
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
    currentlyDownloading,
    pendingDownloads,
    downloadSongError,
    deleteDownloadedSongError,
  };
};

export default connect(mapStateToProps, {
  getSongsInMyPlaylist,
  sortMyPlaylist,
  togglePreviewSongModal,
  previewSong,
  downloadSong,
  deleteDownloadedSong,
})(MyPlaylistScreen);
