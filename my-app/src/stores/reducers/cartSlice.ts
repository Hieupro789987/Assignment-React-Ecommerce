import { ICartProduct } from '../../types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartTotal } from 'types/cart';

const data = JSON.parse(localStorage.getItem('cart') || '[]');

const initialState: ICartTotal = {
  cart: data,
  count: data.length ?? 0,
  totalPrices: 0,
  totalAmounts: 0,
};

let sumA = 0;
let sumP = 0;

data.forEach((item: ICartProduct) => {
  initialState.totalAmounts = sumA = item.amounts + sumA;
  initialState.totalPrices = sumP = item.prices * item.amounts + sumP;
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state = initialState) => {
      const newList = state.cart;
      state.count = newList.length;
      let sumA = 0;
      let sumP = 0;

      newList.forEach((item: ICartProduct) => {
        state.totalAmounts = sumA = item.amounts + sumA;
        state.totalPrices = sumP = item.prices * item.amounts + sumP;
      });
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    addToCart: (state = initialState, action: PayloadAction<ICartProduct>) => {
      let flag = false;
      const product = action.payload;
      if (state.cart.length >= 0) {
        state.cart.forEach((item: ICartProduct) => {
          if (item.id == product.id) {
            item.amounts += product.amounts;
            flag = true;
          }
        });
        if (!flag) {
          state.cart.push(product);
        }
      } else {
        state.cart.push(product);
      }
    },
    deleteProduct: (state = initialState, action: PayloadAction<string>) => {
      const id = action.payload;
      state.cart = state.cart.filter((item: ICartProduct) => item.id != id);
      localStorage.setItem('cart', JSON.stringify(state.cart));

      state.totalAmounts = 0;
      state.totalPrices = 0;
    },
    updateAmounts: (
      state = initialState,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      const { id, amount } = action.payload;
      const prod = state.cart.find((item: ICartProduct) => item.id == id);

      if (prod != undefined) {
        prod.amounts = amount;
      }
    },
    clearCart: (state = initialState) => {
      localStorage.removeItem('cart');
      state.cart = [];
      state.count = 0;
      state.totalPrices = 0;
      state.totalAmounts = 0;
    },
  },
});

export const { addToCart, deleteProduct, updateCart, updateAmounts, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
