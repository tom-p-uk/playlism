import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Platform } from 'react-native';
import AllSongsScreen from './screens/AllSongsScreen';
import AuthScreen from './screens/AuthScreen';
import DashboardScreen from './screens/DashboardScreen';
import LikedSongsScreen from './screens/LikedSongsScreen';
import UserScreen from './screens/UserScreen';
// import WelcomeScreen from './screens/WelcomeScreen';
import FriendRequestsScreen from './screens/friends/FriendRequestsScreen';
import FriendsScreen from './screens/friends/FriendsScreen';
import SearchFriendScreen from './screens/friends/SearchFriendScreen';
import OtherUserPlaylistsScreen from './screens/playlist/OtherUserPlaylistsScreen';
import PlaylistFormScreen from './screens/playlist/PlaylistFormScreen';
import SearchSongScreen from './screens/playlist/SearchSongScreen';
import UserPlaylistsScreen from './screens/playlist/UserPlaylistsScreen';


const Navigator = TabNavigator({
  // welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: TabNavigator({
      dashboard: { screen: DashboardScreen },
      allSongs: { screen: AllSongsScreen },
      likedSongs: { screen: LikedSongsScreen },
      playlists: { screen:
        TabNavigator({
          userPlaylists: { screen: UserPlaylistsScreen },
          otherUserPlaylists: { screen: OtherUserPlaylistsScreen },
          createNewPlaylist: { screen:
            StackNavigator({
              playlistForm: { screen: PlaylistFormScreen },
              searchSong: { screen: SearchSongScreen }
            })
          },
        })
      },
      friends: { screen:
        TabNavigator({
          friends: { screen: FriendsScreen },
          friendRequests: { screen: FriendRequestsScreen },
          addFriends: { screen:
            StackNavigator({
              searchFriends: { screen: SearchFriendScreen },
              user: { screen: UserScreen }
            })
          },
        })
      },
    }, {
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      tabBarOptions: {
        style: { marginTop: Platform.OS === 'android' ? 24 : 0 },
        labelStyle: { fontSize: 12 }
      }
    })
  }
}, {
  navigationOptions: { tabBarVisible: false },
  lazy: true,
});

export default Navigator;
