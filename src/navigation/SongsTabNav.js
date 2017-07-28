import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Platform } from 'react-native';
import AllSongsScreen from '../screens/AllSongsScreen';
import LikedSongsScreen from '../screens/LikedSongsScreen';

const SongsTabNav = TabNavigator({
  allSongs: {
    screen: AllSongsScreen,
    navigationOptions: {
      title: 'All Songs',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='font-awesome'
          name='music'
          color={tintColor}
        />
      ),
    }
  },
  likedSongs: {
    screen: LikedSongsScreen,
    navigationOptions: {
      title: 'Liked Songs',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='font-awesome'
          name='heart'
          color={tintColor}
        />
      ),
    }
  },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    style: { },
    labelStyle: { fontSize: 12 },
    activeTintColor: '#F26C4F',
    inactiveTintColor:'#999999',
    showIcon: true,
    style: {
        backgroundColor: '#FFFFFF',
        marginTop: Platform.OS === 'android' ? 24 : 0
    },
    indicatorStyle: {
        backgroundColor: '#FFFFFF'
    }
  }
});

export default SongsTabNav;
