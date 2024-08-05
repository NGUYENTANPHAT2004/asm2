import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { cart_pro } from "../interface/product";

type ShoppingCartProviderProps = {
    children: ReactNode;
};

type ShoppingCartContextType = {
    addCartItem: (product: cart_pro,quantity:number) => void;
    increaseCartQuantity: (id: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    cartQuantity: number;
    totalPrice: number;
    cartItems: CartItem[];
    clearCart: () => void;
    removeProductFromCart(id: string) : void;
};

type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const jsonCartData = localStorage.getItem('shopping_cart');
        return jsonCartData ? JSON.parse(jsonCartData) : [];
    });

    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
   

    
    function addCartItem(product: cart_pro, quantity: number) {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            const updatedItems = cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
            setCartItems(updatedItems);
        } else {
            const newItem = { ...product, quantity: quantity };
            setCartItems([...cartItems, newItem]);
        }
    }
    
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    function increaseCartQuantity(id: string) {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedItems);
    }

    function decreaseCartQuantity(id: string) {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            if (item.quantity === 1) {
                removeFromCart(id);
            } else {
                const updatedItems = cartItems.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
                setCartItems(updatedItems);
            }
        }
    }
    function removeProductFromCart(id: string) {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
    }
    function removeFromCart(id: string) {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
    }

    const clearCart = () => {
            setCartItems([]);
    };

    return (
        <ShoppingCartContext.Provider value={{ 
            addCartItem, 
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart, 
            cartItems, 
            totalPrice, 
            cartQuantity, 
            clearCart,
            removeProductFromCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
