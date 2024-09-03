const mongoose=require("mongoose");
const slugify=require("slugify");
const User=require("../models/user")
const validator=require("validator");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"product should have a name"],
        unique:true,
        trim:true,
        maxlength:[40,"A product name must have less than 40 characters"],
        minlength:[4,"A product name must have more than 10 characters"],
        // validate:[validator.isAlpha,"A product name only contains characters"],
    },
    discountedPrice:{
        type:Number,
    },
    images:{
        type:[String],
        required:true
    },
    sizes:Number,
    offer:Number,
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    price:{
        type:Number,
        required:[true,"product should have price"]
    },

})



const products=mongoose.model("products",productSchema);
module.exports=products;