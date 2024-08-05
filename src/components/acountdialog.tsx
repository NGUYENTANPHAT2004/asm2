import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
type prop = {
    open: boolean;
    onClose: () => void;
}
const AccountDialog = ({ open, onClose } :prop) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
        onClose();
    };

    const handleRegister = () => {
        navigate('/register');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Tùy chọn</DialogTitle>
            <DialogContent>
                <Button
                    onClick={handleLogin}
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '8px' }}
                >
                    Đăng nhập
                </Button>
                <Button
                    onClick={handleRegister}
                    fullWidth
                    variant="outlined"
                >
                    Đăng ký
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AccountDialog;
