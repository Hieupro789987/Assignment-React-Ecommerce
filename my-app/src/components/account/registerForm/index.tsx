import { Check, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { errorRegister, useForm } from 'hooks/form';
import UserService from 'queries/user';

import React from 'react';
import { useAppDispatch } from 'stores/hooks';
import { showLoading, showToast } from 'stores/reducers/actionReducer';
import { LoginWrapper } from '../styled';

const RegisterForm: React.FC<any> = ({ onChangeLogin }) => {
  const [show, setShow] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { handleChange, values, isError, errors } = useForm(errorRegister);

  const handleClickShowPassword = () => {
    setShow(!show);
  };

  const handleOpenLoginForm = () => {
    onChangeLogin('LOGIN');
  };
  const onSuccess = (message: string) => {
    dispatch(
      showToast({
        active: true,
        status: 'success',
        message: message,
      })
    );
    dispatch(showLoading(false));
  };
  const onError = (message: string) => {
    dispatch(
      showToast({
        active: true,
        status: 'error',
        message: message,
      })
    );
    dispatch(showLoading(false));
  };

  const handleSubmitRegister = () => {
    if (!isError()) {
      const user = new UserService();
      user.signup(values, onSuccess, onError);
      dispatch(showLoading(true));
    }
  };

  return (
    <React.Fragment>
      <LoginWrapper>
        <Typography variant="h1" letterSpacing={5} fontWeight={700} textAlign="center" gutterBottom>
          NEWTECT
        </Typography>
        <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
          Đăng ký
        </Typography>
        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          textAlign="center"
          marginBottom={'36px'}
        >
          Chào mừng quý khách đã ghé thăm!
        </Typography>
        <Box>
          <Stack direction="row" justifyContent="space-between" spacing={1} mb={2}>
            <TextField
              id="username"
              label="Họ tên"
              name="username"
              variant="outlined"
              placeholder="Nhập họ tên"
              size="small"
              onChange={handleChange}
              fullWidth
              required
              helperText={errors.username}
              error={errors.username ? true : false}
            />

            <TextField
              id="phoneNumber"
              label="Số điện thoại"
              name="phoneNumber"
              variant="outlined"
              placeholder="Nhập số điện thoại"
              size="small"
              onChange={handleChange}
              fullWidth
              required
              helperText={errors.phoneNumber}
              error={errors.phoneNumber ? true : false}
              type="number"
            />
          </Stack>
          <TextField
            id="address"
            label="Địa chỉ"
            name="address"
            variant="outlined"
            placeholder="Nhập địa chỉ thường trú"
            size="small"
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
            helperText={errors.address}
            error={errors.address ? true : false}
          />
          <TextField
            id="email"
            label="email"
            name="email"
            variant="outlined"
            placeholder="Nhập địa chỉ email"
            size="small"
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
            helperText={errors.email}
            error={errors.email ? true : false}
          />

          <TextField
            id="password"
            label="mật khẩu"
            name="password"
            variant="outlined"
            placeholder="Nhập mật khẩu"
            size="small"
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2, pr: 0 }}
            type={show ? '' : 'password'}
            helperText={errors.password}
            error={errors.password ? true : false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {show ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="confirmPassword"
            label="nhập lại mật khẩu"
            name="confirmPassword"
            variant="outlined"
            placeholder="Nhập lại mật khẩu"
            size="small"
            type={show ? '' : 'password'}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
          />

          <LoadingButton
            onClick={handleSubmitRegister}
            loadingPosition="start"
            startIcon={<Check />}
            variant="outlined"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              bgColor: (theme) => theme.palette.primary.main,
              borderWidth: '2px',
              ':hover': { borderWidth: '2px' },
            }}
          >
            Đăng ký
          </LoadingButton>

          <Typography
            variant="caption"
            component="div"
            fontWeight={600}
            textAlign="center"
            gutterBottom
          >
            Bạn đã có tài khoản?
            <Link sx={{ cursor: 'pointer', ml: '5px' }} onClick={handleOpenLoginForm}>
              Đăng nhập
            </Link>
          </Typography>
        </Box>
      </LoginWrapper>
    </React.Fragment>
  );
};
export default RegisterForm;
