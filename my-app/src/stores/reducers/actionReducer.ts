import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IToast {
  active: boolean;
  status: AlertColor;
  message: string;
}
interface IForm {
  login: boolean;
  register: boolean;
  edit: boolean;
  success: boolean;
  payment:boolean;
}

interface IAction {
  openForm: IForm;
  toast: IToast;
  loading: boolean;
}

const initialState: IAction = {
  openForm: {
    login: false,
    register: false,
    edit: false,
    success: false,
    payment: false,
  },
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
    openFormAuth: (
      state = initialState,
      action: PayloadAction<{ type: string; value: boolean }>
    ) => {
      const { type, value } = action.payload;
      Object.assign(state.openForm, {[type]: value });
    },
    showToast: (state, action: PayloadAction<IToast>) => {
      const value = action.payload;
      state.toast = { ...value };
    },

    showLoading: (state, action: PayloadAction<boolean>) => {
      const value = action.payload;
      state.loading = value;
    },
  },
});

export const { openFormAuth, showToast, showLoading } = actionSlice.actions;
export default actionSlice.reducer;
