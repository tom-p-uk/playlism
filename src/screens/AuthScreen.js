import React, { Component } from 'react';
import { Constants, WebBrowser } from 'expo';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View
} from 'react-native';
import { Button, Card, SocialIcon } from 'react-native-elements';
import qs from 'qs';
import { connect } from 'react-redux';
import * as actions from '../actions';
import registerForNotifications from '../services/push_notifications';
import SpinnerOverlay from '../components/SpinnerOverlay';

// const HOST = 'http://192.168.0.14:3000';
const HOST = 'http://192.168.0.14:3000';
const FACEBOOK_AUTH_URL = `${HOST}/api/auth/facebook`;
const GOOGLE_AUTH_URL = `${HOST}/api/auth/google`;


class AuthScreen extends Component {
  componentDidMount() {
    this.props.jwtLogin();
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.user) {
    //   this.props.navigation.navigate('dashboard');
    // }
  }

  // Opens browser internally in order to access the backend OAuth routes
  openWebBrowserAsync = async authUrl => {
    this.props.loginStart();
    this.addLinkingListener();
    await WebBrowser.openBrowserAsync(`${authUrl}?linkingUri=${encodeURIComponent(Constants.linkingUri)}`);
    this.removeLinkingListener();
  }

  addLinkingListener = () => {
    Linking.addEventListener('url', this.handleRedirect);
  }

  removeLinkingListener = () => {
    Linking.removeEventListener('url', this.handleRedirect);
  }

  // Pull user object and JWT from url following redirect from backend
  handleRedirect = (event) => {
    WebBrowser.dismissBrowser();

    const query = event.url.replace(`${Constants.linkingUri}?`, ''); // Pull data from redirect URL
    const data = qs.parse(query);

    let { user, token } = data;

    const authToken = token.split('#')[0]; // Strips authToken of erroneous # symbol
    user = JSON.parse(decodeURI(user)); // Convert to object after decoding

    this.props.loginSuccess(user, authToken); //
    registerForNotifications(authToken);
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        { user
          ?
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome {user.firstName}!
              </Text>
              <View style={styles.profileImgContainer}>
                <Image source={{ uri: decodeURIComponent(user.profileImg) }} style={styles.profileImg} />
              </View>
              <Button title="Next" onPress={() => this.props.navigation.navigate('dashboard')} />
            </View>
          :
            <View>
              <View style={styles.content}>
                <Text style={styles.header}>
                  Welcome to Playlism!
                </Text>
                <Text style={styles.text}>
                  Log in using your Facebook{'\n'}
                  or Google account to continue.

                </Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  style={styles.buttons}
                  // raised
                  fontSize={15}
                  title="Log In With Facebook"
                  icon={{ name: 'facebook-square', type: 'font-awesome' }}
                  backgroundColor="#3b5998"
                  onPress={() => this.openWebBrowserAsync(FACEBOOK_AUTH_URL)}
                  borderRadius={6}
                />
                <Button
                  style={styles.buttons}
                  // raised
                  fontSize={15}
                  title="Log In With Google"
                  icon={{ name: 'google', type: 'font-awesome' }}
                  backgroundColor="#DD4B39"
                  onPress={() => this.openWebBrowserAsync(GOOGLE_AUTH_URL)}
                  borderRadius={6}
                />
              </View>
              <SpinnerOverlay />
            </View>
        }
      </View>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImgContainer: {
    margin: 20,
  },
  profileImg: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    // flexDirection: 'row',
    // margin: 20,
    marginBottom: 30,
    // borderRadius: 6
  },
  buttons: {
    // padding: 10,
    marginTop: 30
  },
  icon: {
    borderRadius: 10,
    iconStyle: { paddingVertical: 5 },
  },
};

const mapStateToProps = ({ auth: { user, authToken, loading } }) => {
  return {
    user,
    authToken,
    loading,
  };
};

export default connect(mapStateToProps, actions)(AuthScreen);
