import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';
import { Platform } from 'react-native';
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SongsTabNav from './SongsTabNav';
import FriendsTabNav from './FriendsTabNav';
import PlaylistTabNav from './PlaylistTabNav';
import Hamburger from '../components/Hamburger';
import DrawerIcon from '../components/DrawerIcon';

const DashboardStack = StackNavigator({
  dashboardStack: {
    screen: DashboardScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='material-community'
          name='home'
          color={tintColor}
        />
      ),
    }
  },
});

const SongsStack = StackNavigator({
  songsStack: {
    screen: SongsTabNav,
    navigationOptions: {
      drawerLabel: 'Songs',
      drawerIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='material-community'
          name='music-note'
          color={tintColor}
        />
      ),
    }
  }
});

const PlaylistsStack = StackNavigator({
  playlistsStack: {
    screen: PlaylistTabNav,
    navigationOptions: {
      drawerLabel: 'Playlists',
      drawerIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='material-community'
          name='playlist-play'
          color={tintColor}
        />
      ),
    }
  }
});

const FriendsStack = StackNavigator({
  friendsStack: {
    screen: FriendsTabNav,
    navigationOptions: {
      drawerLabel: 'Friends',
      drawerIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='material-community'
          name='account-multiple'
          color={tintColor}
        />
      ),
    }
  }
}, {

});

const DrawerNav = DrawerNavigator({
  dashboard: { screen: DashboardStack },
  songs: { screen: SongsStack },
  playlists: { screen: PlaylistsStack },
  friends: { screen: FriendsStack },
}, {
  drawerWidth: 260,
  contentOptions: {
    activeTintColor: '#F26C4F'
  }
});

const MainNav = TabNavigator({
  // welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: DrawerNav,
  }
}, {
  navigationOptions: { tabBarVisible: false },
  lazy: true,
});

export default MainNav;
