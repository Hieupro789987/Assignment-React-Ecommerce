import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState= {
    payment: "0",

};

export const checkoutSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
        paymentMethod : (state= initialState, action: PayloadAction<string>) => {
            state.payment = action.payload;
        },
 
  },
});

export const {  paymentMethod } = checkoutSlice.actions;
export default checkoutSlice.reducer;
