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
import { Button, Card, Icon } from 'react-native-elements';
import qs from 'qs';
import { connect } from 'react-redux';
import * as actions from '../actions';
import registerForNotifications from '../services/push_notifications';


const HOST = 'https://playlism.herokuapp.com';
const FACEBOOK_AUTH_URL = `${HOST}/api/auth/facebook`;
const GOOGLE_AUTH_URL = `${HOST}/api/auth/google`;


class AuthScreen extends Component {
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

  // Pull user object and JWT from following redirect from backend
  handleRedirect = (event) => {
    WebBrowser.dismissBrowser();

    const query = event.url.replace(`${Constants.linkingUri}?`, ''); // Pull data from redirect URL
    const data = qs.parse(query);

    let { user, token } = data;

    token = token.split('#')[0]; // Strips token of erroneous # symbol
    user = JSON.parse(decodeURI(user)); // Convert to object after decoding

    this.props.loginSuccess({ user, token }); //
    registerForNotifications(token);
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
              <View style={styles.avatar}>
                <Image source={{ uri: user.profileImg }} style={styles.avatarImage} />
              </View>
            </View>
          :
            <View>
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome to Playlism!
              </Text>
              <Text style={styles.text}>
                Login using your Facebook{'\n'}
                or Google account to continue

              </Text>
            </View>
            <View style={styles.buttons}>
              <Icon
                type="font-awesome"
                name="facebook-square"
                size={30}
                color="#3b5998"
                onPress={() => this.openWebBrowserAsync(FACEBOOK_AUTH_URL)}
              />
              <Icon
                type="font-awesome"
                name="google"
                backgroundColor="#DD4B39"
                onPress={() => this.openWebBrowserAsync(GOOGLE_AUTH_URL)}
              />
            </View>
          </View>
        }
      </View>
    );
  }
};

const mapStateToProps = ({ auth: { user, token, loading } }) => {
  return {
    user,
    token,
    loading,
  };
};

export default connect(mapStateToProps, actions)(AuthScreen);

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
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
  icon: {
    borderRadius: 10,
    iconStyle: { paddingVertical: 5 },
  },
};
