import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList, LayoutAnimation, UIManager, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import Youtube from 'react-native-youtube';
import { addSong } from '../actions';

class SongsInPlaylistList extends Component {
  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  renderIcon = videoId => {
    const index = this.findIndexOfSongInPlaylist(videoId);
    return index === -1 ? { name: 'add' } : { name: 'done' };
  };

  findIndexOfSongInPlaylist = videoId => {
    const { songsInPlaylist } = this.props;
    const youTubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return _.findIndex(songsInPlaylist, { youTubeUrl });
  };

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  handleOnPressRightIcon = videoId => {
    const { awaitingAddSong, authToken, navigation, addSong } = this.props;
    const { playlist } = navigation.state.params;
    const index = this.findIndexOfSongInPlaylist(videoId);

    if (awaitingAddSong) {
      console.log('Awaiting results of addSong function. Button disabled.');
    } else if (index !== -1) {
      console.log('Song already added. Button disabled.');
    } else {
      addSong(videoId, playlist._id, authToken);
    }
  };

  renderListComponent = videoId => {
    return (
      <View>
        <YouTube
          videoId={videoId}   // The YouTube video ID
          play={false}             // control playback of video with true/false
          fullscreen={false}       // control whether the video should play in fullscreen or inline
          loop={false}             // control whether the video should loop when ended

          // onReady={e => this.setState({ isReady: true })}
          // onChangeState={e => this.setState({ status: e.state })}
          // onChangeQuality={e => this.setState({ quality: e.quality })}
          // onError={e => this.setState({ error: e.error })}

          style={{ alignSelf: 'stretch', height: 300 }}
        />
      </View>
    );
  };

  render() {
    const { data, renderHeader, subtitle } = this.props;

    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
      >
        <FlatList
          data={data}
          // extraData={extraData}
          keyExtractor={item => item.id.videoId}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              component={this.renderListComponent(item.videoId)}
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

const mapStateToProps = ({ auth: { authToken }, playlist: { awaitingAddSong, addSongError, songsInPlaylist } }) => {
  return {
    authToken,
    awaitingAddSong,
    addSongError,
    songsInPlaylist,
  };
};

export default connect(mapStateToProps, { addSong })(SongsInPlaylistList);
