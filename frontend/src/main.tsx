import "./app/styles/index.css";
import App from "./app/App";
import React from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);
