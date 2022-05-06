import { Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import { IOrder } from 'types/order';
import { Link } from 'react-router-dom';
import React from 'react';
import { formatCurency } from 'utils/forrmatCurency';
import { statusName } from 'utils/status';

type TProps = {
  prod: IOrder;
};

const OrderItem: React.FC<TProps> = ({ prod, ...rest }) => {
  return (
    <Paper elevation={0} sx={{ mb: 1, cursor: 'pointer', p: 2 }} {...rest}>
      <Grid container alignItems="center">
        <Grid item xs={11} md={2}>
          <Typography sx={{textAlign: {xs: 'right', md:'center'}}}>{prod.code}</Typography>
        </Grid>
        <Grid item xs={1} sx={{ textAlign: 'center' ,display:{xs: 'inline', md:"none"}}} >
          <Tooltip title="Chi tiết">
            <IconButton component={Link} to={`/customer/order/${prod.id}`}>
              <FileOpenOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={4} md={3}>
          <Typography sx={{textAlign: {xs: 'right', md:'center'}}}>{statusName(prod.statusID)}</Typography>
        </Grid>
        <Grid item xs={4} md={3}>
          <Typography textAlign="center">{prod.date}</Typography>
        </Grid>
        <Grid item xs={4} md={3}>
          <Typography textAlign="center" color="text.secondary" fontWeight={700}>
            {formatCurency(prod.totalPrices)}
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ textAlign: 'center' ,display:{xs: 'none', md:"inline"}}} >
          <Tooltip title="Chi tiết">
            <IconButton component={Link} to={`/customer/order/${prod.id}`}>
              <FileOpenOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrderItem;
