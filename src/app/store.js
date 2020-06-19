import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import reducer from './reducers/index'

export default configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});