import giphy, { GiphyState } from './giphy';
import search, { SearchState } from './search';
import background, { BackgroundState } from './background';

export interface RootState {
  giphy: GiphyState;
  search: SearchState;
  background: BackgroundState;
}

export const reducers = {
  giphy,
  search,
  background
};
