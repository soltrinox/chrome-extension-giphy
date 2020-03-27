import { createSelector } from 'reselect';

// Constants
const SET_LOADING = 'background/SET_LOADING';

// Types
interface Action {
  readonly type: string;
  readonly payload?: any;
}

interface State {
  readonly loading: boolean;
}

// Selectors
export const selectBackground = (state: { background: State }) => state.background;

export const selectLoading = createSelector(
  [selectBackground],
  ({ loading }) => loading
);

// Actions
export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading
});

// Reducers
const initialState = {
  loading: true
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
