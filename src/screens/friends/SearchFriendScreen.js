import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { onChangeFriendsSearchBar, searchFriends } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import SearchBar from '../../components/SearchBar';
import FriendsList from '../../components/FriendsList';

class SearchFriendScreen extends Component {
  renderHeader = () => {
    const { handleSubmit } = this.props;

    return (
      <Field
        name={'searchFriends'}
        component={SearchBar}
        x='y'
      />
    );
  };

  renderNoSearchResults = () => {
    if (this.props.hasSearched && this.props.searchResults.length === 0) {
      return (
        <View>
          <Text>No search results found.</Text>
        </View>
      );
    }
  };

  renderErrorMessage = () => {
    if (this.props.searchError) {
      return (
        <View>
          <Text>{this.props.searchError}</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <View>
        <FriendsList
          searchResults={this.props.searchResults}
          renderHeader={this.renderHeader}
          navigation={this.props.navigation}
        />
        {/* <Button title='user' onPress={() => this.props.navigation.navigate('user', { user: 'Tom Price' })} /> */}
        {this.renderNoSearchResults()}
        {this.renderErrorMessage()}
      </View>
    );
  }
};

const styles = {
  color: 'white'
};

const onChange = debounce((values, dispatch, props) => {
  if (values.searchFriends) {
    props.searchFriends(values.searchFriends, props.authToken);
  }
}, 650);

const Form = reduxForm({
  onChange,
  form: 'searchFriends',
})(SearchFriendScreen);

const mapStateToProps = ({ friends: { searchResults, searchError, hasSearched }, auth: { token } }) => {
  return {
    searchResults,
    searchError,
    hasSearched,
    authToken: token,
  };
};

export default connect(mapStateToProps, { onChangeFriendsSearchBar, searchFriends })(Form);
