import { Box, MenuItem, ListItemText, Typography, Collapse, MenuList } from '@mui/material';
import React from 'react';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'stores/hooks';
import { passCateID } from 'stores/reducers/productSlice';

const Submenu: React.FC<any> = ({ item }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const url = useLocation();
  const handleClickOpen = () => {
    setOpen(!open);
  };
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate(`/sanpham/${item.pathName}`);
    dispatch(passCateID(item.id));
  };
  const handleClickItem = (id: string, search: string) => {
    navigate(
      url.pathname === '/sanpham'
        ? `${item.pathName}/${search}`
        : `/sanpham/${item.pathName}/${search}`
    );
    dispatch(passCateID(id));
  };

  return (
    <Box key={item.id}>
      <MenuItem onClick={item.children ? handleClickOpen : handleClick} sx={{ width: '100%' }}>
        <ListItemText
          primary={item.name}
          sx={{
            '& .MuiTypography-root': { fontSize: '14px', fontWeight: 700 },
          }}
        />
        {item.children && open ? (
          <ExpandLess fontSize="small" />
        ) : item.children ? (
          <ExpandMore fontSize="small" />
        ) : null}
      </MenuItem>

      <Collapse in={!open}>
        {item.children && (
          <MenuList sx={{ padding: '0px 0px 0px 12px' }}>
            {item.children.map((ele: any) => (
              <MenuItem key={ele.id} onClick={() => handleClickItem(ele.id, ele.pathName)}>
                <ListItemText
                  sx={{
                    '& .MuiTypography-root': { fontSize: '13px', fontWeight: 500 },
                  }}
                  primary={<Typography color="text.secondary"> {ele.name}</Typography>}
                />
                {ele.children && open ? (
                  <ExpandLess fontSize="small" />
                ) : ele.children ? (
                  <ExpandMore fontSize="small" />
                ) : null}
              </MenuItem>
            ))}
          </MenuList>
        )}
      </Collapse>
    </Box>
  );
};

export default Submenu;
