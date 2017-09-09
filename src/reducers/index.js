import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import navReducer from './navReducer';
import friendsReducer from './friendsReducer';
import playlistReducer from './playlistReducer';
import playerReducer from './playerReducer';
import downloadsReducer from './downloadsReducer';
import assetsReducer from './assetsReducer';

export default combineReducers({
  auth: authReducer,
  nav: navReducer,
  friends: friendsReducer,
  form: formReducer,
  playlist: playlistReducer,
  player: playerReducer,
  downloads: downloadsReducer,
  assets: assetsReducer,
});
