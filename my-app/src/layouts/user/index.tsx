import { Grid } from '@mui/material';
import OrderTabs from 'components/order/orderList';

import Sidebar from 'components/Sidebar';
import UserMenuNav from 'components/user/user_menu';
import { Outlet } from 'react-router-dom';
import Layout from '..';
import React from 'react';

const UserPage = () => {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={{display: {xs: "none", md:'inline'}}}>
          <Sidebar>
            <UserMenuNav />
          </Sidebar>
        </Grid>
        <Grid item xs={12} md={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UserPage;
