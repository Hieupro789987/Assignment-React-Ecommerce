import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { ButtonAdd,CardTop } from './styled';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { formatCurency } from 'utils/forrmatCurency';
import { Link } from 'react-router-dom';

import { useAppDispatch } from 'stores/hooks';
import { addToCart } from 'stores/reducers/cartSlice';
import { updateCart } from 'stores/reducers/cartSlice';
import { ICartProduct } from 'types/cart';
import { IProduct } from 'types/product';

type IProps = {
  prod: IProduct;
  height :string;
}


const ProductItem: React.FC<IProps> = ({ prod, height }) => {
  const dispatch = useAppDispatch();

  const handleClickAddtoCart = () => {
    const product: ICartProduct = {
      id: prod.id,
      imgUrl: prod.imgUrl[0],
      name: prod.name,
      describe: prod.describe,
      prices: prod.prices,
      totalPrices: prod.prices,
      amounts: 1,
    };

    dispatch(addToCart(product));
    dispatch(updateCart());
  };

  return (
    <React.Fragment>
      <Card style={{ cursor: 'pointer' }} variant="outlined" sx={{ maxWidth: '100%' }}>
        <Box component={Link} to={`/detail/${prod.id.trim()}`}>
          <CardTop sx={{ height: height, padding: '30px' }}>
            <CardMedia
              component="img"
              height="100%"
              sx={{ maxWidth: '100%', objectFit: 'contain' }}
              image={prod.imgUrl[0]}
              alt={prod.name}
            />
          </CardTop>
        </Box>

        <CardContent sx={{ paddingBottom: '0px' }}>
          <Typography gutterBottom component="div" fontSize={'14px'} fontWeight={600}>
            {prod.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {String(prod.describe).substring(0, 25).concat('...')}
          </Typography>
        </CardContent>

        <CardActions>
          <Typography variant="body2" color="#D23F57" sx={{ paddingLeft: '8px' }}>
            {formatCurency(prod.prices)}
          </Typography>
          <ButtonAdd onClick={handleClickAddtoCart}>
            <AddIcon />
          </ButtonAdd>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default ProductItem;
