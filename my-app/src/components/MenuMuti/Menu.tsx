import { MenuList, Box } from '@mui/material';
import React from 'react';

import Submenu from './SubMenu';

const Menu: React.FC<any> = ({ data, func }) => {

  const handleClick = (id: string) => {
    if(!func) return;
    func(id)
  }

  return (
    <React.Fragment>
      <Box>
        <MenuList>
          {data.length > 0 && data.map((item: any) => <Submenu key={item.id} item={item}  func={handleClick}/>)}
        </MenuList>
      </Box>
    </React.Fragment>
  );
};

export default Menu;
