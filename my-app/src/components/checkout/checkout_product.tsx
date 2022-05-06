import { Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { formatCurency } from 'utils/forrmatCurency';

const CheckoutProduct: React.FC<any> = ({ list }) => {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: '#fafafa', p: 1 }}
      >
        <Typography variant="h6">Gói hàng ({list.length})</Typography>
        <Typography variant="caption">newtech-shipping</Typography>
      </Stack>
      <Paper elevation={0} sx={{ mb: 2, p: 3 }}>
        {list.length > 0 &&
          list.map((item: any) => (
            <Box key={item.id}>
              <Grid container alignItems="center">
                <Grid item xs={4} md={2}>
                  <Box
                    sx={{ width: '75px', height: '75px', display: 'flex', alignItems: 'center' }}
                  >
                    <img src={item.imgUrl} alt="productIMge" style={{ width: '100%' }} />
                  </Box>
                </Grid>

                <Grid item xs={8} md={4}>
                  <Typography variant="h5" fontWeight={700}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    {String(item.describe).substring(0, 25).concat('...')}
                  </Typography>
                </Grid>
                <Grid item xs={8} md={4}>
                  <Typography color="text.secondary" fontWeight={700} sx={{textAlign:{xs: "right", md:'center'}}}>
                    {formatCurency(item.prices)}
                  </Typography>
                </Grid>
                <Grid item xs={4} md={2}>
                  <Typography color="text.secondary" textAlign="right">SL:{item.amounts}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
      </Paper>
    </Box>
  );
};

export default CheckoutProduct;
