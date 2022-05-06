import { Box, Drawer, Skeleton, Typography } from '@mui/material';
import Sidebar from 'components/Sidebar';
import CategoriesService from 'queries/categories';
import React from 'react';
import { FC, useState, useEffect } from 'react';
import Menu from 'components/MenuMuti/Menu';

interface IProps {
  isopen: boolean;
  funcS(): any;
}

const NavMobile: FC<IProps> = ({ isopen, funcS }) => {
  const handleClose = () => {
    funcS();
  };
  const [cates, setCates] = useState<any>([]);

  useEffect(() => {
    const cate = new CategoriesService();

    cate.getCategories().then((cate) => {
      setCates(cate);
    });
  }, []);
  return (
    <Drawer anchor="left" open={isopen} onClose={handleClose} >
      <Box sx={{ backgroundColor: 'red', textAlign: 'center', p: 2 }}>
        <Typography variant="h4" color={(theme) => theme.palette.common.white}>
          Danh mục sản phẩm
        </Typography>
      </Box>
      <Sidebar sx={{width:'300px'}}>
        {cates.length > 0 ? (
          <Menu data={cates} />
        ) : (
          <Skeleton variant="rectangular" width="100%" height="442px" />
        )}
      </Sidebar>
    </Drawer>
  );
};

export default NavMobile;
