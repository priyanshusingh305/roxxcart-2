const  mongoose = require("mongoose")
require("dotenv").config();
const mondbUrl=process.env.DB_URL



const connectDb=()=>{
    return mongoose.connect(mondbUrl)
}

module.exports={connectDb}