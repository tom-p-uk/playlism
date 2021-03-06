import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { addSong } from '../actions';

class SongResultsList extends Component {
  handleOnPressRightIcon = item => {
    const { id: { videoId }, snippet: { title, description, thumbnails } } = item;
    const { awaitingAddSong, authToken, navigation, addSong } = this.props;
    const { playlist } = navigation.state.params;
    const index = this.findIndexOfSongInFriendsPlaylist(videoId);

    if (awaitingAddSong) {
      console.log('Awaiting results of addSong function. Button disabled.');
    } else if (index !== -1) {
      console.log('Song already added. Button disabled.');
    } else {
      addSong(videoId, title, description, thumbnails.default.url, playlist._id, authToken);
    }
  };
  
  renderIcon = videoId => {
    const index = this.findIndexOfSongInFriendsPlaylist(videoId);
    return index === -1 ? { name: 'add' } : { name: 'done' };
  };

  findIndexOfSongInFriendsPlaylist = videoId => {
    const { songsInFriendsPlaylist } = this.props;
    const youTubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return _.findIndex(songsInFriendsPlaylist, { youTubeUrl });
  };

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  render() {
    const { data, extraData, renderHeader, subtitle, songsInFriendsPlaylist, onSongListItemPress } = this.props;

    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, opacity: 0.8 }}
      >
        <FlatList
          data={data}
          extraData={extraData}
          keyExtractor={item => item.id.videoId}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.snippet.title}
              rightIcon={this.renderIcon(item.id.videoId)}
              subtitle={<Text style={styles.subtitle}>{item.snippet.description.slice(0, 40)}</Text>}
              subtitleNumberOfLines={1}
              subtitleContainerStyle={styles.subtitleContainer}
              avatar={{ uri: decodeURIComponent(item.snippet.thumbnails.default.url) }}
              containerStyle={{ borderBottomWidth: 0, opacity: 0.8 }}
              onPress={() => onSongListItemPress(item.id.videoId)}
              onPressRightIcon={() => this.handleOnPressRightIcon(item)}
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

const mapStateToProps = ({ auth: { authToken }, playlist: { awaitingAddSong, addSongError, songsInFriendsPlaylist } }) => {
  return {
    authToken,
    awaitingAddSong,
    addSongError,
    songsInFriendsPlaylist,
  };
};

export default connect(mapStateToProps, { addSong })(SongResultsList);
