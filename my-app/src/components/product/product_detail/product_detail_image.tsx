import React from 'react';

import { Box, Stack } from '@mui/material';

const ProductDetailImage: React.FC<any> = ({ imgs }) => {
  const [image, setImage] = React.useState<string>('');

  React.useEffect(() => {
    setImage(imgs[0]);
  }, [imgs]);

  return (
    <React.Fragment>
      <Box>
        <Box
          sx={{ height: '450px', padding: '35px', backgroundColor: '#ffffff', borderRadius: '5px' }}
        >
          <Box sx={{ width: '100%', height: '100%' }}>
            <img src={image} alt="productImg" style={{ width: '100%', height: '100%' }} />
          </Box>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          {imgs.map((url: string, index: number) => (
            <Box
              key={index}
              sx={{
                width: '64px',
                height: '64px',
                minWidth: '64px',
                borderRadius: '10px',
                border: '1px solid rgb(218, 225, 231)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff !important',
                p: 1,
                cursor: 'pointer',
              }}
              onClick={() => setImage(url)}
            >
              <img src={url} alt="productIMge" style={{ width: '100%' }} />
            </Box>
          ))}
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default ProductDetailImage;
