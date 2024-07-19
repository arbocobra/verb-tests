// store.js
import { configureStore } from '@reduxjs/toolkit';
import verbsSlice from './verbsSlice';

const store = configureStore({
  reducer: {
    verbs: verbsSlice,
  },
});

export default store;