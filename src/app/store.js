import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import circulationsReducer from './reducers/circulationsReducer'


export default configureStore({
  reducer: circulationsReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  preloadedState: { circulationsById: {}  }
});