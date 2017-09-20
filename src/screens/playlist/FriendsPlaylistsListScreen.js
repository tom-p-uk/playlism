import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import DropdownAlert from 'react-native-dropdownalert';

import { getFriendsPlaylists } from '../../actions';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import FriendsPlaylistList from '../../components/FriendsPlaylistList';
import BackgroundImage from '../../components/BackgroundImage';

class FriendsPlaylistsListScreen extends Component {
  componentDidMount() {
    const { getFriendsPlaylists, authToken } = this.props;
    getFriendsPlaylists(authToken);
  }

  componentWillReceiveProps(nextProps) {
    const { currentRoute, getFriendsPlaylists, authToken } = this.props;
    if (currentRoute !== 'friendsPlaylistsList' && nextProps.currentRoute === 'friendsPlaylistsList') {
      getFriendsPlaylists(authToken);
    }

    if (!this.props.friendsPlaylistsError && nextProps.friendsPlaylistsError) {
      this.dropdown.alertWithType('error', 'Error', nextProps.friendsPlaylistsError);
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
    }
  };

  renderDropdownAlert = () => {
    return (
      <DropdownAlert
        ref={ref => this.dropdown = ref}
        errorColor='#F26C4F'
        closeInterval={2000}
        titleStyle={{ marginTop: Platform.OS === 'android' ? 0 : -20, fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}
      />
    );
  };

  render() {
    const { friendsPlaylists, navigation } = this.props;

    return (
      <BackgroundImage>
        <FriendsPlaylistList data={friendsPlaylists} navigation={navigation}/>
        {this.renderMessage()}
        {this.renderSpinner()}
        {this.renderDropdownAlert()}
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
