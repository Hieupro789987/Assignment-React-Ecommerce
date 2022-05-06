import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartEmpty = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/sanpham')
  }
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{width:"50%", margin: '0 auto'}}>
        <img
          src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1"
          alt="empty"
          style={{width:'100%'}}
        />
      </Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Giỏ hàng trống
      </Typography>
      <Button
        sx={{
          width: {sx:'50%', md:"30%"},
          backgroundColor: '#D23F57',
          color: '#ffffff',
          boxShadow: 'rgb(43 52 69 / 10%) 0px 4px 16px',
          ':hover': {
            color: '#000000',
          },
        }}
        onClick={handleClick}
      >
        Tiếp tục shopping
      </Button>
    </Box>
  );
};

export default CartEmpty;
