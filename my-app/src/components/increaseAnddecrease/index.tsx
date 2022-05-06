import { Stack, IconButton, OutlinedInput } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

const ButtonInAndDe: React.FC<any> = ({ count = 1, func }) => {
  const [value, setValue] = React.useState<number>(count);

  const handleClick = (type: string) => {
    if (type === 'de') {
      if (value > 1) {
        setValue((state) => {
          func(state - 1);
          return state - 1;
        });
      }
    } else {
      setValue((state) => {
        func(state + 1);
        return state + 1;
      });
    }
  };
  return (
    <Stack direction="row" spacing={1}>
      <IconButton onClick={() => handleClick('de')}>
        <RemoveIcon />
      </IconButton>
      <OutlinedInput
        type="text"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        sx={{
          width: '45px',
          '& .MuiOutlinedInput-input': {
            padding: '5px',
            textAlign: 'center',
          },
        }}
      />
      <IconButton onClick={() => handleClick('in')}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
};

export default ButtonInAndDe;
