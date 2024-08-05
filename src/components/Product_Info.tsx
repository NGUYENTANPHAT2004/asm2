import React from "react";

const Product_Info = () => {
    return (
        <>
            <div className="container mt-[120px]">
                <div>
                    <h3 className="text-[#4E7C32] text-[30px] font-medium">
                    Về Cửa Hàng Chúng Tôi
                    </h3>
                    <p className="mt-4 text-[#665345] text-[20px] font-light w-[852px]">
                    Chào mừng đến với cửa hàng của chúng tôi, nơi mang đến những sản phẩm chất lượng cao và dịch vụ tuyệt vời nhất cho bạn!
                    </p>
                </div>
                <div className="mt-[30px]">
                    <h3 className="text-[#4E7C32] text-[30px] font-medium">
                    Sứ Mệnh Của Chúng Tôi
                    </h3>
                    <p className="mt-4 text-[#665345] text-[20px] font-light w-[852px]">
                    Chúng tôi luôn cố gắng mang đến những sản phẩm tốt nhất với giá cả phải chăng, đồng thời tạo nên một trải nghiệm mua sắm thú vị và tiện lợi cho khách hàng. Với đội ngũ nhân viên thân thiện và nhiệt tình, chúng tôi sẵn sàng hỗ trợ bạn trong mọi khía cạnh của việc mua sắm, từ lựa chọn sản phẩm đến dịch vụ sau bán hàng
                    </p>
                </div>
                <div className="mt-[80px] max-w-[800px] flex justify-end">
                    <a
                        href="#!"
                        className="hover:underline  text-white text-[15px] bg-[#4E7C32] rounded-[99px] py-[6px] px-[16px] "
                    >
                        Write reviews
                    </a>
                </div>
            </div>
        </>
    );
};

export default Product_Info;
