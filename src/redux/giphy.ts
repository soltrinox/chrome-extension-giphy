import { createSelector } from 'reselect';
import {
  switchMap,
  map,
  catchError,
  timeout
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { of } from 'rxjs';

// Constants
const SET_LOADING = 'giphy/SET_LOADING';
const SET_ERROR = 'giphy/SET_ERROR';
const SET_TAG = 'giphy/SET_TAG';
const SET_DATA = 'giphy/SET_DATA';

// Types
interface Action {
  readonly type: string;
  readonly payload?: any;
}

interface State {
  readonly data: {
    title?: string,
    images?: {
      original: {
        webp: string
      }
    }
  };
  readonly error: boolean;
  readonly loading: boolean;
}

// Selectors
export const selectGiphy = (state: { giphy: State }) => state.giphy;

export const selectLoading = createSelector(
  [selectGiphy],
  ({ loading }) => loading
);

export const selectError = createSelector(
  [selectGiphy],
  ({ error }) => error
);

export const selectData = createSelector(
  [selectGiphy],
  ({ data }) => data
);

// Actions
export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading
});

export const setError = (error: boolean) => ({
  type: SET_ERROR,
  payload: error
});

export const setTag = (tag: string) => ({
  type: SET_TAG,
  payload: tag
});

export const setData = (response: object | unknown) => ({
  type: SET_DATA,
  payload: response
});

// Reducers
const initialState = {
  loading: false,
  error: false,
  data: {}
};

export default (state: State = initialState, action: Action) => {
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
        loading: action.payload ? false : state.loading,
        error: action.payload,
        data: initialState.data
      };
    case SET_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    default:
      return state;
  }
};

// Epics
const setTagEpic: Epic<Action> = (action$) => action$.pipe(
  ofType(SET_TAG),
  switchMap((action: Action) => ajax.getJSON(
    `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${action.payload}`
  ).pipe(
    timeout(10000),
    map((response) => setData(response)),
    catchError(() => of(setError(true)))
  ))
);

export const giphyEpics = combineEpics(
  setTagEpic
);
