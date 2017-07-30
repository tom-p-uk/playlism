import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';
import { View, Platform, Text } from 'react-native';
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SongsTabNav from './SongsTabNav';
import FriendsTabNav from './FriendsTabNav';
import PlaylistTabNav from './PlaylistTabNav';
import Hamburger from '../components/Hamburger';
import DrawerButton from '../components/DrawerButton';
import CustomDrawerMenu from '../components/CustomDrawerMenu';

const navigationOptions = ({ navigation, tintColor }) => ({
  headerRight: (
    <DrawerButton
      navigation={navigation}
      tintColor='#FFFFFF'
    />
  ),
  // headerRight: navigation.state.routeName === 'searchFriends' ? <Text>Right</Text> : <View></View>,
  headerStyle: {
    backgroundColor: '#F26C4F',
    marginTop: Platform.OS === 'android' ? 24 : 0
   },
   headerTitleStyle: {
    alignSelf:'center',
    color: '#FFFFFF'
   },
  headerTintColor: '#FFFFFF',
});

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
}, { navigationOptions });

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
}, { navigationOptions });

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
}, { navigationOptions });

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
}, { navigationOptions });

const DrawerNav = DrawerNavigator({
  dashboard: { screen: DashboardStack },
  songs: { screen: SongsStack },
  playlists: { screen: PlaylistsStack },
  friends: { screen: FriendsStack },
}, {
  contentComponent: CustomDrawerMenu,
  drawerWidth: 260,
  drawerPosition: 'right',
  contentOptions: {
    activeTintColor: '#F26C4F',
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }
});

const MainNav = TabNavigator({
  // welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: DrawerNav,
  }
}, {
  swipeEnabled: false,
  navigationOptions: { tabBarVisible: false },
  lazy: true,
});

export default MainNav;
