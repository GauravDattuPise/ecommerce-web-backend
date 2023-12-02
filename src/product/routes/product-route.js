
const express = require("express");
const router = express.Router();

const { createProduct, getProductsOfCategory, getProductById } = require("../controllers/product-controller");


// create product
router.post("/create", createProduct)

// get products of specific category
router.get("/get-products/:categoryId", getProductsOfCategory)

// get product by productId
router.get("/get-single-product/:productId", getProductById)

module.exports = router