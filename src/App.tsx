import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Client from "./layout/Client";
import Dashboard from "./layout/Dashboard";
import HomePage from "./components/HomePage";
import ListProduct from "./components/ListProduct";
import Product_Detail from "./components/Product_Detail";
import CategoryList from "./components/admin/category_list";
import Orders from "./components/admin/Orders";
import SignInSide from "./components/LoginForm";
import SignUp from "./components/Registerform";
import LocationSelector from "./components/apivn";
import CheckoutPage from "./components/checkout/checkout";
import User_PrivateRouter from "./components/privateroute/privateuser";
import Cart_PrivateRouter from "./components/privateroute/privatecart";

const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: "",
            element: <Client />,
            children: [
                { path: "", element: <HomePage /> },
                { path: "product/list", element: <ListProduct /> },
                { path: "product/detail/:id", element: <Product_Detail /> },
                { path: "product/category/:id", element: <ListProduct /> },
                { path: "checkout", element: <Cart_PrivateRouter><CheckoutPage/></Cart_PrivateRouter>}
            ],
        },
        { path: "login", element: <SignInSide/> },
        { path: "register", element: <SignUp/> },
        { path: "apivn", element: <LocationSelector/> },
        {
            path: "dashboard",
            element:<User_PrivateRouter><Dashboard /> </User_PrivateRouter> ,
            children: [
                { path: "categories", element: <CategoryList /> },
                { path: "products", element: <Orders /> },
            ],
        },
    ]);
    return routes;
};

function App() {
    return <AppRoutes />;
}

export default App;
