import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box } from '@mui/material';

export const StarData = [
  {
    id: 1,
    name: (
      <Box sx={{ display: 'flex', alignItem: 'center', mr: 1 }}>
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
      </Box>
    ),
  },
  {
    id: 2,
    name: (
      <Box sx={{ display: 'flex', alignItem: 'center', mr: 1 }}>
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarOutlineIcon fontSize="small" sx={{color:'#DEDEDE'}}/>
      </Box>
    ),
  },
  {
    id: 3,
    name: (
      <Box sx={{ display: 'flex', alignItem: 'center', mr: 1 }}>
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarOutlineIcon fontSize="small" sx={{color:'#DEDEDE'}}/>
        <StarOutlineIcon fontSize="small" sx={{color:'#DEDEDE'}}/>
      </Box>
    ),
  },
  {
    id: 4,
    name: (
      <Box sx={{ display: 'flex', alignItem: 'center', mr: 1 }}>
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarOutlineIcon fontSize="small" sx={{color:'#DEDEDE'}}/>
        <StarOutlineIcon fontSize="small" sx={{color:'#DEDEDE'}}/>
        <StarOutlineIcon fontSize="small" sx={{color:'#DEDEDE'}}/>
      </Box>
    ),
  },
  {
    id: 5,
    name: (
      <Box sx={{ display: 'flex', alignItem: 'center', mr: 1 }}>
        <StarIcon sx={{ color: '#FAAF00' }} fontSize="small" />
        <StarOutlineIcon fontSize="small" sx={{color:'#DEDEDE'}}/>
        <StarOutlineIcon fontSize="small" sx={{color:'#DEDEDE'}}/>
        <StarOutlineIcon fontSize="small" sx={{color:'#DEDEDE'}}/>
        <StarOutlineIcon fontSize="small" sx={{color:'#DEDEDE'}}/>
      </Box>
    ),
  },
];
