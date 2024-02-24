const Cart =require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(user){
    try {
        const cart=new Cart({user});
        const createdCart=await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);        
    }
}


async function findUserCart(userId){
    // console.log(userId)
    try {
        let cart=await  Cart.findOne({user:userId});
        
        
        let cartItem=await CartItem.find({cart:cart._id}).populate('product');
        
        cart.cartItems=cartItem;
        
        let totalPrice=0;
        let totalDiscountedPrice=0;
        let totalItem=0;
        for(let cartItem of cart.cartItems){
            // console.log( cartItem.discountedPrice);
            totalPrice+=cartItem.price;
            totalDiscountedPrice+= cartItem.discountedPrice;
            totalItem+=cartItem.quantity;
        }
        cart.totalDiscountedPrice=totalDiscountedPrice
        cart.totalPrice=totalPrice;
        cart.totalItem=totalItem;
        cart.discounte=totalPrice-totalDiscountedPrice
        

        return cart;
    } catch (error) {

        throw new Error(error.message)
        
    }
}

async function addCartItem(userId,req){
    try {
        const cart=await Cart.findOne({user:userId});
        const product=await Product.findById(req.productId)
        
        const isPresent= await CartItem.findOne({cart:cart._id,product:product._id,userId})
        
        // console.log(product._id,cart._id,product.price)
        if(!isPresent){
            const cartItem=new CartItem({
                product:product._id,
                cart:cart._id,
                quantity:1,
                userId,
                price:product.price,
                size:req.size,
                discountedPrice:product.discountedPrice,
                UnitPrice:product.price,
                discountedUnitPrice:product.discountedPrice,
            }
            )
            
            
            console.log(cartItem);
            const createdCartItem=await cartItem.save();
            await cart.cartItems.push(createdCartItem)
            await cart.save();
            return createdCartItem
        }
        return isPresent
        // return "item is already"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={createCart, findUserCart, addCartItem}