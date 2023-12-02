
const orderService = require("../services/order-service")
const cartService = require("../../cart/services/cart-service")
const HttpError = require("../../httpError/http-error")
const { default: mongoose } = require("mongoose")

exports.placeOrder = async (req, res, next) => {
    try {
        const userId = req.userId
        const orderData = req.body
        const { productId } = orderData

        // validation
        if (!productId) {
            return next(new HttpError("productId is required", 400))
        }
        if (!mongoose.isValidObjectId(productId)) {
            return next(new HttpError("productId is invalid", 400))
        }

        // check user have cart or not
        const userCart = await cartService.checkUserCart(userId)
        if (!userCart) {
            return next("cart not found, please create cart", 404)
        }

        if (userCart.items.length === 0) {
            return next(new HttpError("cart is empty", 400))
        }

        let productIndex = -1
        let productPrice = 0
        let productQuantity = 0
        let arrayOfItems = []
        for (let i = 0; i < userCart.items.length; i++) {
            if (userCart.items[i].productId.toString() === productId) {
                productIndex = i
                productPrice = userCart.items[i].productPrice
                productQuantity = userCart.items[i].quantity
            }
            else {
                arrayOfItems.push(userCart.items[i])
            }
        }

        if (productIndex == -1) {
            return next(new HttpError("product not available in cart", 404))
        }

        const orderDetails = {
            userId: req.userId,
            productId: productId,
            productQuantity: productQuantity,
            productPrice: productPrice,
            totalAmount: productQuantity * productPrice
        }

        // order is placed
        const placedOrder = await orderService.placeOrder(orderDetails)

        // remove product from cart after placing order   
        await cartService.removeProductFromCart(userId, arrayOfItems, productPrice, productQuantity)

        // return placed order
        return res.status(201).send({ succes: true, message: "order placed", placedOrder })

    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in place order", 500))
    }
}




exports.getOrdersHistory = async (req, res, next) => {
    try {
        const userId = req.userId
        const orders = await orderService.getOrdersHistory(userId)
        if(orders.length === 0){
            return next(new HttpError("order history not available", 404))
        }

        return res.status(200).send({succes : true, ordersHistory : orders})
    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in get order history", 500))
    }
}

exports.getOrderDetails = async (req, res, next) => {
    try {
        const userId = req.userId
        const {orderId} = req.params
        const order = await orderService.getOrderDetails(userId,orderId)
        if(!order){
            return next(new HttpError("order not found", 404))
        }

        return res.status(200).send({succes : true, order : order})
    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in get order details", 500))
    }
}