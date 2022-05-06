import { IconButton, Paper, Stack, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ModalBox from 'components/ModalBox';
import React from 'react';

import EditInformation from './checkout_edit';
import { useAppDispatch } from 'stores/hooks';
import { openFormAuth } from 'stores/reducers/actionReducer';

const CheckoutAddress: React.FC<any> = ({ user }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openFormAuth(true));
    setIsOpen(true);
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: '#fafafa', p: 1 }}
      >
        <Typography variant="h6">Địa chỉ giao hàng</Typography>
        <IconButton aria-label="delete" size="small" onClick={handleClick}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Paper elevation={0} sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" fontWeight={400} gutterBottom>
          Người nhận: {user.username}
        </Typography>
        <Typography variant="subtitle1" color="text.primary" fontWeight={400} gutterBottom>
          Số điện thoại: {user.phoneNumber}
        </Typography>
        <Typography variant="subtitle1" color="text.primary" fontWeight={400} gutterBottom>
          Địa chỉ:
          {user.address}
        </Typography>
      </Paper>
      {isOpen && (
        <ModalBox open={isOpen}>
          <EditInformation user={user} />
        </ModalBox>
      )}
    </Box>
  );
};

export default CheckoutAddress;
