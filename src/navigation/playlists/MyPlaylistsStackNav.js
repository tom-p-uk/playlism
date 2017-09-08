import React from 'react';
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';
import UserScreen from '../../screens/UserScreen';
import MyPlaylistsListScreen from '../../screens/playlist/MyPlaylistsListScreen';
import MyPlaylistScreen from '../../screens/playlist/MyPlaylistScreen';
import AddSongsScreen from '../../screens/playlist/AddSongsScreen';
import EditPlaylistScreen from '../../screens/playlist/EditPlaylistScreen';

const MyPlaylistsStackNav = StackNavigator({
  myPlaylistsList: {
    screen: MyPlaylistsListScreen,
    navigationOptions: {
      title: "My Playlists"
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
