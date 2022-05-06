import { ListItemIcon, MenuItem, MenuList, ListItemText, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';

import { NavLink } from 'react-router-dom';
import React from 'react';
const UserMenuNav = () => {
  return (
    <MenuList>
      <MenuItem sx={{ mb: 1 }} component={NavLink} to="/customer/profile">
        <ListItemIcon sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonOutlineIcon sx={{ color: 'text.secondary', fontSize: '17px' }} />
          <ListItemText
            sx={{
              '& .MuiTypography-root': { fontSize: '13px', fontWeight: 500, ml: 1 },
            }}
            primary={<Typography color="text.secondary">Thông tin tài khoản</Typography>}
          />
        </ListItemIcon>
      </MenuItem>
      <MenuItem sx={{ mb: 1 }} component={NavLink} to="/customer/order">
        <ListItemIcon sx={{ display: 'flex', alignItems: 'center' }}>
          <CollectionsBookmarkOutlinedIcon sx={{ color: 'text.secondary', fontSize: '17px' }} />
          <ListItemText
            sx={{
              '& .MuiTypography-root': { fontSize: '13px', fontWeight: 500, ml: 1 },
            }}
            primary={<Typography color="text.secondary">Quản lý đơn hàng</Typography>}
          />
        </ListItemIcon>
      </MenuItem>
    </MenuList>
  );
};

export default UserMenuNav;
