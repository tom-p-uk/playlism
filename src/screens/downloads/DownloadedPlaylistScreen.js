import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { KeepAwake } from 'expo';

import SongsList from '../../components/SongsList';
import Player from '../../containers/Player';
import BackgroundImage from '../../components/BackgroundImage';
import SortPlaylistModal from '../../components/SortPlaylistModal';
import PlaylistControls from '../../components/PlaylistControls';
import Message from '../../components/Message';
import { sortPlayerPlaylist, setCurrentlyPlayingSong, deleteDownloadedSong } from '../../actions';

class DownloadedPlaylistScreen extends Component {
  static navigationOptions = ({ navigation}) => ({
    title: navigation.state.params.playlist.title,
  });

  state = {
    isSortPlaylistModalVisible: false,
  };

  toggleSortPlaylistModal = () => this.setState({ isSortPlaylistModalVisible: !this.state.isSortPlaylistModalVisible });

  sortData = data => {
    if (!data) return;

    const sortedBy = this.props.playerPlaylistSortedBy;
    switch (sortedBy) {
      case 0:
        return _.sortBy(data, 'downloadedOn');
      case 1:
        return _.sortBy(data, 'downloadedOn').reverse();
      case 2:
        return _.sortBy(data, 'title');
      case 3:
        return _.sortBy(data, 'title').reverse();
    }
  };

  filterDownloadedSongs = data => {
    if (!data) return;
    const { playlist } = this.props.navigation.state.params;

    return data.filter(song => {
      return song.inPlaylists.indexOf(playlist._id) !== -1;
    });
  };

  filterAndSortData = data => {
    const filtered = this.filterDownloadedSongs(data);
    const sorted = this.sortData(filtered);
    return sorted;
  };

  renderRightIcon = song => {
    const { currentlyPlayingSong, isPlaying } = this.props;
    if (!currentlyPlayingSong || isPlaying === undefined) return <View />;

    if (song._id === currentlyPlayingSong._id && isPlaying) {
      return { name: 'volume-up' };
    } else if (song._id === currentlyPlayingSong._id && !isPlaying) {
      return { name: 'volume-mute' };
    } else {
      return <View />;
    }
  };

  onSongListItemPress = song => {
    this.props.setCurrentlyPlayingSong(song);
  };

  renderSubtitle = song => `Downloaded ${moment(song.downloadedOn).fromNow()}`;

  onDeleteAllPress = songs => {
    songs.forEach(song => this.props.deleteDownloadedSong(song));
  };

  render() {
    const {
      downloadedSongs,
      playerPlaylistSortedBy,
      sortPlayerPlaylist,
      currentRoute,
      currentlyPlayingSong,
      isPlaying,
    } = this.props;

    if (this.filterAndSortData(downloadedSongs).length === 0) {
      return (
        <BackgroundImage>
          <Message color='#F26C4F'>
            There are no songs currently available.{'\n\n'}

            To download some, navigate to the the 'My Playlists' section of the app.
          </Message>
        </BackgroundImage>
      );
    }
    return (
      <BackgroundImage>
        <SortPlaylistModal
          isVisible={this.state.isSortPlaylistModalVisible}
          sortedBy={playerPlaylistSortedBy}
          onButtonGroupPress={sortPlayerPlaylist}
          onDoneButtonPress={() => this.toggleSortPlaylistModal()}
        />
        <PlaylistControls
          firstButtonProps={{
            title: ' Delete All ',
            iconName: 'delete-forever',
            onPress: () => this.onDeleteAllPress(this.filterAndSortData(downloadedSongs))
          }}
          secondButtonProps={{
            title: 'Sort Playlist',
            iconName: 'swap-vert',
            onPress: () => this.toggleSortPlaylistModal()
          }}
        />
        <View style={{ flex: 5 }}>
          <SongsList
            data={this.filterAndSortData(downloadedSongs)}
            extraData={[currentlyPlayingSong, isPlaying]}
            onSongListItemPress={this.onSongListItemPress}
            renderRightIcon={this.renderRightIcon}
            handleOnPressRightIcon={null}
            renderSubtitle={this.renderSubtitle}
          />
        </View>
        {currentRoute === 'downloadedPlaylist' && <Player songs={this.filterAndSortData(downloadedSongs)}/>}
        <KeepAwake />
      </BackgroundImage>
    );
  }
};

const mapStateToProps = ({
  nav: { currentRoute },
  downloads: { downloadedSongs },
  player: { playerPlaylistSortedBy, isPlaying, currentlyPlayingSong },
}) => {
  return {
    downloadedSongs,
    playerPlaylistSortedBy,
    currentRoute,
    isPlaying,
    currentlyPlayingSong,
  };
};

export default connect(mapStateToProps, {
  sortPlayerPlaylist,
  setCurrentlyPlayingSong,
  deleteDownloadedSong,
})(DownloadedPlaylistScreen);
