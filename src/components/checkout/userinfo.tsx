import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import ProvinceList from '../apivn';
import { UserContext } from '../UserContext'; // Giả sử rằng bạn có UserContext để quản lý thông tin người dùng
import { useUserContext } from '../../context/user_context';
import { useShoppingCart } from '../../context/Cartcontext';
import { usecheckout } from '../../context/Checkoutcontext';
import { OrderItem } from '../../interface/order';

interface FormValues {
  items: OrderItem[];
  name: string;
  address: string;
  birthDate: string;
  phone: string;
  email: string;
  shippingMethod: string;
  userid : string;
  totalprice: number;
}

interface UserInfoFormProps {
  onShippingMethodChange: (method: string, cost: number) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onShippingMethodChange }) => {
  const { register, handleSubmit, control, formState: { errors },setValue } = useForm<FormValues>();
  const [shippingCost, setShippingCost] = useState<number>(0);
  const {Get_User} =   useUserContext() 
  const {checkout} =usecheckout();
  const user = Get_User();
useEffect(() => {
  if (user) {
    setValue('name', user.user.name);
    setValue('phone', user.user.phone);
    setValue('email', user.user.email);
    setValue('userid', user.user.id);
  }
}, [user, setValue]);
const {totalPrice,cartItems} = useShoppingCart()

useEffect(() => {
  setValue('items', cartItems);
}, [cartItems, setValue]);
  
  const handleShippingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedMethod = event.target.value as string;
    let cost = 0;

    switch (selectedMethod) {
      case 'standard':
        cost = 20;
        break;
      case 'express':
        cost = 30;
        break;
      case 'overnight':
        cost = 40;
        break;
      default:
        cost = 0;
    }

    setShippingCost(cost);
    const finalTotalPrice = totalPrice + cost;
    setValue('totalprice', finalTotalPrice);
    onShippingMethodChange(selectedMethod, cost);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    checkout(data);
  };
  return (
    <Box sx={{ padding: 3, borderRadius: 1 }}>
    <Typography variant="h6" gutterBottom>
        Thông tin cá nhân
      </Typography> 
        <Typography variant="h6" gutterBottom>
        Nhập thông tin cá nhân
      </Typography>
     
      <form onSubmit={handleSubmit(onSubmit)}>
        {!user ? (
          <>
            <TextField
              variant="outlined"
              fullWidth
              label="Tên"
              margin="normal"
              {...register('name', { required: 'Tên là bắt buộc' })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Số điện thoại"
              margin="normal"
              {...register('phone', { required: 'Số điện thoại là bắt buộc' })}
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : ''}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              {...register('email', { 
                required: 'Email là bắt buộc',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Email không hợp lệ'
                }
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
          </>
        ) : (
          <Box>
            <Typography>Tên: {user.user.name}</Typography>
            <Typography>Số điện thoại: {user.user.phone}</Typography>
            <Typography>Email: {user.user.email}</Typography>
          </Box>
        )}
        <TextField
          variant="outlined"
          fullWidth
          label="Địa chỉ"
          margin="normal"
          {...register('address', { required: 'Địa chỉ là bắt buộc' })}
          error={!!errors.address}
          helperText={errors.address ? errors.address.message : ''}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Ngày sinh"
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register('birthDate', { required: 'Ngày sinh là bắt buộc' })}
          error={!!errors.birthDate}
          helperText={errors.birthDate ? errors.birthDate.message : ''}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="shipping-method-label">Phương thức vận chuyển</InputLabel>
          <Controller
            name="shippingMethod"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="shipping-method-label"
                onChange={(event) => {
                  field.onChange(event);
                  handleShippingChange(event);
                }}
              >
                <MenuItem value="standard">Giao hàng tiêu chuẩn (20$)</MenuItem>
                <MenuItem value="express">Giao hàng nhanh (30$)</MenuItem>
                <MenuItem value="overnight">Giao hàng qua đêm (40$)</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Gửi
        </Button>
      </form>
    </Box>
  );
};

export default UserInfoForm;
