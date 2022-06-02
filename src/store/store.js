import {persistStore , persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

//import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga';
//import logger from 'redux-logger';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';
import { loggerMiddleware } from './middleware/logger';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// root-reducer 

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [process.env.NODE_ENV === 'development' && loggerMiddleware, sagaMiddleware].filter(Boolean)
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);