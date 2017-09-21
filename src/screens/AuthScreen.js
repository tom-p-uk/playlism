import React, { Component } from 'react';
import { Constants, WebBrowser, AppLoading } from 'expo';
import {
  Image,
  Linking,
  Platform,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Card } from 'react-native-elements';
import qs from 'qs';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { loginStart, loginSuccess, jwtLogin } from '../actions';
import registerForNotifications from '../services/push_notifications';
import WelcomeMsgAndLoginButtons from '../components/WelcomeMsgAndLoginButtons';
import LoggedInUserMsgAndPic from '../components/LoggedInUserMsgAndPic';

const URL = 'https://playlism.herokuapp.com/api';;
const SCREEN_WIDTH = Dimensions.get('window').width;

class AuthScreen extends Component {
  componentDidMount() {
    this.props.jwtLogin();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.loggedInViaJWT) {
      this.resetNavigation();
    } else if (nextProps.user) {
      setTimeout(() => this.resetNavigation(), 2000);
    }
  }

  resetNavigation = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'main'})
      ],
      key: null
    });

    this.props.navigation.dispatch(resetAction);
  };

  // Opens browser internally in order to access the backend OAuth routes
  startOAuth = async authUrl => {
    this.props.loginStart();
    this.addLinkingListener();
    await WebBrowser.default.openBrowserAsync(`${authUrl}?linkingUri=${encodeURIComponent(Constants.linkingUri)}`);
    this.removeLinkingListener();
  }

  addLinkingListener = () => {
    Linking.addEventListener('url', this.handleRedirect);
  }

  removeLinkingListener = () => {
    Linking.removeEventListener('url', this.handleRedirect);
  }

  // Pull user object and JWT from url following redirect from backend
  handleRedirect = event => {
    WebBrowser.default.dismissBrowser();

    const query = event.url.replace(`${Constants.linkingUri}?`, ''); // Pull data from redirect URL
    const data = qs.parse(query);

    let { user, token } = data;

    const authToken = token.split('#')[0]; // Removes redundant # symbol from authToken
    user = JSON.parse(decodeURI(user)); // Convert to object after decoding

    this.props.loginSuccess(user, authToken); //
    registerForNotifications(authToken);
  };

  render() {
    const { user, awaitingAuth } = this.props;

    if (user === undefined) return <AppLoading />

    return (
      <Card  style={styles.container}>
        <View>
          <View style={{ flex: 1, }}>
            <Image
              source={require('../../assets/img/stack-vinyl.jpg')}
              style={{ flex: 1, width: SCREEN_WIDTH }}
            />
            <View style={styles.overlay} />
              { user
                ?
                  <LoggedInUserMsgAndPic user={user} />
                :
                  <WelcomeMsgAndLoginButtons
                    onFacebookButtonPress={() => this.startOAuth(`${URL}/auth/facebook`)}
                    onGoogleButtonPress={() => this.startOAuth(`${URL}/auth/google`)}
                  />
              }
          </View>
        </View>
      </Card>
    );
  }
};

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   backgroundColor: 'rgba(40,40,40, 0.8)'
  },
};

const mapStateToProps = ({
  auth: { user, authToken, awaitingAuth, loggedInViaJWT },
  assets: { awaitingAssets }
}) => {
  return {
    user,
    authToken,
    awaitingAuth,
    loggedInViaJWT,
    awaitingAssets,
  };
};

export default connect(mapStateToProps, { loginStart, loginSuccess, jwtLogin })(AuthScreen);
