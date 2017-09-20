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

class DownloadedPlaylistsListScreen extends Component {
  componentDidMount() {
    const { getMyPlaylists, user, authToken, navigation, awaitingMyPlaylists } = this.props;
    getMyPlaylists(authToken);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.myPlaylistsError && nextProps.myPlaylistsError) {
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
    const downloadedPlaylists = this.filterPlaylists(myPlaylists);

    if (!awaitingMyPlaylists && myPlaylists && downloadedPlaylists.length === 0) {
      return (
        <Message
          text=''
          color='#F26C4F'
        >
          You haven't downloaded any songs or playlists yet.
        </Message>
      );
    }
  };

  filterPlaylists = data => { // Filter out playlists that don't contain any downloaded songs
    if (!data) return;
    const { downloadedSongs } = this.props;

    const dataFiltered = data.filter(playlist => {
      const indexOfPlaylistInDownloadedSongs = _.findIndex(downloadedSongs, downloadedSong => {
        return downloadedSong.inPlaylists.indexOf(playlist._id) !== -1;
      });
      return indexOfPlaylistInDownloadedSongs !== -1;
    });


    return dataFiltered;
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
          <MyPlaylistList data={this.filterPlaylists(myPlaylists)} navigation={navigation} navigationTarget='downloadedPlaylist' />
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
  downloads: { downloadedSongs },
}) => {
  return {
    myPlaylists,
    myPlaylistsError,
    awaitingMyPlaylists,
    user,
    authToken,
    downloadedSongs,
  };
};

export default connect(mapStateToProps, { getMyPlaylists })(DownloadedPlaylistsListScreen);
