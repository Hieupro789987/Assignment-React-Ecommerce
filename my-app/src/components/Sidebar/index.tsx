import { Paper } from '@mui/material';
import React from 'react';

const Sidebar: React.FC<any> = ({ children, ...rest }) => {
  return (
    <Paper elevation={0} sx={{ maxWidth: '100%', position: 'sticky', top: '0' }} {...rest}>
      {children}
    </Paper>
  );
};

export default Sidebar;
