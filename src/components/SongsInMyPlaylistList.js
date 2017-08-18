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

  handleOnPressRightIcon = (song, downloadedSongs, currentlyDownloading, currentlyDeleting) => {
    const { downloadSong, deleteDownloadedSong } = this.props;

    const currentlyDownloadingIndex = currentlyDownloading.indexOf(song._id);
    const currentlyDeletingIndex = currentlyDeleting.indexOf(song._id);
    const downloadedSongsIndex = _.findIndex(downloadedSongs, { _id: song._id });

    if (currentlyDownloadingIndex !== -1 || currentlyDeletingIndex !== -1) {
      return console.log('Awaiting results of of downloadSong/deleteDownloadedSong functions. Button disabled.');
    }

    if (downloadedSongsIndex === -1) {
      downloadSong(song);
    } else {
      deleteDownloadedSong(downloadedSongs[downloadedSongsIndex]);
    }
  };

  renderRightIcon = (song, downloadedSongs, currentlyDownloading, currentlyDeleting) => {
    const currentlyDownloadingIndex = currentlyDownloading.indexOf(song._id);
    // const currentlyDeletingIndex = currentlyDeleting.indexOf(song._id);
    const downloadedSongsIndex = _.findIndex(downloadedSongs, { _id: song._id });

    if (currentlyDownloadingIndex !== -1) {
      return <ActivityIndicator size='small' />;
    }

    if (downloadedSongsIndex === -1) {
      return { name: 'file-download' };
    } else {
      return { name: 'delete-forever' }
    }

  };

  render() {
    const {
      data,
      extraData,
      renderHeader,
      subtitle,
      onSongListItemPress,
      downloadedSongs,
      currentlyDownloading,
      currentlyDeleting
    } = this.props;

    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, opacity: 0.8 }}
      >
        <FlatList
          data={data}
          extraData={[downloadedSongs, currentlyDeleting, currentlyDownloading]}
          keyExtractor={item => item.videoId}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              rightIcon={this.renderRightIcon(item, downloadedSongs, currentlyDownloading, currentlyDeleting)}
              subtitle={`Added ${moment(item.dateAdded).fromNow()}`}
              avatar={{ uri: decodeURIComponent(item.thumbnail) }}
              containerStyle={{ borderBottomWidth: 0, opacity: 0.8 }}
              onPress={() => onSongListItemPress(item.videoId)}
              onPressRightIcon={() => this.handleOnPressRightIcon(item, downloadedSongs, currentlyDownloading, currentlyDeleting)}
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
  downloads: { downloadedSongs, currentlyDownloading, currentlyDeleting },
}) => {
  return {
    authToken,
    downloadedSongs,
    currentlyDownloading,
    currentlyDeleting,
  };
};

export default connect(mapStateToProps, { downloadSong, deleteDownloadedSong })(SongsInMyPlaylistList);
