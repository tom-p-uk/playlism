import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList, LayoutAnimation, UIManager } from 'react-native';
import moment from 'moment';
import { Audio } from 'expo';
import { connect } from 'react-redux';

import { setCurrentlyPlayingSong } from '../actions';

class SongsInAllDownloadsList extends Component {
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

  render() {
    const {
      data,
      extraData,
      renderHeader,
      subtitle,
      downloadedSongs,
      setCurrentlyPlayingSong
    } = this.props;

    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, opacity: 0.8 }}
      >
        <FlatList
          data={data}
          keyExtractor={item => item.videoId}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subtitle={`Added ${moment(item.dateAdded).fromNow()}`}
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

export default connect(null, { setCurrentlyPlayingSong })(SongsInAllDownloadsList);
