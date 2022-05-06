import { Box, Paper, Typography, Button, Stack, Divider, TextField, Grid } from '@mui/material';
import React from 'react';

import googleImg from 'assets/images/google.png';
import { useAppSelector } from 'stores/hooks';
import { InfomationCustomer } from 'types/user';
import UserService from 'queries/user';
import ToastMessage from 'components/toast';

const UserInfomation = () => {
  const userS = useAppSelector((state) => state.user);
  const [values, setValues] = React.useState<InfomationCustomer>(userS);

  const [linked, setLinked] = React.useState<boolean>(false);
  const [toast, setToast] = React.useState<any>({
    open: false,
    status: undefined,
    title: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSuccess = (message: string) => {
    setToast({
      open: true,
      status: 'success',
      title: message,
    });
    setLinked(true);
  };
  const onError = (message: string) => {
    setToast({
      open: true,
      status: 'error',
      title: message,
    });
  };

  const handleLinkedGoogle = () => {
    const user = new UserService();
    user.linkedWithGoogle(onSuccess, onError);
  };

  const handleClickSave = () => {
    const user = new UserService();
    user.updateInfo(values, onSuccess, onError);
  };
  React.useEffect(() => {
    setValues(userS);
  }, [userS]);

  return (
    <Paper sx={{ p: '16px' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: '#fafafa', p: 1 }}
      >
        <Typography variant="h3" gutterBottom>
          Thông tin tài khoản
        </Typography>
      </Stack>

      <Divider />
      <Box mt={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md p={1}>
            <TextField
              id="username"
              label="họ tên"
              value={values.username}
              name="username"
              variant="outlined"
              placeholder="Nhập họ tên"
              size="small"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              id="phoneNumber"
              label="điện thoại"
              value={values.phoneNumber ?? ''}
              name="phoneNumber"
              variant="outlined"
              placeholder="Nhập số điện thoại"
              size="small"
              onChange={handleChange}
              fullWidth
              type="number"
              sx={{ mb: 2 }}
            />
            <TextField
              id="email"
              label="email"
              name="email"
              value={values.email}
              variant="outlined"
              disabled
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: '#ececec' }}
            />

            <Button
              sx={{
                backgroundColor: '#D23F57',
                color: '#ffffff',
                boxShadow: 'rgb(43 52 69 / 10%) 0px 4px 16px',
                ':hover': {
                  color: '#000000',
                },
                mb: 2,
              }}
              size="small"
              onClick={handleClickSave}
            >
              lưu thông tin
            </Button>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} md p={1}>
            <Typography variant="h5" color="text.primary" mb={2}>
              Tài khoản liên kết
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <img src={googleImg} alt="google" width={'30px'} />
                <Typography variant="subtitle1" color="text.primary" mb={2}>
                  Google
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                size="small"
                disabled={values.emailVerified}
                onClick={handleLinkedGoogle}
              >
                {values.emailVerified || linked ? 'Đã liên kết' : 'Liên kết'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <ToastMessage />
    </Paper>
  );
};

export default UserInfomation;
