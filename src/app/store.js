import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import circulationsReducer from './reducers/circulationsReducer'

const initialState = {
  loadingInfo: {
    isLoading: false,
    toLoadCount: 0,
    loadedCount: 0
  },
  circulationsById: {}
}

export default configureStore({
  reducer: circulationsReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  preloadedState: initialState
});