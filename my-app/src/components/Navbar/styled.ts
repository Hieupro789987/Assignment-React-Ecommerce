import { Box, InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const LogoImg = styled('img')(({ theme }) => ({
//   [theme.breakpoints.down('sm')]: {
//     display: 'none',
//   },
  
}));

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.secondary.main}`,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  marginLeft: 'auto',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.main,
  width: '315px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export const NavigateWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  paddingTop: `calc(1em + ${theme.spacing(1)})`,
  paddingBottom: `calc(1em + ${theme.spacing(1)})`,
}));
