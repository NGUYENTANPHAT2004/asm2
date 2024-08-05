import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/product_context.tsx";
import { SearchProvider } from "./context/search_context.tsx";
import UserContextProvider from "./context/user_context.tsx";
import { ShoppingCartProvider } from "./context/Cartcontext.tsx";
import { Checkoutcontexprovider } from "./context/Checkoutcontext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <ProductProvider>
        <SearchProvider>
          <ShoppingCartProvider>
          <Checkoutcontexprovider>
        <App />
        </Checkoutcontexprovider>
        </ShoppingCartProvider>
        </SearchProvider>
      </ProductProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
