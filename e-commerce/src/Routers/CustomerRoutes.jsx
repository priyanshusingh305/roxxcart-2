import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from "../customer/pages/HomePage/HomePage"
import Cart from "../customer/components/Cart/Cart"
import Product from "../customer/components/Product/Product";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails"
import Checkout from "../customer/components/Checkout/Checkout"
import Order from "../customer/components/Order/Order"
import OrderDetails from "../customer/components/Order/OrderDetails"
import Navigation from '../customer/components/Navigation/Navigation';
import PaymentSuccess from '../customer/pages/HomePage/PaymentSuccess';


const CustomerRoutes = () => {
  return (
    <div>
      <div>
        <Navigation />
       
      </div>
      <Routes>

          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<HomePage/>}></Route>
          <Route path='/register' element={<HomePage/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product/> }></Route>
          <Route path="/product/:productId" element={  <ProductDetails/>}></Route>
          <Route path="/checkout" element={  <Checkout/>}></Route>
          <Route path="/account/order" element={  <Order/>}></Route>
          <Route path="/account/order/:orderId" element={  <OrderDetails/>}></Route>
          <Route path="/payment/:orderId" element={  <PaymentSuccess/>}></Route>

          <Route path="*" element={<HomePage/>} />

      </Routes>
    </div>
  )
}

export default CustomerRoutes

// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import HomePage from "../customer/pages/HomePage/HomePage";
// import Cart from "../customer/components/Cart/Cart";
// import Navigation from "../customer/components/Navigation/Navigation";
// import Footer from "../customer/components/Footer/Footer";
// // import Product from "../customer/components/Product/Product";
// // import ProductDetails from "../customer/components/ProductDetails/ProductDetails"


// const CustomerRoutes = () => {
//   return (
//     <div>
//       <div>
//         <Navigation />
//       </div>
//       {/* <Routes> */}
//         {/* <Route path="/" element={<HomePage />}></Route> */}
//         {/* <Route path="/cart" element={<Cart/>}></Route> */}
//         {/* <Route path="/:levelOne/:levelTwo/:levelThree" element={ }></Route> */}
//         {/* <Route path="/product/:productId" element={  }></Route> */}
//         {/* <Product/>  */}
//         {/* <ProductDetails/> */}
//         {/* <Cart/> */}
//         {/* <Checkout/> */}
//         {/* <Order/> */}
//         {/* <OrderDetails/> */}
//       {/* </Routes> */}
//       <div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default CustomerRoutes;
