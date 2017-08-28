import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList, LayoutAnimation, UIManager } from 'react-native';
import moment from 'moment';
import { Audio } from 'expo';
import { connect } from 'react-redux';

import { setCurrentlyPlayingSong } from '../actions';

class SongsInDownloadedPlaylistList extends Component {
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

  // onPress = async song => {
  //   setCurrentlyPlayingSong(song);
  // };

  renderRightIcon = (song, currentlyPlayingSong, isPlaying) => {
    if (!currentlyPlayingSong || isPlaying === undefined) return <View />;

    if (song._id === currentlyPlayingSong._id && isPlaying) {
      return { name: 'volume-up' };
    } else if (song._id === currentlyPlayingSong._id && !isPlaying) {
      return { name: 'volume-mute' };
    } else {
      return <View />;
    }
  };

  render() {
    const {
      data,
      extraData,
      renderHeader,
      subtitle,
      downloadedSongs,
      setCurrentlyPlayingSong,
      currentlyPlayingSong,
      isPlaying,
    } = this.props;

    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, opacity: 0.8 }}
      >
        <FlatList
          data={data}
          extraData={[currentlyPlayingSong, isPlaying]}
          keyExtractor={item => item.videoId}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              rightIcon={this.renderRightIcon(item, currentlyPlayingSong, isPlaying)}
              subtitle={`Downloaded ${moment(item.downloadedOn).fromNow()}`}
              avatar={{ uri: decodeURIComponent(item.thumbnail) }}
              containerStyle={{ borderBottomWidth: 0, opacity: 0.8 }}
              onPress={() => setCurrentlyPlayingSong(item)}
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
};

const mapStateToProps = ({ player: { isPlaying, currentlyPlayingSong } }) => {
  return {
    isPlaying,
    currentlyPlayingSong,
  };
};

export default connect(mapStateToProps, { setCurrentlyPlayingSong })(SongsInDownloadedPlaylistList);
