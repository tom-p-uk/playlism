import {
  ON_CHANGE_FRIENDS_SEARCHBAR,
  SEARCH_FRIENDS_SUCCESS,
  SEARCH_FRIENDS_ERROR
} from '../actions/types';

const initialState = { searchResults: [], searchError: '', hasSearched: false };

export default (state = initialState, action) => {
  switch(action.type) {
    case (ON_CHANGE_FRIENDS_SEARCHBAR):
      return { searchBarText: action.payload };

    case (SEARCH_FRIENDS_SUCCESS):
      return {
        searchResults: action.payload,
        searchError: '',
        hasSearched: true,
      };

    case (SEARCH_FRIENDS_ERROR):
      return {
        searchResults: [],
        searchError: action.payload,
        hasSearched: false,
      };

    default:
      return state;
  }
};
