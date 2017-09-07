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
import { sortPlayerPlaylist, setCurrentlyPlayingSong } from '../../actions';

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

  render() {
    const {
      downloadedSongs,
      playerPlaylistSortedBy,
      sortPlayerPlaylist,
      currentRoute,
      currentlyPlayingSong,
      isPlaying,
    } = this.props;
    return (
      <BackgroundImage>
        <SortPlaylistModal
          isVisible={this.state.isSortPlaylistModalVisible}
          sortedBy={playerPlaylistSortedBy}
          onButtonGroupPress={sortPlayerPlaylist}
          onDoneButtonPress={() => this.toggleSortPlaylistModal()}
        />
        <PlaylistControls
          firstButtonProps={{ title: ' Play All ', iconName: 'play-arrow', onPress: () => null }}
          secondButtonProps={{ title: 'Sort Playlist', iconName: 'swap-vert', onPress: () => this.toggleSortPlaylistModal() }}
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

const getCurrentRouteRecursive = (routes, index) => {
  const route = routes[index];
  if (route.index === undefined) {
    return route.routeName;
  } else {
    return getCurrentRouteRecursive(route.routes, route.index);
  }
};

const mapStateToProps = ({
  nav,
  downloads: { downloadedSongs },
  player: { playerPlaylistSortedBy, isPlaying, currentlyPlayingSong },
}) => {
  const currentRoute = getCurrentRouteRecursive(nav.routes, nav.index);
  return {
    downloadedSongs,
    playerPlaylistSortedBy,
    currentRoute,
    isPlaying,
    currentlyPlayingSong,
  };
};

export default connect(mapStateToProps, { sortPlayerPlaylist, setCurrentlyPlayingSong })(DownloadedPlaylistScreen);
