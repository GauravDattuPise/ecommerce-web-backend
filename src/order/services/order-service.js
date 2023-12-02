const orderModel = require("../models/order-model")

// create order
exports.placeOrder = async (order) => {
    return await orderModel.create(order)
}

// get user's order history
exports.getOrdersHistory = async (userId) => {
    return await orderModel.find({userId})
}

// get order details
exports.getOrderDetails = async (userId,orderId) => {
    return await orderModel.findOne({_id : orderId, userId : userId})
}