import { Middleware } from 'redux';

import {persistStore , persistReducer, PersistConfig} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

//import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga';
//import logger from 'redux-logger';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';
import { loggerMiddleware } from './middleware/logger';

export type RootState = ReturnType< typeof rootReducer>

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV === 'development' && loggerMiddleware, 
  sagaMiddleware].filter((middleware): middleware is Middleware => Boolean(middleware))

// root-reducer 

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);