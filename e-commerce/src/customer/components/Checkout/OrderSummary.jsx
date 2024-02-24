import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { Button } from '@mui/material'
import CartItem from '../Cart/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../State/Order/Action'
import { useLocation } from 'react-router-dom'
import { createPayment } from '../../../State/Payment/Action'

const OrderSummary = () => {
  const dispatch=useDispatch();
  const loction=useLocation();
  const {order}=useSelector(store=>store)
  const searchParams=new URLSearchParams(loction.search)
  const orderId=searchParams.get("order_id")
  useEffect(()=>{
    console.log("order :",order)
    dispatch(getOrderById(orderId));
  },[orderId])

  const handleCheckout=()=>{
    dispatch(createPayment(orderId))
  }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-md border'>
           <AddressCard  address={order.order?.shippingAddress}/> 
        </div>

        <div>
      <div className="lg:grid grid-cols-3 relative">
        <div className="col-span-2">
          {order.order?.orderItems.map((item)=><CartItem item={item}/>)}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr/>
                <div className="space-y-3 font-semibold mb-10">
                    <div className="flex justify-between pt-3 text-black">
                    <span>Price</span>
                    <span>₹{order.order?.totalPrice}</span>

                    </div>
                    <div className="flex justify-between pt-3 text-green-600">
                    <span>Discount</span>
                    <span>₹{order.order?.discounte}</span>

                    </div>
                    <div className="flex justify-between pt-3 text-green-600">
                    <span>Delivery Charges</span>
                    <span>Free</span>

                    </div>
                    <div className="flex justify-between pt-3  font-bold">
                    <span>Total amount</span>
                    <span className="text-green-600">₹{order.order?.totalDiscountedPrice}</span>

                    </div>
                </div>
                <Button
                onClick={handleCheckout}
                 className ="w-full mt-5"varient="contained" sx={{px:"2rem", py:"0.7rem", bgcolor:"#9155fd",color:"white",  '&:hover': {bgcolor:"blue"}}}>

            Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
        
    </div>
  )
}

export default OrderSummary