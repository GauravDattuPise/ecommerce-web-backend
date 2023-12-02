
const express = require("express");
const router = express.Router();

const { createCart, getUserCart, addProductToCart, removeProductFromCart } = require("../controllers/cart-controller");
const { authentication } = require("../../middlewares/authentication");

// create cart
router.post("/create", authentication, createCart)

// get cart
router.get("/get", authentication, getUserCart)

// add product to cart
router.put("/add-to-cart", authentication, addProductToCart)

// remove product from cart
router.delete("/remove-product", authentication, removeProductFromCart)
module.exports = router