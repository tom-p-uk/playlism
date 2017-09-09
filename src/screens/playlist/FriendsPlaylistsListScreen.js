import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getFriendsPlaylists } from '../../actions';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import FriendsPlaylistList from '../../components/FriendsPlaylistList';
import BackgroundImage from '../../components/BackgroundImage';

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
    const { getFriendsPlaylists, authToken } = this.props;
    getFriendsPlaylists(authToken);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRoute === 'friendsPlaylistsList') {
      const { getFriendsPlaylists, authToken } = this.props;
      getFriendsPlaylists(authToken);
    }
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
          You haven't created any playlists yet.
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
      <BackgroundImage>
        <FriendsPlaylistList data={friendsPlaylists} navigation={navigation}/>
        {this.renderMessage()}
        {this.renderSpinner()}
      </BackgroundImage>
    );
  }
};

const mapStateToProps = ({
  playlist: { friendsPlaylists, friendsPlaylistsError, awaitingFriendsPlaylists },
  auth: { user, authToken },
  nav: { currentRoute },
}) => {
  return {
    friendsPlaylists,
    friendsPlaylistsError,
    awaitingFriendsPlaylists,
    user,
    authToken,
    currentRoute,
  };
};

export default connect(mapStateToProps, { getFriendsPlaylists })(FriendsPlaylistsListScreen);
