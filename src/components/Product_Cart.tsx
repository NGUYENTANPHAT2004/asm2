import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Iproduct } from "../interface/product";
import { useShoppingCart } from "../context/Cartcontext";
import { formatCurrency } from "../format/format";

const Product_Cart = () => {
    const { id } = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState<number>(1);
    const [product_detail, setProductsdetail] = useState<Iproduct>({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/products/${id}`);
                setProductsdetail(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const {addCartItem} = useShoppingCart()
    const increaseQuantity = () => {
        setQuantity(quantity+1);
      };
    
      const decreaseQuantity = () => {
        setQuantity(quantity-1);
      };
      if(quantity <= 0){
        setQuantity(1)
      }
      const handleAddToCart = (product:Iproduct) => {
        addCartItem(product, quantity);
      };
    return (
        <>
            <div className="container mt-[100px]">
                <div className="flex items-center justify-between">
                    <div className="group-images">
                        <div>
                            <img
                                src={product_detail.image}
                                alt=""
                                className="max-w-[355px] max-h-[355px] rounded-lg border-2 border-gray-300 shadow-md"
                            />

                        </div>
                        <div className="mt-[60px] flex items-center justify-center gap-4 ">
                            <img
                                src={product_detail.image}
                                alt=""
                                className="rounded-[10px] img-preview--current img-preview border-solid  "
                            />
                            <img
                                src={product_detail.image}
                                alt=""
                                className="rounded-[10px] img-preview "
                            />
                            <img
                                src={product_detail.image}
                                alt=""
                                className="rounded-[10px] img-preview "
                            />
                        </div>
                    </div>

                    <div className="info">
                        <h1 className="text-[#1D2025] text-[44px] font-bold leading-[48px] w-[490px] mt-5 mb-6">
                             {product_detail.name}
                        </h1>
                        <p className="w-[500px] text-[#68707D] text-[16px] font-medium leading-[28px]">
                           {product_detail.desc}
                        </p>
                        <div className="mt-8 flex gap-3 mb-3">
                            <p className="text-[#1D2025] text-[30px] font-bold leading-[26px]">
                                {formatCurrency(product_detail.price)}
                            </p>
                            <span className=" px-2 bg-[#FFEDE0] rounded-md text-[#505F4E] font-bold leading-[26px] text-[16px]">
                                50%
                            </span>
                        </div>
                        <span className=" text-[#1D2025] text-[16px] font-semibold leading-[26px] tracking-[0.48px] line-through">
                        {formatCurrency(product_detail.price+50)}
                        </span>
                        <div className="mt-[20px] flex gap-[15px]">
                            <div className="flex w-[180px] px-[10px] py-4 items-center justify-between rounded-[10px] bg-[#F7F8FD] ">
                            <button className="border-none outline-0 bg-transparent" onClick={decreaseQuantity}>
              <img src="/assets/svg/minus.svg" alt="Decrease" />
             </button>
        <span>{quantity}</span>
        <button className="border-none outline-0 bg-transparent" onClick={increaseQuantity}>
          <img src="/assets/svg/plus.svg" alt="Increase" />
        </button>
                            </div>
                            <div>
                                <button onClick={
                                    () =>{
                                        handleAddToCart(product_detail)
                                    }}  className="font-bold text-[16px] text-white w-[273px] justify-center p-[17px] flex items-center gap-[10px] bg-[#4E7C32] rounded-[10px]">
                                    <img
                                        src="/assets/svg/icon_cart.svg"
                                        alt=""
                                    />
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product_Cart;
