import { Link, Typography, Divider, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Layout from '..';
import React from 'react';
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

const CheckoutPage = () => {
  const { cart, totalPrices, totalAmounts } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickOrder = (accept: boolean) => {
    const productList: IProductInOrder[] = [];
    const orderData: IOrder = {
      id: String(Date.now() + 'ORDER'),
      code: String(Date.now() + 'CODE'),
      date: convertDate(Date.now()),
      statusID: '2',
      userID: user.uid,
      totalPrices: totalPrices + 25000,
      totalAmounts: totalAmounts,
      username: user.username ?? 'empty',
      phoneNumber: user.phoneNumber,
      address: user.address,
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

    if (accept) {
      const order = new OrderService();
      order.addOrder(orderData, productList).then(() => {
          dispatch(clearCart())
          navigate('/cart')
      });
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

      <Link href="/" sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
        <ArrowBackIcon />
        Back To Page
      </Link>
    </Layout>
  );
};

export default CheckoutPage;
