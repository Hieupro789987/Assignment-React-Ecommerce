import { Stack, Grid, IconButton, Typography, Link, Container } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <footer
      style={{
        boxShadow: '2px 0px 2px rgb(0 0 0 / 50%)',
        padding: '15px',
        marginTop: '15px',
        backgroundColor: '#ffffff',
 
      }}
    >
      <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">HỖ TRỢ KHÁCH HÀNG</Typography>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              <li>
                <Link href="#" underline="hover">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover">
                  Tin khuyến mãi
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Thông tin NewTech</Typography>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              <li>
                <Link href="#" underline="hover">
                  Chính sách & Quy định chung
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover">
                  Chính sách đổi trả sản phẩm
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover">
                  Chính sách giao hàng
                </Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { sx: 'right', md: 'ccenter' } }}>
            <Typography variant="h6" mb="15px">
              Kết nối với chúng tôi
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: { sx: 'flex-start', md: 'ccenter' } }}
            >
              <IconButton>
                <FacebookOutlinedIcon sx={{ color: '#4267B2' }}></FacebookOutlinedIcon>
              </IconButton>
              <IconButton>
                <GoogleIcon sx={{ color: '#EA4335' }}></GoogleIcon>
              </IconButton>
              <IconButton>
                <TwitterIcon sx={{ color: '#1DA1F2' }}></TwitterIcon>
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
