import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Iproduct } from '../interface/product';
import { Category } from '../interface/category';

interface ProductContextType {
    products: Iproduct[];
    categories: Category[];
    setProducts: React.Dispatch<React.SetStateAction<Iproduct[]>>;
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    getcategoryby_id : (id:string) => void;
    pro_catid : Iproduct[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProductProvider: React.FC = ({ children } :any) => {
    const [products, setProducts] = useState<Iproduct[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [pro_catid, setpro_catid] = useState<Iproduct[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    axios.get('http://localhost:3000/products'),
                    axios.get('http://localhost:3000/categories'),
                ]);
                setProducts(productsResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const getcategoryby_id=async(id:string)=>{
        try {
            const {data} = await axios.get(`http://localhost:3000/products?category=${id}`)
            setpro_catid(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <ProductContext.Provider value={{ products, categories, setProducts, setCategories,getcategoryby_id,pro_catid }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};
