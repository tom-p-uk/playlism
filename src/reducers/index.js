import { combineReducers } from 'redux';
import authReducer from './authReducer';
import navReducer from './navReducer';

export default combineReducers({
  auth: authReducer,
  nav: navReducer,
});
