import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

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
    } else if (myPlaylistsError) {
      return (
        <Message
          text={myPlaylistsError}
        />
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

  render() {
    const { myPlaylists, navigation } = this.props;

    return (
        <BackgroundImage>
          <MyPlaylistList data={this.filterPlaylists(myPlaylists)} navigation={navigation} navigationTarget='downloadedPlaylist' />
          {this.renderMessage()}
          {this.renderSpinner()}
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
