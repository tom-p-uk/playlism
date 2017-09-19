import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import FriendsScreen from '../../screens/friends/FriendsScreen';
import FriendRequestsScreen from '../../screens/friends/FriendRequestsScreen';
import FriendsStackNav from './FriendsStackNav';
import FriendRequestsStackNav from './FriendRequestsStackNav';
import AddFriendStackNav from './AddFriendStackNav';

const FriendsTabNav = TabNavigator({
  friends: {
    screen: FriendsStackNav,
  },
  friendRequests: {
    screen: FriendRequestsStackNav,
  },
  addFriend: {
    screen: AddFriendStackNav,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  lazy: false,
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

export default FriendsTabNav;
