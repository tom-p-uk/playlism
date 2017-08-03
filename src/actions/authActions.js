import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  JWT_LOGIN,
  LOGOUT,
} from './types';
const URL = 'http://192.168.0.14:3000/api';

export const loginSuccess = (user, authToken) => async dispatch => {
  await AsyncStorage.setItem('authToken', authToken);

  dispatch({
    type: LOGIN_SUCCESS,
    payload: { user, authToken }
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
  const authToken = await AsyncStorage.removeItem('authToken');
  console.log(authToken);
  if (authToken) {
    dispatch(loginStart())
    try {
      axios.defaults.headers.common['Authorization'] = authToken;
      const { data: { success } } = await axios.get(`${URL}/user`);
      console.log(success);
      dispatch(loginSuccess(success.user, authToken))
    } catch (err) {
      console.log(err);

      if (err.response.data.error) {
        dispatch(loginFailure(err.response.data.error));
      }
    }
  }
};

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('authToken');

  dispatch({
    type: LOGOUT
  });
};
