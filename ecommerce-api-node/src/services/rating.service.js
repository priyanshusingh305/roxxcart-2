
const Rating = require("../models/rating.model");
const productService=require("./product.service")

async function createRating(reqData,user){
    const product=await productService.findByProductId(reqData.productId);

    const rating=new Rating({
        product:product._id,
        user:user._id,
        rating:reqData.rating,
        createdAt:new Date(),
    })

    return await rating.save();
}

async function getProductRating(productId){
    return await Rating.find({product:productId});
}

module.exports={
 createRating,
 getProductRating
}