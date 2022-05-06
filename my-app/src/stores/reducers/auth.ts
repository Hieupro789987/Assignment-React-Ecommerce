import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIformmationEdit, InfomationCustomer } from 'types/user';

const initialState: InfomationCustomer = {
  username: '',
  address: '',
  email: '',
  phoneNumber: '',
  emailVerified: false,
  uid: '',
  photoURL: '',
  isActive: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateInfomation: (state = initialState, action: PayloadAction<InfomationCustomer>) => {
      Object.assign(state, action.payload);
    },
    editInfomationTmp: (state = initialState, action: PayloadAction<IIformmationEdit>) => {
        const {username, phoneNumber, address} = action.payload;

        state.username = username;
        state.phoneNumber = phoneNumber;
        state.address = address;
    }
  },
});

export const { updateInfomation,editInfomationTmp } = authSlice.actions;
export default authSlice.reducer;
