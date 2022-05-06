import { Box, Typography, Stack, MenuItem, Button, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import getLocationVn from 'queries/locationVN';
import { useAppDispatch } from 'stores/hooks';
import { editInfomationTmp } from 'stores/reducers/auth';
import { openFormAuth } from 'stores/reducers/actionReducer';


const EditInformation: React.FC<any> = ({ user, func }) => {
  const [location, setLocation] = React.useState<any>({
    citys: [],
    districts: [],
    wards: [],
  });
  const [address, setAddress] = React.useState<any>({
    username: '',
    phoneNumber: '',
    addressGive: '',
    ward: '',
    district: '',
    city: '',
  });

  const dispatch = useAppDispatch();

  const handleClickList = (name: string, value: any) => {
    if (name === 'districts') {
      setLocation({
        ...location,
        [name]: value,
      });
    }
    if (name === 'wards') {
      setLocation({
        ...location,
        [name]: value,
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log(name, value);

    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleClickSave = () => {
    if (
      address.username &&
      address.phoneNumber &&
      address.addressGive &&
      address.ward &&
      address.district &&
      address.city
    ) {
      dispatch(
        editInfomationTmp({
          username: address.username,
          phoneNumber: address.phoneNumber,
          address: `${address.addressGive},${address.ward},${address.district},${address.city}`,
        })
      );

      dispatch(openFormAuth({type:'edit', value: false}))
    }
  };

  React.useEffect(() => {
    getLocationVn().then((res: any) => {
      setLocation({
        citys: res,
        districts: [],
        wards: [],
      });
    });
    setAddress({
        username: user.username,
        phoneNumber: user.phoneNumber,
        addressGive: '',
        ward: '',
        district: '',
        city: '',
    })
  }, [user.phoneNumber, user.username]);

  return (
    <Box sx={{ width: {xs:'350px', md:'500px'} }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Thay đổi thông tin
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mb={2}>
        <Typography variant="h5" gutterBottom sx={{display:{xs:'none',md:'inline'}}}>
          Họ tên
        </Typography>
        <TextField
          label="Vui lòng nhập họ tên"
          value={address.username}
          onChange={handleChange}
          size="small"
          sx={{ width: {xs: '100%', md:"70%"} }}
          name="username"
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mb={2}>
        <Typography variant="h5" gutterBottom sx={{display:{xs:'none',md:'inline'}}}>
          Số điện thoại
        </Typography>
        <TextField
          label="Vui lòng nhập số điện thoại"
          value={address.phoneNumber}
          onChange={handleChange}
          size="small"
          sx={{ width: {xs: '100%', md:"70%"} }}

          name="phoneNumber"
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mb={2}>
        <Typography variant="h5" gutterBottom sx={{display:{xs:'none',md:'inline'}}}>
          Địa chỉ nhận hàng
        </Typography>

        <TextField
          label="Vui lòng nhập địa chỉ nhận hàng"
          value={address.addressGive}
          onChange={handleChange}
          size="small"
          sx={{ width: {xs: '100%', md:"70%"} }}

          name="addressGive"
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mb={2}>
        <Typography variant="h5" gutterBottom sx={{display:{xs:'none',md:'inline'}}}>
          Thành phố
        </Typography>
        <TextField
          select
          value={address.city}
          onChange={handleChange}
          size="small"
          sx={{ width: {xs: '100%', md:"70%"} }}

          name="city"
          label="Vui lòng chọn thành phố"
        >
          {location.citys.map((item: any) => (
            <MenuItem
              value={item.name}
              key={item.code}
              onClick={() => {
                handleClickList('districts', item.districts);
              }}
            >
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mb={2}>
        <Typography variant="h5" gutterBottom sx={{display:{xs:'none',md:'inline'}}}>
          Quận/huyện
        </Typography>

        <TextField
          select
          label="Vui lòng chọn quận/huyện"
          value={address.district}
          onChange={handleChange}
          size="small"
          sx={{ width: {xs: '100%', md:"70%"} }}
          name="district"
        >
          {location.districts.map((item: any) => (
            <MenuItem
              value={item.name}
              key={item.code}
              onClick={() => {
                handleClickList('wards', item.wards);
              }}
            >
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography variant="h5" gutterBottom sx={{display:{xs:'none',md:'inline'}}}>
          Phường/Xã
        </Typography>

        <TextField
          select
          label="Vui lòng chọn tỉnh/xã"
          value={address.ward}
          onChange={handleChange}
          size="small"
          sx={{ width: {xs: '100%', md:"70%"} }}
          name="ward"
        >
          {location.wards.map((item: any) => (
            <MenuItem value={item.name} key={item.code}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Button
        sx={{
          width: '100%',
          backgroundColor: '#D23F57',
          color: '#ffffff',
          mt: 3,
          boxShadow: 'rgb(43 52 69 / 10%) 0px 4px 16px',
          ':hover': {
            color: '#000000',
          },
        }}
        onClick={handleClickSave}
      >
        Lưu thông tin
      </Button>
    </Box>
  );
};

export default EditInformation;
