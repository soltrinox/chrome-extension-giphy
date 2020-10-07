import { createSelector } from 'reselect';

// Constants
const SET_QUERY = 'search/SET_QUERY';

// Types
export interface SearchAction {
  readonly type: string;
  readonly payload?: any;
}

export interface SearchState {
  readonly query: string;
}

// Selectors
export const selectSearch = (state: { search: SearchState }) => state.search;

export const selectQuery = createSelector([selectSearch], ({ query }) => query);

// Actions
export const setQuery = (query: string) => ({
  type: SET_QUERY,
  payload: query
});

// Reducers
const initialState = {
  query: 'kitten'
};

export default (state: SearchState = initialState, action: SearchAction) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload
      };
    default:
      return state;
  }
};
