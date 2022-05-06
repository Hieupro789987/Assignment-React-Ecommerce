import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { cateID: string | null } = {
  cateID: sessionStorage.getItem('id'),
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    passCateID: (state = initialState, action: PayloadAction<string | null>) => {
      let value = action.payload;
      if(value) {
        sessionStorage.setItem('id', value);
      }
      else {
        sessionStorage.setItem('id', "");
      }
     
      state.cateID = value;
    },
  },
});

export const { passCateID } = productSlice.actions;
export default productSlice.reducer;
