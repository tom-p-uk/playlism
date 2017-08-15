import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { searchSongs, clearSearchSongsResults, previewSong, togglePreviewSongModal } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import SearchBar from '../../components/SearchBar';
import SongResultsList from '../../components/SongResultsList';
import Message from '../../components/Message';
import PreviewSongModal from '../../components/PreviewSongModal';

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

  onSongListItemPress = videoId => {
    const { previewSong } = this.props;

    previewSong(videoId);
  };

  render() {
    const {
      searchResults,
      songsInFriendsPlaylist,
      navigation,
      togglePreviewSongModal,
      isPreviewSongModalOpen,
      songBeingPreviewed
    } = this.props;

    return (
      <View>
        <PreviewSongModal
          isVisible={isPreviewSongModalOpen}
          onButtonPress={() => togglePreviewSongModal()}
          videoId={songBeingPreviewed}
        />
        <SongResultsList
          data={searchResults}
          extraData={songsInFriendsPlaylist}
          renderHeader={this.renderHeader()}
          navigation={navigation}
          onSongListItemPress={this.onSongListItemPress}
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
  playlist: { searchResults, searchError, awaitingSearchResults, songsInFriendsPlaylist },
  auth: { authToken },
  player: { isPreviewSongModalOpen, songBeingPreviewed },
}) => {
  return {
    searchResults,
    searchError,
    awaitingSearchResults,
    authToken,
    songsInFriendsPlaylist,
    isPreviewSongModalOpen,
    songBeingPreviewed,
  };
};

export default connect(mapStateToProps, { searchSongs, clearSearchSongsResults, previewSong, togglePreviewSongModal })(Form);