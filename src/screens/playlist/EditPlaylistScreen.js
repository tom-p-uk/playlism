import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import Input from '../../components/Input';
import Message from '../../components/Message';

class EditPlaylistScreen extends Component {
  onSubmit = ({ createPlaylistTitle }) => {
    const { navigation, authToken } = this.props;
    // const { user } = this.props.navigation.state.params;
    const navigationCallback = () => navigation.navigate('friendsPlaylistsList');

    // createPlaylist(createPlaylistTitle, user, authToken, navigationCallback);
  };

  render() {
    const { handleSubmit, awaitingCreatePlaylist, navigation} = this.props;
    const { playlist: { forUser, title} } = navigation.state.params;
    return (
      <Card>
        <View style={styles.textAndImgContainer}>
          <Image
            style={styles.profileImg}
            resizeMode="cover"
            source={{ uri: decodeURIComponent(forUser.profileImg) }}
          />
          <Text style={styles.text}>Edit {title}</Text>
        </View>
        <Field
          name='editPlaylistTitle'
          component={Input}
          label='Playlist Title'
          highlightColor='#F26C4F'
        />
        <View style={styles.buttonContainer}>
          <Button
            raised
            title='Delete Playlist'
            icon={{ name: 'clear' }}
            onPress={() => navigation.navigate('addSongs')}
            style={styles.button}
            disabledStyle={styles.buttonDisabled}
            disabled={awaitingCreatePlaylist}
            fontSize={13}
            borderRadius={60}
            backgroundColor='#98250B'
          />

          <Button
            raised
            title='Save Changes'
            icon={{ name: 'save' }}
            onPress={handleSubmit(this.onSubmit)}
            style={styles.button}
            disabledStyle={styles.buttonDisabled}
            disabled={awaitingCreatePlaylist}
            fontSize={13}
            borderRadius={60}
            backgroundColor='#98250B'
          />
        </View>
      </Card>
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

const validate = ({ createPlaylistTitle }) => {
  const errors = {};

  if (!createPlaylistTitle) {
    errors.createPlaylistTitle = 'You must enter a title.';
  } else if (createPlaylistTitle && createPlaylistTitle.length >= 30) {
    errors.createPlaylistTitle = 'Max length is 30 characters.';
  }

  return errors;
};

const mapStateToProps = (state, props) => {
  const { auth: { authToken }, playlist: { awaitingCreatePlaylist } } = state;
  return {
    authToken,
    addedSongs: props.navigation.state.params.addedSongs,
    initialValues: {
      editPlaylistTitle: props.navigation.state.params.playlist.title
    },
  };
};

const Form = reduxForm({
  validate,
  form: 'createPlaylist',
})(EditPlaylistScreen);


export default connect(mapStateToProps)(Form);
