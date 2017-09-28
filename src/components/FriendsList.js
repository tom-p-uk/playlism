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

  renderSubtitle = item => {
    if (item.friendsSince) {
      return `Friends since ${moment(item.friendsSince).format('MMM Do, YYYY')}`;
    } else if (item.dateReceived) {
      return `Received on ${moment(item.dateReceived).format('MMM Do, YYYY')}`;
    }

    return `Member since ${moment(item.dateJoined).format('MMM Do, YYYY')}`;
  };

  render() {
    const { data, renderHeader } = this.props;

    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, opacity: 0.8 }}
      >
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.displayName}
              subtitle={this.renderSubtitle(item)}
              avatar={{ uri: decodeURIComponent(item.profileImg) }}
              containerStyle={{ borderBottomWidth: 0, opacity: 0.8 }}
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
