import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../../context/Cartcontext';

type Props = {
  children: React.ReactNode;
};

const Cart_PrivateRouter = ({ children }: Props) => {
  const navigate = useNavigate();
  const { cartItems } = useShoppingCart();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
      alert("Giỏ hàng trống");
    }
  }, [cartItems, navigate]);

  if (cartItems.length > 0) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default Cart_PrivateRouter;
