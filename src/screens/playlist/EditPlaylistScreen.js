import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { editPlaylistTitle, deleteFriendsPlaylist } from '../../actions';
import Input from '../../components/Input';
import Message from '../../components/Message';
import BackgroundImage from '../../components/BackgroundImage';
import ConfirmationModal from '../../components/ConfirmationModal';

class EditPlaylistScreen extends Component {
  state = {
    isConfirmationModalVisible: false,
  };


  toggleConfirmationModal = () => this.setState({ isConfirmationModalVisible: !this.state.isConfirmationModalVisible });

  onSaveChangesPress = ({ playlistTitle }) => {
    const { navigation, authToken, editPlaylistTitle, awaitingEditPlaylistTitle } = this.props;
    const { playlist, friendsPlaylists } = navigation.state.params;

    if (awaitingEditPlaylistTitle) {
      return console.log('Awaiting result of editPlaylistTitle. Button disabled')
    }

    const navigationCallback = () => navigation.goBack();
    editPlaylistTitle(playlist._id, playlistTitle, [...friendsPlaylists], authToken, navigationCallback);
  };

  onConfirmDeletePlaylist = () => {
    const { navigation, authToken, deleteFriendsPlaylist, awaitingDeleteFriendsPlaylist } = this.props;
    const { playlist, friendsPlaylists } = navigation.state.params;

    if (awaitingDeleteFriendsPlaylist) {
      return console.log('Awaiting result of deleteFriendsPlaylist. Button disabled')
    }
    this.toggleConfirmationModal();
    const navigationCallback = () => navigation.goBack();
    deleteFriendsPlaylist(playlist._id, friendsPlaylists, authToken, navigationCallback);
  };

  render() {
    const { handleSubmit, awaitingEditPlaylistTitle, awaitingDeleteFriendsPlaylist, navigation } = this.props;
    const { playlist: { byUser, forUser, title } } = navigation.state.params;
    const uri = navigation.state.routeName === 'editMyPlaylist' ? decodeURIComponent(byUser.profileImg) : decodeURIComponent(forUser.profileImg);
    return (
      <BackgroundImage>
        <Card containerStyle={{ opacity: 0.8 }}>
          <View style={styles.textAndImgContainer}>
            <Image
              style={styles.profileImg}
              resizeMode="cover"
              source={{ uri }}
            />
            <Text style={styles.text}>Edit {title}</Text>
          </View>
          <Field
            name='playlistTitle'
            component={Input}
            label='Playlist Title'
            highlightColor='#F26C4F'
          />
          <View style={styles.buttonContainer}>
            <Button
              raised
              title='Delete Playlist'
              icon={awaitingDeleteFriendsPlaylist ? null : { name: 'clear' }}
              loading={awaitingDeleteFriendsPlaylist}
              onPress={this.toggleConfirmationModal}
              buttonStyle={styles.button}
              disabledStyle={styles.buttonDisabled}
              disabled={awaitingDeleteFriendsPlaylist}
              fontSize={13}
              borderRadius={60}
              backgroundColor='#98250B'
            />

            <Button
              raised
              title='Save Changes'
              icon={awaitingEditPlaylistTitle ? null : { name: 'save' }}
              loading={awaitingEditPlaylistTitle}
              onPress={handleSubmit(this.onSaveChangesPress)}
              buttonStyle={styles.button}
              disabledStyle={{ backgroundColor: '#D13310' }}
              disabled={awaitingEditPlaylistTitle}
              fontSize={13}
              borderRadius={60}
              backgroundColor='#D13310'
            />
          </View>
        </Card>
        <ConfirmationModal
          isVisible={this.state.isConfirmationModalVisible}
          onConfirmPress={this.onConfirmDeletePlaylist}
          onCancelPress={this.toggleConfirmationModal}
          text={'Are you sure you want to delete this playlist?'}
        />
      </BackgroundImage>
    );
  }
};

const styles = {
  textAndImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    borderRadius: 30,
    height: 60,
    width: 60,
    marginBottom: 8,
  },
  text: {
    // fontSize: 19,
    alignSelf: 'center',
    justifyContent: 'center',
    // marginBottom: 15,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  button: {
    width: 215,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#98250B',
  },
};

const validate = ({ playlistTitle }) => {
  const errors = {};

  if (!playlistTitle) {
    errors.playlistTitle = 'You must enter a title.';
  } else if (playlistTitle && playlistTitle.length >= 30) {
    errors.playlistTitle = 'Max length is 30 characters.';
  }

  return errors;
};

const mapStateToProps = (state, props) => {
  const { auth: { authToken }, playlist: { awaitingEditPlaylistTitle, awaitingDeleteFriendsPlaylist } } = state;
  return {
    authToken,
    awaitingEditPlaylistTitle,
    awaitingDeleteFriendsPlaylist,
    initialValues: {
      playlistTitle: props.navigation.state.params.playlist.title
    },
  };
};

const Form = reduxForm({
  validate,
  form: 'editPlaylist',
})(EditPlaylistScreen);


export default connect(mapStateToProps, { editPlaylistTitle, deleteFriendsPlaylist })(Form);
