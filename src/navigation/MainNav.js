import React from 'react';
import { addNavigationHelpers, TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { View, Platform, Text } from 'react-native';

import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/HomeScreen';
import DownloadsTabNav from './downloads/DownloadsTabNav';
import FriendsTabNav from './friends/FriendsTabNav';
import PlaylistTabNav from './playlists/PlaylistTabNav';
import Hamburger from '../components/Hamburger';
import DrawerButton from '../components/DrawerButton';
import CustomDrawerMenu from '../containers/CustomDrawerMenu';
import BackButton from '../components/BackButton';

const navigationOptions = ({ navigation, tintColor }) => ({
  headerRight: (
    <DrawerButton
      navigation={navigation}
      tintColor='#FFFFFF'
    />
  ),
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

const DownloadsStack = StackNavigator({
  downloadsStack: {
    screen: DownloadsTabNav,
    navigationOptions: {
      drawerLabel: 'Downloads',
      drawerIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='material'
          name='file-download'
          color={tintColor}
        />
      ),
    }
  }
}, {
  navigationOptions: ({ navigation, tintColor }) => ({
    headerRight: (
      <DrawerButton
        navigation={navigation}
        tintColor='#FFFFFF'
      />
    ),
    headerLeft: (
      <BackButton color='#FFFFFF' navigation={navigation} />
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
  })
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
}, {
  navigationOptions: ({ navigation, tintColor }) => ({
    headerRight: (
      <DrawerButton
        navigation={navigation}
        tintColor='#FFFFFF'
      />
    ),
    headerLeft: (
      <BackButton color='#FFFFFF' navigation={navigation} />
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
  })
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
  navigationOptions: ({ navigation, tintColor }) => ({
    headerRight: (
      <DrawerButton
        navigation={navigation}
        tintColor='#FFFFFF'
      />
    ),
    headerLeft: (
      <BackButton color='#FFFFFF' navigation={navigation} />
    ),
    headerStyle: {
      backgroundColor: '#F26C4F',
      marginTop: Platform.OS === 'android' ? 24 : 0
     },
     headerTitleStyle: {
      alignSelf:'center',
      color: '#FFFFFF'
     },
    headerTintColor: '#FFFFFF',
  })
});

const DrawerNav = DrawerNavigator({
  dashboard: { screen: DashboardStack },
  downloads: { screen: DownloadsStack },
  playlists: { screen: PlaylistsStack },
  friends: { screen: FriendsStack },
}, {
  contentComponent: CustomDrawerMenu,
  drawerWidth: 220,
  drawerPosition: 'right',
  contentOptions: {
    activeTintColor: '#F26C4F',
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }
});

export const MainNav = TabNavigator({
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

const MainNavWithNavigationState = ({ dispatch, nav }) => (
  <MainNav navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = ({ nav }) => ({
  nav,
});

export default connect(mapStateToProps)(MainNavWithNavigationState);
