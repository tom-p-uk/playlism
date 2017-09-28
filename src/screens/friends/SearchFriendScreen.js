import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { searchFriendsStart, searchFriends, clearSearchFriendsResults } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import DropdownAlert from 'react-native-dropdownalert';

import SearchBar from '../../components/SearchBar';
import FriendsList from '../../components/FriendsList';
import Message from '../../components/Message';
import BackgroundImage from '../../components/BackgroundImage';

class SearchFriendScreen extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.searchError && nextProps.searchError) {
      this.dropdown.alertWithType('error', 'Error', nextProps.searchError);
    }
  }

  renderHeader = () => {
    return (
      <Field
        name={'friendsSearchBar'}
        component={SearchBar}
        showLoadingIcon={this.props.awaitingSearchResults}
      />
    );
  };

  renderMessage = () => {
    const { dirty, awaitingSearchResults, searchResults, searchError } = this.props;

    if (dirty && searchResults && searchResults.length === 0) {
      return (
        <Message color='#F26C4F'>
          No search results found.
        </Message>
      );
    }
  };

  renderDropdownAlert = () => {
    return (
      <DropdownAlert
        ref={ref => this.dropdown = ref}
        errorColor='#F26C4F'
        closeInterval={2000}
        titleStyle={{ marginTop: Platform.OS === 'android' ? 0 : -20, fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}
      />
    );
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
        {this.renderDropdownAlert()}
      </BackgroundImage>
    );
  }
};

const onChange = _.debounce(({ friendsSearchBar }, dispatch, props) => {
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

export default connect(mapStateToProps, { searchFriendsStart, searchFriends, clearSearchFriendsResults })(Form);
