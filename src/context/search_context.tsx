import React, { createContext, useState, useContext, useMemo } from 'react';
import { Iproduct } from '../interface/product';
import { useProductContext } from './product_context';

interface SearchContextType {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    filteredProducts: Iproduct[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchText, setSearchText] = useState<string>('');
    const { products } = useProductContext();

    const filteredProducts = useMemo(() => {
        return products.filter(product => 
            product.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText, products]);

    return (
        <SearchContext.Provider value={{ searchText, setSearchText, filteredProducts }}>
            {children}
        </SearchContext.Provider>
    );
};
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};
