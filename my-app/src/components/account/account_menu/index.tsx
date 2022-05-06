import { Logout } from '@mui/icons-material';
import { Avatar, Divider, IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';
import { User } from 'firebase/auth';
import React from 'react';
import { Fragment } from 'react';
import { MenuStyled, propertyPaper } from './styled';
import { Link } from 'react-router-dom';
import UserService from 'queries/user';

type IProps = {
  currentUser: User;
};

const AccountMenu: React.FC<IProps> = ({ currentUser }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    const user = new UserService();
    user.logout().then((_) => {
      setAnchorEl(null);
    });
  };
  return (
    <Fragment>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} src={currentUser.photoURL ?? ''} alt="avatar" />
        </IconButton>
      </Tooltip>
      <MenuStyled
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={propertyPaper}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to="/customer/profile">
          Thông tin cá nhân
        </MenuItem>
        <MenuItem component={Link} to="/customer/order">
          Quản lý hóa đơn
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClickLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MenuStyled>
    </Fragment>
  );
};

export default AccountMenu;
