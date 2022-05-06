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
const CheckoutPayment = () => {
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', border: '1px solid #ececec', borderRadius: '5px', p: 2 }}
        >
          <FormControl>
            <RadioGroup
              row
              value={"0"}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="0" control={<Radio />} label="Thanh toán khi nhận hàng" />
            </RadioGroup>
          </FormControl>
          <img src={imgNormal} alt="normal" width="13%" />
        </Stack>
      </Box>
    </Paper>
  );
};

export default CheckoutPayment;
