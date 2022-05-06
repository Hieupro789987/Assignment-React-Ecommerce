import { Paper, Box, Grid, IconButton, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ButtonInAndDe from 'components/increaseAnddecrease';
import { formatCurency } from 'utils/forrmatCurency';
import React from 'react';
import { useAppDispatch } from 'stores/hooks';
import { deleteProduct, updateCart ,updateAmounts} from 'stores/reducers/cartSlice';

const CartItem: React.FC<any> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleClickAmounts = (value: number) => {
      dispatch(updateAmounts({id: item.id, amount : value}));
      dispatch(updateCart());
  };

  const handleRemoveItem = () => {
    dispatch(deleteProduct(item.id));
    dispatch(updateCart());
  };

  return (
    <Paper elevation={0} sx={{ mb: 2, p:2}}>
      <Grid container alignItems="center">
        <Grid item xs={10} md={2}>
          <Box sx={{width:'75px', height:'75px', display:'flex', alignItems:'center'}}>
            <img src={item.imgUrl} alt="productIMge" style={{ width: '100%'  }} />
          </Box>
        </Grid>
        <Grid item xs={2} md={1} sx={{ textAlign: 'center', display: {xs: 'flex', md: 'none'} }}>
          <IconButton onClick={handleRemoveItem}>
            <DeleteOutlineIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" fontWeight={700}>
            {item.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {String(item.describe).substring(0, 25).concat('...')}
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <ButtonInAndDe count={item.amounts} func={handleClickAmounts} />
        </Grid>
        <Grid item xs={6} md={2}>
          <Typography color="text.secondary" fontWeight={700} textAlign="center">
            {formatCurency(item.prices)}
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ textAlign: 'center', display: {xs: 'none', md: 'flex'} }}>
          <IconButton onClick={handleRemoveItem}>
            <DeleteOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
