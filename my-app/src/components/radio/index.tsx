import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Collapse,
  Stack,
} from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';

interface IData {
  id: number;
  value: any;
  label: string;
}
type TProps = {
  title: string | null;
  data: IData[];
  func(val: any): any;
};

const RadioComp: FC<TProps> = ({ title, data, func, ...rest }) => {
  const [value, setValue] = useState<any>('');
  const [open, setOpen] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (!func) return;

    func(val);
  };
  const handeClickOpen = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <FormControl sx={{ display: { xs: 'none', md: 'flex' } }}>
        <FormLabel id="demo-radio-buttons-group-label">
          <Typography variant="caption" fontSize={14} fontWeight={700} gutterBottom>
            {title}
          </Typography>
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {data.length > 0 &&
            data.map((item: IData) => (
              <FormControlLabel
                key={item.id}
                value={String(item.value)}
                control={<Radio />}
                label={item.label}
              />
            ))}
        </RadioGroup>
      </FormControl>
      <FormControl sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          onClick={handeClickOpen}
        >
          <FormLabel id="demo-radio-buttons-group-label" sx={{ width: '100%' }}>
            <Typography variant="caption" fontSize={14} fontWeight={700} gutterBottom>
              {title}
            </Typography>
          </FormLabel>
          <Box>{!open ? <ExpandLess /> : <ExpandMore />}</Box>
        </Stack>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {data.length > 0 &&
              data.map((item: IData) => (
                <FormControlLabel
                  key={item.id}
                  value={String(item.value)}
                  control={<Radio />}
                  label={item.label}
                />
              ))}
          </RadioGroup>
        </Collapse>
      </FormControl>
    </Box>
  );
};

export default RadioComp;
