// import { ClassNames } from "@emotion/react";
// import Navigation from "./customer/components/Navigation/Navigation";
// import HomePage from "./customer/pages/HomePage/HomePage";
// import Footer from "./customer/components/Footer/Footer";
// import OrderDetails from "./customer/components/Order/OrderDetails";
import { Route, Routes } from "react-router-dom";
import CustomerRoutes from "./Routers/CustomerRoutes";
// import Checkout from "./customer/components/Checkout/Checkout";
// import Order from "./customer/components/Order/Order";

// import ProductDetails from "./customer/components/ProductDetails/ProductDetails";
// import Cart from "./customer/components/Cart/Cart";

// import Product from "./customer/components/Product/Product";


function App() {
  return (
    <div>

      <Routes>
        <Route path="/*" element={<CustomerRoutes/>}></Route>

      </Routes>
      

    </div>
  );
}

export default App;
