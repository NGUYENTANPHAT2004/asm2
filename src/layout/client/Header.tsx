import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSearchContext } from "../../context/search_context";
import { useUserContext } from "../../context/user_context";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AccountDialog from "../../components/acountdialog";
import CartDialog from "../../components/cartdialog";
import { useShoppingCart } from "../../context/Cartcontext";

type Props = {};


const Header = (props: Props) => {
    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart,cartItems,cartQuantity,totalPrice } = useShoppingCart()
    const { setSearchText } = useSearchContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openacount, setopenacount] = useState(false);
    const [cartopen, setcartOpen] = useState(false);
    const { Get_User, Logout } = useUserContext();

    useEffect(() => {
        setUser(Get_User());
    }, [Get_User]);

    const handleSearch = (data: string) => {
        setSearchText(data);
    };

    const handleLogout = () => {
        Logout();
        setUser(null);
        handleCloseDialog();
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleAccountClick = () => {
        setopenacount(true);
    };
    const handlecloseacount = () => {
        setopenacount(false);
    };
    const handlecartOpen = () => setcartOpen(true);
    const handleclosecart = () => setcartOpen(false);
    return (
        <>
            <header className="header_bg h-[150px]">
                <div className="container">
                    {/* Header Top */}
                    <div className="header_top flex items-center justify-between px-4">
                        {/* SEARCH */}
                        <div className="flex items-center justify-between px-4 bg-[#E3E3E3] border-[1px] rounded-[3px] w-[525px] h-[42px]">
                            <input
                                className="bg-transparent outline-none border-none w-full text-[16px]"
                                type="text"
                                placeholder="mời nhập sản phẩm tìm kiếm"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <img
                                className="h-5 w-5 cursor-pointer ml-3"
                                src="/assets/svg/search.svg"
                                alt="search"
                            />
                        </div>

                        {/* Language Selector */}
                        <div className="flex items-center">
                            <h3 className="text-[16px] font-medium text-white leading-10 cursor-pointer">
                                Tiếng Việt
                            </h3>
                            <img
                                className="mt-1 cursor-pointer ml-2"
                                src="/assets/svg/arrow_down.svg"
                                alt="language selector"
                            />
                        </div>

                        {/* User and Cart */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {user ? (
                                        <span
                                            onClick={handleOpenDialog}
                                            className="text-[16px] font-medium text-white leading-10 cursor-pointer"
                                        >
                                            Xin chào, {user.user.name}
                                        </span>
                                ) : (
                                    <h3 onClick={handleAccountClick}
                                    className="text-[16px] font-medium text-white leading-10 cursor-pointer">
                                          Tài khoản
                                    </h3>
                                )}
                                <img
                                    className="mt-1 cursor-pointer"
                                    src="/assets/svg/user.svg"
                                    alt="user"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <h3 onClick={handlecartOpen} className="text-[16px] font-medium text-white leading-10 cursor-pointer">
                                    giỏ hàng
                                </h3>
                                <div className="relative inline-block">
  <img
    className="mt-1 cursor-pointer w-8 h-8"
    src="/assets/svg/bag.svg"
    alt="cart"
  />
  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full">
    {cartQuantity}
  </span>
</div>
                            </div>
                        </div>
                    </div>

                    {/* SEPARATE */}
                    <div className="separate h-[1px] bg-[#E3E3E3] my-3"></div>

                    {/* HEADER BOTTOM */}
                    <div className="header_bottom mt-5">
                        <nav>
                            <ul className="flex justify-between">
                                <li>
                                    <NavLink
                                        className="flex gap-[2px] text-white text-[14px] font-semibold leading-5"
                                        to="#!"
                                    >
                                        Trang chủ
                                        <img
                                            className="mt-1 cursor-pointer"
                                            src="/assets/svg/arrow_down.svg"
                                            alt="dropdown"
                                        />
                                    </NavLink>
                                </li>
                                <li className="relative show">
                                    <NavLink
                                        className="flex gap-[2px] text-white text-[14px] font-semibold leading-5"
                                        to="#!"
                                    >
                                        Sản Phẩm
                                        <img
                                            className="mt-1 cursor-pointer"
                                            src="/assets/svg/arrow_down.svg"
                                            alt="dropdown"
                                        />
                                    </NavLink>
                                    <ul className="hidden z-[2] dropdown w-[130px] bg-[#EEE] mt-4 p-4 absolute top-5 left-[-16px]">
                                        <li>
                                            <NavLink
                                                className="text-[#665345] text-[15px] hover:text-[#859a78]"
                                                to="#!"
                                            >
                                                Cửa hàng
                                            </NavLink>
                                        </li>
                                        <li className="mt-4">
                                            <NavLink
                                                className="text-[#665345] text-[15px] hover:text-[#859a78]"
                                                to="#!"
                                            >
                                                Liên Hệ
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex gap-[2px] text-white text-[14px] font-semibold leading-5"
                                        to="#!"
                                    >
                                        Cửa hàng
                                        <img
                                            className="mt-1 cursor-pointer"
                                            src="/assets/svg/arrow_down.svg"
                                            alt="dropdown"
                                        />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex gap-[2px] text-white text-[14px] font-semibold leading-5"
                                        to="#!"
                                    >
                                        Liên Hệ
                                        <img
                                            className="mt-1 cursor-pointer"
                                            src="/assets/svg/arrow_down.svg"
                                            alt="dropdown"
                                        />
                                    </NavLink>
                                </li>
                                <li className="relative show">
                                    <NavLink
                                        className="flex gap-[2px] text-white text-[14px] font-semibold leading-5 pb-8"
                                        to="#!"
                                    >
                                        Chậu và hộp đựng
                                        <img
                                            className="mt-1 cursor-pointer"
                                            src="/assets/svg/arrow_down.svg"
                                            alt="dropdown"
                                        />
                                    </NavLink>
                                    <ul className="hidden z-[2] dropdown w-[130px] bg-[#EEE] mt-4 p-4 absolute top-5 left-[-16px]">
                                        <li>
                                            <NavLink
                                                className="text-[#665345] text-[15px] hover:text-[#859a78]"
                                                to="#!"
                                            >
                                                Pflanzschalen
                                            </NavLink>
                                        </li>
                                        <li className="mt-4">
                                            <NavLink
                                                className="text-[#665345] text-[15px] hover:text-[#859a78]"
                                                to="#!"
                                            >
                                                Eckige Töpfe
                                            </NavLink>
                                        </li>
                                        <li className="mt-4">
                                            <NavLink
                                                className="text-[#665345] text-[15px] hover:text-[#859a78]"
                                                to="#!"
                                            >
                                                Runde Töpfe
                                            </NavLink>
                                        </li>
                                        <li className="mt-4">
                                            <NavLink
                                                className="text-[#665345] text-[15px] hover:text-[#859a78]"
                                                to="#!"
                                            >
                                                Untersetzer
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex gap-[2px] text-white text-[14px] font-semibold leading-5"
                                        to="#!"
                                    >
                                        Gioi Thiệu
                                        <img
                                            className="mt-1 cursor-pointer"
                                            src="/assets/svg/arrow_down.svg"
                                            alt="dropdown"
                                        />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex gap-[2px] text-white text-[14px] font-semibold leading-5"
                                        to="#!"
                                    >
                                        Bài Viết
                                        <img
                                            className="mt-1 cursor-pointer"
                                            src="/assets/svg/arrow_down.svg"
                                            alt="dropdown"
                                        />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="flex gap-[2px] text-white text-[14px] font-semibold leading-5"
                                        to="#!"
                                    >
                                        Quảng cáo
                                        <img
                                            className="mt-1 cursor-pointer"
                                            src="/assets/svg/arrow_down.svg"
                                            alt="dropdown"
                                        />
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận đăng xuất"}
                </DialogTitle>
                <DialogContent>
                    <p>Bạn có chắc chắn muốn đăng xuất không?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleLogout} color="secondary" autoFocus>
                        Đăng xuất
                    </Button>
                </DialogActions>
            </Dialog>
            <AccountDialog open={openacount} onClose={handlecloseacount} />
            <CartDialog cartItems={cartItems} increaseCartQuantity={increaseCartQuantity} decreaseCartQuantity={decreaseCartQuantity} removeFromCart={removeFromCart} open={cartopen} onClose={handleclosecart} total={totalPrice}></CartDialog>
        </>

    );
};

export default Header;


