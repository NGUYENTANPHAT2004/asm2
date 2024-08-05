import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatCurrency } from '../format/format';
import { Link } from 'react-router-dom';
type Props = {
    open: boolean;
    onClose: () => void;
    cartItems: CartItemProps[];
    increaseCartQuantity: (id: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    total: number;
};
type CartItemProps = {
    id: string;
    name: string
    price: number
    quantity: number
    image: string
}

const CartDialog: React.FC<Props> = ({ open, onClose, cartItems, increaseCartQuantity, decreaseCartQuantity, removeFromCart, total }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" PaperProps={{ sx: { mt: 2 } }}>
            <DialogTitle>Gio hang cua bạn</DialogTitle>
            <DialogContent sx={{ maxHeight: 300, overflow: 'auto', backgroundColor: '#F5F5F5' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
                    {cartItems.map(it => (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                            <img
                                src={it.image}
                                alt="Placeholder item"
                                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">{it.name}</Typography>
                                <Typography>{formatCurrency(it.price)}</Typography>
                                <Typography>Thành tiền: {formatCurrency(it.price * it.quantity)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button onClick={() => {
                                    decreaseCartQuantity(it.id);
                                }}
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#ccc',
                                        color: 'white',
                                        '&:hover': { backgroundColor: '#E0E0E0' }
                                    }}>-</Button>
                                <Typography>{it.quantity}</Typography>
                                <Button onClick={
                                    () => {
                                        increaseCartQuantity(it.id)
                                    }
                                }
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#ccc',
                                        color: 'white',
                                        '&:hover': { backgroundColor: '#E0E0E0' }
                                    }} >+</Button>
                                <IconButton onClick={() => {
                                    removeFromCart(it.id)
                                }} edge="end" aria-label="delete" sx={{ color: 'red' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                    <Typography>Tổng Tiền :{formatCurrency(total)}</Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#E0E0E0' }}>
                <Button onClick={onClose} sx={{ backgroundColor: '#007BFF', color: 'white' }}>
                    Đóng
                </Button>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{ backgroundColor: '#28A745', color: 'white' }}
                    component={Link}
                    to="/checkout"
                >
                    Thanh Toán
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CartDialog;

