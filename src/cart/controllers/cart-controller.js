const { default: mongoose } = require("mongoose")
const HttpError = require("../../httpError/http-error")
const cartService = require("../services/cart-service")
const productService = require("../../product/services/product-service")

// create cart for user
exports.createCart = async (req, res, next) => {
    try {
        const cartData = req.body
        cartData.userId = req.userId

        // check user already have cart or not
        const checkUserCart = await cartService.checkUserCart(req.userId)
        if (checkUserCart) {
            return next("User already have cart, cant create another cart", 400)
        }

        // cart created
        const cart = await cartService.createCart(cartData)
        return res.status(201).send({ success: true, message: "cart created", cart })

    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in create cart", 500))
    }
}

// get user cart

exports.getUserCart = async (req, res, next) => {

    try {
        const userId = req.userId

        // check user already have cart or not
        const checkUserCart = await cartService.checkUserCart(userId)
        if (!checkUserCart) {
            return next("cart not found, please create cart", 404)
        }

        return res.status(200).send({ success: true, cart: checkUserCart })

    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in get cart", 500))
    }
}


// add product to cart

exports.addProductToCart = async (req, res, next) => {
    try {
        const userId = req.userId
        const { productId } = req.body

        // validation
        if (!productId) {
            return next(new HttpError("productId is required", 400))
        }
        if (!mongoose.isValidObjectId(productId)) {
            return next(new HttpError("productId is invalid", 400))
        }

        // check user already have cart or not
        const checkUserCart = await cartService.checkUserCart(userId)
        if (!checkUserCart) {
            return next("cart not found, please create cart", 404)
        }
        const totalItems = checkUserCart.totalItems
        const totalPrice = checkUserCart.totalPrice

        // check product exists or not
        const checkProduct = await productService.getProductById(productId)
        if (!checkProduct) {
            return next("product not found", 404)
        }
        console.log(checkProduct)

        // add product in cart
        const productObj = {
            productId: checkProduct._id,
            productPrice: checkProduct.price,
            quantity: 1
        }

        // check product already available in cart or not
        const productInCart = await cartService.productInCart(productId)

        // if product not available in cart
        if (!productInCart) {
            const updatedCart = await cartService.addProductInCart(userId, productObj, totalPrice, totalItems)
            return res.status(200).send({ success: true, message: "product added to cart", updatedCart })
        }

        // if product available in cart
        const updatedCart = await cartService.updateProductInCart(userId, productId, checkProduct.price)
        return res.status(200).send({ success: true, message: "product quantity updated in cart", cart: updatedCart })


    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in add product to cart", 500))
    }
}



// remove product from cart

exports.removeProductFromCart = async (req, res, next) => {
    try {
        const userId = req.userId
        const { productId } = req.body

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

         if(userCart.items.length === 0){
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
            else{
                arrayOfItems.push(userCart.items[i])
            }
        }

        if (productIndex == -1) {
            return next(new HttpError("product not available in cart", 404))
        }

        //  userCart.totalItems = userCart.totalItems - productQuantity
        //  userCart.totalPrice = userCart.totalPrice - (productPrice * productQuantity)
        //  userCart.items = arrayOfItems
         const updatedCart = await cartService.removeProductFromCart(userId,arrayOfItems,productPrice, productQuantity)
         return res.status(200).send({succes : true, message : "product removed", updatedCart})
   
        } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in remove product from cart", 500))
    }
}
