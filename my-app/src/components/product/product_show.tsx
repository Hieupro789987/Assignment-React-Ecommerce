import { Grid } from '@mui/material';

import React from 'react';
import {} from 'swiper';
import { IProduct } from 'types/product';
import ProductItem from './product_item';

type IProps = {
  data: IProduct[];
  col: number;
};

const ShowProduct: React.FC<IProps | any> = ({ data, col }) => {
  return (
    <Grid container spacing={1}>
      {data.length > 0 &&
        data.map((item: IProduct) => (
          <Grid item xs={6} sm={4} md={4} key={item.id}>
            {item && <ProductItem prod={item} height="300px" />}
          </Grid>
        ))}
    </Grid>
  );
};

export default ShowProduct;
