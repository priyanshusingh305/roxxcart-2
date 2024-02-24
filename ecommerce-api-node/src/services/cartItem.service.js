const CartItem = require("../models/cartItem.model");
const userService = require("../services/user.service");

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const item = await findCartItemById(cartItemId);
    console.log("item",item)  
    
    if (!item) {
      throw new Error("cart item not found : ", cartItemId);
    }
    // console.log("userId :",userId, "cartItemId : ",cartItemId, "cartItemData : ",cartItemData,",item : ",item)
    const user = await userService.findUserbyId(item.userId);
    if (!user) {
      throw new Error("user not found : ", userId);
    }
    if (user._id.toString() === userId.toString()) {
      console.log(item.quantity)
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.UnitPrice;
      item.discountedPrice = item.quantity * item.discountedUnitPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("you can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findUserbyId(userId);
  if (user._id.toString() === cartItem.userId.toString()) {
    return await CartItem.findByIdAndDelete(cartItemId);
  }
  throw new Error("You cant remove another user's item");
}

async function findCartItemById(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cartItem not found with id : ", cartItemId);
  }
}

module.exports = {
  updateCartItem,
  findCartItemById,
  removeCartItem,
};
