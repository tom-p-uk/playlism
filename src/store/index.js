import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createFilter } from 'redux-persist-transform-filter';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {}, // default store
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

const subsetFilter = createFilter(
  'downloads',
  ['downloadedSongs']
);

persistStore(store, {
  storage: AsyncStorage,
  blacklist: ['auth', 'nav', 'friends', 'form', 'playlist', 'player'],
  transforms: [subsetFilter]
});

export default store;
