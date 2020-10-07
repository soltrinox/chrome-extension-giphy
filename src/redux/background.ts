import { createSelector } from 'reselect';

// Constants
const SET_LOADING = 'background/SET_LOADING';

// Types
export interface BackgroundAction {
  readonly type: string;
  readonly payload?: any; // 🙈
}

export interface BackgroundState {
  readonly loading: boolean;
}

// Selectors
export const selectBackground = (state: { background: BackgroundState }) =>
  state.background;

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

export default (
  state: BackgroundState = initialState,
  action: BackgroundAction
) => {
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
