import { Box, Button, Stack, Typography } from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ButtonInAndDe from 'components/increaseAnddecrease';
import { formatCurency } from 'utils/forrmatCurency';
import { useAppDispatch } from 'stores/hooks';
import { addToCart, updateCart, updateAmounts } from 'stores/reducers/cartSlice';
import { ICartProduct } from 'types/cart';
import React from 'react';

const ProductDetailContent: React.FC<any> = ({ item }) => {
  const [amount, setAmout] = React.useState<number>(1);
  const dispatch = useAppDispatch();

  const handleClickAddtoCart = () => {
    const product: ICartProduct = {
      id: item.id,
      imgUrl: item.imgUrl[0],
      name: item.name,
      describe: item.describe,
      prices: item.prices,
      totalPrices: item.prices,
      amounts: amount,
    };

    dispatch(addToCart(product));
    dispatch(updateCart());
  };

  const handleClickAmounts = (value: number) => {
    setAmout(value);
  };

  return (
    <Box mt="35px">
      <Typography variant="h5" fontSize="30px" component="h1" fontWeight={700} gutterBottom>
        {item.name}
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <Typography fontWeight={500}>Brand: </Typography>
        <Typography fontWeight={700}>{item.brandName}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} mb={2}>
        <Typography fontWeight={500}>Rated: </Typography>
        {[1, 2, 3, 4].map((item: any) => (
          <StarIcon key={item} sx={{ color: '#FAAF00' }} />
        ))}
        <StarOutlineIcon />
        (50)
      </Stack>
      <Stack direction="row" spacing={1} mb={2}>
        <Typography fontWeight={700} color="text.secondary" fontSize="25px">
          {formatCurency(item.prices)}
        </Typography>
      </Stack>
      <ButtonInAndDe count={item.amounts} func={handleClickAmounts} />
      <Button
        sx={{
          mt: 3,
          width: '50%',
          backgroundColor: '#D23F57',
          color: '#ffffff',
          boxShadow: 'rgb(43 52 69 / 10%) 0px 4px 16px',
          ':hover': {
            color: '#000000',
          },
        }}
        onClick={handleClickAddtoCart}
      >
        Thêm vào giỏ hàng
      </Button>
    </Box>
  );
};

export default ProductDetailContent;
