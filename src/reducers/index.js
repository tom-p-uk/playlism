import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import navReducer from './navReducer';
import friendsReducer from './friendsReducer';

export default combineReducers({
  auth: authReducer,
  nav: navReducer,
  friends: friendsReducer,
  form: formReducer,
});
