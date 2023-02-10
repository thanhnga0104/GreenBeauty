import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {fetchCount} from './counterAPI';

const initialState = {
  id: '',
  status: 'idle',
};

// export const productAsync = createAsyncThunk(
//   'product/fetchCount',
//   async amount => {
//     const response = await fetchCount(amount);
//     return response.data;
//   },
// );

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    retrieve: (state, action) => {
      state.id = action.payload;
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(productAsync.pending, state => {
  //       state.status = 'loading';
  //     })
  //     .addCase(productAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.id = action.payload;
  //     });
  // },
});

export const {retrieve} = productSlice.actions;

export const selectProduct = state => state.product.id;

// export const incrementIfOdd = amount => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default productSlice.reducer;
