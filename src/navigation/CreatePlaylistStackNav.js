import React from 'react';
import { StackNavigator } from 'react-navigation'
import PlaylistFormScreen from '../screens/playlist/PlaylistFormScreen';
import SearchSongScreen from '../screens/playlist/SearchSongScreen';

const CreatePlaylistStackNav = StackNavigator({
  playlistForm: { screen: PlaylistFormScreen },
  searchSong: { screen: SearchSongScreen }
}, {
  headerMode: 'none',
  lazy: true,
});

export default CreatePlaylistStackNav;
