import React, { useState } from 'react';
import { Grid, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductList from './checkoutproduct';
import TotalPrice from './total';
import PaymentForm from './Paymentform';
import UserInfoForm from './userinfo';

const theme = createTheme();

export default function CheckoutPage() {
  const [shippingCost, setShippingCost] = useState<number>(0);

  const handleShippingMethodChange = (method: string, cost: number) => {
    setShippingCost(cost);
  };
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="lg">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {/* Các cột chính */}
        <Grid item xs={12} container spacing={3}>
          {/* Cột 1: Nhập thông tin người dùng */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <UserInfoForm  onShippingMethodChange={handleShippingMethodChange}  />
            </Box>
          </Grid>

          {/* Cột 2: Chọn phương thức thanh toán */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <PaymentForm />
            </Box>
          </Grid>

          {/* Cột 3: Sản phẩm và tổng tiền */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <ProductList />
              <TotalPrice shippingCost={shippingCost} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </ThemeProvider>
  );
}
