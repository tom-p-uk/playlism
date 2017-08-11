import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList, LayoutAnimation, UIManager } from 'react-native';
import moment from 'moment';

class PlaylistList extends Component {
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

  render() {
    const { data, renderHeader, subtitle, navigation } = this.props;

    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
      >
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.title}
              rightIcon={{ name: 'create' }}
              onPressRightIcon={() => navigation.navigate('editPlaylistForm', { playlist: item, friendsPlaylists: data })}
              // rightTitle={item.forUser.displayName}
              rightTitleStyle={styles.rightTitle}
              subtitle={`Created on ${moment(item.dateAdded).format('MMM Do, YYYY')}`}
              avatar={{ uri: decodeURIComponent(item.forUser.profileImg) }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => navigation.navigate('friendsPlaylist', { playlist: item })}
              // containerStyle={{ height: 100 }}
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

export default PlaylistList;
