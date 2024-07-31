import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/product_context";
import { Iproduct } from "../interface/product";
import { useSearchContext } from "../context/search_context";


const ProductItem = () => {
    const { categories } = useProductContext();
    const { filteredProducts } = useSearchContext();
    const limitedProducts = filteredProducts.slice(0, 5);
    const getCategoryName = (categoryId: string) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : 'không có';
    };
    return (
        <>
            <div className="container">
                <h2 className="text-[#505F4E] font-bold text-[30px] tracking-[1.05px] capitalize">
                    Best Sellers
                </h2>
            </div>
            <div className="bg-white">
                <div className="container">
                    <div className="flex flex-wrap gap-4">
                        {limitedProducts.map((product: Iproduct) => (
                            <div key={product.id} className="flex flex-col items-center">
                                    <img
                                        className="object-cover w-[165px] h-[220px]" 
                                        src={product.image}
                                        alt={product.name}
                                    />
                                    <Link
                                    to={`product/detail/${product.id}`}
                                    className="mt-4 text-[16px] text-[#665345] font-semibold leading-[20px]"
                                >
                                    {product.name}
                                </Link>

                                <div className="mt-2 flex items-center justify-between w-full px-2">
                                    <span className="text-[#777] text-[12px] capitalize">
                                        {getCategoryName(product.category)}
                                    </span>
                                    <span className="text-[#665345] text-[14px] font-semibold capitalize">
                                        ${product.price}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </>
    );
};

export default ProductItem;
