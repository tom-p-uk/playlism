import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import MyPlaylistsStackNav from './MyPlaylistsStackNav';
import CreatePlaylistStackNav from './CreatePlaylistStackNav';
import FriendsPlaylistsStackNav from './FriendsPlaylistsStackNav';

const PlaylistTabNav = TabNavigator({
  myPlaylists: {
    screen: MyPlaylistsStackNav,
    navigationOptions: {
      // title: 'My Playlists',
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
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    labelStyle: { fontSize: 11, marginBottom: Platform.OS === 'android' ? -5 : 0 },
    iconStyle: {
      marginTop: Platform.OS === 'android' ? -5 : 0,
      marginBottom: Platform.OS === 'android' ? -5 : 0,
    },
    upperCaseLabel: false,
    activeTintColor: '#F26C4F',
    inactiveTintColor: '#999999',
    showIcon: true,
    style: {
        backgroundColor: '#FFFFFF',
    },
    indicatorStyle: {
        backgroundColor: '#FFFFFF'
    },
  }
});

export default PlaylistTabNav;
