import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
// import * as actions from '../../actions';
import { onChangeFriendsSearchBar, searchFriends } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import SearchBar from '../../components/SearchBar';

class SearchFriendScreen extends Component {
  static navigationOptions = {
    title: 'Add Friends',
    left: true,
    tabBarIcon: ({ tintColor }) => (
      <Icon
        // style={styles.icon}
        type='material-community'
        name='account-plus'
        color={tintColor}
      />
    ),
  }
  // onChangeText = text => {
  //   const { onChangeFriendsSearchBar } = this.props;
  //
  //   onChangeFriendsSearchBar(text);
  //   this.onSearchBarChange()
  // };
  //
  // onSearchBarChange = () => {
  //   const { searchFriends, searchBarText, authToken  } = this.props;
  //
  //   searchFriends(searchBarText, authToken);
  // };

  handleSubmit = ({ onSubmit }) => {

  };

  render() {
    return (
      <View>
        <Field
          name={'searchFriends'}
          component={SearchBar}
        />
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={this.handleSubmit()}
        >
          <Text></Text>
        </TouchableOpacity>
      </View>

    );
  }
};

const Form = reduxForm({ form: 'searchFriends' })(SearchFriendScreen);

const mapStateToProps = ({ friends: { searchBarText }, auth: { token }, form }) => {
  return {
    searchBarText,
    authToken: token,
    form
  };
};

export default connect(mapStateToProps, { onChangeFriendsSearchBar, searchFriends })(Form);
