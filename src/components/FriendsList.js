import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList, LayoutAnimation, UIManager } from 'react-native';
import moment from 'moment';

class FriendsList extends Component {
  componentWillUpdate() {
    // next line for Android compatiblity
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    // when LayoutAnimation.spring() is run, it tells the component that any updates
    // to the layout of the component - which in this case will be the upward shift of the
    // underlying card cascade - should be animated
    LayoutAnimation.easeInEaseOut();
  }

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
    } else {
      return `Member since ${moment(item.dateJoined).format('MMM Do, YYYY')}`;
    }
  };

  determineOnPress = item => {
    if (item.friendsSince) {
      return () => this.props.navigation.navigate('user', { user: item });
    } else if (item.dateReceived) {
      return () => this.props.navigation.navigate('user', { user: item });
    } else {
      return () => this.props.navigation.navigate('user', { user: item });
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
          keyExtractor={item => item._id}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.displayName}
              subtitle={this.renderSubtitle(item)}
              avatar={{ uri: decodeURIComponent(item.profileImg) }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={this.determineOnPress(item)}
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
