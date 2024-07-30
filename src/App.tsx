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

const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: "",
            element: <Client />,
            children: [
                { path: "", element: <HomePage /> },
                { path: "product/list", element: <ListProduct /> },
                { path: "product/detail/:id", element: <Product_Detail /> }
            ],
        },
        {
            path: "dashboard",
            element: <Dashboard />,
            children: [
                { path: "categories", element: <CategoryList /> },
                { path: "products", element: <Orders /> },
                // Thêm các tuyến đường khác của dashboard ở đây nếu cần
            ],
        },
    ]);
    return routes;
};

function App() {
    return <AppRoutes />;
}

export default App;
