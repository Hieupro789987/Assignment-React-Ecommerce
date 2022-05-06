import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { showToast } from 'stores/reducers/actionReducer';

const ToastMessage = () => {
  const { active, status, message } = useAppSelector((state) => state.action.toast);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      showToast({
        active: false,
        status: 'error',
        message: '',
      })
    );
  };

  return (
    <Snackbar
      open={active}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert severity={status} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;
