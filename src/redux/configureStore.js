import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { apiMiddleware } from 'redux-api-middleware';
import api from 'redux-cached-api-middleware';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

import reducers from './reducers';

const persistConfig = {
  key: 'hn-lssite-1',
  storage,
};

const apiNormalizer = store => next => action => {
  const result = next(action);
  if (action.type === 'persist/REHYDRATE') {
    store.dispatch(api.actions.invalidateCache());
  }
  return result;
};

const middlewares = [thunk, apiMiddleware, apiNormalizer];

const enhancers = [applyMiddleware(...middlewares)];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

export const store = createStore(
  persistCombineReducers(persistConfig, {
    ...reducers,
    [api.constants.NAME]: api.reducer,
  }),
  composeEnhancers(...enhancers),
);

export const persistor = persistStore(store);
