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


const HOST = 'https://playlism.herokuapp.com';
const FACEBOOK_AUTH_URL = `${HOST}/api/auth/facebook`;
const GOOGLE_AUTH_URL = `${HOST}/api/auth/google`;


class AuthScreen extends Component {
  // componentDidMount() {
  //   if (this.props.token) {
  //     setTimeout(() => this.props.navigation.navigate('dashboard'), 800);
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.token) {
  //     setTimeout(() => this.props.navigation.navigate('dashboard'), 800);
  //   }
  // }

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
              <View style={styles.profileImgContainer}>
                <Image source={{ uri: user.profileImg }} style={styles.profileImg} />
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
              {/* <SocialIcon
                title="Log In With Facebook"
                type="facebook"
                // name="facebook-square"
                // light
                button
                // raised
                // size={30}
                // color="#3b5998"
                onPress={() => this.openWebBrowserAsync(FACEBOOK_AUTH_URL)}
              /> */}
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
              {/* <SocialIcon
                title="Log In With Google"
                type="google-plus-official"
                // name="google"
                // backgroundColor="#DD4B39"
                loading
                button
                onPress={() => this.openWebBrowserAsync(GOOGLE_AUTH_URL)}
              /> */}
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

const mapStateToProps = ({ auth: { user, token, loading } }) => {
  return {
    user,
    token,
    loading,
  };
};

export default connect(mapStateToProps, actions)(AuthScreen);
