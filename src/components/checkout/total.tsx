import React from 'react';
import { Typography, Box } from '@mui/material';
import { useShoppingCart } from '../../context/Cartcontext';
import { formatCurrency } from '../../format/format';

interface TotalPriceProps {
  shippingCost: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ shippingCost }) => {
  const { totalPrice } = useShoppingCart();
  const finalTotalPrice = totalPrice + shippingCost;

  return (
    <Box sx={{ padding: 3, borderRadius: 1 }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Tổng tiền
      </Typography>
      <Typography variant="h4" gutterBottom>
        {formatCurrency(finalTotalPrice)}
      </Typography>
    </Box>
  );
};

export default TotalPrice;
