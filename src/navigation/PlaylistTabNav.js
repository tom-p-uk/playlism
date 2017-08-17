import React from 'react';
import { TabNavigator } from 'react-navigation'
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import MyPlaylistsStackNav from './MyPlaylistsStackNav';
import CreatePlaylistStackNav from './CreatePlaylistStackNav';
import FriendsPlaylistsStackNav from './FriendsPlaylistsStackNav';

const PlaylistTabNav = TabNavigator({
  myPlaylists: {
    screen: MyPlaylistsStackNav,
    navigationOptions: {
      title: 'My Playlists',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type='material-community'
          name='playlist-play'
          color={tintColor}
        />
      ),
    }
  },
  friendsPlaylists: {
    screen: FriendsPlaylistsStackNav,
    navigationOptions: {
      // title: "Friends' Playlists",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='material-community'
          name='account-multiple'
          color={tintColor}
        />
      ),
    }
  },
  createNewPlaylist: {
    screen: CreatePlaylistStackNav,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='material-community'
          name='playlist-plus'
          color={tintColor}
        />
      ),
    }
  },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    style: { height: 20 },
    labelStyle: { fontSize: 10 },
    activeTintColor: '#F26C4F',
    inactiveTintColor:'#999999',
    showIcon: true,
    style: {
        backgroundColor: '#FFFFFF',
        // marginTop: Platform.OS === 'android' ? 24 : 0
    },
    indicatorStyle: {
        backgroundColor: '#FFFFFF'
    }
  }
});

export default PlaylistTabNav;
