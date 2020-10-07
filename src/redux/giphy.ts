import { createSelector } from 'reselect';
import { switchMap, map, catchError, timeout } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';

import { RootState } from 'redux/reducers';
import { GIFObject, MetaObject, GiphyResponse } from 'types';

// Constants
const SET_LOADING = 'giphy/SET_LOADING';
const SET_ERROR = 'giphy/SET_ERROR';
const SET_TAG = 'giphy/SET_TAG';
const SET_DATA = 'giphy/SET_DATA';

// Types
export interface GiphyAction {
  readonly type: string;
  readonly payload?: any; // 🙈
}

export interface GiphyState {
  readonly data: {
    data?: GIFObject;
    meta?: MetaObject;
  };
  readonly error: boolean;
  readonly loading: boolean;
}

// Selectors
export const selectGiphy = (state: { giphy: GiphyState }) => state.giphy;

export const selectLoading = createSelector(
  [selectGiphy],
  ({ loading }) => loading
);

export const selectError = createSelector([selectGiphy], ({ error }) => error);

export const selectData = createSelector([selectGiphy], ({ data }) => data);

// Actions
export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading
});

export const setError = () => ({
  type: SET_ERROR
});

export const setTag = (tag: string) => ({
  type: SET_TAG,
  payload: tag
});

export const setData = (response: GiphyResponse) => ({
  type: SET_DATA,
  payload: response
});

// Reducers
const initialState = {
  loading: false,
  error: false,
  data: {}
};

export default (state: GiphyState = initialState, action: GiphyAction) => {
  switch (action.type) {
    case SET_TAG:
      return {
        ...state,
        loading: true,
        error: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        data: initialState.data
      };
    case SET_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    default:
      return state;
  }
};

// Epics
const setTagEpic: Epic<GiphyAction, GiphyAction, RootState> = (action$) =>
  action$.pipe(
    ofType(SET_TAG),
    switchMap((action) =>
      ajax
        .getJSON<GiphyResponse>(
          `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${action.payload}`
        )
        .pipe(
          timeout(10000),
          map((response) => setData(response)),
          catchError(() => of(setError()))
        )
    )
  );

export const giphyEpics = [setTagEpic];
