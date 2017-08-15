import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getFriendsPlaylists } from '../../actions';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import PlaylistList from '../../components/PlaylistList';

class FriendsPlaylistsListScreen extends Component {
  static navigationOptions = {
    title: "Friends' Playlists",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        // style={styles.icon}
        type='material-community'
        name='account-multiple'
        color={tintColor}
      />
    ),
  };

  componentDidMount() {
    const { getFriendsPlaylists, user, authToken, navigation, awaitingFriendsPlaylists } = this.props;
    getFriendsPlaylists(authToken);

  }

  renderSpinner() {
    const { friendsPlaylists, awaitingFriendsPlaylists } = this.props;

    if ((_.isNull(friendsPlaylists) || friendsPlaylists === undefined) && awaitingFriendsPlaylists) {
      return <Spinner size='large'/>;
    }
  }

  renderMessage = () => {
    const { friendsPlaylists, friendsPlaylistsError, awaitingFriendsPlaylists } = this.props;
    if (!awaitingFriendsPlaylists && friendsPlaylists && friendsPlaylists.length === 0) {
      return (
        <Message
          text=""
          color='#F26C4F'
        >
          You haven't created any playlists yet.{'\n'}
        </Message>
      );
    } else if (friendsPlaylistsError) {
      return (
        <Message
          text={friendsPlaylistsError}
        />
      );
    }
  };

  render() {
    const { friendsPlaylists, navigation } = this.props;

    return (
      <View>
        <PlaylistList data={friendsPlaylists} navigation={navigation}/>
        {this.renderMessage()}
        {this.renderSpinner()}
      </View>
    );
  }
};

const mapStateToProps = ({ playlist: { friendsPlaylists, friendsPlaylistsError, awaitingFriendsPlaylists }, auth: { user, authToken } }) => {
  return {
    friendsPlaylists,
    friendsPlaylistsError,
    awaitingFriendsPlaylists,
    user,
    authToken,
  };
};

export default connect(mapStateToProps, { getFriendsPlaylists })(FriendsPlaylistsListScreen);