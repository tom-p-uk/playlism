import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { searchSongs, clearSearchSongsResults, previewSong, togglePreviewSongModal } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import DropdownAlert from 'react-native-dropdownalert';

import SearchBar from '../../components/SearchBar';
import SongResultsList from '../../containers/SongResultsList';
import Message from '../../components/Message';
import PreviewSongModal from '../../components/PreviewSongModal';
import BackgroundImage from '../../components/BackgroundImage';

class AddSongsScreen extends Component {
  componentDidMount() {
    this.props.clearSearchSongsResults();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.searchError && nextProps.searchError) {
      this.dropdown.alertWithType('error', 'Error', nextProps.searchError);
    }
  }

  renderHeader = () => {
    const { awaitingSearchResults } = this.props;
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
    }
  };

  onSongListItemPress = videoId => {
    const { previewSong } = this.props;

    previewSong(videoId);
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
    const {
      searchResults,
      songsInFriendsPlaylist,
      navigation,
      togglePreviewSongModal,
      isPreviewSongModalOpen,
      songBeingPreviewed
    } = this.props;

    return (
      <BackgroundImage>
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
        {this.renderDropdownAlert()}
      </BackgroundImage>
    );
  }
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
