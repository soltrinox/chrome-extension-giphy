import { createSelector } from 'reselect';

// Constants
const SET_QUERY = 'search/SET_QUERY';

// Types
interface Action {
  readonly type: string;
  readonly payload?: any;
}

interface State {
  readonly query: string;
}

// Selectors
export const selectSearch = (state: { search: State }) => state.search;

export const selectQuery = createSelector(
  [selectSearch],
  ({ query }) => query
);

// Actions
export const setQuery = (query: string) => ({
  type: SET_QUERY,
  payload: query
});

// Reducers
const initialState = {
  query: 'kitten'
};

export default (state: State = initialState, action: Action) => {
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
