import { AppBar, Badge, Box, IconButton, Stack, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoImg from 'assets/images/logo.png';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { LogoImg, SearchIconWrapper, StyledInputBase, Search } from './styled';

import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import ModalBox from 'components/ModalBox';
import LoginForm from 'components/account/loginForm';
import RegisterForm from 'components/account/registerForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'stores/hooks';
import { useStatusAuth } from 'hooks/auth';

import SearchIcon from '@mui/icons-material/Search';
import NavMobile from './nav_mobile';
import AccountMenu from 'components/account/account_menu';
import { openFormAuth } from 'stores/reducers/actionReducer';

const Navbar: React.FC<any> = (props) => {
  const user = useStatusAuth();


  const [openS, setOpenS] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const selector = useAppSelector((state) => state.cart.count);
  const openForm = useAppSelector((state) => state.action.openForm);
  const dispatch = useAppDispatch();

  const [search, setSearch] = React.useState<string>('');
  const [openF, setOpenF] =React.useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleEnterSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/sanpham/?search=${search}`);
      setSearch('');
    }
  };

  const handleOpenFormLogin = () => {
    dispatch(openFormAuth(true));
    setOpenF(true)
    setShow(true);
  };

  const handleClickSidebar = () => {
    console.log(openS);
    setOpenS(true);
  };
  const handleCloseSidebar = () => {
    setOpenS(false);
  };

  const handleChangeForm = (type: string) => {
    if (type === 'LOGIN') {
      setShow(true);
    } else {
      setShow(false);
    }
  };


  return (
    <Box>
      <NavMobile isopen={openS} funcS={handleCloseSidebar} />
      <Box>
        {openF && (
          <ModalBox open={openForm}>
            {show ? (
              <LoginForm onChangeForm={handleChangeForm} />
            ) : (
              <RegisterForm onChangeLogin={handleChangeForm} />
            )}
          </ModalBox>
        )}
      </Box>
      <AppBar position="static">
        <Toolbar>
          <LogoImg srcSet={`${logoImg} 5x`} alt="logo" />
          <Box sx={{ flexGrow: 1 }} />
          <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm"
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={handleChange}
              onKeyDown={handleEnterSearch}
            />
          </Search>

          {!user && (
            <Box>
              <IconButton onClick={handleOpenFormLogin}>
                <PersonOutlineOutlinedIcon />
              </IconButton>
            </Box>
          )}
          <Box>
            <IconButton component={Link} to="/cart">
              <Badge badgeContent={selector} color="error">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box>{user && <AccountMenu currentUser={user} />}</Box>
        </Toolbar>
        <Stack direction="row" sx={{ padding: '0 12px', paddingBottom: '5px' }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ display: { xs: 'flex', md: 'none' }, ml: 0, mr: 1, p: 0 }}
            onClick={handleClickSidebar}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Search sx={{ width: '100%', display: { xs: 'flex', md: 'none' } }}>
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm"
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={handleChange}
              onKeyDown={handleEnterSearch}
            />
          </Search>
        </Stack>
      </AppBar>
    </Box>
  );
};

export default Navbar;
