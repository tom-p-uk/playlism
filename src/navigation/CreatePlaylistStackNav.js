import React from 'react';
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';
import UserScreen from '../screens/UserScreen';
import FriendsScreen from '../screens/friends/FriendsScreen';
import CreatePlaylistScreen from '../screens/playlist/CreatePlaylistScreen';

const CreatePlaylistStackNav = StackNavigator({
  selectFriend: {
    screen: FriendsScreen,
    navigationOptions: {
      title: 'Create Playlist'
    }
  },
  user: { screen: UserScreen },
  createPlaylistForm: {
    screen: CreatePlaylistScreen,
    navigationOptions: {
      title: 'Create Playlist'
    }
  }
}, {
  headerMode: 'none',
});

export default CreatePlaylistStackNav;
