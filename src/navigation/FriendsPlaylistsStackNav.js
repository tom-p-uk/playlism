import React from 'react';
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';
import UserScreen from '../screens/UserScreen';
import FriendsScreen from '../screens/friends/FriendsScreen';
import FriendsPlaylistsListScreen from '../screens/playlist/FriendsPlaylistsListScreen';
import EditPlaylistScreen from '../screens/playlist/EditPlaylistScreen';
import FriendsPlaylistScreen from '../screens/playlist/FriendsPlaylistScreen';
import AddSongsScreen from '../screens/playlist/AddSongsScreen';

const FriendsPlaylistsStackNav = StackNavigator({
  friendsPlaylistsList: {
    screen: FriendsPlaylistsListScreen,
    navigationOptions: {
      title: "Friends' Playlists"
    }
  },
  editPlaylistForm: {
    screen: EditPlaylistScreen,
    navigationOptions: {
      title: 'Edit Playlist',
    }
  },
  friendsPlaylist: {
    screen: FriendsPlaylistScreen,
  },
  addSongs: {
    screen: AddSongsScreen,
    navigationOptions: {
      title: 'Add Song'
    },
  },
}, {
  headerMode: 'none',
});

export default FriendsPlaylistsStackNav;
