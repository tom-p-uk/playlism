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

const HOST = Platform.select({
    ios: 'localhost',
    android: '192.168.0.14',
});

const FACEBOOK_AUTH_URL = `http://${HOST}:3000/auth/facebook`;
const GOOGLE_AUTH_URL = `http://${HOST}:3000/auth/google`;

export default class AuthScreen extends Component {

  state = {
    user: null,
    token: null
  };

  openWebBrowserAsync = async authUrl => {
    this.addLinkingListener();
    let result = await WebBrowser.openBrowserAsync(`${authUrl}?linkingUri=${encodeURIComponent(Constants.linkingUri)}`);
    this.removeLinkingListener();
    this.setState({ result });

  }

  addLinkingListener = () => {
    Linking.addEventListener('url', this.handleRedirect);
  }

  removeLinkingListener = () => {
    Linking.removeEventListener('url', this.handleRedirect);
  }

  handleRedirect = (event) => {
    WebBrowser.dismissBrowser();
    console.log(event.url);
    const query = event.url.replace(`${Constants.linkingUri}?`, '');
    // console.log(query);
    const data = qs.parse(query);
    // console.log(data);
    let { user, token } = data;
    user = JSON.parse(decodeURI(user));
    console.log(user.profileImg);
    this.setState({ user, token });
  }

  render() {
    const { user } = this.state;
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
              {/* <View style={styles.avatar}>
                <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
              </View> */}
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
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
});
