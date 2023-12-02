const cartModel = require("../models/cart-model")

// create cart
exports.createCart = async (cart) => {
    return await cartModel.create(cart)
}

// check user have cart or not
exports.checkUserCart = async (userId) => {
    return await cartModel.findOne({ userId })
}

// check product is available in cart or not
exports.productInCart = async (productId) => {
    return await cartModel.findOne({ "items.productId": productId })
}

// add new product to cart
exports.addProductInCart = async (userId, product, totalPrice, totalItems) => {
    return await cartModel.findOneAndUpdate({ userId },
        {
            $push: { items: product },
            $set: { totalItems: totalItems + 1, totalPrice: totalPrice + product.productPrice }
        },
        { new: true }
    )
}

// update the existing product quantity and totalPrice and totalItems
exports.updateProductInCart = async (userId, productId, productPrice) => {
    return await cartModel.findOneAndUpdate({ userId: userId, "items.productId": productId },
        {
            $inc: { "items.$.quantity": 1, totalPrice: productPrice, totalItems: 1 }
        },
        { new: true }
    )
}


// remove product from cart
exports.removeProductFromCart = async (userId,items,productPrice,productQuantity) => {
    return cartModel.findOneAndUpdate({userId},{
        $set : {items : items},
        $inc : {totalItems : -productQuantity, totalPrice : -(productPrice * productQuantity) }
    },{new : true})
}