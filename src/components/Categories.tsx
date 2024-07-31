import React from "react";
import { useProductContext } from "../context/product_context";

type Props = {};

function Categories({}: Props) {
   const {categories,products} = useProductContext()
    return (
        <>
            <div className="container mt-20">
                <h2 className="text-[#505F4E] font-bold text-[30px] tracking-[1.05px] capitalize">
                    Kategorien
                </h2>
            </div>
            <div className="separate h-[2px] bg-[#0000001a]"></div>
            <div className="container">
                <div className="cate grid grid-cols-4 gap-x-[20px] gap-y-[12px]">
                    {categories.map(cate=>(
                        <div className="item opacity-65 hover:opacity-100 cursor-pointer relative rounded ">
                        <img
                            src={cate.image}
                            alt={cate.name}
                            className="object-cover w-[300px] h-[374px] "
                        />
                        <div className="body absolute right-[15px] top-[20px]">
                            <h3 className="text-white text-[18px] font-semibold leading-[20px]">
                                {cate.name}
                            </h3>
                            <span className="text-white font-semibold text-[14px] leading-[16px] tracking-[0.3px]">
                                30 items
                            </span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Categories;
