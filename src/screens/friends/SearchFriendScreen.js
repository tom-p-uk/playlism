import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { debounce, isNull } from 'lodash';
import { searchFriendsStart, searchFriends, clearSearchFriendsResults } from '../../actions';
import { reduxForm, Field } from 'redux-form';

import SearchBar from '../../components/SearchBar';
import FriendsList from '../../components/FriendsList';
import Message from '../../components/Message';
import * as actions from '../../actions';
import BackgroundImage from '../../components/BackgroundImage';

class SearchFriendScreen extends Component {
  static navigationOptions = {
    title: 'Search Friends'
  };

  renderHeader = () => {
    const { awaitingSearchResults } = this.props;
    // console.log(awaitingSearchResults);

    return (
      <Field
        name={'friendsSearchBar'}
        component={SearchBar}
        showLoadingIcon={this.props.awaitingSearchResults}
      />
    );
  };

  renderNoSearchResults = () => {

  };

  renderMessage = () => {
    const { dirty, awaitingSearchResults, searchResults, searchError } = this.props;

    if (dirty && !awaitingSearchResults && searchResults && searchResults.length === 0) {
      return (
        <Message color='#F26C4F'>
          No search results found.
        </Message>
      );
    } else if (searchError) {
      return (
        <Message>
          {searchError}
        </Message>
      );
    }
  };

  render() {
    return (
      <BackgroundImage>
        <FriendsList
          data={this.props.searchResults}
          renderHeader={this.renderHeader()}
          navigation={this.props.navigation}
          opacity={0.9}
        />
        {this.renderMessage()}
      </BackgroundImage>
    );
  }
};

const onChange = debounce(({ friendsSearchBar }, dispatch, props) => {
  const { searchFriends, searchFriendsStart, clearSearchFriendsResults, authToken } = props;

  if (friendsSearchBar) {
    searchFriendsStart();
    searchFriends(friendsSearchBar, authToken);
  } else if (!friendsSearchBar) {
    clearSearchFriendsResults();
  }
}, 650);

const Form = reduxForm({
  onChange,
  form: 'searchFriends',
})(SearchFriendScreen);

const mapStateToProps = ({ friends: { searchResults, searchError, awaitingSearchResults }, auth: { authToken } }) => {
  return {
    searchResults,
    searchError,
    awaitingSearchResults,
    authToken,
  };
};

export default connect(mapStateToProps, actions)(Form);
