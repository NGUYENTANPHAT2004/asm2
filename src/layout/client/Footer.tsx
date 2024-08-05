import React from "react";
import FeedBack from "../../components/FeedBack";
import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
    return (
        <>
            <footer className=" relative z-10 bg-[#053D29]">
                {/* <img
                    className="absolute right-0 bottom-0"
                    src="/assets/svg/bg_footer.svg"
                    alt=""
                /> */}
                <div className="flex relative z-20 container gap-[30px] justify-between items-center pt-[30px] pb-[70px]">
                    <div>
                        <p className="text-[#F9F3EE] text-[14px] capitalize w-[350px] mb-[30px]">
                        Chúng tôi cung cấp những sản phẩm chất lượng cao và dịch vụ tận tâm, cam kết mang lại sự hài lòng tối đa cho khách hàng
                        </p>
                        <div className="flex items-center gap-6">
                            <img
                                className="w-4 h-4 cursor-pointer object-cover"
                                src="/assets/svg/fb.svg"
                                alt=""
                            />
                            <img
                                className="w-4 h-4 cursor-pointer object-cover"
                                src="/assets/svg/tw.svg"
                                alt=""
                            />
                            <img
                                className="w-4 h-4 cursor-pointer object-cover"
                                src="/assets/svg/linkin.svg"
                                alt=""
                            />
                            <img
                                className="w-5 h-5 cursor-pointer mt-1 object-cover"
                                src="/assets/svg/yt.svg"
                                alt=""
                            />
                            <img
                                className="w-5 h-5 cursor-pointer mt-1 object-cover"
                                src="/assets/svg/ins.svg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-5 text-[#F9F3EE] font-medium text-[16px]">
                            Về
                        </h3>
                        <ul>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}> Liên hệ với chúng tôi</Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}>Về chúng tôi
                                </Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}>Nghề nghiệp</Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] hover:underline leading-5 capitalize">
                                {" "}
                                <Link to={"#!"}>
                                    Thông tin công ty{" "}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-5 text-[#F9F3EE] font-medium text-[16px]">
                            Trợ giúp
                        </h3>
                        <ul>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}>Các nhà sản xuất của chúng tôi</Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}>Vận chuyển</Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}>Hủy bỏ & Trả hàng
                                </Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}>Báo cáo vi phạm</Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] hover:underline leading-5 capitalize">
                                {" "}
                                <Link to={"#!"}>
                                    Chính sách{" "}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-5 text-[#F9F3EE] font-medium text-[16px]">
                            Politik
                        </h3>
                        <ul>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}>Chính sách hoàn trả</Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}>Điều Khoản</Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}>An ninh</Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] mb-4 hover:underline leading-5 capitalize">
                                <Link to={"#!"}>Quyền Riêng tư </Link>
                            </li>
                            <li className="text-[#F9F3EE] text-[14px] hover:underline leading-5 capitalize">
                                {" "}
                                <Link to={"#!"}>Mục lục trang





                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-[#062F21] ">
                    <div className="container flex items-end justify-between">
                        <p className="text-white text-[16px]">
                            © 2023 hood.de , Inc.
                        </p>
                        <img
                            className="cursor-pointer"
                            src="/assets/img/icons_payment.png"
                            alt=""
                        />
                        <div className="flex items-center justify-center gap-[12px]">
                            <a
                                href="#"
                                className="text-white text-[16px] font-semibold"
                            >
                                Scroll to top
                            </a>
                            <img
                                className="h-[16px] w-[16px]"
                                src="/assets/svg/arrow_top.svg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
