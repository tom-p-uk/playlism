import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';

import { createPlaylist } from '../../actions';
import { reduxForm, Field } from 'redux-form';
import { NavigationActions } from 'react-navigation'
import Input from '../../components/Input';
import Message from '../../components/Message';
import BackButton from '../../components/BackButton';
import BackgroundImage from '../../components/BackgroundImage';

class CreatePlaylistScreen extends Component {
  onSubmit = ({ createPlaylistTitle }) => {
    const { navigation, createPlaylist, authToken } = this.props;
    const { user } = this.props.navigation.state.params;

    const navigationCallback = () => {
      navigation.navigate('friendsPlaylistsList');
    };

    createPlaylist(createPlaylistTitle, user, authToken, navigationCallback);
  };

  render() {
    const { user } = this.props.navigation.state.params;
    const { handSubmit, awaitingCreatePlaylist} = this.props;
    return (
      <BackgroundImage>
        <Card containerStyle={{ opacity: 0.8 }}>
          <View style={styles.textAndImgContainer}>
            <Image
              style={styles.profileImg}
              resizeMode="cover"
              source={{ uri: decodeURIComponent(user.profileImg) }}
            />
            <Text style={styles.text}>Create playlist for {user.displayName}</Text>
          </View>
          <Field
            name='createPlaylistTitle'
            component={Input}
            label='Playlist Title'
            highlightColor='#F26C4F'
          />
          <View style={styles.buttonContainer}>
            <Button
              raised
              title='Create Playlist'
              icon={{ name: 'playlist-plus', type: 'material-community' }}
              onPress={this.props.handleSubmit(this.onSubmit)}
              buttonStyle={styles.button}
              disabledStyle={styles.buttonDisabled}
              disabled={awaitingCreatePlaylist}
              fontSize={13}
              borderRadius={60}
              backgroundColor='#98250B'
            />
          </View>
        </Card>
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
  },
  button: {
    width: 215,
    marginTop: 30,
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: '#98250B',
  },
};

const validate = ({ createPlaylistTitle }) => {
  const errors = {};

  if (!createPlaylistTitle) {
    errors.createPlaylistTitle = 'You must enter a title.';
  } else if (createPlaylistTitle && createPlaylistTitle.length < 4) {
    errors.createPlaylistTitle = 'Title must be at least 4 characters long.';
  }
  if (createPlaylistTitle && createPlaylistTitle.length >= 30) {
    errors.createPlaylistTitle = 'Title must no more than 30 characters long.';
  }

  return errors;
};

const Form = reduxForm({
  validate,
  form: 'createPlaylist',
})(CreatePlaylistScreen);

const mapStateToProps = ({ auth: { authToken }, playlist: { awaitingCreatePlaylist } }) => {
  return {
    authToken,
  };
};

export default connect(mapStateToProps, { createPlaylist })(Form);
