import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import Sidebar from 'components/Sidebar';
import Layout from '..';
import Menu from 'components/MenuMuti/Menu';
import Slider from 'components/Slider';
import { BannerData, BannerSales } from 'constant/banner';
import { Autoplay, EffectCreative, Pagination } from 'swiper';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import Carousel from 'components/swiper/carousel';

import CategoriesService from 'queries/categories';
import ProductService from 'queries/product';
import { IProduct } from 'types/product';
import ProductItem from 'components/product/product_item';
import { Link } from 'react-router-dom';

const HomePage: React.FC<any> = () => {
  const [cates, setCates] = React.useState<any>([]);
  const [products, setProducts] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    const cate = new CategoriesService();
    const product = new ProductService();

    cate.getCategories().then((cate) => {
      setCates(cate);
    });

    product.getProductLimit().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <Layout>
      <Grid container spacing={2} sx={{height:"460px"}}>
        <Grid item xs={2.5} sx={{ display: { xs: 'none', md: 'inline' } }}>
          <Sidebar>
            {cates.length > 0 ? (
              <Menu data={cates} />
            ) : (
              <Skeleton variant="rectangular" width="100%" height="442px" />
            )}
          </Sidebar>
        </Grid>
        <Grid item xs={12} md={9.5} sx={{height:"100%"}}>
          <Slider  data={BannerData} module={[EffectCreative, Pagination, Autoplay]} />
        </Grid>

      </Grid>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h2" mb={2}>
          ƯU ĐÃI TRONG THÁNG
        </Typography>
        <Carousel
          points={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1204: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
          }}
        >
          {BannerSales &&
            BannerSales.map((item) => (
              <img
                key={item.id}
                src={item.url}
                alt="images"
                style={{ width: '100%', borderRadius: '15px' }}
              />
            ))}
        </Carousel>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h2" gutterBottom>
            SẢN PHẨM ƯU ĐÃI
          </Typography>
          <Link to="/sanpham">Xem thêm</Link>
        </Stack>

        <Grid container spacing={1}>
          {products.length > 0 &&
            products.map((item: IProduct) => (
              <Grid item xs={6} sm={4} md={3} key={item.id}>
                <ProductItem prod={item} height="350px" />
              </Grid>
            ))}
        </Grid>
      </Box>
      ;
    </Layout>
  );
};

export default HomePage;
