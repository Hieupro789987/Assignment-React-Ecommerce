import { Divider } from '@mui/material';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import BreadcrumbComp from 'components/Breadcrumb';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar/navbar';


import { useLocation } from 'react-router-dom';

const ContainerStyled = styled('div')(({ theme }) => ({
  maxWidth: '1270px',
  margin: '0 auto',
  padding: '0 20px',

  [theme.breakpoints.down('md')]: {
    padding: '0 10px',
  },
}));

const Layout: React.FC<any> = (props) => {
  const location = useLocation();

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#ffffff',
          mb: 1,
        }}
      >
        <ContainerStyled>
          <Navbar />
        </ContainerStyled>
      </Box>

      <ContainerStyled>
        {location.pathname !== '/' && (
          <>
            <Box>
              <BreadcrumbComp />
            </Box>
            <Divider sx={{ mb: 2 }} />
          </>
        )}

        {props.children}
      </ContainerStyled>

      <Box sx={{ marginTop: '121px' }}>
        <Footer />
      </Box>

     
    </>
  );
};

export default Layout;
