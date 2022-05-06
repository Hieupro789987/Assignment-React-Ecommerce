import { CssBaseline } from '@mui/material';

import ShowProduct from 'components/product/product_show';
import ToastMessage from 'components/toast';
import React from 'react';

import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';
import LoadingComp from 'components/loading';
import {
  HomePage,
  ProductPage,
  DetailPage,
  CartPage,
  CheckoutPage,
  UserPage,
  OrderComp,
  Profile,
  OrderDetail,
} from 'routes/router';

import './App.css';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sanpham" element={<ProductPage />}>
          <Route path=":id" element={<ShowProduct />} />

          <Route path=":id/:id" element={<ShowProduct />} />
        </Route>

        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/customer"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        >
          <Route path="/customer/order" element={<OrderComp />} />
          <Route path="/customer/order/:id" element={<OrderDetail />} />
          <Route path="/customer/profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastMessage />
      <LoadingComp />
    </>
  );
};

export default App;
