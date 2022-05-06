import { Dialog, DialogContent, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useAppDispatch, useAppSelector,  } from 'stores/hooks';
import { openFormAuth } from 'stores/reducers/actionReducer';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ModalBox: React.FC<React.PropsWithChildren<any>> = ({children }) => {
  const openForm = useAppSelector(state => state.action.openForm);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(openFormAuth(false));
  };

  return (
    <React.Fragment>
      <Dialog
        open={openForm}
        TransitionComponent={Transition}
        onClose={handleClose}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{
          '& .css-1ycz40h-MuiPaper-root-MuiDialog-paper': {
            margin: '10px',
          },
        }}
      >
        <DialogContent
          sx={{
            padding: '10px 12px',
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ModalBox;
