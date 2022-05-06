import { Divider, Grid, Link, Typography } from '@mui/material';

import CartSubtotal from 'components/cart/cartSubtotal';
import Layout from '..';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CartEmpty from 'components/cart/cartEmpty';

import CartItem from 'components/cart/cartItem';
import React from 'react';
import { useAppSelector } from 'stores/hooks';
import { ICartProduct } from 'types/cart';

const CartPage = () => {
  const { cart, count, totalPrices, totalAmounts } = useAppSelector((state) => state.cart);

  return (
    <Layout>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Shopping
      </Typography>

      {count ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cart.map((item: ICartProduct) => <CartItem key={item.id} item={item} />)}
            <Divider sx={{ mb: 2 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CartSubtotal prices={totalPrices} amounts={totalAmounts}/>
          </Grid>
        </Grid>
      ) : (
        <CartEmpty />
      )}
    </Layout>
  );
};

export default CartPage;
