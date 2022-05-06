import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
import imgNormal from 'assets/images/normal.png';
import imgPaypal from 'assets/images/paypal.png';
import { ChangeEvent,  useEffect,  useState } from 'react';
import { useAppDispatch,useAppSelector } from 'stores/hooks';
import { paymentMethod } from 'stores/reducers/checkout';
const CheckoutPayment = () => {
  const payment = useAppSelector(state => state.checkout.payment)
  const dispatch = useAppDispatch();
  const [option, setOption] = useState<string>(payment);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(paymentMethod(e.target.value));
    setOption(e.target.value);
  };

  useEffect(() => {
    setOption(payment)
  },[payment])
  return (
    <Paper elevation={0}>
      <Box sx={{ padding: '25px' }}>
        <Typography
          id="demo-row-radio-buttons-group-label"
          variant="h4"
          color="text.secondary"
          mb={2}
          sx={{ width: '100%' }}
        >
          Chọn phương thức thanh toán
        </Typography>

        <FormControl>
          <RadioGroup
            value={option}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleChange}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100%', border: '1px solid #ececec', borderRadius: '5px', p: 2 }}
            >
              <FormControlLabel value="0" control={<Radio />} label="Thanh toán khi nhận hàng" />
              <img src={imgNormal} alt="normal" width="13%" />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100%', border: '1px solid #ececec', borderRadius: '5px', p: 2 }}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Thanh toán bằng tài khoản Paypal"
              />
              <img src={imgPaypal} alt="normal" width="13%" />
            </Stack>
          </RadioGroup>
        </FormControl>


      </Box>
    </Paper>
  );
};

export default CheckoutPayment;
