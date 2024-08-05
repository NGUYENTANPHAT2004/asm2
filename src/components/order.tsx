import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";

interface OrderSummaryItemProps {
  subtotal: number;
  shipping: number;
  total: number;
}

const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({
  subtotal = 0,
  shipping = 0,
  total = 0
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Order Summary</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">Subtotal: €{subtotal.toFixed(2)}</Typography>
        <Typography variant="body1">Shipping: €{shipping.toFixed(2)}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Total: €{total.toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryItem;
