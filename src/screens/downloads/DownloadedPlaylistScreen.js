import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import SongsInDownloadedPlaylistList from '../../components/SongsInDownloadedPlaylistList';
import Player from '../../components/Player';
import BackgroundImage from '../../components/BackgroundImage';
import SortPlaylistModal from '../../components/SortPlaylistModal';
import PlaylistControls from '../../components/PlaylistControls';
import { sortPlayerPlaylist } from '../../actions';

class DownloadedPlaylistScreen extends Component {
  state = {
    isSortPlaylistModalVisible: false,
  };

  toggleSortPlaylistModal = () => this.setState({ isSortPlaylistModalVisible: !this.state.isSortPlaylistModalVisible });

  sortData = data => {
    if (!data) return;

    const sortedBy = this.props.playerPlaylistSortedBy;
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

  render() {
    const { downloadedSongs, playerPlaylistSortedBy, sortPlayerPlaylist, currentRoute } = this.props;
    return (
      <BackgroundImage>
        <SortPlaylistModal
          isVisible={this.state.isSortPlaylistModalVisible}
          sortedBy={playerPlaylistSortedBy}
          onButtonGroupPress={sortPlayerPlaylist}
          onDoneButtonPress={() => this.toggleSortPlaylistModal()}
        />
        <PlaylistControls
          firstButtonProps={{ title: 'Play All', iconName: 'play-arrow', onPress: () => null }}
          secondButtonProps={{ title: 'Sort Playlist', iconName: 'swap-vert', onPress: () => this.toggleSortPlaylistModal() }}
        />
        <View style={{ flex: 5 }}>
          <SongsInDownloadedPlaylistList  data={this.filterAndSortData(downloadedSongs)} />
        </View>
        {currentRoute === 'downloadedPlaylist' && <Player songs={this.filterAndSortData(downloadedSongs)}/>}
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
  player: { playerPlaylistSortedBy },
}) => {
  const currentRoute = getCurrentRouteRecursive(nav.routes, nav.index);
  return {
    downloadedSongs,
    playerPlaylistSortedBy,
    currentRoute,
  };
};

export default connect(mapStateToProps, { sortPlayerPlaylist })(DownloadedPlaylistScreen);
