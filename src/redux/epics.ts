import { combineEpics, Epic } from 'redux-observable';

import { giphyEpics } from './giphy';

export const epics: Epic = combineEpics(...giphyEpics);
