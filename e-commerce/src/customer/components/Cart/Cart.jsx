import React, { useEffect, useRef } from "react";
import CartItem from "./CartItem";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const navigate=useNavigate()
  const {cart}=useSelector(store=>store)
  const dispatch=useDispatch()
  const handleCheckout=()=>{
    navigate("/checkout?step=2")

  }
    const hasBeenRendered=useRef(false)
  useEffect(()=>{
    dispatch(getCart())
    hasBeenRendered.current=true;
  },[],[cart.updateCartItem, cart.deleteCartItem])

  console.log("cart",cart);
  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {cart.cart?.cartItems.map((item)=><CartItem item={item} key={item._id}/>)}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr/>
                <div className="space-y-3 font-semibold mb-10">
                    <div className="flex justify-between pt-3 text-black">
                    <span>Price</span>
                    <span>₹{cart.cart?.totalPrice}</span>

                    </div>
                    <div className="flex justify-between pt-3 text-green-600">
                    <span>Discount</span>
                    <span>₹{cart.cart?.discounte}</span>

                    </div>
                    <div className="flex justify-between pt-3 text-green-600">
                    <span>Delivery Charges</span>
                    <span>Free</span>

                    </div>
                    <div className="flex justify-between pt-3  font-bold">
                    <span>Total amount</span>
                    <span className="text-green-600">₹{cart.cart?.totalDiscountedPrice}</span>

                    </div>
                </div>
                <Button onClick={handleCheckout} className ="w-full mt-5"varient="contained" sx={{px:"2rem", py:"0.7rem", bgcolor:"#9155fd",color:"white",  '&:hover': {bgcolor:"blue"}}}>

            Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
