import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList } from 'react-native';
import moment from 'moment';

class FriendsList extends Component {
  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  onPress = item => {
    this.props.navigation.navigate('user', { user: item });
  };

  render() {
    const { searchResults, renderHeader } = this.props;

    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
      >
        <FlatList
          data={searchResults}
          keyExtractor={item => item._id}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.displayName}
              subtitle={`Joined on ${moment(item.dateJoined).format('MMM Do, YYYY')}`}
              avatar={{ uri: decodeURIComponent(item.profileImg) }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.props.navigation.navigate('user', { user: item })}
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
};

export default FriendsList;
