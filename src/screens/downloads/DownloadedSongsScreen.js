import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import SongsInAllDownloadsList from '../../components/SongsInAllDownloadsList';
import Player from '../../components/Player';
import BackgroundImage from '../../components/BackgroundImage';
import SortPlaylistModal from '../../components/SortPlaylistModal';
import PlaylistControls from '../../components/PlaylistControls';
import { sortPlayerPlaylist } from '../../actions';

class DownloadedSongsScreen extends Component {
  state = {
    isSortPlaylistModalVisible: false,
  };

  toggleSortPlaylistModal = () => this.setState({ isSortPlaylistModalVisible: !this.state.isSortPlaylistModalVisible });

  sortData = data => {
    if (!data) {
      return data;
    }

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
          <SongsInAllDownloadsList  data={this.sortData(downloadedSongs)} />
        </View>
        {currentRoute === 'downloadedSongs' && <Player songs={this.sortData(downloadedSongs)}/>}
      </BackgroundImage>
    );
  }
};

const styles = {
  playerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
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

export default connect(mapStateToProps, { sortPlayerPlaylist })(DownloadedSongsScreen);
