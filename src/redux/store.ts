import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { reducers, epics } from '.';

const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(...Object.values(epics));

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['search']
  },
  combineReducers({ ...reducers })
);

const composeEnhancers = process.env.NODE_ENV !== 'development'
  ? compose
  : (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

const persistor = persistStore(store);

export { store, persistor };
