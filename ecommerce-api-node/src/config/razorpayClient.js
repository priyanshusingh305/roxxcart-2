const Razorpay = require('razorpay');
require("dotenv").config();


let apiKey=process.env.RAZORPAY_API_KEY
let apiSecret=process.env.RAZORPAY_API_SECRET
const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});
module.exports=razorpay