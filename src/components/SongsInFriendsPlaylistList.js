import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList, LayoutAnimation, UIManager, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { deleteSong } from '../actions';

class SongsInFriendsPlaylistList extends Component {
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

  handleOnPressRightIcon = song => {
    const { data, awaitingDeleteSong, authToken, navigation, deleteSong } = this.props;
    const { playlist } = navigation.state.params;

    if (awaitingDeleteSong) {
      console.log('Awaiting results of deleteSong function. Button disabled.');
    } else {
      deleteSong(song._id, playlist._id, data, authToken);
    }
  };

  render() {
    const { data, extraData, renderHeader, subtitle, onSongListItemPress } = this.props;

    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, opacity: 0.8 }}
      >
        <FlatList
          data={data}
          extraData={extraData}
          keyExtractor={item => item.videoId}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              rightIcon={{ name: 'clear' }}
              subtitle={`Added ${moment(item.dateAdded).fromNow()}`}
              avatar={{ uri: decodeURIComponent(item.thumbnail) }}
              containerStyle={{ borderBottomWidth: 0, opacity: 0.8 }}
              onPress={() => onSongListItemPress(item.videoId)}
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

const mapStateToProps = ({
  auth: { authToken },
  playlist: { awaitingDeleteSong, deleteSongError }
}) => {
  return {
    authToken,
    awaitingDeleteSong,
    deleteSongError,
  };
};

export default connect(mapStateToProps, { deleteSong })(SongsInFriendsPlaylistList);
