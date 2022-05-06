import { Link, Grid, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Layout from '..';
import React, { useState } from 'react';
import CheckoutAddress from 'components/checkout/checkout_address';
import CheckoutProduct from 'components/checkout/checkout_product';
import { useAppDispatch, useAppSelector } from 'stores/hooks';

import CheckoutPayment from 'components/checkout/checkout_payment';
import CheckoutSubtotal from 'components/checkout/checkout_subtotal';

import { convertDate } from 'utils/convertDate';
import { IOrder, IProductInOrder } from 'types/order';
import { ICartProduct } from 'types/cart';
import OrderService from 'queries/order';
import { useNavigate } from 'react-router-dom';
import { clearCart } from 'stores/reducers/cartSlice';
import CheckoutSuccess from 'components/checkout/checkout_success';
import { openFormAuth, showLoading } from 'stores/reducers/actionReducer';
import ModalBox from 'components/ModalBox';
import Paypal from 'components/Paypal';

function randomID(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const codeOrder = randomID(20);

const CheckoutPage = () => {
  const { cart, totalPrices, totalAmounts } = useAppSelector((state) => state.cart);
  const { success } = useAppSelector((state) => state.action.openForm);
  const [show, setShow] = useState<boolean>(false);

  const { payment } = useAppSelector((state) => state.checkout);

  // const  loading  = useAppSelector((state) => state.action.loading);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const successFn = (check: boolean) => {
    if(check) {
      handleClickOrder("0");
    }
 
  };
  const handleClickOrder = (accept: string) => {
    const productList: IProductInOrder[] = [];
    const orderData: IOrder = {
      id: String(Date.now() + 'ORDER'),
      code: codeOrder,
      date: convertDate(Date.now()),
      statusID: '2',
      userID: user.uid,
      totalPrices: totalPrices + 25000,
      totalAmounts: totalAmounts,
      username: user.username ?? 'empty',
      phoneNumber: user.phoneNumber,
      address: user.address,
      payment: payment === '0' ? 'Thanh toán khi nhận hàng' : 'Thanh toán bằng tài khoản paypal',
    };

    cart.forEach((item: ICartProduct) => {
      productList.push({
        productID: item.id,
        imgUrl: item.imgUrl,
        prices: item.prices,
        name: item.name,
        quanity: item.amounts,
        totalPrices: item.totalPrices,
      });
    });
    if (accept === '0') {
      const order = new OrderService();
      order.addOrder(orderData, productList).then((res) => {
        dispatch(showLoading(false));
        dispatch(openFormAuth({ type: 'success', value: true }));
        dispatch(openFormAuth({ type: 'payment', value: false }));
        dispatch(clearCart());
      });
    } else {
      setShow(true);
    }
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <CheckoutAddress user={user} />
          <CheckoutProduct list={cart} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CheckoutPayment />
          <CheckoutSubtotal prices={totalPrices} amounts={totalAmounts} func={handleClickOrder} />
        </Grid>
      </Grid>

      <Button onClick={() => navigate(-1)} sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
        <ArrowBackIcon />
        trở lại
      </Button>
      {success && <CheckoutSuccess codeOrder={codeOrder} />}
      {show && (
        <ModalBox>
          <Paypal func={successFn} />
        </ModalBox>
      )}
    </Layout>
  );
};

export default CheckoutPage;
