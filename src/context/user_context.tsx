import React, { createContext, useContext, ReactNode } from 'react';
import { login, register } from '../interface/user';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {
    children: ReactNode;
};

type UserContextType = {
    login: (data_login: login) => void;
    Register: (data_register: register) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Get_User: () => any | null;
    Logout : () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const login = async (data_login: login) => {
        try {
            const { data } = await axios.post('http://localhost:3000/login', data_login);
            localStorage.setItem('user', JSON.stringify(data));
            alert("đăng nhập thành công");
            navigate("");
        } catch (error) {
            alert("Tài khoản hoặc mật khẩu không đúng");
        }
    };

    const Register = async (data_register: register) => {
        try {
            const { data } = await axios.post('http://localhost:3000/register', data_register);
            alert("đăng kí thành công");
            navigate("/login");
        } catch (error) {
            alert("Tên tài khoản hoặc mật khẩu đã tồn tại");
        }
    };
    const Get_User = () => {
        let user_info = null;
        try {
            const user = localStorage.getItem('user');
            if (user) {
                user_info = JSON.parse(user);
            }
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error);
        }
        return user_info; 
    };
    
    const Logout = () => {
        const user = localStorage.getItem('user');
        if(user){
            localStorage.removeItem('user');
        }else{
            alert("B chưa đăng nhập")
        }
    };
    return (
        <UserContext.Provider value={{ login, Register,Get_User,Logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};

export default UserContextProvider;
