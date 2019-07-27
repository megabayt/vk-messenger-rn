import { applyMiddleware, createStore, Store } from 'redux';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { persistCombineReducers, persistStore, PersistConfig } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistedState } from 'redux-persist/es/types';

import { reducers } from '@store/reducers';
import { IActionsUnion } from '@store/actions';
import { sagaInit } from '@store/sagas';
import { createApisauceService } from '@utils/apisauce';

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings', 'cookies'],
};
const persistedReducers = persistCombineReducers(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();
const store: Store<PersistedState, IActionsUnion> = createStore(
  persistedReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
const persistor = persistStore(store);

const api = createApisauceService();
sagaMiddleware.run(sagaInit, api);

export {
  persistor,
  store,
};
