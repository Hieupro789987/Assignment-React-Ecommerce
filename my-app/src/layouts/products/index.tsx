import {
  Grid,
  Box,
  Stack,
  Pagination,
  Typography,
  Paper,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Skeleton,
} from '@mui/material';
import Sidebar from 'components/Sidebar';

import Menu from 'components/MenuMuti/Menu';

import Layout from '..';
import CheckBoxs from 'components/checkBox';

import React from 'react';

import ProductService from 'queries/product';
import BrandsService from 'queries/brands';
import CategoriesService from 'queries/categories';
import ShowProduct from 'components/product/product_show';
import { IProduct } from 'types/product';
import RadioComp from 'components/radio';
import { rangePriceData } from 'constant/pricesData';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { passCateID } from 'stores/reducers/productSlice';

const VIEW_DISPLAY = 9;

const ProductPage: React.FC<any> = () => {
  const location = useLocation();
  const id = useAppSelector((state) => state.product.cateID);
  const dispatch = useAppDispatch();

  const [page, setPage] = React.useState<number>(1);
  const [products, setProducts] = React.useState<IProduct[]>([]);

  const [brands, setBrands] = React.useState<any>([]);
  const [cates, setCates] = React.useState<any>([]);
  const [count, setCount] = React.useState<number>(0);
  const [options, setOptions] = React.useState<any>({});
  const [value, setValue] = React.useState<string>('');

  const handleChangePage = (value: number) => {
    setPage(value);
  };
  const handleClickBrand = (listId: []) => {
    setPage(1);
    setOptions({
      ...options,
      brands: listId,
    });
  };

  const handleClickPrice = (val: any) => {
    setPage(1);
    setOptions({
      ...options,
      prices: val.split(','),
    });
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    setOptions({
      ...options,
      sort: Number(event.target.value),
    });
  };

  React.useEffect(() => {
    const brand = new BrandsService();
    brand.getAllBrands().then((item) => setBrands((brands: any) => [...brands, ...item]));

    const cate = new CategoriesService();

    cate.getCategories().then((cate) => {
      setCates(cate);
    });
  }, []);

  React.useEffect(() => {
    if (location.pathname === '/sanpham') {
      dispatch(passCateID(null));
    }
    async function getProduct() {
      const product = new ProductService();

      if (location.search) {
        const query = new URLSearchParams(location.search);
        const paramField = query.get('search');

        if (paramField) {
         await  product.searchProducts(paramField);
          const [list, numberPage] = product.paginateProducts(page, VIEW_DISPLAY);
          setProducts(list);
          setCount(numberPage);
        }
      }else {
        await product.getAllProducts(id);

        if (Object.keys(options).length > 0) {
          product.filterProduct(options);
          const [list, numberPage] = product.paginateProducts(page, VIEW_DISPLAY, true);
  
          setProducts(list);
          setCount(numberPage);
        } else {
          const [list, numberPage] = product.paginateProducts(page, VIEW_DISPLAY);
          setProducts(list);
          setCount(numberPage);
        }
      }

     
    }

    getProduct();
  }, [dispatch, id, location.pathname, location.search, options, page]);

  return (
    <Layout>
      <Paper elevation={0}>
        <Stack direction="row" justifyContent="space-between" mb="25px" p={2} alignItems="center">
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Sản phẩm
            </Typography>
          </Box>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="caption" fontSize="15px" color="text.secondary">
                Sort By:
              </Typography>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={value}
                  onChange={handleChangeSort}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  size="small"
                >
                  <MenuItem value="">
                    <em>Tất cả</em>
                  </MenuItem>
                  <MenuItem value={1}> Tên: A - Z</MenuItem>
                  <MenuItem value={2}> Tên: Z - A</MenuItem>
                  <MenuItem value={3}> Giá: Tăng dần</MenuItem>
                  <MenuItem value={4}> Giá: Giảm dần</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Sidebar sx={{ p: 2 }}>
            <Box sx={{ display: { xs: 'none', md: 'inline' } }}>
              <Typography variant="caption" fontSize={14} fontWeight={700} gutterBottom>
                Loại sản phẩm
              </Typography>

              {cates.length > 0 ? (
                <Menu data={cates} />
              ) : (
                <Skeleton variant="rectangular" width="100%" height="442px" />
              )}
            </Box>
            <Box sx={{ mt: 2 }}>
              <CheckBoxs data={brands} title="Thương hiệu " func={handleClickBrand} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <RadioComp title="Giá tiền" data={rangePriceData} func={handleClickPrice} />
            </Box>
          </Sidebar>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <ShowProduct data={products} col={4} />

          {products.length > 0 && (
            <Stack direction="row" justifyContent="center" mt={1}>
              <Pagination
                count={count}
                page={page}
                defaultPage={page}
                defaultValue={page}
                onChange={(_, value) => handleChangePage(value)}
              />
            </Stack>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductPage;
