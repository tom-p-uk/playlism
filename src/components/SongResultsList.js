import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList, LayoutAnimation, UIManager, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { addSong } from '../actions';

class SongResultsList extends Component {
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
              title={item.snippet.title}
              rightIcon={this.renderIcon(item.id.videoId)}
              rightTitleStyle={styles.rightTitle}
              subtitle={<Text style={styles.subtitle}>{item.snippet.description.slice(0, 40)}</Text>}
              subtitleNumberOfLines={1}
              subtitleContainerStyle={styles.subtitleContainer}
              avatar={{ uri: decodeURIComponent(item.snippet.thumbnails.default.url) }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => console.log(item.snippet.title)}
              onPressRightIcon={() => this.handleOnPressRightIcon(item.id.videoId)}
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

export default connect(mapStateToProps, { addSong })(SongResultsList);
