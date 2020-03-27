import giphy, { giphyEpics } from './giphy';
import search from './search';
import background from './background';

export const reducers = {
  giphy,
  search,
  background
};

export const epics = {
  giphyEpics
};
