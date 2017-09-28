import React from 'react';
import { StackNavigator } from 'react-navigation';

import DownloadedPlaylistsListScreen from '../../screens/downloads/DownloadedPlaylistsListScreen';
import DownloadedPlaylistScreen from '../../screens/downloads/DownloadedPlaylistScreen';

const DownloadedPlaylistsStackNav = StackNavigator({
  downloadedPlaylistsList: {
    screen: DownloadedPlaylistsListScreen,
    navigationOptions: {
      title: 'Downloaded Playlists'
    }
  },
  downloadedPlaylist: {
    screen: DownloadedPlaylistScreen,
  },
}, {
  headerMode: 'none',
});

export default DownloadedPlaylistsStackNav;
