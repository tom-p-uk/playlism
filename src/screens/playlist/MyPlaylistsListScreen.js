import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import DropdownAlert from 'react-native-dropdownalert';

import { getMyPlaylists } from '../../actions';
import MyPlaylistList from '../../components/MyPlaylistList';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import BackgroundImage from '../../components/BackgroundImage';

class MyPlaylistsListScreen extends Component {
  componentDidMount() {
    const { getMyPlaylists, authToken } = this.props;
    getMyPlaylists(authToken);
  }

  componentWillReceiveProps(nextProps) {
    const { currentRoute, getMyPlaylists, authToken } = this.props;
    if (currentRoute !== 'myPlayliststList' && nextProps.currentRoute === 'myPlayliststList') {
      getMyPlaylists(authToken);
    }

    if (this.props.myPlaylistsError && nextProps.myPlaylistsError) {
      this.dropdown.alertWithType('error', 'Error', nextProps.myPlaylistsError);
    }
  }

  renderSpinner() {
    const { myPlaylists, awaitingMyPlaylists } = this.props;

    if ((_.isNull(myPlaylists) || myPlaylists === undefined) && awaitingMyPlaylists) {
      return <Spinner size='large'/>;
    }
  }

  renderMessage = () => {
    const { myPlaylists, myPlaylistsError, awaitingMyPlaylists } = this.props;
    if (!awaitingMyPlaylists && myPlaylists && myPlaylists.length === 0) {
      return (
        <Message
          text=""
          color='#F26C4F'
        >
          You don't have any playlists yet.
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
    const { myPlaylists, navigation } = this.props;

    return (
        <BackgroundImage>
          <MyPlaylistList data={myPlaylists} navigation={navigation} navigationTarget='myPlaylist'/>
          {this.renderMessage()}
          {this.renderSpinner()}
          {this.renderDropdownAlert()}
        </BackgroundImage>

    );
  }
};

const mapStateToProps = ({
  playlist: { myPlaylists, myPlaylistsError, awaitingMyPlaylists },
  auth: { user, authToken },
  nav: { currentRoute },
}) => {
  return {
    myPlaylists,
    myPlaylistsError,
    awaitingMyPlaylists,
    user,
    authToken,
    currentRoute,
  };
};

export default connect(mapStateToProps, { getMyPlaylists })(MyPlaylistsListScreen);
