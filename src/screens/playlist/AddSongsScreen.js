import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { searchSongs, clearSearchSongsResults } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import SearchBar from '../../components/SearchBar';
import SongResultsList from '../../components/SongResultsList';
import Message from '../../components/Message';

class AddSongsScreen extends Component {

  componentDidMount() {
    this.props.clearSearchSongsResults();
  }

  renderHeader = () => {
    const { awaitingSearchResults } = this.props;
    // console.log(awaitingSearchResults);

    return (
      <Field
        name={'songsSearchBar'}
        component={SearchBar}
        showLoadingIcon={this.props.awaitingSearchResults}
      />
    );
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
    const { searchResults, songsInPlaylist, navigation } = this.props;
    return (
      <View>
        <SongResultsList
          data={searchResults}
          extraData={songsInPlaylist}
          renderHeader={this.renderHeader()}
          navigation={navigation}
        />
        {this.renderMessage()}
      </View>
    );
  }
};

const styles = {
  color: 'white'
};

const onChange = _.debounce(({ songsSearchBar }, dispatch, props) => {
  const { searchSongs } = props;

  if (songsSearchBar) {
    // searchFriendsStart();
    searchSongs(songsSearchBar);
  } else if (!songsSearchBar) {
    // clearSearchFriendsResults();
  }
}, 400);

const Form = reduxForm({
  onChange,
  form: 'searchSongs',
})(AddSongsScreen);

const mapStateToProps = ({
  playlist: { searchResults, searchError, awaitingSearchResults, songsInPlaylist },
  auth: { authToken }
}) => {
  return {
    searchResults,
    searchError,
    awaitingSearchResults,
    authToken,
    songsInPlaylist,
  };
};

export default connect(mapStateToProps, { searchSongs, clearSearchSongsResults })(Form);
