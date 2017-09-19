import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  JWT_LOGIN,
  LOGOUT,
} from './types';

const URL = 'https://playlism.herokuapp.com/api';

export const loginSuccess = (user, authToken, loggedInViaJWT) => async dispatch => {
  await AsyncStorage.setItem('authToken', authToken);

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      user,
      authToken,
      loggedInViaJWT: loggedInViaJWT ? true : null,
    }
  });
};

export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    payload: { error }
  };
};

export const loginStart = () => {
  return {
    type: LOGIN_START
  };
};

export const jwtLogin = () => async dispatch => {
  dispatch(loginStart())
  const authToken = await AsyncStorage.getItem('authToken');

  if (authToken) {
    try {
      axios.defaults.headers.common['Authorization'] = authToken;
      const { data: { success } } = await axios.get(`${URL}/user`);

      if (success) {
        dispatch(loginSuccess(success.user, authToken, true))
      } else {
        dispatch(loginSuccess({}, ''));
      }
    } catch (err) {
      console.log(err);

      if (err.response && err.response.data && err.response.data.error) {
        dispatch(loginFailure(err.response.data.error));
      } else {
        dispatch(loginFailure('Could not log user in at this time.'))
      }
    }
  } else {
    dispatch(loginSuccess(null, ''));
  }
};

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('authToken');

  dispatch({
    type: LOGOUT,
  });

};
