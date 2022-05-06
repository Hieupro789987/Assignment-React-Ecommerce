import { combineReducers } from 'redux';
import { actionSlice } from './actionReducer';
import { authSlice } from './auth';

import { cartSlice } from './cartSlice';
import { checkoutSlice } from './checkout';
import { productSlice } from './productSlice';



const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  user: authSlice.reducer,
  product: productSlice.reducer,
  action: actionSlice.reducer,
  checkout: checkoutSlice.reducer,
});

export default rootReducer;
