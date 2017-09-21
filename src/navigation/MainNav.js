import React, { Component } from 'react';
import { addNavigationHelpers, TabNavigator, StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { View, Platform, Text, BackHandler } from 'react-native';
import { Constants } from 'expo';

import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import DownloadsTabNav from './downloads/DownloadsTabNav';
import FriendsTabNav from './friends/FriendsTabNav';
import PlaylistTabNav from './playlists/PlaylistTabNav';
import DrawerButton from '../components/DrawerButton';
import CustomDrawerMenu from '../containers/CustomDrawerMenu';
import BackButton from '../components/BackButton';

const stackNavigatorConfig = {
  navigationOptions: ({ navigation, tintColor }) => ({
    headerRight: (
      <DrawerButton
        navigation={navigation}
        tintColor='#FFFFFF'
      />
    ),
    headerLeft: (<BackButton color='#FFFFFF' navigation={navigation} />),
    headerStyle: {
      backgroundColor: '#F26C4F',
      marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
     },
     headerTitleStyle: {
      alignSelf:'center',
      color: '#FFFFFF'
     },
    headerTintColor: '#FFFFFF',
  })
};

// Home screen has to be a stack nav to show a header. Separate config to ensure back button isn't shown.
const HomeStack = StackNavigator({
  homeStack: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon
          type='material-community'
          name='home'
          color={tintColor}
        />
      ),
    }
  },
}, {
  navigationOptions: ({ navigation, tintColor }) => ({
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
  })
});

const DownloadsStack = StackNavigator({
  downloadsStack: {
    screen: DownloadsTabNav,
    navigationOptions: {
      drawerLabel: 'Downloads',
      drawerIcon: ({ tintColor }) => (
        <Icon
          type='material'
          name='file-download'
          color={tintColor}
        />
      ),
    }
  }
}, stackNavigatorConfig);

const PlaylistsStack = StackNavigator({
  playlistsStack: {
    screen: PlaylistTabNav,
    navigationOptions: {
      drawerLabel: 'Playlists',
      drawerIcon: ({ tintColor }) => (
        <Icon
          type='material-community'
          name='playlist-play'
          color={tintColor}
        />
      ),
    }
  }
}, stackNavigatorConfig);

const FriendsStack = StackNavigator({
  friendsStack: {
    screen: FriendsTabNav,
    navigationOptions: {
      drawerLabel: 'Friends',
      drawerIcon: ({ tintColor }) => (
        <Icon
          type='material-community'
          name='account-multiple'
          color={tintColor}
        />
      ),
    }
  }
}, stackNavigatorConfig);

const DrawerNav = DrawerNavigator({
  home: { screen: HomeStack },
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

export const MainNav = StackNavigator({
  auth: { screen: AuthScreen },
  main: {
    screen: DrawerNav,
  }
}, {
  // swipeEnabled: false,
  // navigationOptions: { tabBarVisible: false },
  // lazy: true,
  // animationEnabled: false,
  headerMode: 'none',
});

class MainNavWithNavigationState extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
        const { dispatch, nav } = this.props
        if (this.shouldCloseApp(nav)) return false
        dispatch(NavigationActions.back({ key: null }));
        return true
      })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  shouldCloseApp = nav => {
    if (nav.index > 0) return false;

    if (nav.routes) {
      return nav.routes.every(this.shouldCloseApp);
    }

    return true;
  };

  render() {
    const { dispatch, nav, state } = this.props;

    return (
      <MainNav navigation={addNavigationHelpers({ dispatch, state: nav, reduxState: nav })} />
    );
  }

};

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps)(MainNavWithNavigationState);
