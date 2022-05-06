import { combineReducers } from 'redux';
import { actionSlice } from './actionReducer';
import { authSlice } from './auth';

import { cartSlice } from './cartSlice';
import { productSlice } from './productSlice';


const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  user: authSlice.reducer,
  product: productSlice.reducer,
  action: actionSlice.reducer,
});

export default rootReducer;
