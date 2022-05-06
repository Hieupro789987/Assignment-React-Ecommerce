import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  Link,
  TextField,
} from '@mui/material';
import { Check } from '@mui/icons-material';
import React, { ChangeEvent } from 'react';

import GoogleIcon from '@mui/icons-material/Google';
import UserService from 'queries/user';
import { LoginWrapper } from '../styled';
import { useAppDispatch } from 'stores/hooks';
import { openFormAuth, showLoading, showToast } from 'stores/reducers/actionReducer';

const LoginForm: React.FC<React.PropsWithChildren<any>> = ({ onChangeForm }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<any>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const onSuccess = (message: string) => {

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
  const handleClickShowPassword = () => {
    setShow(!show);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    const user = new UserService();
    user.signin(values, onSuccess, onError);
    dispatch(showLoading(true));
  };

  const handleOpenRegisterForm = () => {
    if (!onChangeForm) return;
    onChangeForm('REGISTER');
  };

  const handleLoginWithGoole = () => {
    const user = new UserService();
    user.signInWithGoogle().then(() => {
      dispatch(openFormAuth({type: 'login', value:false}));
    });
    dispatch(showLoading(true));
  };
  return (
    <React.Fragment>
      <LoginWrapper>
        <Typography variant="h1" letterSpacing={5} fontWeight={700} textAlign="center" gutterBottom>
          NEWTECT
        </Typography>
        <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
          Đăng nhập
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            onClick={handleSubmit}
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
            Đăng nhập
          </LoadingButton>
          <Divider />
          <Typography
            variant="caption"
            component="div"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            Hoặc
          </Typography>

          <LoadingButton
            onClick={handleLoginWithGoole}
            loadingPosition="start"
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              mb: 1,

              backgroundColor: '#EA4335',
              border: '1px solid #EA4335 ',
              color: '#ffffff',
              ':hover': { color: '#534f4f' },
            }}
          >
            Login With Google
          </LoadingButton>

          <Typography
            variant="caption"
            component="div"
            fontWeight={600}
            textAlign="center"
            gutterBottom
          >
            Bạn chưa có tài khoản?
            <Link sx={{ cursor: 'pointer', mt: '5px' }} onClick={handleOpenRegisterForm}>
              Đăng ký
            </Link>
          </Typography>
        </Box>
      </LoginWrapper>
    </React.Fragment>
  );
};
export default LoginForm;
