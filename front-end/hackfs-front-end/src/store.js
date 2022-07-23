import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import web3Reducers from './web3Reducers';

export default configureStore({
  reducer: {
    web3Reducers: web3Reducers,
  },
  middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
})