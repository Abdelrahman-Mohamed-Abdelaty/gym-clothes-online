const Order = require('../models/order')
const {getAllFactory, deleteFactory, updateFactory, createFactory, getOneFactory} = require("./handlerFactory");

exports.getAllOrders=getAllFactory(Order);
exports.deleteOrder=deleteFactory(Order);
exports.updateOrder=updateFactory(Order);
exports.createOrder=createFactory(Order);
exports.getOneOrder=getOneFactory(Order);