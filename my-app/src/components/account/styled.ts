import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LoginWrapper = styled(Box)(({ theme }) => ({
  width: '450px',
  padding: '48px 50px',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '35px 0px',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: '35px 25px',
  },
}));
