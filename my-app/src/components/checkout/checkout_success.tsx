import { Box, Button, Typography } from '@mui/material';
import ModalBox from 'components/ModalBox';
import { FC } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'stores/hooks';
import { openFormAuth } from 'stores/reducers/actionReducer';
import { clearCart } from 'stores/reducers/cartSlice';
const CheckoutSuccess: FC<{ codeOrder: string }> = ({ codeOrder }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(clearCart());

    dispatch(openFormAuth({ type: 'success', value: false }));
    navigate('/');
  };

  return (
    <ModalBox>
      <Box sx={{ textAlign: 'center', padding: '25px 50px' }}>
        <Box
          sx={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#82CE34',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <DoneIcon  sx={{ color: 'white' }} />
        </Box>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Đặt hàng thành công
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          Mã đơn hàng: {codeOrder}
        </Typography>
        <Button sx={{color:'white', backgroundColor:"#82CE34", width:"100%", mt:1}} onClick={handleClick}>Chấp nhận</Button>
      </Box>
    </ModalBox>
  );
};
export default CheckoutSuccess;
