import React, { createContext,  useContext } from 'react';
import { Orders } from '../interface/order';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from './Cartcontext';

interface Checkoutcontexttype {
    checkout : (data :Orders) => void;
}

const checkoutcontext = createContext<Checkoutcontexttype | undefined>(undefined);

export const Checkoutcontexprovider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { clearCart } = useShoppingCart();
   const checkout = async(formcheckout : Orders) => {
    try {
        const {data} = await axios.post('http://localhost:3000/Orders',formcheckout)
        if(data) {
            clearCart();
            alert("Thanh toán thành công")
            navigate('')
        }
    } catch (error) {
        console.log(error);
    }   
   }
    return (
        <checkoutcontext.Provider value={{ checkout}}>
            {children}
        </checkoutcontext.Provider>
    );
};
export const usecheckout = () => {
    const context = useContext(checkoutcontext);
    if (context === undefined) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};
