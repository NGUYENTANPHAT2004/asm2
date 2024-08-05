import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { useShoppingCart } from '../../context/Cartcontext';
import { formatCurrency } from '../../format/format';

const ProductList: React.FC = () => {
  const { cartItems } = useShoppingCart();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Sản phẩm
      </Typography>
      <List>
        {cartItems.map((cart) => (
          <ListItem key={cart.name} sx={{ py: 1 }}>
            <ListItemText
              primary={cart.name}
              secondary={`Số lượng: ${cart.quantity}`}
            />
            <Typography variant="body1" fontWeight="medium">
              {formatCurrency(cart.price)}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProductList;
