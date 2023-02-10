import {configureStore} from '@reduxjs/toolkit';
import productSlice from './slides/product/productSlice';
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
  },
});
