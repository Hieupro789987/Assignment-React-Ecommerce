import { Box, Grid, Paper, Typography } from '@mui/material';
import ProductDetailContent from 'components/product/product_detail/product_detail_content';
import ProductDetailImage from 'components/product/product_detail/product_detail_image';
import ProductItem from 'components/product/product_item';
import Carousel from 'components/swiper/carousel';
import BrandsService from 'queries/brands';
import ProductService from 'queries/product';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from 'types/product';
import Layout from '..';

interface IProductDetail {
  id:string;
  imgUrl: string[];
  name: string;
  brandName: string;
  prices: number;
  describe: string;
}

const DetailPage = () => {
  const [value, setValue] = React.useState<IProductDetail>({
    id: '',
    imgUrl: [],
    name: '',
    brandName: '',
    prices: 0,
    describe: '',
  });
  const [valuesRelated, setValuesRelated] = React.useState<IProduct[] | null>(null);

  const { id } = useParams();

  React.useEffect(() => {
    const product = new ProductService();
    const brand = new BrandsService();

    product.getProductById(String(id)).then(async (item) => {
      await brand.getBrandByID(item.brandID).then((res) => {
        setValue({
          id: item.id,
          imgUrl: item.imgUrl,
          name: item.name,
          prices: item.prices,
          describe: item.describe,
          brandName: res.name,
        });
      });

      await product.getProductRelated(item.cateID).then((res) => {
        if (res) {
          setValuesRelated(res);
        }
      });
    });
  }, [id]);

  return (
    <Layout>
      <Grid container spacing={3} mb="35px">
        <Grid item xs={5}>
          {value && <ProductDetailImage imgs={value?.imgUrl} />}
        </Grid>
        <Grid item xs={5}>
          {value && <ProductDetailContent item={value} />}
        </Grid>
      </Grid>
      <Box mb="25px">
        <Paper elevation={0}>
          <Box sx={{ backgroundColor: '#fafafa', p: 1 }}>
            <Typography variant="h5">Mô Tả</Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            {value && (
              <Typography variant="h6" color="text.secondary">
                {value.describe}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" fontWeight={700} mb="15px">
          Sản phẩm liên quan
        </Typography>
        {valuesRelated && valuesRelated.length > 4 ? (
          <Carousel
            points={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              840: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1204: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
            }}
          >
            {valuesRelated &&
              valuesRelated.map((item: IProduct) => (
                <ProductItem key={item.id} prod={item} height="250px" />
              ))}
          </Carousel>
        ) : (
          valuesRelated && (
            <Grid container spacing={1}>
              {valuesRelated.map((item: IProduct) => (
                <Grid item xs={3} key={item.id}>
                  <ProductItem prod={item} height="250px" />
                </Grid>
              ))}
            </Grid>
          )
        )}
      </Box>
    </Layout>
  );
};

export default DetailPage;
