import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, FlatList, LayoutAnimation, UIManager, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

class SongsList extends Component {
  componentWillUpdate() {
    // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    // LayoutAnimation.spring();
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };

  render() {
    const {
      data,
      extraData,
      renderHeader,
      onSongListItemPress,
      renderRightIcon,
      handleOnPressRightIcon,
      renderSubtitle,
    } = this.props;

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
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              rightIcon={renderRightIcon(item)}
              subtitle={renderSubtitle(item)}
              avatar={{ uri: decodeURIComponent(item.thumbnail) }}
              containerStyle={{ borderBottomWidth: 0, opacity: 0.8 }}
              onPress={() => onSongListItemPress(item)}
              onPressRightIcon={() => handleOnPressRightIcon(item, data)}
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
    fontSize: 12,
  },
};

export default SongsList;
