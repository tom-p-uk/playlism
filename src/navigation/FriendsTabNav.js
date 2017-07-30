import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import FriendsScreen from '../screens/friends/FriendsScreen';
import FriendRequestsScreen from '../screens/friends/FriendRequestsScreen';
import AddFriendStackNav from './AddFriendStackNav';

const FriendsTabNav = TabNavigator({
  friends: {
    screen: FriendsScreen,
    navigationOptions: {
      title: 'Friends',
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
  friendRequests: {
    screen: FriendRequestsScreen,
    navigationOptions: {
      title: 'Requests',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          // style={styles.icon}
          type='material-community'
          name='account-alert'
          color={tintColor}
        />
      ),
    }
  },
  addFriend: {
    screen: AddFriendStackNav,
  },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
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

export default FriendsTabNav;
