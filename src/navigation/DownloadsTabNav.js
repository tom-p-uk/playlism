import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Platform } from 'react-native';
import DownloadedPlaylistsStackNav from './DownloadedPlaylistsStackNav';
import DownloadedSongsScreen from '../screens/downloads/DownloadedSongsScreen';

const DownloadsTabNav = TabNavigator({
  downloadedPlaylists: {
    screen: DownloadedPlaylistsStackNav,
    navigationOptions: {
      title: 'Downloaded Playlists',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='material-community'
          name='playlist-play'
          color={tintColor}
        />
      ),
    }
  },
  downloadedSongs: {
    screen: DownloadedSongsScreen,
    navigationOptions: {
      title: 'Downloaded Songs',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          name='file-download'
          color={tintColor}
        />
      ),
    }
  },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  lazy: true,
  tabBarOptions: {
    labelStyle: { fontSize: 11, marginBottom: Platform.OS === 'android' ? -5 : 0 },
    iconStyle: {
      marginTop: Platform.OS === 'android' ? -5 : 0,
      marginBottom: Platform.OS === 'android' ? -5 : 0,
    },
    upperCaseLabel: false,
    activeTintColor: '#F26C4F',
    inactiveTintColor:'#999999',
    showIcon: true,
    style: {
        backgroundColor: '#FFFFFF',
    },
    indicatorStyle: {
        backgroundColor: '#FFFFFF'
    },
  }
});

export default DownloadsTabNav;
