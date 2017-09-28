import React from 'react';
import { StackNavigator } from 'react-navigation';
import MyPlaylistsListScreen from '../../screens/playlist/MyPlaylistsListScreen';
import MyPlaylistScreen from '../../screens/playlist/MyPlaylistScreen';
import EditPlaylistScreen from '../../screens/playlist/EditPlaylistScreen';

const MyPlaylistsStackNav = StackNavigator({
  myPlaylistsList: {
    screen: MyPlaylistsListScreen,
    navigationOptions: {
      title: 'My Playlists'
    }
  },
  myPlaylist: {
    screen: MyPlaylistScreen,
  },
  editMyPlaylist: {
    screen: EditPlaylistScreen,
    navigationOptions: {
      title: 'Edit Playlist',
    }
  },
}, {
  headerMode: 'none',
});

export default MyPlaylistsStackNav;
