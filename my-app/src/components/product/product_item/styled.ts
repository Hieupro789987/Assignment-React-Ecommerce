import  {Box, IconButton}   from '@mui/material';

import { styled } from '@mui/material/styles';


export const ButtonAdd = styled(IconButton)(({theme}) => ({
    border: `1px solid  ${theme.palette.primary.light}`,
    color: theme.palette.primary.light,
    fontWeight: 600,
    textTransform: "capitalize",
    minWidth: 0,
    minHeight: 0,
    padding: "3px",
    marginLeft: 'auto',

    [theme.breakpoints.down('sm')]: {
        padding: "1px",
    },

}))


export const CardTop = styled(Box)(({ theme }) => ({

  
    [theme.breakpoints.down('sm')]: {
        height: "150px"
    },

  }));
  