import React from 'react';
import { StackNavigator } from 'react-navigation'
import UserScreen from '../screens/UserScreen';
import SearchFriendScreen from '../screens/friends/SearchFriendScreen';

const AddFriendStackNav = StackNavigator({
  searchFriends: { screen: SearchFriendScreen },
  user: { screen: UserScreen }
}, {
  navigationOptions: { tabBarVisible: false },
  lazy: true,
});

export default AddFriendStackNav;
