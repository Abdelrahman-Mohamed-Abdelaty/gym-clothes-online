const mongoose=require("mongoose");
const {Schema} = require("mongoose");
const orderSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"user should provide his name for the order"],
        trim:true,
        maxlength:[40,"A username must have less than 40 characters"],
        minlength:[4,"A username must have more than 10 characters"],
    },
    userId:{
        type: Schema.Types.ObjectId,
        required:['you must provide product id for order'],
        ref:'users',
    },
    productId: {
        type: Schema.Types.ObjectId,
        required:['you must provide product id for order'],
        ref:'products'
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    status:{
        type:String,
        //confirmed after the admin communicate with the user throw the phone
        enum:['Pending','Confirmed','Out for Delivery','Canceled','Delivered'],
        default:'pending'
    },

    phone:{
        type:String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{11}$/.test(v);  // Validates 10-digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})



const orders=mongoose.model("orders",orderSchema);
module.exports=orders;