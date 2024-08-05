import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const PaymentForm: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Paypal
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        label="Tên trên thẻ"
        margin="normal"
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Số thẻ"
        margin="normal"
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Ngày hết hạn"
        margin="normal"
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Mã CVV"
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Thanh toán
      </Button>
    </Box>
  );
};

export default PaymentForm;
