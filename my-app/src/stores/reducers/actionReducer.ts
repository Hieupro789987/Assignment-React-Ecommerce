import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IToast {
  active: boolean;
  status: AlertColor;
  message: string;
}

interface IAction {
  openForm: boolean;
  toast: IToast;
  loading: boolean;
}

const initialState: IAction = {
  openForm: false,
  toast: {
    active: false,
    status: 'error',
    message: '',
  },

  loading: false,
};

export const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    openFormAuth: (state = initialState, action: PayloadAction<boolean>) => {
      const value = action.payload;
      state.openForm = value;
    },
    showToast: (state = initialState, action: PayloadAction<IToast>) => {
      const value = action.payload;
      state.toast = { ...value };
    },

    showLoading: (state = initialState, action: PayloadAction<boolean>) => {
      const value = action.payload;
      state.loading = value;
    },
  },
});

export const { openFormAuth, showToast, showLoading } = actionSlice.actions;
export default actionSlice.reducer;
