import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList, LayoutAnimation, UIManager, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import Expo, { FileSystem } from 'expo';
import axios from 'axios';

import { downloadSong, deleteDownloadedSong } from '../actions';

class SongsInMyPlaylistList extends Component {
  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  handleOnPressRightIcon = (song, awaitingDownloadSong, awaitingDeleteDownloadedSong, downloadedSongs) => {
    const { downloadSong, deleteDownloadedSong } = this.props;

    if (awaitingDownloadSong || awaitingDeleteDownloadedSong) {
      return console.log('Awaiting results of of downloadSong/deleteDownloadedSong functions. Button disabled.');
    }

    const index = _.findIndex(downloadedSongs, { _id: song._id });

    if (index === -1) {
      downloadSong(song);
    } else {
      deleteDownloadedSong(downloadedSongs[index]);
    }
  };

  renderRightIcon = (song, awaitingDownloadSong, awaitingDeleteDownloadedSong, downloadedSongs) => {
    if (awaitingDownloadSong || awaitingDeleteDownloadedSong) {
      return <ActivityIndicator size='small' />;
    }

    const index = _.findIndex(downloadedSongs, { _id: song._id });
    if (index === -1) {
      return { name: 'file-download' };
    } else {
      return { name: 'clear' }
    }

  };

  render() {
    const {
      data,
      extraData,
      renderHeader,
      subtitle,
      onSongListItemPress,
      awaitingDownloadSong,
      downloadedSongs,
      awaitingDeleteDownloadedSong,
    } = this.props;

    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, opacity: 0.8 }}
      >
        <FlatList
          data={data}
          extraData={downloadedSongs}
          keyExtractor={item => item.videoId}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              rightIcon={this.renderRightIcon(item, awaitingDownloadSong, awaitingDeleteDownloadedSong, downloadedSongs)}
              subtitle={`Added ${moment(item.dateAdded).fromNow()}`}
              avatar={{ uri: decodeURIComponent(item.thumbnail) }}
              containerStyle={{ borderBottomWidth: 0, opacity: 0.8 }}
              onPress={() => onSongListItemPress(item.videoId)}
              onPressRightIcon={() => this.handleOnPressRightIcon(item, awaitingDownloadSong, awaitingDeleteDownloadedSong, downloadedSongs)}
            />
          )}
        />
      </List>
    );
  }
};

const styles = {
  separator: {
    height: 1,
    width: '86%',
    backgroundColor: '#CED0CE',
    marginLeft: '14%'
  },
  rightTitle: {
    marginLeft: -10,
    marginRight: -10,
  },
  subtitleContainer: {
    marginLeft: 10,
  },
  subtitle: {
    color: '#999999',
    // marginLeft: 5,
    fontSize: 12,
  },
};

const mapStateToProps = ({
  auth: { authToken },
  playlist: { awaitingDeleteSong, deleteSongError },
  downloads: { awaitingDownloadSong, downloadedSongs, awaitingDeleteDownloadedSong, },
}) => {
  return {
    authToken,
    awaitingDeleteSong,
    deleteSongError,
    awaitingDownloadSong,
    downloadedSongs,
    awaitingDeleteDownloadedSong,
  };
};

export default connect(mapStateToProps, { downloadSong, deleteDownloadedSong })(SongsInMyPlaylistList);
