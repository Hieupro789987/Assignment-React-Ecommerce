import { Paper, Typography, Divider, Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import OrderService from 'queries/order';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IOrder, IProductInOrder } from 'types/order';
import { formatCurency } from 'utils/forrmatCurency';
import { statusName } from 'utils/status';

const OrderDetail: React.FC<any> = () => {
  const [order, setOrder] = React.useState<IOrder>({
    id: '',
    code: '',
    date: '',
    statusID: '',
    userID: '',
    totalPrices: 0,
    totalAmounts: 0,
    address: '',
    username: '',
    phoneNumber: '',
    payment: '',
  });
  const [products, setProducts] = React.useState<IProductInOrder[]>([]);

  let { id } = useParams();

  React.useEffect(() => {
    const order = new OrderService();
    if (id) {
      order.getOrderByID(id).then((res) => {
        const { order, product_item_order } = res;
        console.log(order);
        console.log(product_item_order);
        setOrder(order);
        setProducts(product_item_order);
      });
    }
  }, [id]);
  return (
    <Box>
      <Paper elevation={0} sx={{ p: 1, mb: 2 }}>
        <Typography variant="h3" gutterBottom>
          Chi tiết đơn hàng
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: '#fafafa', p: 1 }}
        >
          <Box>
            <Typography variant="subtitle1" color="text.primary">
              Đã giao ngày: {order.date}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Mã đơn hàng: {order.code}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
             Hình thức thanh toán: {order.payment}
            </Typography>
          </Box>
          <Typography variant="h6" color="text.primary">
            {statusName(order.statusID)}
          </Typography>
        </Stack>
        <Box mt={3} p={2}>
          {products.length > 0 &&
            products.map((item: any, index: number) => (
              <Box key={index}>
                <Grid container alignItems="center">
                  <Grid item xs={4} md={2}>
                    <Box
                      sx={{ width: '75px', height: '75px', display: 'flex', alignItems: 'center' }}
                    >
                      <img src={item.imgUrl} alt="productIMge" style={{ width: '100%' }} />
                    </Box>
                  </Grid>
                  <Grid item xs={8} md={4}>
                    <Typography variant="h5" fontWeight={700}>
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={4}>
                    <Typography
                      color="text.secondary"
                      fontWeight={700}
                      sx={{ textAlign: { xs: 'right', md: 'center' } }}
                    >
                      {formatCurency(item.prices)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={2}>
                    <Typography color="text.secondary" textAlign="right">
                      SL:{item.quanity}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
        </Box>
      </Paper>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        mt={2}
        spacing={1}
      >
        <Paper elevation={0} sx={{ p: 1, mb: 2, width: '100%' }}>
          <Typography color="text.secondary" gutterBottom>
            {order.username}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {order.phoneNumber}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {order.address}
          </Typography>
        </Paper>
        <Paper elevation={0} sx={{ p: 1, mb: 2, width: { xs: '100%', md: '70%' } }}>
          <Typography variant="h4" color="text.secondary" mb={2}>
            Tổng cộng
          </Typography>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Tổng tiền ({order.totalAmounts} sản phẩm)
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {formatCurency(order.totalPrices - 25000)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Phí giao hàng
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              25.000 VND
            </Typography>
          </Stack>

          <Divider sx={{ mt: 3 }} />
          <Stack direction="row" justifyContent="space-between" alignItems="center" mt="15px">
            <Typography variant="h5" color="text.secondary">
              Tổng cộng
            </Typography>
            <Typography variant="h5" color="text.primary">
              {formatCurency(order.totalPrices)}
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default OrderDetail;
