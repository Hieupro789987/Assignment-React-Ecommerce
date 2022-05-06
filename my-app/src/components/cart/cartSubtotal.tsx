import { Paper, Stack, Typography, Divider, Button, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { formatCurency } from 'utils/forrmatCurency';
import { useNavigate } from 'react-router-dom';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import React from 'react';
import { showToast } from 'stores/reducers/actionReducer';

const CartSubtotal: React.FC<any> = ({ prices, amounts }) => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onError = (message: string) => {
    dispatch(
      showToast({
        active: true,
        status: 'error',
        message: message,
      })
    );
  };
  const handleClickCheckout = () => {
    if (auth.uid) {
      navigate('/checkout');
    } else {
      onError('Bạn cần phải đăng nhập');
    }
  };

  return (
    <Paper elevation={0}>
      <Box sx={{ padding: '25px' }}>
        <Typography variant="h4" color="text.secondary" mb={2}>
          Địa điểm
        </Typography>
        <Stack mb={1} direction="row" alignItems="center">
          <LocationOnOutlinedIcon />
          <Typography variant="subtitle1" fontSize={12} color="text.secondary">
            Hồ Chí Minh, Quận Bình Tân, Phường Bình Hưng Hòa A
          </Typography>
        </Stack>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h4" color="text.secondary" mb={2}>
          Thông tin đơn hàng
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Tạm tính ({amounts} sản phẩm)
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {formatCurency(prices)}
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
            {formatCurency(prices + 25000)}
          </Typography>
        </Stack>
        <Button
          sx={{
            width: '100%',
            backgroundColor: '#D23F57',
            color: '#ffffff',
            mt: 3,
            boxShadow: 'rgb(43 52 69 / 10%) 0px 4px 16px',
            ':hover': {
              color: '#000000',
            },
          }}
          onClick={handleClickCheckout}
        >
          Xác nhận giỏ hàng
        </Button>
      </Box>
    </Paper>
  );
};

export default CartSubtotal;
