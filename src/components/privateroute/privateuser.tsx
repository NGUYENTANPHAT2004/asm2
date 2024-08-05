import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const User_PrivateRouter = ({ children }: Props) => {
  const navigate = useNavigate();
  const checkUser = localStorage.getItem('user');

  useEffect(() => {
    if (!checkUser) {
      alert("Bạn không có đủ quyền truy cập");
      navigate('/');
    }
  }, [checkUser, navigate]);

  if (checkUser) {
    return <>{children}</>;
  }

  return null; 
};

export default User_PrivateRouter;
