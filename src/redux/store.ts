import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createEpicMiddleware } from 'redux-observable';

import { isProduction } from 'utils';
import { reducers } from 'redux/reducers';
import { epics } from 'redux/epics';

const epicMiddleware = createEpicMiddleware();

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['search']
  },
  combineReducers({ ...reducers })
);

const composeEnhancers = isProduction
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epics);

const persistor = persistStore(store);

export { store, persistor };
