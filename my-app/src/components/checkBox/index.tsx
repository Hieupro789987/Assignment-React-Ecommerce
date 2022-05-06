import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Stack,
  Box,
  Collapse,
} from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const CheckBoxs: FC<any> = ({ data, title, func }) => {
  const [checked, setChecked] = useState<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (!func) return;

    let list = [...checked];
    if (event.target.checked) {
      list = [...checked, event.target.value];
    } else {
      list.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(list);
    func(list);
  };

  const handeClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box  sx={{ display: { xs: 'none', md: 'inline' } }}>
        <FormGroup>
          <Typography variant="caption" fontSize={14} fontWeight={700} gutterBottom>
            {title}
          </Typography>
          {data &&
            data.map((item: any) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    value={item.id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleClick(e)}
                    size="small"
                  />
                }
                label={item.name}
              />
            ))}
        </FormGroup>
      </Box>
      <Box sx={{ display: { xs: 'inline', md: 'none' } }}>
        <FormGroup>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            onClick={handeClickOpen}
          >
            <Typography variant="caption" fontSize={14} fontWeight={700} gutterBottom>
              {title}
            </Typography>
            <Box>{!open ? <ExpandLess /> : <ExpandMore />}</Box>
          </Stack>

          <Collapse in={open} timeout="auto" unmountOnExit>
            {data &&
              data.map((item: any) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      value={item.id}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleClick(e)}
                      size="small"
                    />
                  }
                  label={item.name}
                />
              ))}
          </Collapse>
        </FormGroup>
      </Box>
    </>
  );
};

export default CheckBoxs;
